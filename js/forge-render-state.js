/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 RENDER STATE MANAGER

 Version 1.0

 "A cartographer remembers the hand,
  the parchment, and the path."

=========================================================
*/


const ForgeRenderState = (()=>{


let state = {


    /*
    Current world blueprint

    Filled by:
    forge-map-data.js

    */

    currentMap:null,



    /*
    Current artist

    Filled by:
    forge-cartographers.js

    */

    cartographer:
        "oldExplorer",



    /*
    Current visual style

    Examples:

    ancient
    royal
    wilderness
    nautical

    */

    style:
        "ancient",



    /*
    Camera controls

    Future:

    zooming
    panning
    map inspection

    */

    zoom:
        1,


    offsetX:
        0,


    offsetY:
        0,



    /*
    Rendering options

    */

    showLabels:
        true,


    showGrid:
        false,


    showHex:
        false,



    /*
    Edition history

    Every redraw becomes
    a new map edition.

    */

    edition:
        1



};




/*
=========================================================
 SET MAP
=========================================================
*/


function setMap(map){


    state.currentMap =
        map;


}




/*
=========================================================
 GET STATE
=========================================================
*/


function get(){


    return state;


}




/*
=========================================================
 UPDATE STATE
=========================================================
*/


function update(values){


    state = {

        ...state,

        ...values

    };


}




/*
=========================================================
 NEW EDITION

 Used when:

 Same world
 Different cartographer

=========================================================
*/


function newEdition(){


    state.edition++;


    return state.edition;


}





/*
=========================================================
 RESET VIEW

=========================================================
*/


function resetView(){


    state.zoom = 1;


    state.offsetX = 0;


    state.offsetY = 0;


}




/*
=========================================================
 PUBLIC API
=========================================================
*/


return{


    get,

    setMap,

    update,

    newEdition,

    resetView


};



})();