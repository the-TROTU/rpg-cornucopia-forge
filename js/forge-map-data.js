/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 MAP BLUEPRINT ENGINE

 Version 1.0

 "Before ink touches parchment,
  the world must first exist."

=========================================================
*/


const ForgeMapData = (()=>{


/*
=========================================================
 RANDOM HELPERS
=========================================================
*/


function randomFrom(list){

    return list[
        Math.floor(
            Math.random()
            *
            list.length
        )
    ];

}



function randomId(){

    return Date.now()
    .toString(36)
    .toUpperCase();

}



/*
=========================================================
 NAME GENERATION

 Placeholder fantasy-neutral names

 Later this can become
 Forge-Naming Engine

=========================================================
*/


function generateName(){

    const first=[

        "Ash",
        "Val",
        "Elder",
        "Storm",
        "Raven",
        "Thorn",
        "Silver",
        "Black",
        "Green",
        "Mist"

    ];


    const second=[

        "haven",
        "reach",
        "fall",
        "mere",
        "watch",
        "hold",
        "vale",
        "wood",
        "spire",
        "march"

    ];


    return randomFrom(first)
    +
    randomFrom(second);

}




/*
=========================================================
 REGION CREATION
=========================================================
*/


function createRegion(type){


    return {

        id:
            randomId(),


        name:
            generateName(),


        type,


        discovered:
            false,


        landmarks:[],


        notes:
            "Uncharted territory."

    };


}




/*
=========================================================
 LANDMARK CREATION
=========================================================
*/


function createLandmark(type){


    const names={


        mountain:
            [
            "The Silent Peak",
            "The Broken Crown",
            "The Old Spine"
            ],


        forest:
            [
            "Whispering Woods",
            "The Deep Green",
            "The Ancient Grove"
            ],


        settlement:
            [
            "Riverside Hamlet",
            "Stonewatch",
            "The Hidden Village"
            ],


        ruins:
            [
            "Forgotten Keep",
            "Lost Sanctuary",
            "The Fallen Hall"
            ]


    };



    return {


        id:
            randomId(),


        type,


        name:
            randomFrom(
                names[type]
                ||
                [
                "Unknown Site"
                ]
            ),


        x:
            Math.random(),


        y:
            Math.random(),


        discovered:false,


        history:[]

    };


}





/*
=========================================================
 CREATE WORLD BLUEPRINT
=========================================================
*/


function createWorld(options={}){


    const seed =
        options.seed
        ||
        randomId();



    const world={


        blueprint:

            seed,


        created:

            new Date()
            .toISOString(),



        cartographer:

            options.cartographer
            ||
            "oldExplorer",



        style:

            options.style
            ||
            "ancient",



        regions:[],


        landmarks:[],


        rivers:[],


        roads:[],


        settlements:[],



        history:[

            {

                event:
                "The first chart was created.",


                date:
                new Date()
                .toISOString()

            }

        ]

    };



    /*
    Create initial regions
    */


    const regionCount =
        options.regions
        ||
        5;



    for(
        let i=0;
        i<regionCount;
        i++
    ){


        world.regions.push(

            createRegion(
                "wild"
            )

        );


    }



    /*
    Initial landmarks
    */


    world.landmarks.push(

        createLandmark(
            "mountain"
        )

    );


    world.landmarks.push(

        createLandmark(
            "forest"
        )

    );


    world.landmarks.push(

        createLandmark(
            "settlement"
        )

    );



    return world;


}





/*
=========================================================
 MAP HISTORY

 Future redrawing system

=========================================================
*/


function addHistory(

    world,

    note,

    artist

){


    world.history.push({


        event:
            note,


        artist:
            artist
            ||
            world.cartographer,


        date:
            new Date()
            .toISOString()


    });


}





/*
=========================================================
 PUBLIC API
=========================================================
*/


return{


    createWorld,

    createRegion,

    createLandmark,

    addHistory


};



})();