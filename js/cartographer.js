/*
=========================================================

 RPG CORNUCOPIA

 THE CARTOGRAPHER

 Interface Controller

 Version 1.0.0

 "Every world begins with a single line."

=========================================================
*/

const Cartographer = (() => {

let currentWorld = null;

let currentSeed = "";



/*=======================================================
INITIALIZE
=======================================================*/
ForgeRenderer.initialize();
ForgeRenderer.render();

function initialize(){

    document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        ForgeMap.initialize();

    }
    );

    const button =
        document.getElementById(
            "generate-map"
        );

    if(button){

        button.addEventListener(

            "click",

            generateWorld

        );

    }

    window.addEventListener(

        "resize",

        ()=>{

            ForgeMap.resize();

            ForgeMap.render();

        }

    );

    generateWorld();

}



/*=======================================================
GENERATE WORLD
=======================================================*/

function generateWorld(){

    currentSeed =
        createSeed();

    const seedBox =
        document.getElementById(
            "world-seed"
        );

    if(seedBox){

        seedBox.value =
            currentSeed;

    }

    currentWorld =
        ForgeWorld.generate({

            width:60,

            height:40,

            seed:currentSeed

        });

    ForgeMap.setWorld(

        currentWorld

    );

    ForgeMap.render();

    updateSummary();

}



/*=======================================================
WORLD SUMMARY
=======================================================*/

function updateSummary(){

    const summary =
        document.getElementById(
            "world-summary"
        );

    if(!summary){

        return;

    }

    summary.innerHTML =

    `
    <strong>Seed</strong><br>

    ${currentSeed}

    <br><br>

    <strong>Size</strong><br>

    60 × 40

    <br><br>

    <strong>Tiles</strong><br>

    ${60*40}
    `;

}



/*=======================================================
SEED
=======================================================*/

function createSeed(){

    return Math.random()

        .toString(36)

        .substring(2,10)

        .toUpperCase();

}



/*=======================================================
PUBLIC
=======================================================*/

return{

    initialize

};

})();



document.addEventListener(

    "DOMContentLoaded",

    Cartographer.initialize

);