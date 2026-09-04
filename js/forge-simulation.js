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

    const candidates=[];


    /*
    River locations
    */

    if(
        world.geography &&
        world.geography.rivers
    ){

        world.geography.rivers.forEach(

            river=>{

                if(
                    river.length < 5
                ){

                    return;

                }


                const points=[

                    river[0],

                    river[
                        Math.floor(
                            river.length/2
                        )
                    ],

                    river[
                        river.length-1
                    ]

                ];


                points.forEach(
                    point=>{

                        candidates.push({

                            x:point.x,
                            y:point.y,

                            origin:
                            "river-crossing",

                            score:
                            50

                        });

                    }
                );

            }

        );

    }



    /*
    Mountain locations
    */

    if(
        world.terrain &&
        world.terrain.mountains
    ){

        world.terrain.mountains.forEach(

            mountain=>{


                candidates.push({

                    x:mountain.x,
                    y:mountain.y,

                    origin:
                    "mountain-pass",

                    score:
                    35

                });


            }

        );

    }



    /*
    Keep only the best spread-out locations
    */

    candidates.sort(
        (a,b)=>
            b.score-a.score
    );


    candidates.forEach(

        candidate=>{


            const tooClose =
                simulation.settlements.some(

                    existing=>

                    Math.hypot(
                        existing.x-candidate.x,
                        existing.y-candidate.y
                    )
                    <
                    15

                );


            if(
                !tooClose
            ){

                simulation.settlements.push(
                    candidate
                );

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
                generateUniqueSettlementName(
                    simulation
                );

            settlement.importance =
                determineImportance(
                    settlement.type
                );


        }

    );


}

function generateUniqueSettlementName(simulation){

    let name;

    do{

        name =
            generateSettlementName();

    }
    while(
        simulation.settlements.some(
            s=>s.name===name
        )
    );


    return name;

}

function determineImportance(type){

    switch(type){

        case "city":
            return 100;

        case "fortress":
            return 70;

        case "town":
            return 40;

        default:
            return 15;

    }

}



function determineSettlementType(
    settlement
){

    const roll =
        Math.random();


    if(
        settlement.origin==="river-crossing"
        &&
        roll>.85
    ){

        return "city";

    }


    if(
        settlement.origin==="river-crossing"
    ){

        return "town";

    }


    if(
        settlement.origin==="mountain-pass"
    ){

        return "fortress";

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


function createRoadNetwork(simulation){


const settlements =
simulation.settlements;



for(
let i=0;
i<settlements.length-1;
i++
){


const a =
settlements[i];


const b =
settlements[i+1];


simulation.roads.push({

from:{
    x:a.x,
    y:a.y
},

to:{
    x:b.x,
    y:b.y
},

fromName:a.name,

toName:b.name,

path:createRoadPath(
    a,
    b
)

});


}


}

function createRoadPath(a,b){


const path=[];


const steps=10;


const dx =
b.x-a.x;

const dy =
b.y-a.y;


const distance =
Math.hypot(
dx,
dy
);



const bend =
Math.sin(
distance
)
*
Math.min(
8,
distance*.25
);



const nx =
-dy/distance;


const ny =
dx/distance;



for(
let i=0;
i<=steps;
i++
){


const t=i/steps;


const curve =
Math.sin(
Math.PI*t
)
*
bend;



path.push({

x:
a.x+
dx*t+
nx*curve,


y:
a.y+
dy*t+
ny*curve


});


}


return path;


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