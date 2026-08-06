/*
=========================================================

RPG CORNUCOPIA
THE FORGE

FORGE CARTOGRAPHY

Version 2.0.0

"The map remembers."

=========================================================
*/

const ForgeCartography = (()=>{

function generate(world){

    const cartography={

        shorelineLoops:[],

        mountainChains:[],

        riverPaths:[],

        lakeShapes:[],

        forestClusters:[],

        labels:[],

        beaches:[],

        cliffs:[]

    };

    if(!world){

        return cartography;

    }

    if(world.land){

        buildCoastlines(
            world,
            cartography
        );

    }

    if(world.terrain){

        buildMountains(
            world,
            cartography
        );

    }

    if(world.geography){

        buildRivers(
            world,
            cartography
        );

    }

    buildLabels(
        world,
        cartography
    );

    world.cartography=
        cartography;

    return cartography;

}

/*============================================*/

function buildCoastlines(
    world,
    cartography
){

    if(
        !world.land.coastline
    ){
        return;
    }

    cartography.shorelineLoops.push(

        world.land.coastline

    );

}

/*============================================*/

function buildMountains(
    world,
    cartography
){

    if(
        !world.terrain.mountains
    ){
        return;
    }

    cartography.mountainChains=
        world.terrain.mountains;

}

/*============================================*/

function buildRivers(
    world,
    cartography
){

    if(
        !world.geography.rivers
    ){
        return;
    }

    cartography.riverPaths=
        world.geography.rivers;

}

/*============================================*/

function buildLabels(
    world,
    cartography
){

    if(
        world.land &&
        world.land.continents
    ){

        world.land.continents.forEach(

            continent=>{

                cartography.labels.push({

                    text:
                        "Unknown Lands",

                    x:
                        continent.x,

                    y:
                        continent.y,

                    type:
                        "continent"

                });

            }

        );

    }

}

return{

    generate

};

})();