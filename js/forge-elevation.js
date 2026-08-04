/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 ELEVATION ENGINE

 Version 4.0.0

 "The land rises.
 The rivers remember."

=========================================================
*/


const ForgeElevation = (()=>{


/*
=========================================================
 GENERATE ELEVATION
=========================================================
*/


function generate(world){


    const land =
        world.land;



    if(!land){

        console.error(
            "ForgeElevation: No land supplied."
        );

        return null;

    }



    const elevation={


        min:-1,

        max:1,


        cells:[]


    };



    land.cells.forEach(
        cell=>{


            const height =
                calculateHeight(
                    land,
                    cell
                );



            cell.height =
                height;



            elevation.cells.push({

                x:cell.x,

                y:cell.y,

                height:height,

                land:cell.land

            });


        }
    );



    return elevation;


}





/*
=========================================================
 HEIGHT CALCULATION
=========================================================
*/


function calculateHeight(
    land,
    cell
){


    /*
    Ocean
    */


    if(!cell.land){

        return randomFloat(
            -1,
            -0.1
        );

    }



    /*
    Distance from coast
    */


    const coastDistance =
        distanceFromCoast(
            land,
            cell
        );



    let height =
        coastDistance / 20;



    /*
    Natural variation
    */


    height +=
        randomFloat(
            -0.25,
            0.25
        );



    return clamp(
        height,
        0,
        1
    );


}





/*
=========================================================
 COAST DISTANCE
=========================================================
*/


function distanceFromCoast(
    land,
    cell
){


    let distance=0;


    let current =
        cell;



    while(
        distance < 50
    ){


        const neighbors =
            getNeighbors(
                land,
                current
            );



        if(
            neighbors.some(
                c=>!c.land
            )
        ){

            return distance;

        }



        current =
            neighbors[
                Math.floor(
                    Math.random()
                    *
                    neighbors.length
                )
            ];



        distance++;


    }



    return distance;


}





/*
=========================================================
 HELPERS
=========================================================
*/


function getNeighbors(
    land,
    cell
){


    const result=[];


    const directions=[

        [1,0],
        [-1,0],
        [0,1],
        [0,-1]

    ];



    directions.forEach(
        d=>{


            const found =
                land.cells.find(
                    c=>

                    c.x===cell.x+d[0]

                    &&

                    c.y===cell.y+d[1]

                );



            if(found){

                result.push(found);

            }


        }
    );


    return result;


}





function randomFloat(
    min,
    max
){

    return Math.random()
    *
    (max-min)
    +
    min;

}





function clamp(
    value,
    min,
    max
){

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}





return{


    generate


};


})();