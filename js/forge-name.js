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

            console.log(
    "Requested gender:",
    options.gender
);

console.log(
    "Culture given structure:",
    culture.given
);



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
                culture.given[options.gender];

        }

        else if(
            culture.given.neutral
        ){

            namePool =
                culture.given.neutral;

        }

        else{

            console.error(
                "No valid name pool found for culture:",
                cultureID
            );

            return null;

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

        if(
            /(ric.*ric|an.*an|el.*el|on.*on)/i.test(name)
        ){

            score -= 25;

        }
        /*
            Penalize repeated sound fragments
        */

        if(
            /(ic.*ick|an.*an|ar.*ar|el.*el)/i.test(name)
        ){

            score -= 15;

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

    let structureOptions = [];


    const lengths =
        profile.syllableLength || [];


    lengths.forEach(item => {


        if(
            item.value === 1 ||
            item.value === 2
        ){

            structureOptions.push({

                value:"open-end",
                weight:item.weight

            });

        }


        if(
            item.value === 3
        ){

            structureOptions.push({

                value:"open-middle-end",
                weight:item.weight

            });

        }


        if(
            item.value >= 4
        ){

            structureOptions.push({

                value:"open-middle-middle-end",
                weight:item.weight

            });

        }

    });



    if(
        structureOptions.length === 0
    ){

        structureOptions.push({

            value:"open-middle-end",
            weight:100

        });

    }



    const structure =
        ForgeRandom.weighted(
            structureOptions
        );



    const opening =
        pick(
            pool.openings
        );


    const ending =
        pick(
            pool.endings
        );


    const middle =
        pool.middles
        ?
        pick(
            pool.middles
        )
        :
        "";



    const middle2 =
        pool.middles
        ?
        pick(
            pool.middles
        )
        :
        "";



    let word = "";



    switch(
        structure.value
    ){


        case "open-end":

            word =
                mergeParts(
                    opening,
                    ending
                );

            break;



        case "open-middle-end":

            word =
                mergeParts(
                    opening,
                    middle
                );


            word =
                mergeParts(
                    word,
                    ending
                );

            break;



        case "open-middle-middle-end":

            word =
                mergeParts(
                    opening,
                    middle
                );


            word =
                mergeParts(
                    word,
                    middle2
                );


            word =
                mergeParts(
                    word,
                    ending
                );

            break;


    }



    return clean(word);

}





   function buildSurname(
    surnamePool
){

    if(!surnamePool){

        return "";

    }


    let surname = "";



    if(
        surnamePool.openings &&
        surnamePool.endings
    ){

        surname =

            pick(
                surnamePool.openings
            )

            +

            pick(
                surnamePool.endings
            );


    }


    return cleanSurname(
        surname
    );


}


function cleanSurname(word){

    word = word
        .replace(
            /(.)\1\1+/g,
            "$1$1"
        );


    word =
        word.charAt(0).toUpperCase()
        +
        word.slice(1);


    return word;

}

    function pick(
    array
){

    if(!array || array.length === 0){

        return "";

    }


    const result =
        ForgeRandom.weighted(
            array
        );


    if(
        typeof result === "string"
    ){

        return result;

    }


    return result.text;

}



    function mergeParts(
    first,
    second
    ){

    if(!first){
        return second;
    }

    if(!second){
        return first;
    }


    let result =
        first + second;


    result =
        result.replace(
            /([aeiou])\1+/gi,
            "$1"
        );


    result =
        result.replace(
            /([a-z])\1{2,}/gi,
            "$1$1"
        );


    return result;

}



    function clean(word){

        word = word
            .replace(
                /(.)\1\1+/g,
                "$1$1"
            );


        word = word
            .replace(
                /([aeiou])\1+/gi,
                "$1"
            );


        word = word
            .replace(
                /([aeiou])([aeiou])/gi,
                "$1$2"
            );


        word =
            word.charAt(0).toUpperCase()
            +
            word.slice(1);


        return word;

    }



    return {


        generate


    };



})();
