/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER WORLD CORE

 Version 4.0.0

 "Before the map is drawn,
 the world must first exist."

=========================================================
*/


const ForgeMapData = (()=>{


let currentWorld=null;


/*
=========================================================
 GENERATE WORLD
=========================================================
*/


function generate(options={}){


    const world = {


        engine:{

            version:
            "4.0.0",

            generated:
            new Date()
            .toISOString(),

            modules:{


                land:
                "4.0.0",


                elevation:
                "4.0.0",


                terrain:
                "4.0.0",


                geography:
                "4.0.0",


                civilization:
                "pending"


            }


        },



        blueprint:
            createBlueprint(),



        seed:
            options.seed ||
            createBlueprint(),



        settings:{


            size:
            options.size ||
            "medium",


            climate:
            options.climate ||
            "temperate",


            civilization:
            options.civilization ||
            "frontier"


        },



        land:null,

        elevation:null,

        terrain:null,

        geography:null,

        civilization:null,



        history:[

            {

                event:
                "World seed created",

                date:
                new Date()
                .toISOString()

            }

        ],



        renderCache:{}


    };



/*
=========================================================
 WORLD FORGING PIPELINE
=========================================================
*/


    if(
        typeof ForgeLand !== "undefined"
    ){

        world.land =
            ForgeLand.generate(
                world
            );

        world.elevation =
            ForgeElevation.generate(world);

        world.terrain =
            ForgeTerrain.generate(world);  
            
        world.geography =
            ForgeGeography.generate(world);    

        world.engine.modules.land =
            "4.0.0";

    }



    /*
    Future engines attach here.

    ForgeElevation

    ForgeTerrain

    ForgeGeography

    ForgeCivilization

    */



    currentWorld=world;



    return world;


}





/*
=========================================================
 HELPERS
=========================================================
*/


function createBlueprint(){

    return (

        Date.now()
        .toString(36)

        +

        Math.random()
        .toString(36)
        .substring(2,6)

    )
    .toUpperCase();

}




function getWorld(){

    return currentWorld;

}





return{


    generate,

    getWorld


};


})();