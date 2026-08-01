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


function initialize(
    canvasID="world-canvas"
){


    canvas =
        document.getElementById(
            canvasID
        );


    if(!canvas){

        console.error(
            "ForgeRenderer: Canvas missing."
        );

        return false;

    }



    ctx =
        canvas.getContext(
            "2d"
        );


    return true;


}



/*
=========================================================
 MAIN RENDER
=========================================================
*/


function render(world){


    if(!ctx){

        console.error(
            "Renderer not ready."
        );

        return;

    }



    clear();


    drawPaper();



    if(!world){

        console.warn(
            "No world supplied."
        );

        return;

    }



    drawLand(
        world.land
    );


    drawTerrain(
        world.terrain
    );


    drawRoads(
        world.roads
    );


    drawFeatures(
        world.features
    );


}





/*
=========================================================
 PAPER
=========================================================
*/


function clear(){


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


}



function drawPaper(){


    ctx.fillStyle =
        "#efe2bd";


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


function drawLand(land){


    if(!land){

        return;

    }



    ctx.strokeStyle =
        "#33200f";


    ctx.lineWidth =
        2;



    land.continents.forEach(
        continent=>{


            ctx.beginPath();


            continent.points.forEach(
                (point,index)=>{


                    if(index===0){

                        ctx.moveTo(
                            point.x,
                            point.y
                        );

                    }
                    else{

                        ctx.lineTo(
                            point.x,
                            point.y
                        );

                    }


                }
            );


            ctx.closePath();


            ctx.stroke();


        }
    );



    land.islands.forEach(
        island=>{


            ctx.beginPath();


            ctx.arc(

                island.x,

                island.y,

                island.size,

                0,

                Math.PI*2

            );


            ctx.stroke();


        }
    );


}





/*
=========================================================
 TERRAIN
=========================================================
*/


function drawTerrain(terrain){


    if(!terrain){

        return;

    }



    terrain.mountains.forEach(
        mountain=>{


            ForgeSymbols.draw(

                ctx,

                "mountain",

                mountain.x,

                mountain.y

            );


        }
    );



    terrain.forests.forEach(
        forest=>{


            ForgeSymbols.draw(

                ctx,

                "forest",

                forest.x,

                forest.y

            );


        }
    );



    terrain.hills.forEach(
        hill=>{


            ForgeSymbols.draw(

                ctx,

                "mountain",

                hill.x,

                hill.y

            );


        }
    );



    drawRivers(
        terrain.rivers
    );


}





/*
=========================================================
 RIVERS
=========================================================
*/


function drawRivers(rivers){


    if(!rivers){

        return;

    }



    ctx.strokeStyle =
        "#526b78";


    ctx.lineWidth =
        1.5;



    rivers.forEach(
        river=>{


            ctx.beginPath();


            ctx.moveTo(

                river.startX,

                river.startY

            );


            ctx.bezierCurveTo(

                river.startX+50,

                river.startY+100,

                river.endX-50,

                river.endY-100,

                river.endX,

                river.endY

            );


            ctx.stroke();


        }
    );


}





/*
=========================================================
 ROADS
=========================================================
*/


function drawRoads(roads){


    if(!roads){

        return;

    }



    ctx.strokeStyle =
        "#8b6a3e";


    roads.forEach(
        road=>{


            ctx.beginPath();


            ctx.moveTo(

                road.from.x,

                road.from.y

            );


            ctx.lineTo(

                road.to.x,

                road.to.y

            );


            ctx.stroke();


        }
    );


}





/*
=========================================================
 FEATURES
=========================================================
*/


function drawFeatures(features){


    if(!features){

        return;

    }



    features.forEach(
        feature=>{


            ForgeSymbols.draw(

                ctx,

                feature.type,

                feature.x,

                feature.y

            );


        }
    );


}





return{


    initialize,

    render


};


})();