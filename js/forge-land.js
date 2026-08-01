/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 LANDMASS GENERATOR

 Version 1.0

 "Before kingdoms rise,
 the earth must first awaken."

=========================================================
*/


const ForgeLand = (()=>{


/*
=========================================================
 CREATE LANDSCAPE
=========================================================
*/


function generate(width=900,height=700){


    const world={


        width,

        height,


        ocean:true,


        continents:[],


        islands:[],


        coastlines:[],


        elevation:[]


    };



    createContinents(world);


    createIslands(world);


    createElevation(world);


    return world;


}





/*
=========================================================
 CONTINENTS
=========================================================
*/


function createContinents(world){


    const count =
        randomRange(1,3);



    for(
        let i=0;
        i<count;
        i++
    ){


        const continent={


            x:
            randomRange(
                180,
                world.width-180
            ),


            y:
            randomRange(
                150,
                world.height-150
            ),


            radius:

            randomRange(
                140,
                260
            ),


            points:[]

        };



        createCoastline(
            continent
        );



        world.continents.push(
            continent
        );


        world.coastlines.push(
            continent.points
        );


    }


}





/*
=========================================================
 COASTLINE CREATION
=========================================================
*/


function createCoastline(continent){


    const points=18;


    for(
        let i=0;
        i<points;
        i++
    ){


        const angle =
            (
                Math.PI*2
                /
                points
            )
            *
            i;



        const variation =
            randomRange(
                -40,
                40
            );



        const radius =
            continent.radius
            +
            variation;



        continent.points.push({


            x:
            continent.x
            +
            Math.cos(angle)
            *
            radius,


            y:
            continent.y
            +
            Math.sin(angle)
            *
            radius


        });


    }


}





/*
=========================================================
 ISLANDS
=========================================================
*/


function createIslands(world){


    const amount =
        randomRange(
            5,
            15
        );



    for(
        let i=0;
        i<amount;
        i++
    ){


        world.islands.push({

            x:
            randomRange(
                50,
                world.width-50
            ),


            y:
            randomRange(
                50,
                world.height-50
            ),


            size:
            randomRange(
                8,
                30
            )


        });


    }


}





/*
=========================================================
 ELEVATION MAP

 Future terrain engine uses this.

=========================================================
*/


function createElevation(world){


    for(
        let i=0;
        i<50;
        i++
    ){


        world.elevation.push({


            x:
            randomRange(
                0,
                world.width
            ),


            y:
            randomRange(
                0,
                world.height
            ),


            value:
            Math.random()


        });


    }


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
    +
    min;


}





return{


    generate


};


})();