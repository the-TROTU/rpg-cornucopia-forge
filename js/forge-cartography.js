/*
=========================================================
 RPG CORNUCOPIA — THE FORGE
 CARTOGRAPHY ENGINE
 Version 2.1.0
=========================================================
*/

const ForgeCartography = (()=>{

function generate(world){
    const cartography={
        layers:{
            ocean:[], land:[], coastline:[], coastlinePaths:[],
            rivers:[], lakes:[], mountains:[], mountainRanges:[], forests:[],
            roads:[], settlements:[], labels:[]
        }
    };

    buildLand(world,cartography);
    buildWater(world,cartography);
    buildTerrain(world,cartography);
    buildCivilization(world,cartography);
    buildLabels(world,cartography);
    return cartography;
}

function buildLand(world,cartography){
    const land=world.land && world.land.cells || [];
    const cells=land.filter(cell=>cell.land);
    cartography.layers.land=cells;
    cartography.layers.coastline=cells.filter(cell=>cell.coast);
    cartography.layers.coastlinePaths=traceLandContours(cells);
}

function buildWater(world,cartography){
    cartography.layers.rivers=world.geography?.rivers || [];
    cartography.layers.lakes=world.geography?.lakes || [];
}

function buildTerrain(world,cartography){
    const terrain=world.terrain || {};
    cartography.layers.mountains=terrain.mountains || [];
    cartography.layers.mountainRanges=groupMountainRanges(terrain.mountains || []);
    cartography.layers.forests=terrain.forests || [];
}

function buildCivilization(world,cartography){
    if(!world.simulation){ return; }
    cartography.layers.settlements=world.simulation.settlements || [];
    cartography.layers.roads=world.simulation.roads || [];
}

function buildLabels(world,cartography){
    const settlements=world.simulation?.settlements || [];
    settlements.forEach(settlement=>{
        if(typeof settlement.name!=="string"){ return; }
        cartography.layers.labels.push({text:settlement.name,x:settlement.x,y:settlement.y,type:"settlement"});
    });
}

/*
 A contour is a closed sequence of cell-corner points. The renderer rounds the
 corners into a continuous ink line; generation retains its original cell data.
*/
function traceLandContours(cells){
    const land=new Set(cells.map(cell=>key(cell.x,cell.y)));
    const edges=[];
    cells.forEach(cell=>{
        const x=cell.x;
        const y=cell.y;
        if(!land.has(key(x,y-1))){ edges.push(edge(x,y,x+1,y)); }
        if(!land.has(key(x+1,y))){ edges.push(edge(x+1,y,x+1,y+1)); }
        if(!land.has(key(x,y+1))){ edges.push(edge(x+1,y+1,x,y+1)); }
        if(!land.has(key(x-1,y))){ edges.push(edge(x,y+1,x,y)); }
    });

    const byStart=new Map();
    edges.forEach(item=>{
        const start=key(item.from.x,item.from.y);
        if(!byStart.has(start)){ byStart.set(start,[]); }
        byStart.get(start).push(item);
    });

    const paths=[];
    edges.forEach(first=>{
        if(first.used){ return; }
        const points=[];
        let current=first;
        while(current && !current.used){
            current.used=true;
            points.push(current.from);
            const candidates=(byStart.get(key(current.to.x,current.to.y)) || []).filter(candidate=>!candidate.used);
            current=chooseContinuation(current,candidates);
        }
        if(points.length>=8){ paths.push(points); }
    });
    return paths;
}

function edge(x1,y1,x2,y2){ return {from:{x:x1,y:y1},to:{x:x2,y:y2},used:false}; }

function chooseContinuation(previous,candidates){
    if(!candidates.length){ return null; }
    const dx=previous.to.x-previous.from.x;
    const dy=previous.to.y-previous.from.y;
    // Prefer the least abrupt turn when two islands meet only at a corner.
    return candidates.sort((a,b)=>turnCost(dx,dy,a)-turnCost(dx,dy,b))[0];
}

function turnCost(dx,dy,edge){
    const nx=edge.to.x-edge.from.x;
    const ny=edge.to.y-edge.from.y;
    return 1-(dx*nx+dy*ny);
}

function groupMountainRanges(mountains){
    const remaining=new Set(mountains.map((_,index)=>index));
    const ranges=[];
    while(remaining.size){
        const [first]=remaining;
        const range=[];
        const queue=[first];
        remaining.delete(first);
        while(queue.length){
            const index=queue.pop();
            const peak=mountains[index];
            range.push(peak);
            [...remaining].forEach(candidateIndex=>{
                const candidate=mountains[candidateIndex];
                if(Math.hypot(peak.x-candidate.x,peak.y-candidate.y)<=3){
                    remaining.delete(candidateIndex);
                    queue.push(candidateIndex);
                }
            });
        }
        if(range.length>=3){ ranges.push(range); }
    }
    return ranges;
}

function key(x,y){ return `${x},${y}`; }

return{generate};

})();
