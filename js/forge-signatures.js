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

                "The Forge grew quiet.

                Even the flames seemed to listen.

                Something ancient approved."

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

        },


        dragonKeeper:{


            common:[

                "Fireproof gloves recommended.",

                "Ancient wisdom included.",

                "Handle with excessive respect."

            ],


            humorous:[

                "Village evacuation remains optional.",

                "Hoard capacity tested.",

                "The dragon insists the spelling is correct."

            ],


            legendary:[

                "The dragon opened one eye.

                It approved."

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