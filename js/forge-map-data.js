/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER WORLD DATA

 Version 3.0

 "The earth is born.
 Civilizations leave their fingerprints."

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


    const land =
        ForgeLand.generate(
            900,
            700
        );


    const terrain =
        ForgeTerrain.generate(
            land,
            options.climate || "temperate"
        );



    const world={


        blueprint:
            createBlueprint(),


        seed:
            options.seed ||
            createBlueprint(),



        land,

        terrain,


        features:[],


        settlements:[],


        landmarks:[],


        roads:[],


        history:[

            {

                event:
                "World charted",

                date:
                new Date()
                .toISOString()

            }

        ],


        settings:{

            climate:
            options.climate ||
            "temperate",


            civilization:
            options.civilization ||
            "frontier"


        }


    };



   ForgeGeography.generate(world);

    createTerrain(world);

    createSettlements(world);

    createLandmarks(world);



    currentWorld=world;


    return world;


}





/*
=========================================================
 CIVILIZATION
=========================================================
*/


function createCivilization(world){


    const level =
        world.settings.civilization;



    const amount =
        level==="wild"
        ?
        1
        :
        level==="kingdoms"
        ?
        8
        :
        4;



    for(
        let i=0;
        i<amount;
        i++
    ){


        const forest =
            randomFrom(
                world.terrain.forests
            );



        if(!forest){

            continue;

        }



        const settlement={


            name:
            generateName(),


            type:
            randomFrom([

                "village",
                "town",
                "castle"

            ]),


            x:
            forest.x
            +
            randomRange(
                -60,
                60
            ),


            y:
            forest.y
            +
            randomRange(
                -60,
                60
            )


        };



        world.settlements.push(
            settlement
        );


        world.features.push({

            type:
            settlement.type==="castle"
            ?
            "castle"
            :
            "village",


            x:
            settlement.x,


            y:
            settlement.y


        });


    }


}





/*
=========================================================
 LANDMARKS
=========================================================
*/


function createLandmarks(world){


    const possible=[

        "temple",

        "ruin",

        "castle"

    ];



    for(
        let i=0;
        i<5;
        i++
    ){


        const landmark={


            type:
            randomFrom(
                possible
            ),


            x:
            randomRange(
                100,
                800
            ),


            y:
            randomRange(
                100,
                600
            )


        };



        world.landmarks.push(
            landmark
        );


        world.features.push(
            landmark
        );


    }


}





/*
=========================================================
 ROADS
=========================================================
*/


function createRoads(world){


    if(
        world.settlements.length<2
    ){

        return;

    }



    for(
        let i=0;
        i<world.settlements.length-1;
        i++
    ){


        world.roads.push({

            from:
            world.settlements[i],


            to:
            world.settlements[i+1]

        });


    }


}





/*
=========================================================
 HELPERS
=========================================================
*/


function createBlueprint(){

    return Date.now()
    .toString(36)
    .toUpperCase();

}



function randomFrom(list){

    return list[
        Math.floor(
            Math.random()
            *
            list.length
        )
    ];

}



function randomRange(min,max){

    return Math.floor(
        Math.random()
        *
        (
            max-min+1
        )
    )
    +
    min;

}



function generateName(){


    return randomFrom([

        "Ash",
        "Raven",
        "Storm",
        "Iron",
        "Silver"

    ])
    +
    randomFrom([

        "fall",
        "mere",
        "hold",
        "haven",
        "ford"

    ]);

}




function getWorld(){

    return currentWorld;

}



return{


    generate,

    getWorld


};


})();