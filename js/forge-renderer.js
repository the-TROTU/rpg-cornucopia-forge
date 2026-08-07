/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER RENDERER

 Version 4.3.0

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
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPaper(palette);
    drawOcean(palette);
    drawLand(land,palette);
    drawCoastline(land,palette);
    drawLakes(layers.lakes || [],palette);
    drawRivers(layers.rivers || [],palette);
    drawForests(layers.forests || [],palette);
    drawTerrain(layers.mountains || [],palette);
    drawRoads(layers.roads || [],layers.settlements || [],palette);
    drawSettlements(layers.settlements || [],palette);
    drawLabels(layers.labels || [],layers.settlements || [],palette);
    ctx.restore();
}

function getPalette(){ return PALETTES[style] || PALETTES.ink; }

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

        if(component.length>=4){ visible.push(...component); }
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

function drawCoastline(cells,palette){
    if(!cells.length){ return; }
    const occupied=new Set(cells.map(cell=>key(cell.x,cell.y)));
    const loops=buildCoastLoops(cells,occupied);
    ctx.save();
    ctx.strokeStyle="rgba(255,255,255,.32)";
    ctx.lineWidth=3.4;
    ctx.lineJoin="round";
    ctx.lineCap="round";
    loops.forEach(loop=>strokeSmoothLoop(loop));
    ctx.strokeStyle=palette.coast;
    ctx.lineWidth=1.15;
    loops.forEach(loop=>strokeSmoothLoop(loop));
    ctx.restore();
}

function buildCoastLoops(cells,occupied){
    const edges=[];
    cells.forEach(cell=>{
        const x=cell.x*SCALE;
        const y=cell.y*SCALE;
        if(!occupied.has(key(cell.x,cell.y-1))){ edges.push([[x,y],[x+SCALE,y]]); }
        if(!occupied.has(key(cell.x+1,cell.y))){ edges.push([[x+SCALE,y],[x+SCALE,y+SCALE]]); }
        if(!occupied.has(key(cell.x,cell.y+1))){ edges.push([[x+SCALE,y+SCALE],[x,y+SCALE]]); }
        if(!occupied.has(key(cell.x-1,cell.y))){ edges.push([[x,y+SCALE],[x,y]]); }
    });

    const nextByStart=new Map(edges.map(edge=>[key(edge[0][0],edge[0][1]),edge]));
    const visited=new Set();
    const loops=[];
    edges.forEach(edge=>{
        if(visited.has(edge)){ return; }
        const loop=[];
        let current=edge;
        while(current && !visited.has(current)){
            visited.add(current);
            loop.push(current[0]);
            current=nextByStart.get(key(current[1][0],current[1][1]));
        }
        if(loop.length>2){ loops.push(loop); }
    });
    return loops;
}

function strokeSmoothLoop(points){
    const path=new Path2D();
    const count=points.length;
    const midpoint=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
    const first=midpoint(points[count-1],points[0]);
    path.moveTo(first[0],first[1]);
    for(let i=0;i<count;i++){
        const vertex=points[i];
        const after=points[(i+1)%count];
        const end=midpoint(vertex,after);
        path.quadraticCurveTo(vertex[0],vertex[1],end[0],end[1]);
    }
    ctx.stroke(path);
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
    const features=thinFeatures(mountains,4,.3);
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

function drawLabels(labels,settlements,palette){
    const occupied=[];
    const settlementByPosition=new Map(settlements.map(s=>[key(s.x,s.y),s]));
    const candidates=labels
        .filter(label=>isPoint(label) && typeof label.text==="string" && label.text.trim())
        .sort((a,b)=>labelRank(b,settlementByPosition)-labelRank(a,settlementByPosition))
        .slice(0,32);
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
