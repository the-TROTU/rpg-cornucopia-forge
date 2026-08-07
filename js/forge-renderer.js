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
    ink:{paper:"#ead9b5",ocean:"#9db9bf",land:"#d8c79b",coast:"#493b2d",river:"#4d7888",lake:"#82adba",mountain:"#49382d",forest:"#667348",road:"#8c7651",settlement:"#743b2a",label:"#2f261e"},
    color:{paper:"#b8d2d5",ocean:"#78b3cf",land:"#cdbb8f",coast:"#405844",river:"#367fa8",lake:"#61a7c4",mountain:"#5d5144",forest:"#456a43",road:"#9a7447",settlement:"#8b3c2c",label:"#29221e"}
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
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPaper(palette);
    drawOcean(palette);
    drawLand(layers.land || [],palette);
    drawCoastline(layers.coastline || layers.land || [],palette);
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

function drawPaper(palette){
    ctx.fillStyle=palette.paper;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    const wash=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    wash.addColorStop(0,"rgba(255,255,255,.14)");
    wash.addColorStop(.55,"rgba(120,88,45,.025)");
    wash.addColorStop(1,"rgba(78,52,30,.11)");
    ctx.fillStyle=wash;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawOcean(palette){
    ctx.save();
    // Let the paper wash subtly influence the water rather than covering it.
    ctx.globalAlpha=.9;
    ctx.fillStyle=palette.ocean;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha=1;
    ctx.strokeStyle="rgba(255,255,255,.16)";
    ctx.lineWidth=1;
    for(let y=18;y<canvas.height;y+=28){
        ctx.beginPath();
        for(let x=(y/28%2)*12;x<canvas.width;x+=54){
            ctx.moveTo(x,y);
            ctx.quadraticCurveTo(x+13,y-3,x+26,y);
        }
        ctx.stroke();
    }
    ctx.restore();
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
    const coast=new Path2D();
    cells.forEach(cell=>{
        const x=cell.x*SCALE;
        const y=cell.y*SCALE;
        if(!occupied.has(key(cell.x,cell.y-1))){ edge(coast,x,y,x+SCALE,y); }
        if(!occupied.has(key(cell.x+1,cell.y))){ edge(coast,x+SCALE,y,x+SCALE,y+SCALE); }
        if(!occupied.has(key(cell.x,cell.y+1))){ edge(coast,x+SCALE,y+SCALE,x,y+SCALE); }
        if(!occupied.has(key(cell.x-1,cell.y))){ edge(coast,x,y+SCALE,x,y); }
    });
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

function edge(path,x1,y1,x2,y2){ path.moveTo(x1,y1); path.lineTo(x2,y2); }

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
    const features=thinFeatures(forests,2,.48);
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
    const features=thinFeatures(mountains,2,.58);
    if(!features.length){ return; }
    ctx.save();
    features.forEach(mountain=>{
        const x=mountain.x*SCALE;
        const y=mountain.y*SCALE;
        const height=Number(mountain.height || .75);
        const size=3.4+Math.max(0,Math.min(1,height))*3;
        ctx.beginPath();
        ctx.moveTo(x,y-size*1.45);
        ctx.lineTo(x-size,y+size*.9);
        ctx.lineTo(x+size,y+size*.9);
        ctx.closePath();
        ctx.fillStyle=palette.mountain;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x,y-size*1.45);
        ctx.lineTo(x,y+size*.9);
        ctx.lineTo(x+size,y+size*.9);
        ctx.closePath();
        ctx.fillStyle="rgba(255,255,255,.22)";
        ctx.fill();
    });
    ctx.restore();
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
    const byName=new Map(settlements.map(settlement=>[settlement.name,settlement]));
    ctx.save();
    ctx.strokeStyle=palette.road;
    ctx.lineWidth=1.3;
    ctx.setLineDash([4,3]);
    ctx.lineCap="round";
    roads.forEach(road=>{
        const from=isPoint(road.from) ? road.from : byName.get(road.from);
        const to=isPoint(road.to) ? road.to : byName.get(road.to);
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
        .sort((a,b)=>labelRank(b,settlementByPosition)-labelRank(a,settlementByPosition));
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
