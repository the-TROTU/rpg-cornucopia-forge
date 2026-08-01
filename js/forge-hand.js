/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER'S HAND ENGINE

 Version 1.0

 "A machine draws lines.
 A hand leaves evidence."

=========================================================
*/


const ForgeHand = (()=>{


/*
=========================================================
 STYLE PROFILES
=========================================================
*/


const styles = {


    ancient:{

        wobble:2,

        pressure:0.35,

        fading:0.25,

        doubleStroke:true

    },


    royal:{

        wobble:0.5,

        pressure:0.15,

        fading:0.05,

        doubleStroke:false

    },


    wilderness:{

        wobble:4,

        pressure:0.55,

        fading:0.35,

        doubleStroke:true

    },


    forbidden:{

        wobble:6,

        pressure:0.8,

        fading:0.5,

        doubleStroke:true

    }


};




/*
=========================================================
 GET STYLE
=========================================================
*/


function getStyle(name){


    return styles[name]

    ||

    styles.ancient;


}




/*
=========================================================
 HUMAN LINE

 Draws a line that is
 almost straight.

 Almost.

=========================================================
*/


function line(
    ctx,
    x1,
    y1,
    x2,
    y2,
    styleName="ancient"
){


    const style =
        getStyle(styleName);



    ctx.save();



    ctx.beginPath();



    ctx.moveTo(

        jitter(
            x1,
            style.wobble
        ),

        jitter(
            y1,
            style.wobble
        )

    );



    const midX =
        (
            x1+x2
        )/2;



    const midY =
        (
            y1+y2
        )/2;



    ctx.quadraticCurveTo(

        jitter(
            midX,
            style.wobble
        ),

        jitter(
            midY,
            style.wobble
        ),

        jitter(
            x2,
            style.wobble
        ),

        jitter(
            y2,
            style.wobble
        )

    );



    ctx.stroke();



    if(
        style.doubleStroke
    ){

        ctx.globalAlpha=.25;


        ctx.beginPath();


        ctx.moveTo(

            x1+1,

            y1+1

        );


        ctx.lineTo(

            x2+1,

            y2+1

        );


        ctx.stroke();

    }



    ctx.restore();


}





/*
=========================================================
 CIRCLE

 For forests, lakes,
 compass roses, etc.

=========================================================
*/


function circle(
    ctx,
    x,
    y,
    radius,
    styleName="ancient"
){


    const style =
        getStyle(styleName);



    ctx.save();



    ctx.beginPath();



    ctx.arc(

        x,

        y,

        radius,

        0,

        Math.PI*2

    );



    ctx.stroke();



    if(
        style.doubleStroke
    ){

        ctx.globalAlpha=.3;


        ctx.beginPath();


        ctx.arc(

            x+1,

            y+1,

            radius,

            0,

            Math.PI*2

        );


        ctx.stroke();


    }



    ctx.restore();


}





/*
=========================================================
 JITTER

 Controlled imperfection

=========================================================
*/


function jitter(
    value,
    amount
){


    return value +

    (

        Math.random()

        *

        amount*2

        -

        amount

    );


}




/*
=========================================================
 INK PRESSURE

 Slight variations in thickness

=========================================================
*/


function applyPressure(
    ctx,
    styleName="ancient"
){


    const style =
        getStyle(styleName);



    ctx.lineWidth =

        1 +

        (
            Math.random()
            *
            style.pressure
        );


}




/*
=========================================================
 INK AGE

 Used later for:
 faded maps,
 damaged parchment,
 ancient copies

=========================================================
*/


function applyAge(
    ctx,
    styleName="ancient"
){


    const style =
        getStyle(styleName);



    ctx.globalAlpha =

        1 -

        (
            Math.random()
            *
            style.fading
        );


}





return{


    line,

    circle,

    applyPressure,

    applyAge,

    getStyle


};



})();