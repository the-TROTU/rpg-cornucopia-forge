/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER RENDERER

 Version 3.2

"From parchment,
the continents awaken."

=========================================================
*/


const ForgeRenderer = (()=>{


let canvas=null;
let ctx=null;
let renderStyle="ink";

function setStyle(style){

    renderStyle = style || "ink";

}

function randomHeight(){

    return 25 + Math.random()*25;

}

/*
=========================================================
 INITIALIZE
=========================================================
*/


function initialize(canvasID="world-canvas"){


    canvas=document.getElementById(
        canvasID
    );


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
 PAPER
=========================================================
*/


function drawPaper(){


    ctx.fillStyle =
    renderStyle==="color"
    ?
    "#9fb8c5"
    :
    "#efe2bd";


    ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
);


/*
===============================
PAPER GRAIN
===============================
*/


ctx.globalAlpha=.08;


for(
    let i=0;
    i<300;
    i++
){

    ctx.fillStyle =
        "#7b6345";


    ctx.beginPath();


    ctx.arc(

        Math.random()*canvas.width,

        Math.random()*canvas.height,

        1,

        0,

        Math.PI*2

    );


    ctx.fill();

}


ctx.globalAlpha=1;


}



/*
=========================================================
 MAIN RENDER
=========================================================
*/


function render(world){


    if(!ctx){

        console.error(
            "Renderer not initialized"
        );

        return;

    }



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawPaper();



    if(
        !world ||
        !world.geography
    ){

        console.warn(
            "No geography found"
        );

        return;

    }



    drawGeography(
        world
    )

}



/*
=========================================================
 GEOGRAPHY
=========================================================
*/


function drawGeography(world){


    if(!world){

        return;

    }



    /*
    ===============================
    COASTLINE
    ===============================
    */


   if(
    world.land &&
    Array.isArray(world.land.coastline)
    ){

        world.land.coastline.forEach(
            coast=>{

                drawCoastline(coast);

            }
        );

    }



    /*
    ===============================
    ISLANDS
    ===============================
    */
    if(
        world.land &&
        world.land.islands
    ){

        world.land.islands.forEach(
            island=>{

                if(
                    island.coastline
                ){

                    if(
                        island.coastline
                    ){

                        drawCoastline(
                            island.coastline
                        );

                    }

                }

            }
        );

    }

    /*
    ===============================
    TERRAIN GEOGRAPHY
    ===============================
    */


    if(
        world.geography
    ){

        drawElevation(
            world.geography.elevation || []
        );


        drawMountains(
            world.geography.mountains || []
        );


        drawRivers(
            world.geography.rivers || []
        );


        drawLakes(
            world.geography.lakes || []
        );


        drawBiomes(
            world.geography.biomes || []
        );

    }


}

/*
=========================================================
 ELEVATION
=========================================================
*/

function drawElevation(points){


    ctx.strokeStyle =
    renderStyle==="color"
    ?
    "#c9b98c"
    :
    "#b8a47a";

    ctx.lineWidth=1;



    points.forEach(

        point=>{


            ctx.beginPath();


            ctx.arc(

                point.x,

                point.y,

                3 + (point.height * 8),

                0,

                Math.PI*2

            );


            ctx.stroke();


        }

    );


}

/*
=========================================================
 BIOMES
=========================================================
*/

function drawBiomes(biomes){

    return;

}

/*
=========================================================
 COASTLINE
=========================================================
*/


function drawCoastline(points){


    if(
        !points ||
        points.length===0
    ){

        return;

    }



    ctx.beginPath();



    ctx.moveTo(
        points[0].x,
        points[0].y
    );



    for(
        let i=0;
        i<points.length;
        i++
    ){


        const current =
            points[i];


        const next =
            points[
                (i+1)
                %
                points.length
            ];



        const midX =
            (
                current.x+
                next.x
            )
            /2;



        const midY =
            (
                current.y+
                next.y
            )
            /2;



        ctx.quadraticCurveTo(

            current.x,

            current.y,

            midX,

            midY

        );


    }



    ctx.closePath();



    /*
    ===============================
    COLOR LAND FILL
    ===============================
    */


    if(
        renderStyle==="color"
    ){

        ctx.fillStyle =
            "#d8c79b";

        ctx.fill();

    }



    /*
    ===============================
    INK BORDER
    ===============================
    */


    ctx.strokeStyle =
        "#20150f";


    ctx.lineWidth =
        3;



    ctx.stroke();


}

/*
=========================================================
 MOUNTAINS
=========================================================
*/


function drawMountains(mountains){


    ctx.strokeStyle="#332016";

    ctx.lineWidth=1.5;



    mountains.forEach(
        range=>{


            range.points.forEach(
                point=>{


                    ctx.beginPath();


                    ctx.moveTo(
                        point.x-25,
                        point.y-randomHeight()
                    );

                    ctx.lineTo(
                        point.x,
                        point.y-randomHeight()
                    );

                    const next =
                    points[(i+1)%points.length];


                    ctx.quadraticCurveTo(
                        points[i].x,
                        points[i].y,
                        (points[i].x + next.x)/2,
                        (points[i].y + next.y)/2
                    );


                    ctx.stroke();


                }
            );


        }
    );


}



/*
=========================================================
 RIVERS
=========================================================
*/


function drawRivers(rivers){


    ctx.strokeStyle =
        renderStyle==="color"
        ?
        "#557a8a"
        :
        "#332016";


    ctx.lineWidth=1.5;



    rivers.forEach(
        river=>{


            ctx.beginPath();


            ctx.moveTo(
                river.startX,
                river.startY
            );


            ctx.quadraticCurveTo(

                (
                    river.startX+
                    river.endX
                )/2,

                (
                    river.startY+
                    river.endY
                )/2,

                river.endX,

                river.endY

            );


            ctx.stroke();


        }
    );

}



/*
=========================================================
 LAKES
=========================================================
*/


function drawLakes(lakes){


    ctx.strokeStyle =
        renderStyle==="color"
        ?
        "#557a8a"
        :
        "#332016";


    lakes.forEach(
        lake=>{


            ctx.beginPath();


            ctx.ellipse(

                lake.x,

                lake.y,

                lake.size,

                lake.size*.6,

                0,

                0,

                Math.PI*2

            );


            ctx.stroke();


        }
    );


}

return{

    initialize,

    render,

    setStyle

};


})();