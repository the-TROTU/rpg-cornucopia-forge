/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER RENDERER

 Version 3.0

 "The world exists.
 The ink reveals it."

=========================================================
*/


const ForgeRenderer = (()=>{


let canvas=null;
let ctx=null;


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


    ctx.fillStyle="#efe2bd";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


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
        world.geography
    );


}



/*
=========================================================
 GEOGRAPHY
=========================================================
*/


function drawGeography(geo){


    drawLakes(
        geo.lakes
    );


    drawRivers(
        geo.rivers
    );


    drawMountains(
        geo.mountains
    );


}



/*
=========================================================
 MOUNTAINS
=========================================================
*/


function drawMountains(mountains){


    ctx.strokeStyle="#332016";

    ctx.lineWidth=2;



    mountains.forEach(
        range=>{


            range.points.forEach(
                point=>{


                    ctx.beginPath();


                    ctx.moveTo(
                        point.x-25,
                        point.y+30
                    );


                    ctx.lineTo(
                        point.x,
                        point.y-35
                    );


                    ctx.lineTo(
                        point.x+25,
                        point.y+30
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


    ctx.strokeStyle="#557a8a";

    ctx.lineWidth=2;



    rivers.forEach(
        river=>{


            ctx.beginPath();


            ctx.moveTo(
                river.startX,
                river.startY
            );



            const midX =
                (
                    river.startX+
                    river.endX
                )/2;



            ctx.quadraticCurveTo(

                midX,

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


    ctx.strokeStyle="#557a8a";


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

    render


};


})();