/*======================================================

   RPG CORNUCOPIA
   THE FORGE

File:
    forge-name.js

Version:
    2.0.0

Purpose:
    Intelligent Name Smith Engine

    Pass 1:
    - Candidate forging
    - Name scoring
    - Repetition awareness
    - Improved uniqueness

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




        const includeSurname =
            options.surname === true;



        const includeTitle =
            options.title === true;



        const revealTrueName =
            options.trueName === true;





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
        ============================================
        NEW:
        The Name Smith forges several candidates
        and selects the strongest.
        ============================================
        */


        const given =
            forgeBestName(
                namePool,
                culture.profile
            );



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



        let trueName = null;



        if(
            revealTrueName
        ){

            trueName =
                forgeBestName(
                    namePool,
                    culture.profile
                );

        }




        const product = {


            given,


            fullName:

                surname

                ?

                `${given} ${surname}`

                :

                given


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
    Candidate Selection Engine
    ================================================
    */


    function forgeBestName(
        namePool,
        profile
    ){

        const attempts = 8;

        const candidates = [];



        for(
            let i = 0;
            i < attempts;
            i++
        ){

            const candidate =
                buildWord(
                    namePool,
                    profile
                );


            candidates.push({

                name:
                    candidate,

                score:
                    scoreName(
                        candidate
                    )

            });


        }



        candidates.sort(

            (a,b) =>
                b.score - a.score

        );



        return candidates[0].name;


    }





    /*
    ================================================
    Name Evaluation

    Strange is acceptable.
    Broken is not.

    ================================================
    */


    function scoreName(
        name
    ){

        let score = 100;



        const lower =
            name.toLowerCase();




        /*
            Penalize excessive repetition

            Borborik survives.
            Borborborborik does not.
        */


        if(
            /(.)\1\1/.test(
                lower
            )
        ){

            score -= 25;

        }





        /*
            Penalize impossible
            consonant clusters
        */


        if(
            /[bcdfghjklmnpqrstvwxyz]{4,}/i
            .test(name)
        ){

            score -= 30;

        }





        /*
            Penalize excessive vowels
        */


        if(
            /[aeiou]{4,}/i
            .test(name)
        ){

            score -= 20;

        }





        /*
            Reward memorable length
        */


        if(
            name.length >= 5 &&
            name.length <= 12
        ){

            score += 10;

        }





        /*
            Reward distinctive openings

            This keeps fantasy flavor.
        */


        if(
            name.length > 7
        ){

            score += 5;

        }



        return score;


    }





    /*
    ================================================
    Existing Name Construction
    ================================================
    */


    function buildWord(
        pool,
        profile
    ){

        const opening =
            pick(
                pool.openings
            );


        const middle =
            pick(
                pool.middles
            );


        const ending =
            pick(
                pool.endings
            );



        return clean(

            opening +
            middle +
            ending

        );


    }





    function buildSurname(
        surnamePool
    ){

        return clean(

            pick(
                surnamePool
            )

        );

    }





    function pick(
        array
    ){

        return array[

            Math.floor(

                Math.random()
                *
                array.length

            )

        ];

    }





    function clean(
        word
    ){

        return word

            .replace(
                /(.)\1\1+/g,
                "$1$1"
            )

            .replace(
                /([aeiou])\1\1+/gi,
                "$1$1"
            )

            .replace(
                /^./,
                c =>
                    c.toUpperCase()
            );

    }





    return {


        generate


    };



})();
