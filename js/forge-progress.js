/* =========================================

   RPG CORNUCOPIA
   THE FORGE

   Forge Progress System

   Gives each artisan a moment of theater.

========================================= */


const ForgeProgress = (() => {


    const messages = {


        nameSmith:[

            "Chasing away alphabet gremlins...",
            "Searching for vowel tweezers...",
            "Polishing forgotten syllables...",
            "Convincing letters to cooperate...",
            "Checking for accidental tongue twisters...",
            "Putting out completely intentional fires...",
            "Explaining the noise to the neighbors...",
            "Rethinking my career decisions..."

        ],



        keeperOfFate:[

            "Consulting the ancient bones...",
            "Negotiating with probability...",
            "Checking whether destiny is awake...",
            "Reminding fate about proper etiquette...",
            "Watching the stars align...",
            "Asking the dragon to stop breathing on the dice..."

        ],



        characterSmith:[

            "Tempering personality traits...",
            "Balancing courage and questionable decisions...",
            "Searching for hidden motivations...",
            "Adding just the right amount of trouble..."

        ],



        architect:[

            "Convincing walls to remain upright...",
            "Measuring suspiciously empty spaces...",
            "Checking foundation paperwork...",
            "Making room for secret passages..."

        ]

    };





    function getMessages(artisan){


        const forge =
            messages[artisan] ||
            messages.nameSmith;



        const roll =
            Math.random();



        /*
            Most operations are instant.
            This determines theatrical level.

            50% no message
            40% one message
            10% two messages
        */


        if(roll < 0.5){

            return [];

        }


        if(roll < 0.9){

            return [

                randomFrom(forge)

            ];

        }


        return [

            randomFrom(forge),

            randomFrom(forge)

        ];


    }






    function randomFrom(list){


        return list[
            Math.floor(
                Math.random() *
                list.length
            )
        ];


    }





    function start(artisan, elementID){


        const element =
            document.getElementById(
                elementID
            );


        if(!element){

            return null;

        }



        const lines =
            getMessages(
                artisan
            );



        if(lines.length === 0){

            return null;

        }




        element.innerHTML =
            "";



        let index = 0;



        const interval =
            setInterval(() => {


                if(index >= lines.length){


                    clearInterval(
                        interval
                    );


                    return;


                }



                const message =
                    document.createElement(
                        "div"
                    );


                message.className =
                    "forge-progress-message";



                message.textContent =
                    lines[index];



                element.appendChild(
                    message
                );



                index++;


            },350);



        return interval;


    }







    function clear(timer, elementID){


        if(timer){

            clearInterval(timer);

        }



        const element =
            document.getElementById(
                elementID
            );



        if(element){

            element.innerHTML =
                "";

        }


    }





    return {


        start,

        clear


    };



})();