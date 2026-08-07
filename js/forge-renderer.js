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

    if(
        !world ||
        !world.cartography
    ){

        console.warn(
            "Cartography missing."
        );

        return;

    }

    const layers =
        world.cartography.layers;

    drawPaper();

    drawOcean();

    drawLand(
        layers.land
    );

    drawCoastline(
        layers.coastline
    );

    drawElevation(world);

    drawRivers(
        layers.rivers
    );

    drawLakes(
        layers.lakes
    );

    drawTerrain(
        layers.mountains
    );

    drawRoads(
        layers.roads
    );

    drawSettlements(
        layers.settlements
    );

    drawLabels(
        layers.labels
    );

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
        "#d8c7a2";

    if(style==="color"){

        ctx.fillStyle="#9ec4d2";

    }

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


function drawLand(cells){

    if(!cells){

        return;

    }

    ctx.fillStyle =
        style==="color"
        ?
        "#cdbb8f"
        :
        "#d8c79b";

    ctx.strokeStyle="#2d241b";

    ctx.lineWidth=.20;

    cells.forEach(cell=>{

        ctx.fillRect(

            cell.x*SCALE,

            cell.y*SCALE,

            SCALE,

            SCALE

        );

        ctx.strokeRect(

            cell.x*SCALE,

            cell.y*SCALE,

            SCALE,

            SCALE

        );

    });

}





/*
=========================================================
 COASTLINE
=========================================================
*/


function drawCoastline(cells){

    if(!cells){

        return;

    }

    ctx.fillStyle="#23180f";

    cells.forEach(cell=>{

        ctx.fillRect(

            cell.x*SCALE,

            cell.y*SCALE,

            SCALE,

            SCALE

        );

    });

}





/*
=========================================================
 TERRAIN
=========================================================
*/


function drawTerrain(mountains){

    if(!mountains){

        return;

    }

    ctx.fillStyle="#2b2018";

    mountains.forEach(m=>{

        ctx.beginPath();

        ctx.moveTo(

            m.x*SCALE,

            m.y*SCALE-8

        );

        ctx.lineTo(

            m.x*SCALE-6,

            m.y*SCALE+6

        );

        ctx.lineTo(

            m.x*SCALE+6,

            m.y*SCALE+6

        );

        ctx.closePath();

        ctx.fill();

    });

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

            ctx.moveTo(
                river[0].x * SCALE,
                river[0].y * SCALE
            );

            for(let i = 1; i < river.length; i++){

                ctx.lineTo(
                    river[i].x * SCALE,
                    river[i].y * SCALE
                );

            }

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

function drawElevation(world){

    // placeholder

}

function drawSettlements(settlements){

    if(!settlements){

        return;

    }

    ctx.fillStyle="#782c1d";

    settlements.forEach(s=>{

        ctx.beginPath();

        ctx.arc(

            s.x*SCALE,

            s.y*SCALE,

            4,

            0,

            Math.PI*2

        );

        ctx.fill();

    });

}

function drawLabels(labels){

    if(!labels){

        return;

    }

    ctx.fillStyle="#201710";

    ctx.font="12px Garamond";

    labels.forEach(label=>{

        ctx.fillText(

            label.text,

            label.x*SCALE+8,

            label.y*SCALE-6

        );

    });

}

function drawRoads(roads){

    if(!roads){

        return;

    }

    ctx.strokeStyle="#8b6b3d";

    ctx.lineWidth=2;

    roads.forEach(road=>{

        if(!road.from || !road.to){

            return;

        }

        ctx.beginPath();

        ctx.moveTo(

            road.from.x*SCALE,

            road.from.y*SCALE

        );

        ctx.lineTo(

            road.to.x*SCALE,

            road.to.y*SCALE

        );

        ctx.stroke();

    });

}

return{

    initialize,
    render,
    setStyle

};

})();