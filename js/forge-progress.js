/* =========================================

   RPG CORNUCOPIA
   THE FORGE

   Forge Progress Engine
   Version 2.0

========================================= */

const ForgeProgress = (() => {

    const messages = {

        nameSmith: [

            "⚒ Chasing away alphabet gremlins...",
            "⚒ Searching for vowel tweezers...",
            "⚒ Polishing forgotten syllables...",
            "⚒ Putting out completely intentional fires...",
            "⚒ Explaining the noise to the neighbors...",
            "⚒ Rethinking my career decisions...",
            "⚒ Convincing vowels to behave..."

        ],

        keeperOfFate: [

            "🐉 Consulting the oldest bones...",
            "🐉 Negotiating with probability...",
            "🐉 Asking destiny for clarification...",
            "🐉 Checking whether fate is awake...",
            "🐉 Asking the dragon to stop breathing on the dice..."

        ],

        characterSmith: [

            "⚒ Tempering personality traits...",
            "⚒ Polishing questionable life choices...",
            "⚒ Adjusting heroic tendencies..."

        ],

        architect: [

            "⚒ Measuring suspicious empty spaces...",
            "⚒ Convincing walls to remain upright...",
            "⚒ Looking for room for a secret passage..."

        ]

    };


    function randomMessage(artisan){

        const pool =
            messages[artisan] || [];

        if(pool.length === 0){
            return "";
        }

        return pool[
            Math.floor(
                Math.random() * pool.length
            )
        ];

    }


    function run(artisan, elementID, callback){

        const element =
            document.getElementById(elementID);

        if(!element){

            callback();
            return;

        }

        const roll = Math.random();

        let count = 0;

        if(roll < 0){

            count = 0;

        }
        else if(roll < 0.80){

            count = 1;

        }
        else{

            count = 2;

        }

        if(count === 0){

            callback();
            return;

        }

        element.innerHTML = "";

        let shown = 0;

        function showNext(){

            const div =
                document.createElement("div");

            div.className =
                "forge-progress-message";

            div.textContent =
                randomMessage(artisan);

            element.innerHTML = "";

            element.appendChild(div);

            shown++;

            if(shown >= count){

                setTimeout(callback,180);

            }
            else{

                setTimeout(showNext,180);

            }

        }

        showNext();

    }


    return {

        run

    };

})();

console.log("ForgeProgress awakened.");