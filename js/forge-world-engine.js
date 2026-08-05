/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 WORLD ENGINE

 Version 1.0

 "A world is not drawn.
 It is awakened."

=========================================================
*/


const ForgeWorldEngine = (()=>{


/*
=========================================================
 GENERATE WORLD
=========================================================
*/


function generate(options={}){


    const blueprint =
        options.seed ||
        createBlueprint();



    const world = {


        blueprint,


        seed:
            blueprint,



        engine:{


            version:
            "1.0.0",


            generated:
            new Date()
            .toISOString(),


            modules:{}

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



        features:[],


        settlements:[],


        landmarks:[],


        roads:[],


        history:[]


    };



/*
=========================================================
 BUILD ORDER
=========================================================
*/


    record(
        world,
        "World seed created"
    );



    /*
    LAND
    */


    if(
        typeof ForgeLand !== "undefined"
    ){

        world.land =
            ForgeLand.generate(
                world
            );


        world.engine.modules.land =
            "ready";

    }



    /*
    ELEVATION
    */


    if(
        typeof ForgeElevation !== "undefined"
    ){

        world.elevation =
            ForgeElevation.generate(
                world
            );


        world.engine.modules.elevation =
            "ready";

    }



    /*
    TERRAIN
    */


    if(
        typeof ForgeTerrain !== "undefined"
    ){

        world.terrain =
            ForgeTerrain.generate(
                world
            );


        world.engine.modules.terrain =
            "ready";

    }



    /*
    GEOGRAPHY
    */


    if(
        typeof ForgeGeography !== "undefined"
    ){

        world.geography =
            ForgeGeography.generate(
                world
            );


        world.engine.modules.geography =
            "ready";

    }



    /*
    FINALIZE
    */


    finalize(world);



    return world;


}





/*
=========================================================
 FINALIZE
=========================================================
*/


function finalize(world){


    world.renderCache={};



    if(
        !world.features
    ){

        world.features=[];

    }



    record(
        world,
        "World charted"
    );


}





/*
=========================================================
 HISTORY
=========================================================
*/


function record(
    world,
    event
){


    world.history.push({

        event,


        date:
        new Date()
        .toISOString()

    });


}





/*
=========================================================
 BLUEPRINT
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





return{


    generate


};


})();