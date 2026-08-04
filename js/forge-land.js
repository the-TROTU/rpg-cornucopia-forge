/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 LAND GENERATION ENGINE

 Version 4.0.0

 "The world rises from the deep."

=========================================================
*/


const ForgeLand = (()=>{


/*
=========================================================
 GENERATE LAND
=========================================================
*/


function generate(world){


    const settings =
        world.settings || {};



    const size =
        settings.size || "medium";



    const dimensions =
        getDimensions(size);



    const land = {


        width:
        dimensions.width,


        height:
        dimensions.height,


        cells:[],


        continents:[],


        islands:[],


        coastline:[]


    };



    createGrid(
        land
    );



    createContinents(
        land
    );



    createIslands(
        land
    );



    traceCoastline(
        land
    );



    return land;


}





/*
=========================================================
 GRID
=========================================================
*/


function createGrid(land){


    for(
        let y=0;
        y<land.height;
        y++
    ){


        for(
            let x=0;
            x<land.width;
            x++
        ){


            land.cells.push({

                x:x,

                y:y,

                land:false,

                continent:null,

                height:0

            });


        }


    }


}





/*
=========================================================
 CONTINENTS
=========================================================
*/


function createContinents(land){


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


        const continent={


            id:i,


            x:
            randomRange(
                20,
                land.width-20
            ),


            y:
            randomRange(
                20,
                land.height-20
            ),


            radius:
            randomRange(
                10,
                25
            )


        };



        land.continents.push(
            continent
        );



        growContinent(
            land,
            continent
        );


    }


}





/*
=========================================================
 CONTINENT GROWTH
=========================================================
*/


function growContinent(
    land,
    continent
){


    land.cells.forEach(
        cell=>{


            const distance =
                Math.sqrt(

                    Math.pow(
                        cell.x-continent.x,
                        2
                    )

                    +

                    Math.pow(
                        cell.y-continent.y,
                        2
                    )

                );



            const distortion =
                randomRange(
                    -5,
                    5
                );



            if(
                distance <
                continent.radius + distortion
            ){

                cell.land=true;

                cell.continent =
                    continent.id;

            }


        }
    );


}





/*
=========================================================
 ISLANDS
=========================================================
*/


function createIslands(land){


    const amount =
        randomRange(
            8,
            20
        );



    for(
        let i=0;
        i<amount;
        i++
    ){


        const island={


            id:i,


            x:
            randomRange(
                5,
                land.width-5
            ),


            y:
            randomRange(
                5,
                land.height-5
            ),


            radius:
            randomRange(
                2,
                5
            )


        };



        land.islands.push(
            island
        );


        land.cells.forEach(
            cell=>{


                const distance =
                    Math.sqrt(

                    Math.pow(
                        cell.x-island.x,
                        2
                    )

                    +

                    Math.pow(
                        cell.y-island.y,
                        2
                    )

                    );



                if(
                    distance <
                    island.radius
                ){

                    cell.land=true;

                }


            }
        );


    }


}





/*
=========================================================
 COASTLINE
=========================================================
*/


function traceCoastline(land){


    land.cells.forEach(
        cell=>{


            if(!cell.land){

                return;

            }



            const neighbors =
                getNeighbors(
                    land,
                    cell
                );



            const oceanTouch =
                neighbors.some(
                    neighbor=>
                    !neighbor.land
                );



            if(
                oceanTouch
            ){

                land.coastline.push(
                    cell
                );

            }


        }
    );


}





/*
=========================================================
 HELPERS
=========================================================
*/


function getNeighbors(
    land,
    cell
){


    const result=[];


    const directions=[

        [1,0],
        [-1,0],
        [0,1],
        [0,-1]

    ];



    directions.forEach(
        dir=>{


            const x =
                cell.x+dir[0];


            const y =
                cell.y+dir[1];



            const found =
                land.cells.find(
                    c=>
                    c.x===x &&
                    c.y===y
                );



            if(found){

                result.push(
                    found
                );

            }


        }
    );


    return result;


}





function getDimensions(size){


    if(size==="small"){

        return {

            width:80,

            height:60

        };

    }


    if(size==="large"){

        return {

            width:160,

            height:120

        };

    }



    return {

        width:120,

        height:90

    };


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





return{


    generate


};


})();