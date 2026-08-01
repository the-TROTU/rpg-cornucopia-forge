/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 FORGE INK ENGINE

 Version 1.0

 "Every map begins with a single stroke."

=========================================================
*/


const ForgeInk = (()=>{


/*
=========================================================
 BRUSH LIBRARY

 These are artistic personalities.
 Cartographers will eventually customize these.
=========================================================
*/


const brushes = {


    coast:{

        width:2,

        wobble:2.5,

        opacity:.95,

        doubleStroke:true

    },


    river:{

        width:2,

        wobble:1.8,

        opacity:.8,

        doubleStroke:false

    },


    road:{

        width:1.5,

        wobble:1,

        opacity:.75,

        doubleStroke:false

    },


    border:{

        width:1,

        wobble:.8,

        opacity:.65,

        doubleStroke:false

    },


    mountain:{

        width:1.8,

        wobble:1.2,

        opacity:.9,

        doubleStroke:true

    }

};





/*
=========================================================
 RANDOM ORGANIC OFFSET

 Creates human-like imperfections.
=========================================================
*/


function organicNoise(amount){


    return (

        Math.random() - .5

    )
    *
    amount;


}





/*
=========================================================
 DRAW HAND-DRAWN LINE

 Main engine.
=========================================================
*/


function drawLine(
    ctx,
    points,
    brush="coast"
){


    const style =
        brushes[brush]
        ||
        brushes.coast;



    ctx.save();



    ctx.lineCap="round";

    ctx.lineJoin="round";

    ctx.strokeStyle=
        `rgba(20,15,10,${style.opacity})`;



    ctx.lineWidth=
        style.width;



    /*
    ------------------------------------
    First pass
    ------------------------------------
    */


    ctx.beginPath();



    points.forEach(
        (point,index)=>{


            const x =
                point.x +
                organicNoise(
                    style.wobble
                );


            const y =
                point.y +
                organicNoise(
                    style.wobble
                );



            if(index===0){

                ctx.moveTo(
                    x,
                    y
                );

            }

            else{

                ctx.lineTo(
                    x,
                    y
                );

            }


        }

    );


    ctx.stroke();




    /*
    ------------------------------------
    Correction stroke

    Humans redraw uncertain lines.
    ------------------------------------
    */


    if(style.doubleStroke){


        ctx.globalAlpha=.35;


        ctx.beginPath();



        points.forEach(
            (point,index)=>{


                const x =
                    point.x +
                    organicNoise(
                        style.wobble * 2
                    );


                const y =
                    point.y +
                    organicNoise(
                        style.wobble * 2
                    );



                if(index===0){

                    ctx.moveTo(
                        x,
                        y
                    );

                }

                else{

                    ctx.lineTo(
                        x,
                        y
                    );

                }


            }

        );



        ctx.stroke();


    }



    ctx.restore();


}






/*
=========================================================
 PUBLIC API
=========================================================
*/


return{


    drawLine,


    brushes


};


})();