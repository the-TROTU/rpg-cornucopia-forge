/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER RENDERER

 Version 4.4.0

 "The world exists.
 The ink reveals it."

=========================================================
*/

const ForgeRenderer = (()=>{

let canvas=null;
let ctx=null;
let style="ink";

const SCALE=6;
const TAU=Math.PI*2;

const PALETTES={
    // Both supported display modes are deliberately grayscale: generated maps
    // should remain legible and economical when printed on a home printer.
    ink:{paper:"#ffffff",ocean:"#f5f5f5",land:"#ffffff",coast:"#1c1c1c",river:"#4b4b4b",lake:"#e4e4e4",mountain:"#323232",forest:"#707070",road:"#666666",settlement:"#161616",label:"#111111"},
    color:{paper:"#ffffff",ocean:"#f5f5f5",land:"#ffffff",coast:"#1c1c1c",river:"#4b4b4b",lake:"#e4e4e4",mountain:"#323232",forest:"#707070",road:"#666666",settlement:"#161616",label:"#111111"}
};

function initialize(canvasID="world-canvas"){
    canvas=document.getElementById(canvasID);
    if(!canvas){ console.error("ForgeRenderer: Canvas missing."); return false; }
    ctx=canvas.getContext("2d");
    return true;
}

function setStyle(selected){ style=selected || "ink"; }

function render(world){
    if(!ctx){ console.error("Renderer not initialized."); return; }
    if(!world || !world.cartography || !world.cartography.layers){ console.warn("Cartography missing."); return; }

    const layers=world.cartography.layers;
    const palette=getPalette();
    const land=pruneSpeckIslands(layers.land || []);
    const settlements=selectSettlements(layers.settlements || []);
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPaper(palette);
    drawOcean(palette);
    const view=fitLandToCanvas(land);
    ctx.translate(view.offsetX,view.offsetY);
    ctx.scale(view.zoom,view.zoom);
    drawLand(land,palette);
    drawCoastline(layers.coastlinePaths || [],land,palette);
    drawLakes(layers.lakes || [],palette);
    drawRivers(layers.rivers || [],palette);
    drawForests(layers.forests || [],palette);
    drawTerrain(layers.mountainRanges?.flat() || layers.mountains || [],palette);
    drawRoads(layers.roads || [],settlements,palette);
    drawSettlements(settlements,palette);
    drawLabels(layers.labels || [],settlements,palette);
    ctx.restore();
}

function getPalette(){ return PALETTES[style] || PALETTES.ink; }

function fitLandToCanvas(cells){
    if(!cells.length){ return {zoom:1,offsetX:0,offsetY:0}; }
    const xs=cells.map(cell=>cell.x*SCALE);
    const ys=cells.map(cell=>cell.y*SCALE);
    const minX=Math.min(...xs);
    const maxX=Math.max(...xs)+SCALE;
    const minY=Math.min(...ys);
    const maxY=Math.max(...ys)+SCALE;
    const width=maxX-minX;
    const height=maxY-minY;
    const zoom=Math.max(1,Math.min(1.7,canvas.width*.9/width,canvas.height*.86/height));
    return {
        zoom,
        offsetX:canvas.width/2-(minX+maxX)*zoom/2,
        offsetY:canvas.height/2-(minY+maxY)*zoom/2
    };
}

// One- to three-cell islands are generator artifacts at this display scale.
// Filtering them is presentation-only; cartography data remains untouched.
function pruneSpeckIslands(cells){
    const byPosition=new Map(cells.map(cell=>[key(cell.x,cell.y),cell]));
    const visited=new Set();
    const visible=[];

    cells.forEach(cell=>{
        const start=key(cell.x,cell.y);
        if(visited.has(start)){ return; }
        const component=[];
        const queue=[cell];
        visited.add(start);

        while(queue.length){
            const current=queue.pop();
            component.push(current);
            [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{
                const neighbor=byPosition.get(key(current.x+dx,current.y+dy));
                const neighborKey=neighbor && key(neighbor.x,neighbor.y);
                if(neighbor && !visited.has(neighborKey)){
                    visited.add(neighborKey);
                    queue.push(neighbor);
                }
            });
        }

        // Retain meaningful islands, but discard small square fragments that
        // cannot read as islands at this map's display scale.
        if(component.length>=10){ visible.push(...component); }
    });

    return visible;
}

function drawPaper(palette){
    ctx.fillStyle=palette.paper;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawOcean(palette){
    ctx.fillStyle=palette.ocean;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawLand(cells,palette){
    if(!cells.length){ return; }
    ctx.fillStyle=palette.land;
    // The one-pixel overlap removes the visible internal square grid.
    cells.forEach(cell=>ctx.fillRect(cell.x*SCALE,cell.y*SCALE,SCALE+1,SCALE+1));
}

function drawCoastline(paths,cells,palette){
    if(!cells.length){ return; }
    if(paths.length){
        drawSmoothedCoastline(paths,palette);
        return;
    }

    // Compatibility fallback for Cartography 2.0 worlds.
    const occupied=new Set(cells.map(cell=>key(cell.x,cell.y)));
    const coast=buildCoastPath(cells,occupied);
    ctx.save();
    ctx.strokeStyle="rgba(255,255,255,.32)";
    ctx.lineWidth=3.4;
    ctx.lineJoin="round";
    ctx.lineCap="round";
    ctx.stroke(coast);
    ctx.strokeStyle=palette.coast;
    ctx.lineWidth=1.15;
    ctx.stroke(coast);
    ctx.restore();
}

function drawSmoothedCoastline(paths,palette){
    ctx.save();
    ctx.lineJoin="round";
    ctx.lineCap="round";
    paths.forEach(path=>{
        if(!Array.isArray(path) || path.length<3){ return; }
        const coast=new Path2D();
        const count=path.length;
        const midpoint=(a,b)=>[(a.x+b.x)*SCALE/2,(a.y+b.y)*SCALE/2];
        const start=midpoint(path[count-1],path[0]);
        coast.moveTo(start[0],start[1]);
        for(let i=0;i<count;i++){
            const point=path[i];
            const next=path[(i+1)%count];
            const end=midpoint(point,next);
            coast.quadraticCurveTo(point.x*SCALE,point.y*SCALE,end[0],end[1]);
        }
        ctx.strokeStyle="rgba(255,255,255,.7)";
        ctx.lineWidth=3.6;
        ctx.stroke(coast);
        ctx.strokeStyle=palette.coast;
        ctx.lineWidth=1.25;
        ctx.stroke(coast);
    });
    ctx.restore();
}

function buildCoastPath(cells,occupied){
    const path=new Path2D();
    cells.forEach(cell=>{
        const x=cell.x*SCALE;
        const y=cell.y*SCALE;
        if(!occupied.has(key(cell.x,cell.y-1))){ coastEdge(path,x,y,x+SCALE,y); }
        if(!occupied.has(key(cell.x+1,cell.y))){ coastEdge(path,x+SCALE,y,x+SCALE,y+SCALE); }
        if(!occupied.has(key(cell.x,cell.y+1))){ coastEdge(path,x+SCALE,y+SCALE,x,y+SCALE); }
        if(!occupied.has(key(cell.x-1,cell.y))){ coastEdge(path,x,y+SCALE,x,y); }
    });
    return path;
}

function coastEdge(path,x1,y1,x2,y2){
    path.moveTo(x1,y1);
    path.lineTo(x2,y2);
}

function drawRivers(rivers,palette){
    if(!rivers.length){ return; }
    ctx.save();
    ctx.strokeStyle=palette.river;
    ctx.lineWidth=1.8;
    ctx.lineCap="round";
    ctx.lineJoin="round";
    rivers.forEach(river=>{
        if(!Array.isArray(river) || river.length<2){ return; }
        ctx.beginPath();
        ctx.moveTo(river[0].x*SCALE,river[0].y*SCALE);
        for(let i=1;i<river.length-1;i++){
            const point=river[i];
            const next=river[i+1];
            ctx.quadraticCurveTo(point.x*SCALE,point.y*SCALE,(point.x+next.x)*SCALE/2,(point.y+next.y)*SCALE/2);
        }
        const last=river[river.length-1];
        ctx.lineTo(last.x*SCALE,last.y*SCALE);
        ctx.stroke();
    });
    ctx.restore();
}

function drawLakes(lakes,palette){
    lakes.forEach(lake=>{
        if(!isPoint(lake)){ return; }
        const radius=Math.max(4,Number(lake.size || 3)*1.7);
        const seed=hash(lake.x,lake.y);
        ctx.beginPath();
        for(let i=0;i<10;i++){
            const angle=i/10*TAU;
            const wobble=.82+hash(seed,i)*.3;
            const x=lake.x*SCALE+Math.cos(angle)*radius*wobble;
            const y=lake.y*SCALE+Math.sin(angle)*radius*wobble*.72;
            i ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
        }
        ctx.closePath();
        ctx.fillStyle=palette.lake;
        ctx.fill();
        ctx.strokeStyle=palette.river;
        ctx.lineWidth=1;
        ctx.stroke();
    });
}

function drawForests(forests,palette){
    const features=thinFeatures(forests,3,.22);
    if(!features.length){ return; }
    ctx.save();
    ctx.fillStyle=palette.forest;
    features.forEach(forest=>{
        const x=forest.x*SCALE;
        const y=forest.y*SCALE;
        tree(x,y,2.8);
        if(hash(forest.x+11,forest.y+23)>.54){ tree(x+3,y+2,2.1); }
    });
    ctx.restore();
}

function tree(x,y,size){
    ctx.beginPath();
    ctx.moveTo(x,y-size*1.4);
    ctx.lineTo(x-size,y+size);
    ctx.lineTo(x+size,y+size);
    ctx.closePath();
    ctx.fill();
}

function drawTerrain(mountains,palette){
    const features=thinFeatures(mountains,5,.16);
    if(!features.length){ return; }
    ctx.save();
    ctx.strokeStyle=palette.mountain;
    ctx.lineWidth=1.1;
    ctx.lineCap="round";
    drawRidges(features);
    features.forEach(mountain=>{
        const x=mountain.x*SCALE;
        const y=mountain.y*SCALE;
        const height=Number(mountain.height || .75);
        const size=3.4+Math.max(0,Math.min(1,height))*3;

        // Linework and hatching read as hand-drawn peaks, rather than a field
        // of identical filled triangles.
        ctx.beginPath();
        ctx.moveTo(x,y-size*1.45);
        ctx.lineTo(x-size,y+size*.9);
        ctx.lineTo(x+size,y+size*.9);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x-size*.35,y+size*.05);
        ctx.lineTo(x+size*.42,y+size*.9);
        ctx.moveTo(x-size*.08,y-size*.45);
        ctx.lineTo(x+size*.63,y+size*.35);
        ctx.stroke();
    });
    ctx.restore();
}

function drawRidges(peaks){
    const linked=new Set();
    peaks.forEach((peak,index)=>{
        let closestIndex=-1;
        let closestDistance=Infinity;
        peaks.forEach((candidate,candidateIndex)=>{
            if(index===candidateIndex){ return; }
            const dx=peak.x-candidate.x;
            const dy=peak.y-candidate.y;
            const distance=Math.hypot(dx,dy);
            if(distance<closestDistance){ closestDistance=distance; closestIndex=candidateIndex; }
        });
        // A ridge joins nearby peaks only; broad mountain regions therefore
        // become a few readable chains instead of a mesh of lines.
        if(closestIndex<0 || closestDistance>10){ return; }
        const pair=[index,closestIndex].sort((a,b)=>a-b).join(":");
        if(linked.has(pair)){ return; }
        linked.add(pair);
        const other=peaks[closestIndex];
        const x1=peak.x*SCALE;
        const y1=peak.y*SCALE+3;
        const x2=other.x*SCALE;
        const y2=other.y*SCALE+3;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.quadraticCurveTo((x1+x2)/2,(y1+y2)/2-4,x2,y2);
        ctx.stroke();
    });
}

function thinFeatures(features,spacing,keepChance){
    const occupied=new Set();
    return features.filter(feature=>{
        if(!isPoint(feature) || hash(feature.x,feature.y)>keepChance){ return false; }
        const cell=key(Math.floor(feature.x/spacing),Math.floor(feature.y/spacing));
        if(occupied.has(cell)){ return false; }
        occupied.add(cell);
        return true;
    });
}

function drawRoads(roads,settlements,palette){
    if(!roads.length || settlements.length<2){ return; }
    ctx.save();
    ctx.strokeStyle=palette.road;
    ctx.lineWidth=1.3;
    ctx.setLineDash([4,3]);
    ctx.lineCap="round";
    roads.forEach(road=>{
        // Name-only roads from the current simulation cannot describe a route.
        // They are held back until a later simulation pass provides geometry.
        const from=isPoint(road.from) ? road.from : null;
        const to=isPoint(road.to) ? road.to : null;
        if(!isPoint(from) || !isPoint(to)){ return; }
        ctx.beginPath();
        ctx.moveTo(from.x*SCALE,from.y*SCALE);
        ctx.lineTo(to.x*SCALE,to.y*SCALE);
        ctx.stroke();
    });
    ctx.restore();
}

function drawSettlements(settlements,palette){
    settlements.forEach(settlement=>{
        if(!isPoint(settlement)){ return; }
        const x=settlement.x*SCALE;
        const y=settlement.y*SCALE;
        const important=settlement.type==="city" || settlement.type==="town" || Number(settlement.population)>800;
        const radius=important ? 4.2 : 2.8;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,TAU);
        ctx.fillStyle=palette.settlement;
        ctx.fill();
        ctx.strokeStyle="rgba(255,255,255,.72)";
        ctx.lineWidth=1;
        ctx.stroke();
    });
}

function selectSettlements(settlements){
    const selected=[];
    const ordered=(settlements || []).slice()
        .filter(isPoint)
        .sort((a,b)=>Number(b.population || 0)-Number(a.population || 0));

    for(const settlement of ordered){
        if(selected.length>=24){ break; }
        const tooClose=selected.some(other=>Math.hypot(other.x-settlement.x,other.y-settlement.y)<5);
        if(!tooClose){ selected.push(settlement); }
    }
    return selected;
}

function drawLabels(labels,settlements,palette){
    const occupied=[];
    const settlementByPosition=new Map(settlements.map(s=>[key(s.x,s.y),s]));
    const candidates=labels
        .filter(label=>isPoint(label) && settlementByPosition.has(key(label.x,label.y)) && typeof label.text==="string" && label.text.trim())
        .sort((a,b)=>labelRank(b,settlementByPosition)-labelRank(a,settlementByPosition))
        .slice(0,24);
    ctx.save();
    ctx.fillStyle=palette.label;
    ctx.font="italic 13px Georgia, Garamond, serif";
    ctx.textBaseline="middle";
    candidates.forEach(label=>{
        const x=label.x*SCALE;
        const y=label.y*SCALE;
        const text=label.text.trim();
        const placement=findLabelPlacement(x,y,ctx.measureText(text).width,occupied);
        if(!placement){ return; }
        occupied.push(placement.bounds);
        ctx.fillText(text,placement.x,placement.y);
    });
    ctx.restore();
}

function labelRank(label,settlementByPosition){
    const settlement=settlementByPosition.get(key(label.x,label.y));
    return Number(settlement && settlement.population || 0)+(settlement && settlement.type==="city" ? 10000 : settlement && settlement.type==="town" ? 3000 : 0);
}

function findLabelPlacement(x,y,width,occupied){
    const height=14;
    const offsets=[[8,-7],[8,9],[-width-8,-7],[-width-8,9],[8,21],[-width-8,21],[8,-20],[-width-8,-20]];
    for(const offset of offsets){
        const bounds={x:x+offset[0],y:y+offset[1]-height/2,width,height};
        if(bounds.x<3 || bounds.y<3 || bounds.x+bounds.width>canvas.width-3 || bounds.y+bounds.height>canvas.height-3){ continue; }
        if(!occupied.some(other=>intersects(bounds,other))){ return {x:bounds.x,y:y+offset[1],bounds}; }
    }
    return null;
}

function intersects(a,b){
    const padding=3;
    return a.x<b.x+b.width+padding && a.x+a.width+padding>b.x && a.y<b.y+b.height+padding && a.y+a.height+padding>b.y;
}

function isPoint(value){ return value && Number.isFinite(Number(value.x)) && Number.isFinite(Number(value.y)); }
function key(x,y){ return `${x},${y}`; }
function hash(x,y){ const value=Math.sin(Number(x)*12.9898+Number(y)*78.233)*43758.5453; return value-Math.floor(value); }

return{initialize,render,setStyle};

})();
