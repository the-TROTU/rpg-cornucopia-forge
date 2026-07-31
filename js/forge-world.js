/*
=========================================================

 RPG CORNUCOPIA

 FORGE WORLD ENGINE

 File:
 forge-world.js

 Version:
 1.0.0

 Purpose:

 Creates world data.

 Does NOT render.

 Does NOT draw.

 Returns a world object that ForgeMap
 can display.

=========================================================
*/

const ForgeWorld = (()=>{

let world=[];

let width=0;
let height=0;


/*=======================================================
CREATE TILE
=======================================================*/

function createTile(x,y){

    return{

        x:x,
        y:y,

        terrain:"plains",

        elevation:0,

        moisture:0,

        temperature:0,

        river:false,

        road:false,

        settlement:null,

        region:null,

        explored:false,

        notes:[]

    };

}


/*=======================================================
GENERATE WORLD
=======================================================*/

function generate(options={}){

    width=
        options.width || 50;

    height=
        options.height || 50;

    world=[];

    for(let y=0;y<height;y++){

        const row=[];

        for(let x=0;x<width;x++){

            row.push(

                createTile(x,y)

            );

        }

        world.push(row);

    }

    return world;

}


/*=======================================================
GET TILE
=======================================================*/

function getTile(x,y){

    if(

        x<0 ||

        y<0 ||

        x>=width ||

        y>=height

    ){

        return null;

    }

    return world[y][x];

}


/*=======================================================
SET TERRAIN
=======================================================*/

function setTerrain(x,y,type){

    const tile=
        getTile(x,y);

    if(tile){

        tile.terrain=type;

    }

}


/*=======================================================
PUBLIC
=======================================================*/

return{

    generate,

    getTile,

    setTerrain

};

})();