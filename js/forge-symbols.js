/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHIC SYMBOL LIBRARY

 Version 2.0

 "Every mark on parchment
 tells a story."

=========================================================
*/


const ForgeSymbols = (()=>{


/*
=========================================================
 SYMBOL DRAW DISPATCHER
=========================================================
*/


function draw(
    ctx,
    type,
    x,
    y,
    style="oldSurveyor"
){


    switch(type){


        case "mountain":

            mountain(
                ctx,
                x,
                y,
                style
            );

        break;



        case "forest":

            forest(
                ctx,
                x,
                y,
                style
            );

        break;



        case "swamp":

            swamp(
                ctx,
                x,
                y,
                style
            );

        break;



        case "ruin":

            ruin(
                ctx,
                x,
                y,
                style
            );

        break;



        case "castle":

            castle(
                ctx,
                x,
                y,
                style
            );

        break;



        case "temple":

            temple(
                ctx,
                x,
                y,
                style
            );

        break;



        case "village":

            village(
                ctx,
                x,
                y,
                style
            );

        break;


        default:

            settlement(
                ctx,
                x,
                y,
                style
            );

    }


}





/*
=========================================================
 MOUNTAIN RANGE
=========================================================
*/


function mountain(
    ctx,
    x,
    y,
    style
){


    ctx.save();


    ForgeHand.applyPressure(
        ctx,
        style
    );



    ctx.strokeStyle =
        "#24180f";



    const size = 35;



    for(
        let i=0;
        i<3;
        i++
    ){


        const offset =
            i * 28;



        ForgeHand.line(

            ctx,

            x-40+offset,

            y+30,

            x+offset,

            y-40,

            style

        );


        ForgeHand.line(

            ctx,

            x+offset,

            y-40,

            x+40+offset,

            y+30,

            style

        );


        // snow cap

        ForgeHand.line(

            ctx,

            x-8+offset,

            y-22,

            x+offset,

            y-40,

            style

        );

    }



    ctx.restore();

}





/*
=========================================================
 FOREST
=========================================================
*/


function forest(
    ctx,
    x,
    y,
    style
){


    ctx.save();


    ctx.strokeStyle =
        "#24180f";



    for(
        let i=0;
        i<5;
        i++
    ){


        const tx =
            x +
            (
                Math.random()*50-25
            );


        const ty =
            y +
            (
                Math.random()*50-25
            );



        ForgeHand.circle(

            ctx,

            tx,

            ty,

            12,

            style

        );


        ForgeHand.line(

            ctx,

            tx,

            ty+10,

            tx,

            ty+25,

            style

        );


    }


    ctx.restore();


}





/*
=========================================================
 SWAMP
=========================================================
*/


function swamp(
    ctx,
    x,
    y,
    style
){


    ctx.save();


    ctx.strokeStyle =
        "#24180f";



    for(
        let i=0;
        i<4;
        i++
    ){


        ForgeHand.circle(

            ctx,

            x+(i*15),

            y,

            10,

            style

        );


        ForgeHand.line(

            ctx,

            x+(i*15),

            y+10,

            x+(i*15)+5,

            y+25,

            style

        );


    }



    ctx.restore();


}





/*
=========================================================
 RUIN
=========================================================
*/


function ruin(
    ctx,
    x,
    y,
    style
){


    ctx.save();


    ctx.strokeStyle =
        "#24180f";



    ForgeHand.line(

        ctx,

        x-30,

        y+20,

        x-20,

        y-20,

        style

    );


    ForgeHand.line(

        ctx,

        x-20,

        y-20,

        x,

        y+5,

        style

    );



    ForgeHand.line(

        ctx,

        x,

        y+5,

        x+30,

        y-30,

        style

    );



    ForgeHand.line(

        ctx,

        x+30,

        y-30,

        x+25,

        y+25,

        style

    );


    ctx.restore();


}





/*
=========================================================
 CASTLE
=========================================================
*/


function castle(
    ctx,
    x,
    y,
    style
){


    ctx.save();



    ctx.strokeStyle =
        "#24180f";



    ctx.strokeRect(

        x-25,

        y-20,

        50,

        40

    );



    ForgeHand.line(

        ctx,

        x-25,

        y-20,

        x-35,

        y-45,

        style

    );


    ForgeHand.line(

        ctx,

        x+25,

        y-20,

        x+35,

        y-45,

        style

    );



    ctx.restore();


}





/*
=========================================================
 TEMPLE
=========================================================
*/


function temple(
    ctx,
    x,
    y,
    style
){


    ctx.save();



    ctx.strokeStyle =
        "#24180f";



    ForgeHand.line(

        ctx,

        x-30,

        y+20,

        x,

        y-30,

        style

    );


    ForgeHand.line(

        ctx,

        x,

        y-30,

        x+30,

        y+20,

        style

    );



    ctx.strokeRect(

        x-20,

        y+20,

        40,

        20

    );


    ctx.restore();


}





/*
=========================================================
 VILLAGE
=========================================================
*/


function village(
    ctx,
    x,
    y,
    style
){


    for(
        let i=0;
        i<4;
        i++
    ){

        ForgeHand.circle(

            ctx,

            x+(i*12),

            y,

            5,

            style

        );

    }


}





function settlement(
    ctx,
    x,
    y,
    style
){


    ForgeHand.circle(

        ctx,

        x,

        y,

        8,

        style

    );

}




return{


    draw


};


})();