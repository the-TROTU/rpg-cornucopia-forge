/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 TERRAIN ENGINE

 Version 1.0

 "The land chooses its own voice."

=========================================================
*/


const ForgeTerrain = (()=>{


/*
=========================================================
 GENERATE TERRAIN
=========================================================
*/


function generate(land, climate="temperate"){


    const terrain = {


        mountains: [],

        forests: [],

        swamps: [],

        deserts: [],

        hills: [],

        rivers: []

    };



    land.continents.forEach(
        continent=>{


            generateMountainRanges(
                continent,
                terrain
            );


            generateForests(
                continent,
                terrain,
                climate
            );


            generateRivers(
                continent,
                terrain
            );


        }
    );



    generateIslands(
        land,
        terrain
    );



    return terrain;


}





/*
=========================================================
 MOUNTAINS
=========================================================
*/


function generateMountainRanges(
    continent,
    terrain
){


    const amount =
        randomRange(
            1,
            3
        );



    for(
        let i=0;
        i<amount;
        i++
    ){


        terrain.mountains.push({

            x:
            continent.x
            +
            randomRange(
                -continent.radius/2,
                continent.radius/2
            ),


            y:
            continent.y
            +
            randomRange(
                -continent.radius/2,
                continent.radius/2
            ),


            length:
            randomRange(
                80,
                180
            )


        });


    }


}





/*
=========================================================
 FORESTS
=========================================================
*/


function generateForests(
    continent,
    terrain,
    climate
){


    const amount =
        climate==="tropical"
        ?
        randomRange(5,10)
        :
        randomRange(2,6);



    for(
        let i=0;
        i<amount;
        i++
    ){


        terrain.forests.push({

            x:
            continent.x
            +
            randomRange(
                -continent.radius,
                continent.radius
            ),


            y:
            continent.y
            +
            randomRange(
                -continent.radius,
                continent.radius
            ),


            density:
            randomRange(
                1,
                5
            )


        });


    }


}





/*
=========================================================
 RIVERS
=========================================================
*/


function generateRivers(
    continent,
    terrain
){


    const amount =
        randomRange(
            1,
            3
        );



    for(
        let i=0;
        i<amount;
        i++
    ){


        terrain.rivers.push({

            startX:
            continent.x
            +
            randomRange(
                -50,
                50
            ),


            startY:
            continent.y
            -
            continent.radius/2,


            endX:
            continent.x
            +
            randomRange(
                -continent.radius,
                continent.radius
            ),


            endY:
            continent.y
            +
            continent.radius


        });


    }


}





/*
=========================================================
 ISLAND TERRAIN
=========================================================
*/


function generateIslands(
    land,
    terrain
){


    land.islands.forEach(
        island=>{


            if(
                Math.random()>.5
            ){

                terrain.hills.push({

                    x:island.x,

                    y:island.y

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