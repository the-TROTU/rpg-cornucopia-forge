/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER RENDERER

 Version 4.0.0

 "The world exists.
 The ink reveals it."

=========================================================
*/


const ForgeRenderer = (()=>{


let canvas=null;
let ctx=null;



let style="ink";



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
 STYLE
=========================================================
*/


function setStyle(
    selected
){

    style =
        selected ||
        "ink";

}





/*
=========================================================
 RENDER
=========================================================
*/


function render(world){


    if(!ctx){

        console.error(
            "Renderer not initialized."
        );

        return;

    }



    drawPaper();



    if(
        !world ||
        !world.land
    ){

        console.warn(
            "No world data."
        );

        return;

    }



    drawOcean(
        world
    );


    drawLand(
        world
    );


    drawCoastline(
        world
    );


    if(
        world.geography
    ){

        drawRivers(
            world.geography.rivers || []
        );


        drawLakes(
            world.geography.lakes || []
        );

    }


    if(
        world.terrain
    ){

        drawTerrain(
            world.terrain
        );

    }



}





/*
=========================================================
 PAPER
=========================================================
*/


function drawPaper(){

    ctx.fillStyle =
        "#ead9b5";


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


function drawOcean(world){


    ctx.fillStyle =
        style==="color"
        ?
        "#8db7c7"
        :
        "#d7c6a0";



    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


}





/*
=========================================================
 LAND CELLS
=========================================================
*/


function drawLand(world){


    const cells =
        world.land.cells;



    cells.forEach(

        cell=>{


            if(
                !cell.land
            ){

                return;

            }



            const elevation =
                world.elevation.cells.find(

                    e=>

                    e.x===cell.x
                    &&
                    e.y===cell.y

                );



            let shade =
                220;



            if(elevation){

                shade -=
                    elevation.height
                    *
                    70;

            }



            ctx.fillStyle =
                style==="color"

                ?

                `rgb(
                    ${shade},
                    ${shade},
                    ${shade-20}
                )`

                :

                "#d8c79b";



            ctx.fillRect(

                cell.x*6,

                cell.y*6,

                6,

                6

            );


        }

    );


}





/*
=========================================================
 COASTLINE
=========================================================
*/


function drawCoastline(world){


    ctx.strokeStyle =
        "#2d2118";


    ctx.lineWidth=2;



    world.land.coastline
    .forEach(

        point=>{


            ctx.beginPath();


            ctx.arc(

                point.x*6,

                point.y*6,

                2,

                0,

                Math.PI*2

            );


            ctx.stroke();


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
        style==="color"
        ?
        "#3d7fa3"
        :
        "#3a3025";


    ctx.lineWidth=2;



    rivers.forEach(

        river=>{


            if(
                !Array.isArray(
                    river
                )
            ){

                return;

            }



            ctx.beginPath();



            river.forEach(

                point=>{


                    ctx.lineTo(

                        point.x*6,

                        point.y*6

                    );


                }

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
        "#332016";



    lakes.forEach(

        lake=>{


            ctx.beginPath();


            ctx.arc(

                lake.x*6,

                lake.y*6,

                lake.size*2,

                0,

                Math.PI*2

            );


            ctx.stroke();


        }

    );


}





/*
=========================================================
 TERRAIN MARKERS
=========================================================
*/


function drawTerrain(
    terrain
){


    ctx.fillStyle =
        "#332016";


    terrain.mountains
    .forEach(

        mountain=>{


            ctx.beginPath();


            ctx.moveTo(

                mountain.x*6,

                mountain.y*6-10

            );


            ctx.lineTo(

                mountain.x*6-8,

                mountain.y*6+8

            );


            ctx.lineTo(

                mountain.x*6+8,

                mountain.y*6+8

            );


            ctx.closePath();


            ctx.fill();


        }

    );


}





return{


    initialize,

    render,

    setStyle


};


})();