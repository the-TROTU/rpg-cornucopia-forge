/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER RENDERER

 Version 4.1.0

 "The world exists.
 The ink reveals it."

=========================================================
*/


const ForgeRenderer = (()=>{


let canvas=null;
let ctx=null;

let style="ink";

const SCALE=6;



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

    style =
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



    drawOcean();


    drawLandMass(
        world.land
    );


    drawCoastline(
        world.land
    );



    if(world.terrain){

        drawTerrain(
            world.terrain
        );

    }



    if(world.geography){

        drawRivers(
            world.geography.rivers || []
        );


        drawLakes(
            world.geography.lakes || []
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
        style==="color"
        ?
        "#8fb3c5"
        :
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


function drawOcean(){


    ctx.fillStyle =
        style==="color"
        ?
        "#86afc1"
        :
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
 LAND MASS
=========================================================
*/


function drawLandMass(land){


    if(
        !land.cells
    ){

        return;

    }


    ctx.fillStyle =
        style==="color"
        ?
        "#cbb98d"
        :
        "#d8c79b";



    land.cells.forEach(

        cell=>{


            if(
                !cell.land
            ){

                return;

            }


            ctx.fillRect(

                cell.x*SCALE,

                cell.y*SCALE,

                SCALE,

                SCALE

            );


        }

    );


}





/*
=========================================================
 COASTLINE
=========================================================
*/


function drawCoastline(land){


    if(
        !land.cells
    ){

        return;

    }


    ctx.strokeStyle =
        "#24170f";


    ctx.lineWidth=2;



    land.cells.forEach(

        cell=>{


            if(
                !cell.land
            ){

                return;

            }


            const neighbors=[

                [1,0],
                [-1,0],
                [0,1],
                [0,-1]

            ];



            neighbors.forEach(

                n=>{


                    const x =
                        cell.x+n[0];


                    const y =
                        cell.y+n[1];



                    const outside =
                        !land.cells.some(

                            other=>

                            other.x===x &&
                            other.y===y &&
                            other.land

                        );



                    if(outside){


                        ctx.beginPath();


                        ctx.moveTo(

                            cell.x*SCALE,
                            cell.y*SCALE

                        );


                        ctx.lineTo(

                            (cell.x+n[0])*SCALE,
                            (cell.y+n[1])*SCALE

                        );


                        ctx.stroke();


                    }


                }

            );


        }

    );


}





/*
=========================================================
 TERRAIN
=========================================================
*/


function drawTerrain(terrain){


    ctx.fillStyle =
        "#24170f";



    if(
        terrain.mountains
    ){

        terrain.mountains.forEach(

            m=>{


                ctx.beginPath();


                ctx.moveTo(

                    m.x*SCALE,

                    m.y*SCALE-12

                );


                ctx.lineTo(

                    m.x*SCALE-8,

                    m.y*SCALE+8

                );


                ctx.lineTo(

                    m.x*SCALE+8,

                    m.y*SCALE+8

                );


                ctx.closePath();


                ctx.fill();


            }

        );

    }


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
        "#497c99"
        :
        "#24170f";


    ctx.lineWidth=2;



    rivers.forEach(

        river=>{


            if(
                !Array.isArray(river)
            ){

                return;

            }


            ctx.beginPath();


            river.forEach(

                p=>{


                    ctx.lineTo(

                        p.x*SCALE,

                        p.y*SCALE

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
        "#24170f";


    lakes.forEach(

        lake=>{


            ctx.beginPath();


            ctx.arc(

                lake.x*SCALE,

                lake.y*SCALE,

                lake.size,

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