/* =========================================

   RPG CORNUCOPIA
   THE FORGE

   Name Smith Interface Controller

========================================= */


const NameSmith = (() => {


    function initialize(){

        populateCultures();

        bindEvents();

    }




    /*
        Populate culture choices
    */

    function populateCultures(){


        const cultureSelect =
            document.getElementById(
                "forge-culture"
            );


        if(!cultureSelect){

            return;

        }


        if(typeof ForgeLanguage === "undefined"){

    console.error(
        "ForgeLanguage engine has not loaded."
    );

    return;

}


const language =
    ForgeLanguage.get(
        "fantasy-core"
    );


        if(
            !language ||
            !language.cultures
        ){

            console.error(
                "Fantasy Core language pack missing."
            );

            return;

        }


        const cultures =
            language.cultures;



        Object.keys(cultures)
            .forEach(id => {


                const option =
                    document.createElement(
                        "option"
                    );


                option.value = id;


                option.textContent =
                    cultures[id].name;



                cultureSelect.appendChild(
                    option
                );


            });


    }





    /*
        Button connections
    */

    function bindEvents(){


        const button =
            document.getElementById(
                "forge-name-button"
            );


        if(!button){

            return;

        }



        button.addEventListener(
            "click",
            forgeName
        );


    }





    /*
        Main forging event
    */

    function forgeName(){


        const button =
            document.getElementById(
                "forge-name-button"
            );


        button.textContent =
            "Forging...";


        button.disabled =
            true;

        const progress =
            ForgeProgress.start(
            "nameSmith",
             "forge-progress"
            );



        ForgeProgress.run(
    "nameSmith",
    "forge-progress",
    () => {

        const result =
            ForgeName.generate({

                pack:"fantasy-core",

                culture,

                gender,

                surname,

                title:includeTitle,

                trueName:includeTrueName

            });

        if(result){

            displayResult(result);

        }

        button.textContent =
            "⚒ Forge Another";

        button.disabled = false;

    }
);,300);


    }





    /*
        Display the forged creation
    */

    function displayResult(result){



        const output =
            document.getElementById(
                "forge-result"
            );



        if(!output){

            return;

        }



        let html = "";



        html +=
            `<div class="forge-result-name">
                ${result.product.fullName}
            </div>`;



        if(result.product.title){


            html +=
                `<div class="forge-title">
                    <small>❖ ${result.product.title}</small>
                    
                </div>`;

        }




        if(result.product.trueName){


            html +=
                `<div class="forge-true-name">

                    <strong>
                        True Name
                    </strong>

                    <br>

                    ${result.product.trueName}

                </div>`;


        }




        html +=
            `<div class="forge-blueprint">

                ⚒ Blueprint: 
                ${result.blueprint}

            </div>`;





        html +=
            `<div class="forge-signature">

                ⚒

                ${ForgeSignatures.random(
                    "nameSmith"
                )}

                <br><br>

                ~ Aldren, Name Smith

            </div>`;





        output.innerHTML =
            html;


    }





    return {


        initialize


    };



})();





document.addEventListener(
    "DOMContentLoaded",
    NameSmith.initialize
);