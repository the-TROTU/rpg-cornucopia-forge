/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 NAME INTEGRATION ENGINE

 Version 1.0.0

 "A place becomes real
 when someone gives it a name."

=========================================================
*/


const ForgeNameIntegration = (()=>{


/*
=========================================================
 APPLY NAMES
=========================================================
*/


function generate(world){


    if(!world){

        return null;

    }



    if(
        !world.simulation
    ){

        return world;

    }



    namePointsOfInterest(
        world
    );


    nameSettlements(
        world
    );


    nameResources(
        world
    );



    return world;


}



/*
=========================================================
 POINTS OF INTEREST
=========================================================
*/


function namePointsOfInterest(world){


    const points =
        world.simulation.pointsOfInterest;



    if(!points){

        return;

    }



    points.forEach(

        point=>{


            if(point.name){

                return;

            }



            point.name =
                createName(
                    point.type
                );


        }

    );


}





/*
=========================================================
 SETTLEMENTS
=========================================================
*/


function nameSettlements(world){


    const settlements =
        world.simulation.settlements;



    if(!settlements){

        return;

    }



    settlements.forEach(

        settlement=>{


            if(settlement.name){

                return;

            }



            settlement.name =
                createName(
                    "settlement"
                );


        }

    );


}





/*
=========================================================
 RESOURCES
=========================================================
*/


function nameResources(world){


    if(
        !world.simulation.resources
    ){

        return;

    }



    world.simulation.resources.forEach(

        resource=>{


            if(resource.name){

                return;

            }



            resource.name =
                createName(
                    resource.type
                );


        }

    );


}





/*
=========================================================
 NAME GENERATOR BRIDGE
=========================================================
*/


function createName(type){


    /*
    =====================================
    CONNECT TO NAME SMITH
    =====================================
    */


    if(
        typeof ForgeNameSmith !== "undefined"
    ){


        return ForgeNameSmith.generate({

            category:type

        });


    }



    /*
    =====================================
    FALLBACK NAMES
    =====================================
    */


    const first=[

        "Ash",
        "Iron",
        "Silver",
        "Storm",
        "Black",
        "Grey",
        "Elder"

    ];



    const second=[

        "mere",
        "fall",
        "hold",
        "ford",
        "watch",
        "spire",
        "reach"

    ];



    return (

        first[
            Math.floor(
                Math.random()
                *
                first.length
            )
        ]

        +

        second[
            Math.floor(
                Math.random()
                *
                second.length
            )
        ]

    );


}





return{

    generate

};


})();