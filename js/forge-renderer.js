/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER RENDERER

 Version 4.8.1

 "The world exists.
 The ink reveals it."

=========================================================
*/

const ForgeRenderer = (()=>{

let canvas=null;
let ctx=null;
let style="ink";
let lastRenderedLand=[];

const SCALE=6;
const TAU=Math.PI*2;

const PALETTES={

    ink:{
        paper:"#ffffff",
        ocean:"#f5f5f5",
        land:"#ffffff",
        coast:"#1c1c1c",
        river:"#4b4b4b",
        lake:"#e4e4e4",
        mountain:"#323232",
        forest:"#707070",
        road:"#666666",
        settlement:"#161616",
        label:"#111111"
    },

    color:{
        paper:"#ffffff",
        ocean:"#f5f5f5",
        land:"#ffffff",
        coast:"#1c1c1c",
        river:"#4b4b4b",
        lake:"#e4e4e4",
        mountain:"#323232",
        forest:"#707070",
        road:"#666666",
        settlement:"#161616",
        label:"#111111"
    }

};


/*
=========================================================
 INITIALIZE
=========================================================
*/

function initialize(canvasID="world-canvas"){

    canvas=document.getElementById(canvasID);

    if(!canvas){

        console.error(
            "ForgeRenderer: Canvas missing."
        );

        return false;

    }

    ctx=canvas.getContext("2d");

    return true;

}


/*
=========================================================
 STYLE
=========================================================
*/

function setStyle(selected){

    style=
        selected ||
        "ink";

}


/*
=========================================================
 MAIN RENDER
=========================================================
*/

function render(world){

    if(!ctx){

        console.error(
            "Renderer not initialized."
        );

        return;

    }

    if(
        !world ||
        !world.cartography ||
        !world.cartography.layers
    ){

        console.warn(
            "Cartography missing."
        );

        return;

    }


    const layers=
        world.cartography.layers;


    const palette=
        getPalette();


    const land=
        pruneSpeckIslands(
            layers.land || []
        );

    lastRenderedLand=
    land;    


    const settlements=
        selectSettlements(
            layers.settlements || []
        );


    ctx.save();


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawPaper(
        palette
    );


    drawOcean(
        palette
    );


    const view=
        fitLandToCanvas(
            land
        );


    ctx.translate(
        view.offsetX,
        view.offsetY
    );


    ctx.scale(
        view.zoom,
        view.zoom
    );


    /*
    LAND
    */

    drawLand(
        land,
        palette,
        layers.coastlinePaths || []
    );


    /*
    COAST
    */

    drawCoastline(
        layers.coastlinePaths || [],
        land,
        palette
    );


    /*
    GEOGRAPHY
    */

    drawLakes(
        layers.lakes || [],
        palette
    );


    drawRivers(
        layers.rivers || [],
        palette
    );


    drawForests(
        layers.forests || [],
        palette
    );


    /*
    TERRAIN
    */

    drawTerrain(
    Array.isArray(layers.mountainRanges)
        ? layers.mountainRanges
        : [],
    palette
    );


    /*
    CIVILIZATION
    */

    drawRoads(
        layers.roads || [],
        settlements,
        palette
    );


    drawSettlements(
        settlements,
        palette
    );


    drawLabels(
        layers.labels || [],
        settlements,
        palette
    );


    ctx.restore();

}


/*
=========================================================
 PALETTE
=========================================================
*/

function getPalette(){

    return(
        PALETTES[style]
        ||
        PALETTES.ink
    );

}


/*
=========================================================
 FIT MAP
=========================================================
*/

function fitLandToCanvas(cells){

    if(!cells.length){

        return{
            zoom:1,
            offsetX:0,
            offsetY:0
        };

    }


    const xs=
        cells.map(
            cell=>
                cell.x*SCALE
        );


    const ys=
        cells.map(
            cell=>
                cell.y*SCALE
        );


    const minX=
        Math.min(...xs);


    const maxX=
        Math.max(...xs)+SCALE;


    const minY=
        Math.min(...ys);


    const maxY=
        Math.max(...ys)+SCALE;


    const width=
        maxX-minX;


    const height=
        maxY-minY;


    const zoom=
        Math.max(
            1,
            Math.min(
                1.7,
                canvas.width*.9/width,
                canvas.height*.86/height
            )
        );


    return{

        zoom,

        offsetX:
            canvas.width/2
            -
            (minX+maxX)*zoom/2,

        offsetY:
            canvas.height/2
            -
            (minY+maxY)*zoom/2

    };

}


/*
=========================================================
 REMOVE GENERATOR SPECKS
=========================================================
*/

function pruneSpeckIslands(cells){

    const byPosition=
        new Map(
            cells.map(
                cell=>[
                    key(cell.x,cell.y),
                    cell
                ]
            )
        );


    const visited=
        new Set();


    const visible=[];


    cells.forEach(
        cell=>{

            const start=
                key(
                    cell.x,
                    cell.y
                );


            if(
                visited.has(start)
            ){

                return;

            }


            const component=[];
            const queue=[cell];


            visited.add(start);


            while(queue.length){

                const current=
                    queue.pop();


                component.push(
                    current
                );


                [
                    [1,0],
                    [-1,0],
                    [0,1],
                    [0,-1]
                ].forEach(
                    ([dx,dy])=>{

                        const neighbor=
                            byPosition.get(
                                key(
                                    current.x+dx,
                                    current.y+dy
                                )
                            );


                        if(
                            neighbor
                            &&
                            !visited.has(
                                key(
                                    neighbor.x,
                                    neighbor.y
                                )
                            )
                        ){

                            visited.add(
                                key(
                                    neighbor.x,
                                    neighbor.y
                                )
                            );


                            queue.push(
                                neighbor
                            );

                        }

                    }
                );

            }


            if(
                component.length>=10
            ){

                visible.push(
                    ...component
                );

            }

        }
    );


    return visible;

}


/*
=========================================================
 PAPER
=========================================================
*/

function drawPaper(palette){

    ctx.fillStyle=
        palette.paper;


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


/*
=========================================================
 OCEAN
=========================================================
*/

function drawOcean(palette){

    ctx.fillStyle=
        palette.ocean;


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


/*
=========================================================
 LAND
=========================================================
*/

function drawLand(
    cells,
    palette,
    paths
){

    if(!cells.length){

        return;

    }


    /*
    Cartography coastline loops are preferred
    because they describe actual land silhouettes.
    */

    if(
        paths &&
        paths.length
    ){

        ctx.save();


        ctx.fillStyle=
            palette.land;


        paths.forEach(
        path=>{

            const smoothPath =
                simplifyCoastPath(
                    path
                );


            const organic =
                createOrganicPath(
                    smoothPath
                );


            if(organic){

                ctx.fill(
                    organic
                );

            }

        }
    );


        ctx.restore();


        return;

    }


    /*
    Compatibility fallback.
    */

    ctx.fillStyle=
        palette.land;


    cells.forEach(
        cell=>{

            ctx.fillRect(
                cell.x*SCALE,
                cell.y*SCALE,
                SCALE+1,
                SCALE+1
            );

        }
    );

}


/*
=========================================================
 COASTLINE
=========================================================
*/

function drawCoastline(
    paths,
    cells,
    palette
){

    if(!cells.length){

        return;

    }


    if(paths.length){

        drawSmoothedCoastline(
            paths,
            palette
        );

        return;

    }


    /*
    Compatibility fallback for older
    Cartography data.
    */

    const occupied=
        new Set(
            cells.map(
                cell=>
                    key(
                        cell.x,
                        cell.y
                    )
            )
        );


    const coast=
        buildCoastPath(
            cells,
            occupied
        );


    ctx.save();


    ctx.strokeStyle=
        "rgba(255,255,255,.65)";


    ctx.lineWidth=
        3.4;


    ctx.lineJoin=
        "round";


    ctx.lineCap=
        "round";


    ctx.stroke(
        coast
    );


    ctx.strokeStyle=
        palette.coast;


    ctx.lineWidth=
        1.2;


    ctx.stroke(
        coast
    );


    ctx.restore();

}


/*
=========================================================
 ORGANIC COASTLINE
=========================================================
*/

function drawSmoothedCoastline(
    paths,
    palette
){

    ctx.save();


    ctx.lineJoin=
        "round";


    ctx.lineCap=
        "round";


    paths.forEach(
        path=>{

            if(
                !Array.isArray(path)
                ||
                path.length<3
            ){

                return;

            }


            const smoothPath =
                simplifyCoastPath(path);


            const organic =
                createOrganicPath(
                    smoothPath
                );


            if(!organic){

                return;

            }


            /*
            Soft outer edge.
            */

            ctx.strokeStyle=
                "rgba(255,255,255,.82)";


            ctx.lineWidth=
                3.8;


            ctx.stroke(
                organic
            );


            /*
            Actual coastline.
            */

            ctx.strokeStyle=
                palette.coast;


            ctx.lineWidth=
                1.25;


            ctx.stroke(
                organic
            );

        }
    );


    ctx.restore();

}

/*
=========================================================
 SIMPLIFY COASTLINE
=========================================================
*/
function simplifyCoastline(points){

    if(
        !Array.isArray(points) ||
        points.length < 6
    ){
        return points;
    }


    const simplified=[];


    const tolerance=1.5;


    for(
        let i=0;
        i<points.length;
        i++
    ){

        const prev =
            points[
                (i-1+points.length)
                %
                points.length
            ];

        const current =
            points[i];

        const next =
            points[
                (i+1)
                %
                points.length
            ];


        const angle =
            Math.abs(
                Math.atan2(
                    next.y-current.y,
                    next.x-current.x
                )
                -
                Math.atan2(
                    current.y-prev.y,
                    current.x-prev.x
                )
            );


        if(
            angle > tolerance ||
            i%3===0
        ){

            simplified.push(
                current
            );

        }

    }


    return simplified;

}
/*
=========================================================
 CREATE ORGANIC PATH
=========================================================
*/

function createOrganicPath(path){

    if(
        !Array.isArray(path)
        ||
        path.length<3
    ){

        return null;

    }


    path =
    simplifyCoastline(path);


    const count =
        path.length;


    /*
    Determine the scale of this landmass.
    */

    let minX=Infinity;
    let maxX=-Infinity;
    let minY=Infinity;
    let maxY=-Infinity;


    path.forEach(
        point=>{

            minX=
                Math.min(
                    minX,
                    point.x
                );


            maxX=
                Math.max(
                    maxX,
                    point.x
                );


            minY=
                Math.min(
                    minY,
                    point.y
                );


            maxY=
                Math.max(
                    maxY,
                    point.y
                );

        }
    );


    const width=
        maxX-minX;


    const height=
        maxY-minY;


    const size=
        Math.max(
            width,
            height
        );


    /*
    Larger islands need enough variation
    to stop the original grid structure
    from showing through.

    Small islands retain slightly stronger
    variation because their silhouettes
    have fewer points.
    */

    let amplitude;

    if(size<=5){

        amplitude=1.35;

    }
    else if(size<=9){

        amplitude=1.05;

    }
    else if(size<=15){

        amplitude=.82;

    }
    else if(size<=24){

        amplitude=.68;

    }
    else{

        amplitude=.58;

    }


    /*
    Generate displaced control points.

    This combines:

    1. normal displacement
    2. low-frequency broad movement
    3. deterministic local variation

    The broad movement is important because
    purely local noise tends to look like
    lace rather than geography.
    */

    const points=
        path.map(
            (point,index)=>{

                const previous=
                    path[
                        (index-1+count)%count
                    ];


                const next=
                    path[
                        (index+1)%count
                    ];


                const dx=
                    next.x-
                    previous.x;


                const dy=
                    next.y-
                    previous.y;


                /*
                Approximate outward normal.
                */

                let nx=
                    -dy;


                let ny=
                    dx;


                const normalLength=
                    Math.hypot(
                        nx,
                        ny
                    )
                    ||
                    1;


                nx/=
                    normalLength;


                ny/=
                    normalLength;


                /*
                Several deterministic noise bands.
                */

                const localNoise=
                    hash(
                        point.x*3.17+index,
                        point.y*7.91-index
                    )
                    -.5;


                const broadNoise=
                    hash(
                        point.x*.73+Math.sin(index*.41),
                        point.y*.91+Math.cos(index*.37)
                    )
                    -.5;


                const microNoise=
                    hash(
                        point.x*11.7-index*.83,
                        point.y*5.13+index*1.17
                    )
                    -.5;


                /*
                Large landmasses receive broader,
                gentler movement.

                Small landmasses receive slightly
                more local character.
                */

                const displacement=
                    (
                        broadNoise*.62
                        +
                        localNoise*.30
                        +
                        microNoise*.08
                    )
                    *
                    amplitude;


                /*
                Slight tangential movement prevents
                every deformation from appearing as
                a simple outward/inward bulge.
                */

                const tangentLength=
                    Math.hypot(
                        dx,
                        dy
                    )
                    ||
                    1;


                const tx=
                    dx/tangentLength;


                const ty=
                    dy/tangentLength;


                const tangentShift=
                    localNoise*
                    amplitude*
                    .18;


                return{

                    x:
                        point.x+
                        nx*displacement+
                        tx*tangentShift,

                    y:
                        point.y+
                        ny*displacement+
                        ty*tangentShift

                };

            }
        );


    /*
    Construct a smoothly interpolated closed
    coastline through the displaced points.
    */

    const coast=
        new Path2D();


    const midpoint=
        (a,b)=>[

            (
                a.x+
                b.x
            )*
            SCALE/2,

            (
                a.y+
                b.y
            )*
            SCALE/2

        ];


    const start=
        midpoint(
            points[count-1],
            points[0]
        );


    coast.moveTo(
        start[0],
        start[1]
    );


    for(
        let i=0;
        i<count;
        i++
    ){

        const point=
            points[i];


        const next=
            points[
                (i+1)%count
            ];


        const end=
            midpoint(
                point,
                next
            );


        coast.quadraticCurveTo(

            point.x*SCALE,
            point.y*SCALE,

            end[0],
            end[1]

        );

    }


    coast.closePath();


    return coast;

}


/*
=========================================================
 GRID FALLBACK COAST
=========================================================
*/

function buildCoastPath(
    cells,
    occupied
){

    const path=
        new Path2D();


    cells.forEach(
        cell=>{

            const x=
                cell.x*SCALE;


            const y=
                cell.y*SCALE;


            if(
                !occupied.has(
                    key(
                        cell.x,
                        cell.y-1
                    )
                )
            ){

                coastEdge(
                    path,
                    x,
                    y,
                    x+SCALE,
                    y
                );

            }


            if(
                !occupied.has(
                    key(
                        cell.x+1,
                        cell.y
                    )
                )
            ){

                coastEdge(
                    path,
                    x+SCALE,
                    y,
                    x+SCALE,
                    y+SCALE
                );

            }


            if(
                !occupied.has(
                    key(
                        cell.x,
                        cell.y+1
                    )
                )
            ){

                coastEdge(
                    path,
                    x+SCALE,
                    y+SCALE,
                    x,
                    y+SCALE
                );

            }


            if(
                !occupied.has(
                    key(
                        cell.x-1,
                        cell.y
                    )
                )
            ){

                coastEdge(
                    path,
                    x,
                    y+SCALE,
                    x,
                    y
                );

            }

        }
    );


    return path;

}


function coastEdge(
    path,
    x1,
    y1,
    x2,
    y2
){

    path.moveTo(
        x1,
        y1
    );


    path.lineTo(
        x2,
        y2
    );

}


/*
=========================================================
 RIVERS
=========================================================
*/

function drawRivers(
    rivers,
    palette
){

    if(!rivers.length){

        return;

    }


    ctx.save();


    ctx.strokeStyle=
        palette.river;


    ctx.lineWidth=
        1.8;


    ctx.lineCap=
        "round";


    ctx.lineJoin=
        "round";


    rivers.forEach(
        river=>{

            if(
                !Array.isArray(river)
                ||
                river.length<2
            ){

                return;

            }


            ctx.beginPath();


            ctx.moveTo(
                river[0].x*SCALE,
                river[0].y*SCALE
            );


            for(
                let i=1;
                i<river.length-1;
                i++
            ){

                const point=
                    river[i];


                const next=
                    river[i+1];


                ctx.quadraticCurveTo(

                    point.x*SCALE,
                    point.y*SCALE,

                    (
                        point.x+
                        next.x
                    )*
                    SCALE/2,

                    (
                        point.y+
                        next.y
                    )*
                    SCALE/2

                );

            }


            const last=
                river[
                    river.length-1
                ];


            ctx.lineTo(
                last.x*SCALE,
                last.y*SCALE
            );


            ctx.stroke();

        }
    );


    ctx.restore();

}


/*
=========================================================
 LAKES
=========================================================
*/

function drawLakes(
    lakes,
    palette
){

    if(
        !Array.isArray(lakes) ||
        !lakes.length
    ){

        return;

    }


    /*
    Build a land mask from the currently rendered
    world.

    Lakes are only allowed to survive if their
    coordinates are genuinely inland.
    */

    const landCells=
        getCurrentLandMask();


    if(
        !landCells.size
    ){

        return;

    }


    const candidates=[];


    lakes.forEach(
        lake=>{

            if(
                !isPoint(lake)
            ){

                return;

            }


            const x=
                Number(lake.x);


            const y=
                Number(lake.y);


            /*
            -------------------------------------------------
            MUST BE ON LAND
            -------------------------------------------------
            */

            if(
                !landCells.has(
                    key(
                        Math.round(x),
                        Math.round(y)
                    )
                )
            ){

                return;

            }


            /*
            -------------------------------------------------
            COAST DISTANCE
            -------------------------------------------------

            A lake must be substantially inland.

            Small lakes require less distance.
            Large lakes require more.
            */

            const size=
                Math.max(
                    2,
                    Number(
                        lake.size || 3
                    )
                );


            const coastDistance=
                distanceToCoast(
                    Math.round(x),
                    Math.round(y),
                    landCells
                );


            const requiredDistance=
                7+
                size*.55;


            if(
                coastDistance<
                requiredDistance
            ){

                return;

            }


            /*
            -------------------------------------------------
            DETERMINISTIC SPARSITY
            -------------------------------------------------
            */

            const chance=
                hash(
                    x*1.73,
                    y*2.91
                );


            /*
            Larger lakes are rarer.
            */

            const keepProbability=
                size>=9
                ?
                .18
                :
                size>=6
                ?
                .27
                :
                .38;


            if(
                chance>
                keepProbability
            ){

                return;

            }


            candidates.push({

                lake,
                x,
                y,
                size,
                coastDistance

            });

        }
    );


    /*
    -----------------------------------------------------
    SORT BY SIZE
    -----------------------------------------------------

    Larger lakes claim territory first.
    */

    candidates.sort(
        (a,b)=>
            b.size-a.size
    );


    const selected=[];


    candidates.forEach(
        candidate=>{

            /*
            Prevent lakes from clustering.
            */

            const tooClose=
                selected.some(
                    other=>
                        Math.hypot(
                            other.x-candidate.x,
                            other.y-candidate.y
                        )
                        <
                        10+
                        candidate.size
                );


            if(
                tooClose
            ){

                return;

            }


            selected.push(
                candidate
            );

        }
    );


    /*
    -----------------------------------------------------
    DRAW
    -----------------------------------------------------
    */

    selected.forEach(
        candidate=>{

            drawSingleLake(
                candidate.lake,
                palette
            );

        }
    );

}


/*
=========================================================
 CURRENT LAND MASK
=========================================================
*/

function getCurrentLandMask(){

    /*
    Renderer state doesn't currently retain the
    world land array.

    We create it lazily from the last render.
    */

    if(
        !lastRenderedLand ||
        !lastRenderedLand.length
    ){

        return new Set();

    }


    return new Set(
        lastRenderedLand.map(
            cell=>
                key(
                    Math.round(cell.x),
                    Math.round(cell.y)
                )
        )
    );

}


/*
=========================================================
 COAST DISTANCE
=========================================================
*/

function distanceToCoast(
    startX,
    startY,
    landCells
){

    const startKey=
        key(
            startX,
            startY
        );


    if(
        !landCells.has(startKey)
    ){

        return 0;

    }


    const queue=[{

        x:startX,
        y:startY,
        distance:0

    }];


    const visited=
        new Set([
            startKey
        ]);


    while(
        queue.length
    ){

        const current=
            queue.shift();


        /*
        A land cell touching ocean is coastal.
        */

        const neighbours=[

            [1,0],
            [-1,0],
            [0,1],
            [0,-1]

        ];


        for(
            const [dx,dy]
            of neighbours
        ){

            const nx=
                current.x+dx;


            const ny=
                current.y+dy;


            if(
                !landCells.has(
                    key(nx,ny)
                )
            ){

                return current.distance;

            }

        }


        /*
        Continue inland.
        */

        for(
            const [dx,dy]
            of neighbours
        ){

            const nx=
                current.x+dx;


            const ny=
                current.y+dy;


            const nextKey=
                key(nx,ny);


            if(
                landCells.has(nextKey)
                &&
                !visited.has(nextKey)
            ){

                visited.add(nextKey);


                queue.push({

                    x:nx,
                    y:ny,

                    distance:
                        current.distance+1

                });

            }

        }

    }


    return 999;

}


/*
=========================================================
 SINGLE LAKE
=========================================================
*/

function drawSingleLake(
    lake,
    palette
){

    const baseSize=
        Math.max(
            2.2,
            Number(
                lake.size || 3
            )
        );


    const seed=
        hash(
            lake.x,
            lake.y
        );


    /*
    Lakes are deliberately more compact now.

    The previous renderer allowed them to become
    surprisingly large relative to the map.
    */

    const radiusX=
        Math.max(
            3.5,
            baseSize*1.45
        );


    const radiusY=
        Math.max(
            2.5,
            radiusX*
            (
                .48+
                hash(
                    seed*17.3,
                    seed*9.7
                )*.55
            )
        );


    const rotation=
        hash(
            lake.x+41.7,
            lake.y-19.3
        )
        *
        Math.PI;


    const pointCount=
        baseSize>=8
        ?
        16
        :
        13;


    const points=[];


    const cosR=
        Math.cos(rotation);


    const sinR=
        Math.sin(rotation);


    for(
        let i=0;
        i<pointCount;
        i++
    ){

        const angle=
            i/
            pointCount*
            TAU;


        /*
        Smooth low-frequency variation.
        */

        const broad=
            .88+
            hash(
                seed*31.7+i*.61,
                seed*13.4-i*.29
            )*
            .20;


        const medium=
            .92+
            hash(
                lake.x*4.3+i*2.1,
                lake.y*6.7-i*1.4
            )*
            .15;


        const radial=
            broad*medium;


        const rawX=
            Math.cos(angle)*
            radiusX*
            radial;


        const rawY=
            Math.sin(angle)*
            radiusY*
            radial;


        points.push({

            x:
                lake.x*SCALE+
                rawX*cosR-
                rawY*sinR,

            y:
                lake.y*SCALE+
                rawX*sinR+
                rawY*cosR

        });

    }


    const lakePath=
        new Path2D();


    const midpoint=
        (a,b)=>[

            (a.x+b.x)/2,
            (a.y+b.y)/2

        ];


    const start=
        midpoint(
            points[
                points.length-1
            ],
            points[0]
        );


    lakePath.moveTo(
        start[0],
        start[1]
    );


    for(
        let i=0;
        i<points.length;
        i++
    ){

        const point=
            points[i];


        const next=
            points[
                (i+1)%
                points.length
            ];


        const end=
            midpoint(
                point,
                next
            );


        lakePath.quadraticCurveTo(

            point.x,
            point.y,

            end[0],
            end[1]

        );

    }


    lakePath.closePath();


    ctx.fillStyle=
        palette.lake;


    ctx.fill(
        lakePath
    );


    ctx.strokeStyle=
        palette.river;


    ctx.lineWidth=
        .9;


    ctx.stroke(
        lakePath
    );

}


/*
=========================================================
 FORESTS
=========================================================
*/

function drawForests(
    forests,
    palette
){

    const features=
        thinFeatures(
            forests,
            3,
            .22
        );


    if(!features.length){

        return;

    }


    ctx.save();


    ctx.fillStyle=
        palette.forest;


    features.forEach(
        forest=>{

            const x=
                forest.x*SCALE;


            const y=
                forest.y*SCALE;


            tree(
                x,
                y,
                2.8
            );


            if(
                hash(
                    forest.x+11,
                    forest.y+23
                )>.54
            ){

                tree(
                    x+3,
                    y+2,
                    2.1
                );

            }

        }
    );


    ctx.restore();

}


function tree(
    x,
    y,
    size
){

    ctx.beginPath();


    ctx.moveTo(
        x,
        y-size*1.4
    );


    ctx.lineTo(
        x-size,
        y+size
    );


    ctx.lineTo(
        x+size,
        y+size
    );


    ctx.closePath();


    ctx.fill();

}


/*
=========================================================
 TERRAIN
=========================================================
*/

function drawTerrain(
    mountainRanges,
    palette
){

    if(
        !Array.isArray(mountainRanges) ||
        !mountainRanges.length
    ){

        return;

    }


    /*
    -----------------------------------------------------
    NORMALIZE RANGE DATA
    -----------------------------------------------------

    Only accept actual range arrays.

    Raw mountain cells are deliberately rejected.
    We do NOT want the renderer falling back to
    drawing every high-elevation cell.
    */

    const ranges=
        mountainRanges
        .filter(
            range=>
                Array.isArray(range)
                &&
                range.length>=3
                &&
                range.every(
                    isPoint
                )
        );


    if(
        !ranges.length
    ){

        console.warn(
            "ForgeRenderer: No valid mountain ranges."
        );

        return;

    }


    ctx.save();


    ctx.strokeStyle=
        palette.mountain;


    ctx.lineCap=
        "round";


    ctx.lineJoin=
        "round";


    /*
    -----------------------------------------------------
    RANGE LIMIT
    -----------------------------------------------------

    A fantasy map does not need eight enormous
    mountain systems competing for attention.

    Keep the strongest few.
    */

    const selected =
        ranges
        .slice()
        .sort(
            (a,b)=>
                rangeImportance(b) -
                rangeImportance(a)
        )
        .slice(0,5)
        .map(
            range =>
                simplifyMountainRange(range)
        );

    function simplifyMountainRange(range){

        if(range.length<=8){

            return range;

        }


        const simplified=[];


        const step =
            Math.max(
                2,
                Math.floor(
                    range.length / 8
                )
            );


        for(
            let i=0;
            i<range.length;
            i+=step
        ){

            simplified.push(
                range[i]
            );

        }


        return simplified;

    }


    selected.forEach(
        (range,index)=>{

            drawMountainRange(
                range,
                index,
                palette
            );

        }
    );


    ctx.restore();

}


/*
=========================================================
 RANGE IMPORTANCE
=========================================================
*/

function rangeImportance(
    range
){

    if(
        !Array.isArray(range)
    ){

        return 0;

    }


    return range.reduce(
        (
            total,
            peak
        )=>
            total+
            Number(
                peak.height || .5
            ),
        0
    )
    +
    range.length*0.75;

}


/*
=========================================================
 MOUNTAIN RANGE
=========================================================
*/

function drawMountainRange(
    peaks,
    rangeIndex,
    palette
){

    if(
        !Array.isArray(peaks) ||
        peaks.length<3
    ){

        return;

    }


    /*
    -----------------------------------------------------
    RANGE BACKBONE
    -----------------------------------------------------
    */

    ctx.save();


    ctx.strokeStyle=
        palette.mountain;


    ctx.lineWidth=
        1.15;


    ctx.beginPath();


    ctx.moveTo(
        peaks[0].x*SCALE,
        peaks[0].y*SCALE+2
    );


    for(
        let i=1;
        i<peaks.length;
        i++
    ){

        const previous=
            peaks[i-1];


        const current=
            peaks[i];


        const midX=
            (
                previous.x+
                current.x
            )*
            SCALE/2;


        const midY=
            (
                previous.y+
                current.y
            )*
            SCALE/2;


        /*
        A slight perpendicular bow prevents
        ranges from looking like ruler-straight
        chains.
        */

        const dx=
            current.x-
            previous.x;


        const dy=
            current.y-
            previous.y;


        const length=
            Math.hypot(dx,dy)
            ||
            1;


        const nx=
            -dy/length;


        const ny=
            dx/length;


        const variation=
            (
                hash(
                    current.x+
                    rangeIndex*19,
                    current.y-
                    rangeIndex*11
                )-.5
            )
            *
            5;


        ctx.quadraticCurveTo(

            midX+
            nx*variation,

            midY+
            ny*variation,

            current.x*SCALE,

            current.y*SCALE+2

        );

    }


    ctx.stroke();


    /*
    -----------------------------------------------------
    PEAKS
    -----------------------------------------------------
    */

    peaks.forEach(
        (peak,index)=>{

            drawMountainPeak(
                peak,
                index,
                rangeIndex
            );

        }
    );


    /*
    -----------------------------------------------------
    SECONDARY RIDGE
    -----------------------------------------------------

    This is important.

    A real mountain range isn't just a row of
    identical peaks. Secondary ridges make the
    terrain read as connected geography.
    */

    if(
        peaks.length>=4
    ){

        ctx.lineWidth=
            .85;


        for(
            let i=0;
            i<peaks.length-1;
            i+=2
        ){

            const a=
                peaks[i];


            const b=
                peaks[
                    Math.min(
                        peaks.length-1,
                        i+2
                    )
                ];


            const dx=
                b.x-a.x;


            const dy=
                b.y-a.y;


            const length=
                Math.hypot(dx,dy)
                ||
                1;


            const nx=
                -dy/length;


            const ny=
                dx/length;


            const offset=
                2.4+
                hash(
                    a.x+rangeIndex,
                    b.y-i
                )*2.5;


            const x1=
                (
                    a.x+
                    nx*offset
                )*SCALE;


            const y1=
                (
                    a.y+
                    ny*offset
                )*SCALE+2;


            const x2=
                (
                    b.x+
                    nx*offset
                )*SCALE;


            const y2=
                (
                    b.y+
                    ny*offset
                )*SCALE+2;


            ctx.beginPath();


            ctx.moveTo(
                x1,
                y1
            );


            ctx.quadraticCurveTo(

                (
                    x1+x2
                )/2,

                (
                    y1+y2
                )/2-3,

                x2,
                y2

            );


            ctx.stroke();

        }

    }


    ctx.restore();

}


/*
=========================================================
 MOUNTAIN PEAK
=========================================================
*/

function drawMountainPeak(
    mountain,
    index,
    rangeIndex
){

    const x=
        mountain.x*SCALE;


    const y=
        mountain.y*SCALE;


    const height=
        Number(
            mountain.height || .8
        );


    /*
    Peak sizes vary significantly.

    This is intentionally NOT a triangle
    with a fixed width.
    */

    const h=
        4.5+
        Math.min(
            1.5,
            Math.max(
                0,
                height
            )
        )*
        5.2;


    const width=
        4.5+
        hash(
            mountain.x+
            rangeIndex*17,
            mountain.y+
            index*23
        )*
        5.5;


    /*
    Peak asymmetry.

    One side is often steeper than the other.
    */

    const leftSlope=
        .72+
        hash(
            mountain.x+31,
            mountain.y+index
        )*
        .42;


    const rightSlope=
        .72+
        hash(
            mountain.x-17,
            mountain.y-index
        )*
        .48;


    const leftBase=
        width*leftSlope;


    const rightBase=
        width*rightSlope;


    const peakX=
        x+
        (
            hash(
                mountain.x+index*5,
                mountain.y+rangeIndex*7
            )-.5
        )*
        2.4;


    const peakY=
        y-h;


    ctx.beginPath();


    /*
    Left slope.
    */

    ctx.moveTo(
        x-leftBase,
        y+2.5
    );


    ctx.quadraticCurveTo(

        x-width*.42,
        y-h*.38,

        peakX,
        peakY

    );


    /*
    Right slope.
    */

    ctx.quadraticCurveTo(

        x+width*.38,
        y-h*.40,

        x+rightBase,
        y+2.5

    );


    ctx.stroke();


/*
---------------------------------------------------------
 INTERIOR RIDGES
---------------------------------------------------------
*/

ctx.lineWidth=
    .75;


const ridgeBias=
    hash(
        mountain.x+index*13,
        mountain.y-rangeIndex*17
    );


ctx.beginPath();


/*
Primary ridge.
*/

ctx.moveTo(
    x-leftBase*.68,
    y+1.5
);


ctx.quadraticCurveTo(

    x-width*.18,
    y-h*.30,

    peakX-width*.05,
    peakY+h*.08

);


/*
Secondary ridge on only some peaks.
*/

if(
    ridgeBias>.38
){

    ctx.moveTo(
        peakX+width*.04,
        peakY+h*.10
    );


    ctx.quadraticCurveTo(

        x+width*.25,
        y-h*.18,

        x+rightBase*.62,
        y+1.5

    );

}


ctx.stroke();

ctx.restore();

}

/*
=========================================================
 RENDERER COMPONENT GROUPING
=========================================================
*/

function connectedComponentsForRenderer(
    cells,
    connectionDistance
){

    const remaining=
        cells.slice();


    const components=[];


    while(
        remaining.length
    ){

        const seed=
            remaining.pop();


        const component=[
            seed
        ];


        const queue=[
            seed
        ];


        while(
            queue.length
        ){

            const current=
                queue.pop();


            for(
                let i=remaining.length-1;
                i>=0;
                i--
            ){

                const candidate=
                    remaining[i];


                if(
                    Math.hypot(
                        current.x-candidate.x,
                        current.y-candidate.y
                    )
                    <=
                    connectionDistance
                ){

                    remaining.splice(
                        i,
                        1
                    );


                    component.push(
                        candidate
                    );


                    queue.push(
                        candidate
                    );

                }

            }

        }


        if(
            component.length>=3
        ){

            components.push(
                component
            );

        }

    }


    return components;

}

/*
=========================================================
 FEATURE THINNING
=========================================================
*/

function thinFeatures(
    features,
    spacing,
    keepChance
){

    const occupied=
        new Set();


    return features.filter(
        feature=>{

            if(
                !isPoint(feature)
                ||
                hash(
                    feature.x,
                    feature.y
                )>
                keepChance
            ){

                return false;

            }


            const cell=
                key(
                    Math.floor(
                        feature.x/spacing
                    ),
                    Math.floor(
                        feature.y/spacing
                    )
                );


            if(
                occupied.has(cell)
            ){

                return false;

            }


            occupied.add(cell);


            return true;

        }
    );

}


/*
=========================================================
 ROADS
=========================================================
*/

function drawRoads(
    roads,
    settlements,
    palette
){

    if(
        !roads.length
        ||
        settlements.length<2
    ){

        return;

    }


    ctx.save();


    ctx.strokeStyle =
    "rgba(70,70,70,.65)";


    ctx.lineWidth =
        .75;


    ctx.setLineDash(
        [2.5,4]
    );


    ctx.lineCap=
        "round";


    roads.forEach(
        road=>{

            const from=
                isPoint(road.from)
                ?
                road.from
                :
                null;


            const to=
                isPoint(road.to)
                ?
                road.to
                :
                null;


            if(
                !from ||
                !to
            ){

                return;

            }


            ctx.beginPath();


const startX =
    from.x*SCALE;

const startY =
    from.y*SCALE;


const endX =
    to.x*SCALE;

const endY =
    to.y*SCALE;



/*
-------------------------------------------------
ROAD PERSONALITY
-------------------------------------------------

Every road gets a deterministic bend.

The same world seed always produces
the same roads.
-------------------------------------------------
*/

const midX =
    (startX + endX) / 2;

const midY =
    (startY + endY) / 2;


const dx =
    endX-startX;

const dy =
    endY-startY;


const length =
    Math.hypot(
        dx,
        dy
    )
    ||
    1;


/*
Perpendicular offset.
*/

const nx =
    -dy/length;

const ny =
    dx/length;


/*
Controlled wandering.

Long roads bend more.
Short roads remain practical.
*/

const bend =
    Math.min(
        35,
        length*.18
    )
    *
    (
        hash(
            from.x+to.x,
            from.y+to.y
        )
        -
        .5
    );


const controlX =
    midX+
    nx*bend;


const controlY =
    midY+
    ny*bend;


ctx.moveTo(
    startX,
    startY
);


ctx.quadraticCurveTo(

    controlX,
    controlY,

    endX,
    endY

);


ctx.stroke();

        }
    );


    ctx.restore();

}



/*
=========================================================
 SETTLEMENTS
=========================================================
*/

function drawSettlements(
    settlements,
    palette
){

    settlements.forEach(
        settlement=>{

            if(
                !isPoint(settlement)
            ){

                return;

            }


            const x=
                settlement.x*SCALE;


            const y=
                settlement.y*SCALE;


            const important=
                settlement.type==="city"
                ||
                settlement.type==="town"
                ||
                Number(
                    settlement.population
                )>800;


            const radius=
                important
                ?
                4.2
                :
                2.8;


            ctx.beginPath();


            ctx.arc(
                x,
                y,
                radius,
                0,
                TAU
            );


            ctx.fillStyle=
                palette.settlement;


            ctx.fill();


            ctx.strokeStyle=
                "rgba(255,255,255,.72)";


            ctx.lineWidth=
                1;


            ctx.stroke();

        }
    );

}


/*
=========================================================
 SETTLEMENT SELECTION
=========================================================
*/

function selectSettlements(
    settlements
){

    const selected=[];


    const ordered=
        (
            settlements || []
        )
        .slice()
        .filter(isPoint)
        .sort(
            (a,b)=>
                Number(
                    b.population || 0
                )
                -
                Number(
                    a.population || 0
                )
        );


    for(
        const settlement
        of ordered
    ){

        if(
            selected.length>=24
        ){

            break;

        }


        const tooClose=
            selected.some(
                other=>
                    Math.hypot(
                        other.x-
                        settlement.x,

                        other.y-
                        settlement.y
                    )<5
            );


        if(!tooClose){

            selected.push(
                settlement
            );

        }

    }


    return selected;

}


/*
=========================================================
 LABELS
=========================================================
*/

function drawLabels(
    labels,
    settlements,
    palette
){

    const occupied=[];


    const settlementByPosition=
        new Map(
            settlements.map(
                settlement=>[
                    key(
                        settlement.x,
                        settlement.y
                    ),
                    settlement
                ]
            )
        );


    const candidates=
        labels
        .filter(
            label=>
                isPoint(label)
                &&
                settlementByPosition.has(
                    key(
                        label.x,
                        label.y
                    )
                )
                &&
                typeof label.text==="string"
                &&
                label.text.trim()
        )
        .sort(
            (a,b)=>
                labelRank(
                    b,
                    settlementByPosition
                )
                -
                labelRank(
                    a,
                    settlementByPosition
                )
        )
        .slice(
            0,
            24
        );


    ctx.save();


    ctx.fillStyle=
        palette.label;


    ctx.font=
        "italic 13px Georgia, Garamond, serif";


    ctx.textBaseline=
        "middle";


    candidates.forEach(
        label=>{

            const x=
                label.x*SCALE;


            const y=
                label.y*SCALE;


            const text=
                label.text.trim();


            const placement=
                findLabelPlacement(
                    x,
                    y,
                    ctx.measureText(text).width,
                    occupied
                );


            if(!placement){

                return;

            }


            occupied.push(
                placement.bounds
            );


            ctx.fillText(
                text,
                placement.x,
                placement.y
            );

        }
    );


    ctx.restore();

}


function labelRank(
    label,
    settlementByPosition
){

    const settlement=
        settlementByPosition.get(
            key(
                label.x,
                label.y
            )
        );


    return Number(
        settlement &&
        settlement.population
        ||
        0
    )
    +
    (
        settlement &&
        settlement.type==="city"
        ?
        10000
        :
        settlement &&
        settlement.type==="town"
        ?
        3000
        :
        0
    );

}


function findLabelPlacement(
    x,
    y,
    width,
    occupied
){

    const height=14;


    const offsets=[

        [8,-7],
        [8,9],

        [-width-8,-7],
        [-width-8,9],

        [8,21],
        [-width-8,21],

        [8,-20],
        [-width-8,-20]

    ];


    for(
        const offset
        of offsets
    ){

        const bounds={

            x:
                x+offset[0],

            y:
                y+offset[1]-height/2,

            width,

            height

        };


        if(
            bounds.x<3
            ||
            bounds.y<3
            ||
            bounds.x+bounds.width>
                canvas.width-3
            ||
            bounds.y+bounds.height>
                canvas.height-3
        ){

            continue;

        }


        if(
            !occupied.some(
                other=>
                    intersects(
                        bounds,
                        other
                    )
            )
        ){

            return{

                x:
                    bounds.x,

                y:
                    y+offset[1],

                bounds

            };

        }

    }


    return null;

}


function intersects(
    a,
    b
){

    const padding=3;


    return(

        a.x<
            b.x+b.width+padding

        &&

        a.x+a.width+padding>
            b.x

        &&

        a.y<
            b.y+b.height+padding

        &&

        a.y+a.height+padding>
            b.y

    );

}


/*
=========================================================
 UTILITIES
=========================================================
*/
function simplifyCoastPath(path){

    if(
        !Array.isArray(path)
        ||
        path.length < 40
    ){

        return path;

    }


    const result=[];


    for(
        let i=0;
        i<path.length;
        i+=1.06
    ){

        result.push(
            path[Math.floor(i)]
        );

    }


    return result;

}

function isPoint(value){

    return(

        value
        &&
        Number.isFinite(
            Number(value.x)
        )
        &&
        Number.isFinite(
            Number(value.y)
        )

    );

}


function key(
    x,
    y
){

    return `${x},${y}`;

}


function hash(
    x,
    y
){

    const value=
        Math.sin(
            Number(x)*12.9898+
            Number(y)*78.233
        )
        *
        43758.5453;


    return(
        value-
        Math.floor(value)
    );

}


/*
=========================================================
 PUBLIC API
=========================================================
*/

return{

    initialize,
    render,
    setStyle

};

})();