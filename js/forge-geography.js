/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 GEOGRAPHY ENGINE

 Version 4.0.0

 "Water remembers every height."

=========================================================
*/


const ForgeGeography = (()=>{


/*
=========================================================
 GENERATE GEOGRAPHY
=========================================================
*/


function generate(world){


    if(
        !world ||
        !world.elevation ||
        !world.terrain
    ){

        console.error(
            "ForgeGeography: Missing world data."
        );

        return null;

    }



    const geography={


        rivers:[],


        lakes:[],


        valleys:[],


        watersheds:[]


    };



    createLakes(
        world,
        geography
    );


    createRivers(
        world,
        geography
    );


    createValleys(
        world,
        geography
    );



    return geography;


}





/*
=========================================================
 LAKES
=========================================================
*/


function createLakes(
    world,
    geography
){


    world.elevation.cells.forEach(

        cell=>{


            if(
                !cell.land
            ){

                return;

            }



            if(
                cell.height < .15 &&
                Math.random()>.97
            ){


                geography.lakes.push({

                    x:cell.x,

                    y:cell.y,

                    size:
                    randomRange(
                        3,
                        8
                    )

                });


            }


        }

    );


}





/*
=========================================================
 RIVERS
=========================================================
*/


function createRivers(
    world,
    geography
){


    const mountains =
        world.terrain.mountains;



    mountains.forEach(

        mountain=>{


            if(
                Math.random()>.5
            ){

                return;

            }



            const river =
                followDownhill(
                    world,
                    mountain
                );



            if(
                river.length>2
            ){

                geography.rivers.push(
                    river
                );

            }


        }

    );


}





/*
=========================================================
 FOLLOW WATER
=========================================================
*/


function followDownhill(
    world,
    start
){


    let current = {

        x:start.x,

        y:start.y

    };



    const path=[];



    for(
        let i=0;
        i<40;
        i++
    ){


        path.push({

            x:current.x,

            y:current.y

        });



        const next =
            lowestNeighbor(
                world,
                current
            );



        if(
            !next
        ){

            break;

        }



        current = next;



    }



    return path;


}





/*
=========================================================
 LOWEST NEIGHBOR
=========================================================
*/


function lowestNeighbor(
    world,
    position
){


    const cell =
        findCell(
            world,
            position
        );



    if(!cell){

        return null;

    }



    const neighbors =
        getNeighbors(
            world.elevation,
            cell
        );



    let lowest=null;



    neighbors.forEach(

        n=>{


            if(
                !lowest ||
                n.height <
                lowest.height
            ){

                lowest=n;

            }


        }

    );



    if(
        lowest &&
        lowest.height <
        cell.height
    ){

        return {

            x:lowest.x,

            y:lowest.y

        };

    }



    return null;


}





/*
=========================================================
 VALLEYS
=========================================================
*/


function createValleys(
    world,
    geography
){


    world.terrain.hills.forEach(

        hill=>{


            if(
                Math.random()>.7
            ){

                geography.valleys.push({

                    x:hill.x,

                    y:hill.y

                });

            }


        }

    );


}





/*
=========================================================
 HELPERS
=========================================================
*/


function findCell(
    world,
    pos
){


    return world.elevation.cells.find(

        c=>

        c.x===pos.x &&
        c.y===pos.y

    );


}



function getNeighbors(
    elevation,
    cell
){


    const result=[];


    [

        [1,0],
        [-1,0],
        [0,1],
        [0,-1]

    ]
    .forEach(

        d=>{


            const found =
                elevation.cells.find(

                    c=>

                    c.x===cell.x+d[0]
                    &&
                    c.y===cell.y+d[1]

                );


            if(found){

                result.push(found);

            }


        }

    );


    return result;

}




function randomRange(
    min,
    max
){

    return Math.floor(

        Math.random()
        *
        (
            max-min+1
        )

    )+min;

}





return{


    generate


};


})();