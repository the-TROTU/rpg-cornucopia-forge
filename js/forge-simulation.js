/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 SIMULATION ENGINE

 Version 1.2.0

 "People follow rivers.
 Kingdoms follow people."

=========================================================
*/


const ForgeSimulation = (()=>{


function generate(world){


    if(!world){

        return null;

    }


    const simulation={


        pointsOfInterest:[],

        settlements:[],

        roads:[],

        ruins:[],

        resources:[],

        factions:[]


    };


    createPointsOfInterest(
        world,
        simulation
    );


    createSettlementCandidates(
        world,
        simulation
    );


    developSettlements(
        world,
        simulation
    );


    createRoadNetwork(
        simulation
    );


    world.simulation =
        simulation;


    return simulation;


}





/*
=========================================================
 POINTS OF INTEREST
=========================================================
*/


function createPointsOfInterest(
    world,
    simulation
){


    if(
        world.geography &&
        world.geography.rivers
    ){

        world.geography.rivers.forEach(

            river=>{


                if(
                    !river.length
                ){

                    return;

                }


                const point =
                    river[
                        Math.floor(
                            river.length/2
                        )
                    ];


                simulation.pointsOfInterest.push({

                    type:
                    "river-crossing",

                    x:
                    point.x,

                    y:
                    point.y,

                    importance:
                    "high"

                });


            }

        );

    }



    if(
        world.terrain &&
        world.terrain.mountains
    ){

        world.terrain.mountains.forEach(

            mountain=>{


                simulation.pointsOfInterest.push({

                    type:
                    "mountain-pass",

                    x:
                    mountain.x,

                    y:
                    mountain.y,

                    importance:
                    "medium"

                });


            }

        );

    }


}





/*
=========================================================
 SETTLEMENT CREATION
=========================================================
*/


function createSettlementCandidates(
    world,
    simulation
){


    simulation.pointsOfInterest.forEach(

        point=>{


            if(
                point.importance==="high"
            ){

                simulation.settlements.push({

                    x:
                    point.x,

                    y:
                    point.y,

                    origin:
                    point.type

                });

            }


        }

    );


}





/*
=========================================================
 SETTLEMENT DEVELOPMENT
=========================================================
*/


function developSettlements(
    world,
    simulation
){


    simulation.settlements.forEach(

        settlement=>{


            settlement.type =
                determineSettlementType(
                    settlement
                );


            settlement.population =
                determinePopulation(
                    settlement.type
                );


            settlement.purpose =
                determinePurpose(
                    settlement.origin
                );


            settlement.resources =
                determineResources(
                    settlement.origin
                );


            settlement.name =
                generateSettlementName();


        }

    );


}





function determineSettlementType(
    settlement
){


    if(
        settlement.origin==="river-crossing"
    ){

        return "town";

    }


    return "village";


}





function determinePopulation(type){


    switch(type){


        case "city":
            return random(2000,10000);


        case "town":
            return random(300,1500);


        default:
            return random(50,300);


    }


}





function determinePurpose(origin){


    const purposes={

        "river-crossing":
            "trade and transport",

        "mountain-pass":
            "defense and mining"

    };


    return purposes[origin]
        ||
        "settlement";


}





function determineResources(origin){


    if(
        origin==="river-crossing"
    ){

        return [

            "fishing",

            "trade"

        ];

    }


    return [

        "local materials"

    ];

}





/*
=========================================================
 ROADS
=========================================================
*/


function createRoadNetwork(
    simulation
){


    const settlements =
        simulation.settlements;



    for(
        let i=0;
        i<settlements.length-1;
        i++
    ){


        simulation.roads.push({

            from:
            settlements[i].name,


            to:
            settlements[i+1].name

        });


    }


}





/*
=========================================================
 NAME FALLBACK
=========================================================
*/


function generateSettlementName(){


    return (

        randomWord(
            [
                "Ash",
                "Iron",
                "Silver",
                "Storm",
                "Grey"
            ]
        )

        +

        randomWord(
            [
                "mere",
                "ford",
                "hold",
                "watch",
                "haven"
            ]
        )

    );


}





function randomWord(list){

    return list[
        Math.floor(
            Math.random()*list.length
        )
    ];

}



function random(min,max){

    return Math.floor(
        Math.random()
        *
        (max-min+1)
    )
    +min;

}





return{

    generate

};


})();