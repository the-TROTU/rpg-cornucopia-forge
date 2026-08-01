/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER RENDERER

 Version 2.0

 "The world exists.
 The ink reveals it."

=========================================================
*/


const ForgeRenderer = (()=>{


let canvas = null;
let ctx = null;



/*
=========================================================
 INITIALIZE
=========================================================
*/


function initialize(canvasID="world-canvas"){


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
 CLEAR PARCHMENT
=========================================================
*/


function clear(){


    if(!ctx){

        return;

    }


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


}





/*
=========================================================
 DRAW PAPER
=========================================================
*/


function drawPaper(){


    if(!ctx){

        return;

    }


    ctx.fillStyle =
        "#efe2bd";


    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    // subtle parchment noise

    for(
        let i=0;
        i<500;
        i++
    ){

        ctx.fillStyle =
            "rgba(80,50,20,.04)";


        ctx.beginPath();


        ctx.arc(

            Math.random()*canvas.width,

            Math.random()*canvas.height,

            Math.random()*3,

            0,

            Math.PI*2

        );


        ctx.fill();

    }


}




/*
=========================================================
 DRAW WORLD
=========================================================
*/


function render(world){


    if(!ctx){

        console.error(
            "Renderer not initialized."
        );

        return;

    }



    clear();


    drawPaper();



    const style =
        ForgeStyleEngine.getStyle();



    if(!world){

        drawExampleWorld(
            style
        );

        return;

    }



    drawWorldFeatures(

        world,

        style

    );


}





/*
=========================================================
 WORLD FEATURES
=========================================================
*/


function drawWorldFeatures(
    world,
    style
){


    if(!world.features){

        return;

    }



    world.features.forEach(

        feature=>{


            ForgeSymbols.draw(

                ctx,

                feature.type,

                feature.x,

                feature.y,

                style

            );


        }

    );


}





/*
=========================================================
 DEMONSTRATION WORLD

 Temporary until forge-map-data
 connects.

=========================================================
*/


function drawExampleWorld(style){


    const examples=[


        {
            type:"mountain",
            x:220,
            y:180
        },


        {
            type:"forest",
            x:420,
            y:240
        },


        {
            type:"swamp",
            x:600,
            y:420
        },


        {
            type:"ruin",
            x:300,
            y:450
        },


        {
            type:"castle",
            x:700,
            y:200
        },


        {
            type:"temple",
            x:520,
            y:120
        },


        {
            type:"village",
            x:150,
            y:520
        }


    ];



    examples.forEach(

        feature=>{


            ForgeSymbols.draw(

                ctx,

                feature.type,

                feature.x,

                feature.y,

                style

            );


        }

    );



}





return{


    initialize,

    render,

    clear


};


})();