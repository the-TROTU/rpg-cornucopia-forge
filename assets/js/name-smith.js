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



        const cultures =
            ForgeLanguage
                .get("fantasy-core")
                .cultures;



        Object.keys(cultures)
            .forEach(id => {


                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    id;


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



        setTimeout(() => {



            const culture =
                document
                    .getElementById(
                        "forge-culture"
                    )
                    .value;



            const gender =
                document
                    .getElementById(
                        "forge-gender"
                    )
                    .value;



            const surname =
                document
                    .getElementById(
                        "forge-surname"
                    )
                    .checked;



            const title =
                document
                    .getElementById(
                        "forge-title"
                    )
                    .checked;



            const trueName =
                document
                    .getElementById(
                        "forge-true-name"
                    )
                    .checked;



            const result =
                ForgeName.generate({

                    pack:
                        "fantasy-core",

                    culture,

                    gender,

                    surname,

                    title,

                    trueName

                });



            displayResult(
                result
            );



            button.textContent =
                "⚒ Forge Another";



            button.disabled =
                false;



        },300);



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
                ${result.fullName}
            </div>`;



        if(result.title){

            html +=
                `<div class="forge-result-detail">
                    ${result.title}
                </div>`;

        }



        if(result.trueName){

            html +=
                `<div class="forge-result-detail">
                    True Name:
                    ${result.trueName}
                </div>`;

        }



        html +=
            `<div class="forge-seed">
                Seed:
                ${result.seed}
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