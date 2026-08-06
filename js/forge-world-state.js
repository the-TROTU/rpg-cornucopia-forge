/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 WORLD ENGINE

 Version 1.1.0

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

    const world={

        blueprint,

        seed:blueprint,

        engine:{

            version:"1.1.0",

            generated:
                new Date().toISOString(),

            modules:{}

        },

        settings:{

            size:
                options.size || "medium",

            climate:
                options.climate || "temperate",

            civilization:
                options.civilization || "frontier"

        },

        land:null,

        elevation:null,

        terrain:null,

        geography:null,

        cartography:null,

        renderCache:{},

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

    if(typeof ForgeLand!=="undefined"){

        world.land =
            ForgeLand.generate(world);

        world.engine.modules.land =
            "ready";

    }



    /*
    ELEVATION
    */

    if(typeof ForgeElevation!=="undefined"){

        world.elevation =
            ForgeElevation.generate(world);

        world.engine.modules.elevation =
            "ready";

    }



    /*
    TERRAIN
    */

    if(typeof ForgeTerrain!=="undefined"){

        world.terrain =
            ForgeTerrain.generate(world);

        world.engine.modules.terrain =
            "ready";

    }



    /*
    GEOGRAPHY
    */

    if(typeof ForgeGeography!=="undefined"){

        world.geography =
            ForgeGeography.generate(world);

        world.engine.modules.geography =
            "ready";

    }



    /*
    CARTOGRAPHY
    */

    if(typeof ForgeCartography!=="undefined"){

        world.cartography =
            ForgeCartography.generate(world);

        world.engine.modules.cartography =
            "ready";

    }
    else{

        world.cartography={

            shorelineLoops:[],

            mountainChains:[],

            riverPaths:[],

            lakeShapes:[],

            forestClusters:[],

            labels:[]

        };

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

    if(!world.features){

        world.features=[];

    }

    if(!world.renderCache){

        world.renderCache={};

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

function record(world,event){

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

    ).toUpperCase();

}



/*
=========================================================
 PUBLIC
=========================================================
*/

return{

    generate

};

})();