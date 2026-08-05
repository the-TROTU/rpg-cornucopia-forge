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


    const blueprint =
    options.seed ||
    createBlueprint();

    ForgeRandom.setSeed(
    blueprint
    );

    const world = {


        blueprint:


            blueprint,


        seed:


            blueprint,


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

        features:[],

        settlements:[],

        landmarks:[],

        roads:[],



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
        ForgeCoast.generate(
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

    const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


    let result="";


    for(
        let i=0;
        i<12;
        i++
    ){

        result +=
            chars[
                Math.floor(
                    Math.random()
                    *
                    chars.length
                )
            ];

    }


    return result;

}




function getWorld(){

    return currentWorld;

}





return{


    generate,

    getWorld


};


})();