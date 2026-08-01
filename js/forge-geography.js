/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 GEOGRAPHY ENGINE

 Version 1.0

 "Before kingdoms rise,
 the earth must first remember."

=========================================================
*/


const ForgeGeography = (()=>{


/*
=========================================================
 HELPERS
=========================================================
*/


function randomRange(min,max){

    return Math.floor(
        Math.random() *
        (max-min+1)
    ) + min;

}



function randomFrom(list){

    return list[
        Math.floor(
            Math.random()*list.length
        )
    ];

}



/*
=========================================================
 GENERATE GEOGRAPHY
=========================================================
*/


function generate(world){


    if(!world){

        console.error(
            "ForgeGeography: No world supplied."
        );

        return null;

    }



    world.geography = {


        elevation:[],


        mountains:[],


        rivers:[],


        lakes:[],


        biomes:[]


    };



    createElevation(world);


    createMountains(world);


    createRivers(world);


    createLakes(world);


    createBiomes(world);



    return world;


}





/*
=========================================================
 ELEVATION
=========================================================
*/


function createElevation(world){


    for(
        let i=0;
        i<40;
        i++
    ){


        world.geography.elevation.push({

            x:randomRange(
                50,
                850
            ),

            y:randomRange(
                50,
                650
            ),

            height:
            Math.random()


        });


    }


}





/*
=========================================================
 MOUNTAINS
=========================================================
*/


function createMountains(world){


    const count =
        randomRange(
            3,
            6
        );



    for(
        let i=0;
        i<count;
        i++
    ){


        const range={


            name:
            randomFrom([

                "Stormspire Range",
                "Ironfang Mountains",
                "The Broken Peaks",
                "The Elder Heights"

            ]),



            points:[]

        };



        const startX =
            randomRange(
                100,
                700
            );


        const startY =
            randomRange(
                120,
                450
            );



        for(
            let p=0;
            p<6;
            p++
        ){


            range.points.push({

                x:
                startX+(p*35),

                y:
                startY+
                randomRange(
                    -50,
                    50
                )

            });


        }



        world.geography.mountains.push(
            range
        );


    }


}





/*
=========================================================
 RIVERS
=========================================================
*/


function createRivers(world){


    world.geography.mountains
    .forEach(
        mountain=>{


            if(
                Math.random()>.35
            ){

                const source =
                    mountain.points[
                        Math.floor(
                            mountain.points.length/2
                        )
                    ];



                world.geography.rivers.push({

                    startX:
                    source.x,

                    startY:
                    source.y,

                    endX:
                    randomRange(
                        100,
                        800
                    ),

                    endY:
                    650,


                    name:
                    randomFrom([

                        "Silver Run",
                        "The Veiled River",
                        "Blackwater",
                        "The Whispering Flow"

                    ])

                });


            }


        }
    );


}





/*
=========================================================
 LAKES
=========================================================
*/


function createLakes(world){


    const amount =
        randomRange(
            1,
            4
        );



    for(
        let i=0;
        i<amount;
        i++
    ){


        world.geography.lakes.push({

            x:
            randomRange(
                150,
                750
            ),


            y:
            randomRange(
                150,
                550
            ),


            size:
            randomRange(
                15,
                50
            )

        });


    }


}





/*
=========================================================
 BIOMES
=========================================================
*/


function createBiomes(world){


    world.geography.biomes.push(

        {

            name:
            "Northern Wilds",

            type:
            "forest",

            influence:
            "mountain"

        },


        {

            name:
            "The Open Plains",

            type:
            "grassland",

            influence:
            "river"

        },


        {

            name:
            "The Forgotten Marsh",

            type:
            "swamp",

            influence:
            "water"

        }

    );


}





return{


    generate


};


})();