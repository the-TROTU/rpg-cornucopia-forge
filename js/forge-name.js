/*======================================================

RPG Cornucopia
The Forge

File:
    forge-name.js

Version:
    1.1.0

Purpose:
    Generates names using language packs.

    Name Smith v1.1
    - Absolute user controls
    - Blueprint system
    - True Name support
    - Artisan standard output

======================================================*/


const ForgeName = (() => {


    function generate(options = {}) {


        const generationSeed =
            options.seed ||
            ForgeSeed.create();


        ForgeRandom.setSeed(
            generationSeed
        );


        const packID =
            options.pack ||
            "fantasy-core";


        const cultureID =
            options.culture ||
            "common";


        const language =
            ForgeLanguage.get(
                packID
            );


        if(!language){

            console.error(
                "Language pack missing:",
                packID
            );

            return null;

        }


        const culture =
            language.cultures[cultureID];


        if(!culture){

            console.error(
                "Culture missing:",
                cultureID
            );

            return null;

        }



        /*
        ================================================
        Forge Instructions
        The user decides.
        The Forge obeys.
        ================================================
        */


        const includeSurname =
            options.surname === true;


        const includeTitle =
            options.title === true;


        const revealTrueName =
            options.trueName === true;



        /*
        ================================================
        Select naming pool
        ================================================
        */


        let namePool;


        if(
            options.gender &&
            culture.given[options.gender]
        ){

            namePool =
                culture.given[
                    options.gender
                ];

        }
        else{

            namePool =
                culture.given.neutral;

        }



        /*
        ================================================
        Create given name
        ================================================
        */


        const given =
            buildWord(
                namePool,
                culture.profile
            );



        /*
        ================================================
        Optional surname
        ================================================
        */


        let surname = null;


        if(
            includeSurname &&
            culture.surname
        ){

            surname =
                buildSurname(
                    culture.surname
                );

        }



        /*
        ================================================
        Optional title
        ================================================
        */


        let title = null;


        if(
            includeTitle &&
            culture.titles
        ){

            title =
                ForgeRandom
                    .weighted(
                        culture.titles
                    )
                    .text;

        }



        /*
        ================================================
        Optional true name
        ================================================
        */


        let trueName = null;


        if(
            revealTrueName
        ){

            trueName =
                buildWord(
                    namePool,
                    culture.profile
                );

        }



        /*
        ================================================
        Build final product
        ================================================
        */


        const product = {


            given,


            fullName:
                surname
                ? `${given} ${surname}`
                : given

        };



        if(surname){

            product.surname =
                surname;

        }


        if(title){

            product.title =
                title;

        }


        if(trueName){

            product.trueName =
                trueName;

        }



        /*
        ================================================
        Return Forge Standard Object
        ================================================
        */


        return {


            artisan:
                "name-smith",


            blueprint:
                generationSeed,


            product,


            culture:
                cultureID,


            pack:
                packID


        };


    }





    /*
    ================================================
    Word Builder
    ================================================
    */


    function buildWord(parts, profile = {}){


        let structureOptions = [];


        const lengths =
            profile.syllableLength || [];



        lengths.forEach(item => {


            if(item.value === 1 ||
               item.value === 2){

                structureOptions.push({

                    value:"open-end",

                    weight:item.weight

                });

            }


            if(item.value === 3){

                structureOptions.push({

                    value:"open-middle-end",

                    weight:item.weight

                });

            }


            if(item.value >= 4){

                structureOptions.push({

                    value:"open-middle-middle-end",

                    weight:item.weight

                });

            }


        });



        if(structureOptions.length === 0){

            structureOptions = [

                {
                    value:"open-middle-end",
                    weight:100
                }

            ];

        }



        const structure =
            ForgeRandom.weighted(
                structureOptions
            );



        let word = "";



        switch(structure.value){


            case "open-end":

                word =
                    pick(parts.openings) +
                    pick(parts.endings);

                break;



            case "open-middle-end":

                word =
                    pick(parts.openings) +
                    pick(parts.middles) +
                    pick(parts.endings);

                break;



            case "open-middle-middle-end":

                word =
                    pick(parts.openings) +
                    pick(parts.middles) +
                    pick(parts.middles) +
                    pick(parts.endings);

                break;


        }


        return clean(word);


    }





    function buildSurname(parts){


        return clean(

            pick(parts.openings) +
            pick(parts.endings)

        );


    }





    function pick(list){


        return ForgeRandom
            .weighted(list)
            .text;


    }





    function clean(word){


        word =
            word.trim();



        word =
            word.replace(
                /(.)\1\1+/g,
                "$1$1"
            );



        word =
            word.replace(
                /aa+/gi,
                "a"
            );


        word =
            word.replace(
                /ee+/gi,
                "e"
            );


        word =
            word.replace(
                /ii+/gi,
                "i"
            );



        return (
            word.charAt(0).toUpperCase()
            +
            word.slice(1)
        );


    }





    return {


        generate


    };


})();