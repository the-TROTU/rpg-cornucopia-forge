/*
=========================================================
 RPG CORNUCOPIA

 THE KEEPER OF FATE
 Interface Controller

 Version 1.0.0

 "The bones fall.
  The Keeper remembers."

=========================================================
*/


const KeeperOfFate = (() => {



    const whispers = {


        common:[

            "The bones awaken...",

            "The Keeper consults the ancient tally...",

            "The scales shift...",

            "The stars take note..."

        ],


        rare:[

            "The Keeper opens one ancient eye...",

            "A forgotten probability stirs...",

            "The old dragon remembers this path..."

        ],


        legendary:[

            "The stars hesitate.",

            "For one moment, fate looks back.",

            "Even the Keeper waits to see what falls."

        ]


    };






    function randomFrom(list){


        return list[

            Math.floor(
                Math.random() * list.length
            )

        ];


    }






    function keeperQuote(){


        const roll =
            Math.random();



        if(roll < .02){

            return randomFrom(
                whispers.legendary
            );

        }



        if(roll < .15){

            return randomFrom(
                whispers.rare
            );

        }



        return randomFrom(
            whispers.common
        );


    }







    function initialize(){


        const button =

            document.getElementById(
                "roll-dice-button"
            );



        if(!button){

            return;

        }



        button.addEventListener(

            "click",

            castFate

        );


    }







    function castFate(){



        const button =

            document.getElementById(
                "roll-dice-button"
            );



        const output =

            document.getElementById(
                "dice-result"
            );




        button.disabled = true;


        button.textContent =
            "🐉 Consulting Fate...";






        const progress =

            randomFrom(
                [
                    "The bones are awakened...",
                    "Counting possibilities...",
                    "Chasing stray probabilities...",
                    "Asking the dragon to stop judging...",
                    "Checking whether fate is behaving itself..."
                ]
            );



        output.innerHTML =

            `<div class="forge-signature">
                ${progress}
             </div>`;







        setTimeout(() => {



            const sides =

                Number(

                    document
                    .getElementById(
                        "dice-type"
                    )
                    .value

                );



            const count =

                Number(

                    document
                    .getElementById(
                        "dice-count"
                    )
                    .value

                );



            const modifier =

                Number(

                    document
                    .getElementById(
                        "dice-modifier"
                    )
                    .value

                );







            const result =

                ForgeDice.roll(

                    sides,

                    count,

                    modifier

                );







            displayResult(
                result
            );



            button.disabled = false;


            button.textContent =

                "🐉 Cast the Bones";



        },500);



    }









    function displayResult(result){



        const output =

            document.getElementById(
                "dice-result"
            );



        let rolls =

            result.results.join(
                " + "
            );



        let modifierText = "";



        if(result.modifier !== 0){


            modifierText =

                result.modifier > 0

                ?

                ` + ${result.modifier}`

                :

                ` - ${Math.abs(result.modifier)}`;


        }






        output.innerHTML =



        `

        <div class="forge-result-name">

            ${result.total}

        </div>



        <div>

            The bones:

            <br>

            ${rolls}

            ${modifierText}

        </div>




        <div class="forge-blueprint">

            🐉 Blueprint No.

            ${result.blueprint}

        </div>




        <div class="forge-signature">

            ${keeperQuote()}

            <br><br>

            ~ The Keeper of Fate

        </div>


        `;



    }







    return {


        initialize


    };



})();







document.addEventListener(

    "DOMContentLoaded",

    KeeperOfFate.initialize

);