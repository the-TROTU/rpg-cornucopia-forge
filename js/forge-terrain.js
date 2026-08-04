/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 TERRAIN ENGINE

 Version 4.0.0

 "The land chooses its own character."

=========================================================
*/


const ForgeTerrain = (()=>{


/*
=========================================================
 GENERATE TERRAIN
=========================================================
*/


function generate(world){


    if(
        !world ||
        !world.elevation
    ){

        console.error(
            "ForgeTerrain: Missing elevation data."
        );

        return null;

    }



    const terrain={


        mountains:[],

        hills:[],

        plains:[],

        forests:[],

        deserts:[],

        wetlands:[],

        tundra:[]


    };



    world.elevation.cells.forEach(

        cell=>{


            if(!cell.land){

                return;

            }



            const type =
                determineTerrain(
                    cell,
                    world
                );



            terrain[type].push({

                x:cell.x,

                y:cell.y,

                height:
                cell.height

            });


        }

    );



    return terrain;


}





/*
=========================================================
 DETERMINE TERRAIN
=========================================================
*/


function determineTerrain(
    cell,
    world
){


    const height =
        cell.height;



    const climate =
        world.settings.climate;



    /*
    Highest elevations
    */


    if(
        height > .75
    ){

        return "mountains";

    }



    /*
    Medium elevations
    */


    if(
        height > .45
    ){

        return "hills";

    }



    /*
    Cold climates
    */


    if(
        climate==="cold" &&
        height > .2
    ){

        return "tundra";

    }



    /*
    Wet climates
    */


    if(
        climate==="tropical"
        &&
        Math.random()>.35
    ){

        return "forests";

    }



    /*
    Dry climates
    */


    if(
        climate==="arid"
        &&
        Math.random()>.4
    ){

        return "deserts";

    }



    /*
    Default land
    */


    if(
        Math.random()>.8
    ){

        return "wetlands";

    }



    return "plains";


}





return{


    generate


};


})();