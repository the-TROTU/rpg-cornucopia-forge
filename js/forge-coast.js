/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 COASTLINE ENGINE

 Version 1.0

 "The sea remembers the shape of the land."

=========================================================
*/


const ForgeCoast = (()=>{


/*
=========================================================
 GENERATE COAST
=========================================================
*/


function generate(world){


    if(!world || !world.land){

        console.error(
            "ForgeCoast: Invalid world."
        );

        return null;

    }



    world.land.coastline=[];


    world.land.continents.forEach(

        continent=>{


            continent.coastline =
                createCoastline(
                    continent
                );


            world.land.coastline.push(
                continent.coastline
            );


        }

    );



    createIslands(world);



    return world.land;


}





/*
=========================================================
 CREATE CONTINENT COASTLINE
=========================================================
*/


function createCoastline(
    continent
){


    const points=[];


    const count=60;


    for(
        let i=0;
        i<count;
        i++
    ){


        const angle =
            (
                Math.PI*2
                /
                count
            )
            *
            i;



        const wave =
            0.8
            +
            Math.random()
            *
            0.35;



        points.push({

            x:
            continent.x
            +
            Math.cos(angle)
            *
            continent.radius
            *
            wave,


            y:
            continent.y
            +
            Math.sin(angle)
            *
            continent.radius
            *
            wave

        });


    }


    return points;


}





/*
=========================================================
 ISLANDS
=========================================================
*/


function createIslands(world){


    world.land.islands=[];


    const amount =
        randomRange(
            2,
            6
        );



    for(
        let i=0;
        i<amount;
        i++
    ){


        world.land.islands.push({

            x:
            randomRange(
                100,
                800
            ),


            y:
            randomRange(
                100,
                600
            ),


            radius:
            randomRange(
                20,
                60
            ),


            coastline:
            []

        });



        world.land.islands[
            world.land.islands.length-1
        ].coastline =
            createIslandCoast(
                world.land.islands[
                    world.land.islands.length-1
                ]
            );


    }


}





function createIslandCoast(
    island
){


    const points=[];


    for(
        let i=0;
        i<30;
        i++
    ){


        const angle =
            (
                Math.PI*2
                /
                30
            )
            *
            i;



        const distortion =
            .75
            +
            Math.random()
            *.5;



        points.push({

            x:
            island.x
            +
            Math.cos(angle)
            *
            island.radius
            *
            distortion,


            y:
            island.y
            +
            Math.sin(angle)
            *
            island.radius
            *
            distortion

        });


    }


    return points;


}





/*
=========================================================
 HELPERS
=========================================================
*/


function randomRange(min,max){

    return Math.floor(
        Math.random()
        *
        (
            max-min+1
        )
    )
    +min;

}





return{


    generate


};


})();