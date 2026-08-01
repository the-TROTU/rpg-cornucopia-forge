/*
=========================================================

 RPG CORNUCOPIA

 THE CARTOGRAPHER

 Interface Controller

 Version 2.0

 "The map waits.
 The ink remembers."

=========================================================
*/


const Cartographer = (()=>{


let currentWorld = null;



/*
=========================================================
 INITIALIZE
=========================================================
*/


function initialize(){


    console.log(
        "Cartographer awakened."
    );



    ForgeRenderer.initialize(
        "world-canvas"
    );



    const generateButton =
        document.getElementById(
            "generate-world"
        );



    if(generateButton){


        generateButton.addEventListener(

            "click",

            generateWorld

        );


    }



    const seedButton =
        document.getElementById(
            "new-seed"
        );



    if(seedButton){


        seedButton.addEventListener(

            "click",

            ()=>{

                document.getElementById(
                    "world-seed"
                ).value =
                    "";

                generateWorld();

            }

        );


    }



}




/*
=========================================================
 GENERATE WORLD
=========================================================
*/


function generateWorld(){



    const options={



        seed:

            document.getElementById(
                "world-seed"
            ).value
            ||
            null,



        size:

            document.getElementById(
                "world-size"
            ).value,



        style:

            document.getElementById(
                "terrain-style"
            ).value,



        climate:

            document.getElementById(
                "world-climate"
            ).value,



        civilization:

            document.getElementById(
                "civilization-level"
            ).value


    };





    currentWorld =

        ForgeMapData.generate(
            options
        );

        console.log(
            "GENERATED WORLD:",
            currentWorld
        );


    ForgeRenderer.render(
        currentWorld
    );



    updateSummary();



    updateJournal();



}




/*
=========================================================
 WORLD SUMMARY
=========================================================
*/


function updateSummary(){


    const box =
        document.getElementById(
            "world-summary"
        );



    if(!box || !currentWorld){

        return;

    }



    box.innerHTML = `


<strong>
Blueprint:
</strong>

${currentWorld.blueprint}


<br><br>


<strong>
Seed:
</strong>

${currentWorld.seed}


<br><br>


<strong>
Features:
</strong>

${currentWorld.features.length}


<br><br>


<strong>
Settlements:
</strong>

${currentWorld.settlements.length}



`;



}




/*
=========================================================
 JOURNAL
=========================================================
*/


function updateJournal(){


    const journal =
        document.getElementById(
            "cartographer-journal"
        );



    if(!journal || !currentWorld){

        return;

    }



    journal.innerHTML = `


<h3>

${currentWorld.blueprint}

</h3>


<p>

A new world has been charted.

</p>


<p>

The Cartographer recorded:

</p>


<ul>

${

currentWorld.features
.map(

feature=>

`

<li>

${feature.type}

</li>

`

)

.join("")

}

</ul>


`;



}




return{


    initialize


};


})();





document.addEventListener(

"DOMContentLoaded",

Cartographer.initialize

);