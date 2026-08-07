/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHY ENGINE

 Version 2.0.0

 "Ink follows order."

=========================================================
*/

const ForgeCartography = (()=>{

function generate(world){

    const cartography={

        layers:{

            ocean:[],

            land:[],

            coastline:[],

            rivers:[],

            lakes:[],

            mountains:[],

            forests:[],

            roads:[],

            settlements:[],

            labels:[]

        }

    };



    buildLand(world,cartography);

    buildWater(world,cartography);

    buildTerrain(world,cartography);

    buildCivilization(world,cartography);

    buildLabels(world,cartography);



    return cartography;

}



/*
=========================================================
LAND
=========================================================
*/

function buildLand(world,cartography){

    cartography.layers.land=
        world.land.cells.filter(
            c=>c.land
        );

    cartography.layers.coastline=
        world.land.cells.filter(
            c=>c.coast
        );

}



/*
=========================================================
WATER
=========================================================
*/

function buildWater(world,cartography){

    cartography.layers.rivers=
        world.geography?.rivers || [];

    cartography.layers.lakes=
        world.geography?.lakes || [];

}



/*
=========================================================
TERRAIN
=========================================================
*/

function buildTerrain(world,cartography){

    cartography.layers.mountains=
        world.terrain?.mountains || [];

    cartography.layers.forests=
        world.terrain?.forests || [];

}



/*
=========================================================
CIVILIZATION
=========================================================
*/

function buildCivilization(world,cartography){

    if(!world.simulation){

        return;

    }

    cartography.layers.settlements=
        world.simulation.settlements || [];

    cartography.layers.roads=
        world.simulation.roads || [];

}



/*
=========================================================
LABELS
=========================================================
*/

function buildLabels(world,cartography){

    if(!world.simulation){

        return;

    }

    world.simulation.settlements.forEach(

        settlement=>{

            cartography.layers.labels.push({

                text:settlement.name,

                x:settlement.x,

                y:settlement.y,

                type:"settlement"

            });

        }

    );

}



return{

    generate

};

})();