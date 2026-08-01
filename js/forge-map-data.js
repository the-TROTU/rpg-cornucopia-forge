/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER WORLD DATA

 Version 2.0

 "Before ink touches parchment,
 the world must exist."

=========================================================
*/


const ForgeMapData = (()=>{


let currentWorld = null;



/*
=========================================================
 RANDOM HELPERS
=========================================================
*/


function randomFrom(list){

    return list[
        Math.floor(
            Math.random()*list.length
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

    )+min;

}




/*
=========================================================
 BLUEPRINT GENERATION
=========================================================
*/


function createBlueprint(){


    return Date.now()
    .toString(36)
    .toUpperCase();


}





/*
=========================================================
 WORLD CREATION
=========================================================
*/


function generate(options={}){


    const seed =
        options.seed ||
        createBlueprint();



    const size =
        options.size ||
        "medium";



    const style =
        options.style ||
        "balanced";



    const climate =
        options.climate ||
        "temperate";



    const civilization =
        options.civilization ||
        "frontier";




    const world={


        blueprint:
            createBlueprint(),



        seed,



        created:
            new Date()
            .toISOString(),



        settings:{


            size,

            style,

            climate,

            civilization


        },



        history:[

            {

                event:
                "World charted",

                date:
                new Date()
                .toISOString()

            }

        ],



        features:
        [],



        settlements:
        [],



        landmarks:
        []



    };





    createTerrain(

        world

    );



    createSettlements(

        world

    );



    createLandmarks(

        world

    );




    currentWorld =
        world;



    return world;


}





/*
=========================================================
 TERRAIN
=========================================================
*/


function createTerrain(world){


    const terrainCount =

        world.settings.size==="small"
        ? 8
        :
        world.settings.size==="large"
        ? 25
        :
        15;




    for(
        let i=0;
        i<terrainCount;
        i++
    ){


        const terrain =

            chooseTerrain(
                world.settings.style,
                world.settings.climate
            );



        world.features.push({

            type:terrain,

            x:randomRange(
                80,
                820
            ),

            y:randomRange(
                80,
                620
            )

        });


    }


}





function chooseTerrain(style,climate){


    if(style==="mountain"){

        return randomFrom([

            "mountain",
            "mountain",
            "forest"

        ]);

    }



    if(style==="forest"){

        return randomFrom([

            "forest",
            "forest",
            "swamp"

        ]);

    }



    if(style==="desert"){

        return randomFrom([

            "ruin",
            "mountain"

        ]);

    }



    if(climate==="cold"){

        return randomFrom([

            "mountain",
            "ruin"

        ]);

    }



    return randomFrom([

        "mountain",
        "forest",
        "swamp",
        "ruin"

    ]);


}





/*
=========================================================
 SETTLEMENTS
=========================================================
*/


function createSettlements(world){


    const amount =

        world.settings.civilization==="wild"
        ? 1
        :
        world.settings.civilization==="kingdoms"
        ? 8
        :
        4;



    for(
        let i=0;
        i<amount;
        i++
    ){


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


    const landmarks=[

        "temple",

        "ruin",

        "castle"

    ];



    for(
        let i=0;
        i<3;
        i++
    ){


        world.landmarks.push({

            type:
            randomFrom(
                landmarks
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


        });


        world.features.push(

            world.landmarks[
                world.landmarks.length-1
            ]

        );


    }


}





/*
=========================================================
 NAME GENERATOR
=========================================================
*/


function generateName(){


    const first=[

        "Ash",
        "Raven",
        "Elder",
        "Storm",
        "Iron",
        "Silver",
        "Black",
        "Green"

    ];


    const second=[

        "fall",
        "mere",
        "watch",
        "hold",
        "haven",
        "rest",
        "ford"

    ];



    return (

        randomFrom(first)

        +

        randomFrom(second)

    );


}





/*
=========================================================
 ACCESS
=========================================================
*/


function getWorld(){

    return currentWorld;

}





return{


    generate,

    getWorld


};


})();