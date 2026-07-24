/* =========================================

   RPG CORNUCOPIA
   THE FORGE - Signature System

   Gives each artisan a voice.

========================================= */


const ForgeSignatures = (() => {


    const signatures = {


        nameSmith:{


            common:[

                "Forged while the anvil was still warm.",

                "Another fine name escapes the Forge.",

                "Tempered to survive countless adventures.",

                "Cooled in the waters of imagination.",

                "A worthy name for a worthy tale."

            ],


            humorous:[

                "One thumb was bruised. The name survived.",

                "The apprentice dropped the first attempt.",

                "Hammered into existence with alarming enthusiasm.",

                "Guaranteed at least 87% pronounceable.",

                "The spelling survived the apprentice's suggestions."

            ],


            rare:[

                "The furnace burned blue for a moment. Nobody mentioned it.",

                "The old smith paused before striking the final blow.",

                "A passing dragon watched this one being forged."

            ],


            legendary:[

                "The Forge grew quiet. Even the flames seemed to listen. Something ancient approved."

            ]


        },

        keeperOfFate:{


            common:[

                "The bones have fallen. The answer has been recorded.",

                "The stars take note.",

                "The scales shift, and fate speaks.",

                "The Keeper has considered the possibilities.",

                "The ancient tally has been completed."

            ],



            humorous:[

                "The dragon insists the dice were properly warmed.",

                "The universe was consulted. It remained vague.",

                "The Keeper blames the dice. The dice blame destiny.",

                "Probability has been politely reminded of expectations."

            ],



            rare:[

                "The Keeper opens one ancient eye.",

                "A forgotten path briefly reveals itself.",

                "The stars pause before continuing their dance."

            ],



            legendary:[

                "For one impossible moment, fate looked back.",

                "The first dragon counted these numbers long ago.",

                "The universe waited for the result."

            ]


        },


        characterSmith:{


            common:[

                "Personality successfully tempered.",

                "A new soul enters the story.",

                "Ready for adventure, danger, and questionable decisions."

            ],


            humorous:[

                "This one already has opinions.",

                "The armor fit eventually.",

                "Comes with exactly one mysterious scar."

            ]

        },


        architect:{


            common:[

                "Foundation inspected and approved.",

                "Construction completed successfully.",

                "The first stone has been placed."

            ],


            humorous:[

                "One tower leans artistically.",

                "The goblin zoning permits were ignored.",

                "Every city needs at least one suspicious alley."

            ]

        }


    };



    function randomFrom(list){


        return list[
            Math.floor(
                Math.random() *
                list.length
            )
        ];


    }



    function random(artisan){


        const forge =
            signatures[artisan];


        if(!forge){

            return "";

        }



        const roll =
            Math.random();



        if(
            forge.legendary &&
            roll < 0.002
        ){

            return randomFrom(
                forge.legendary
            );

        }



        if(
            forge.rare &&
            roll < 0.02
        ){

            return randomFrom(
                forge.rare
            );

        }



        if(
            forge.humorous &&
            roll < 0.25
        ){

            return randomFrom(
                forge.humorous
            );

        }



        return randomFrom(
            forge.common
        );


    }



    return {


        random


    };


})();