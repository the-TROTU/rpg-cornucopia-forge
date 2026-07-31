/*
=========================================================

 RPG CORNUCOPIA

 FORGE MAP ENGINE

 File:
 forge-map.js

 Version:
 1.0.0

 Purpose:

 Canvas Rendering Engine

 Responsible ONLY for drawing.

 It never generates terrain.

 It never creates cities.

 It simply renders whatever world data
 it receives.

=========================================================
*/

const ForgeMap = (() => {

let canvas = null;

let ctx = null;

let tileSize = 24;

let zoom = 1;

let offsetX = 0;

let offsetY = 0;

let world = [];



/*=======================================================
INITIALIZE
=======================================================*/

function initialize(canvasID){

    canvas = document.getElementById(canvasID);

    if(!canvas){

        console.error(
            "ForgeMap: Canvas not found."
        );

        return;
    }

    ctx = canvas.getContext("2d");

    resize();

}



/*=======================================================
RESIZE
=======================================================*/

function resize(){

    if(!canvas){

        return;

    }

    canvas.width =
        canvas.clientWidth;

    canvas.height =
        canvas.clientHeight;

}



/*=======================================================
CLEAR
=======================================================*/

function clear(){

    if(!ctx){

        return;

    }

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}



/*=======================================================
SET WORLD
=======================================================*/

function setWorld(worldData){

    world = worldData;

}



/*=======================================================
DRAW SINGLE TILE
=======================================================*/

function drawTile(x, y, tile){

    if(!ctx){
        return;
    }

    ctx.fillStyle =
        terrainColor(tile.terrain);

    ctx.fillRect(

        x * tileSize * zoom + offsetX,

        y * tileSize * zoom + offsetY,

        tileSize * zoom,

        tileSize * zoom

    );

}



/*=======================================================
DRAW ENTIRE WORLD
=======================================================*/

function drawWorld(){

    clear();

    if(

        !world ||

        world.length===0

    ){

        return;

    }

    for(

        let y=0;

        y<world.length;

        y++

    ){

        for(

            let x=0;

            x<world[y].length;

            x++

        ){

            drawTile(

                x,

                y,

                world[y][x]

            );

        }

    }

}



/*=======================================================
RENDER
=======================================================*/

function render(){

    drawWorld();

}



/*=======================================================
TERRAIN COLORS
=======================================================*/

function terrainColor(type){

    switch(type){

        case "water":

            return "#2f6fa3";

        case "coast":

            return "#d7c28b";

        case "plains":

            return "#7ba65a";

        case "forest":

            return "#355f39";

        case "mountain":

            return "#787878";

        case "snow":

            return "#ece8df";

        case "desert":

            return "#d4b56a";

        case "swamp":

            return "#4b5b35";

        default:

            return "#202020";

    }

}



/*=======================================================
CAMERA
=======================================================*/

function setZoom(value){

    zoom = value;

}

function getZoom(){

    return zoom;

}

function setOffset(x,y){

    offsetX = x;

    offsetY = y;

}



/*=======================================================
PUBLIC
=======================================================*/

return{

    initialize,

    resize,

    clear,

    render,

    drawWorld,

    setWorld,

    setZoom,

    getZoom,

    setOffset

};

})();