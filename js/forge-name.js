/*======================================================

RPG Cornucopia
The Forge

File:
    forge-name.js

Version:
    1.0.0

Purpose:
    Generates names using language packs.

Depends On:
    forge-core.js
    forge-random.js
    forge-language.js

======================================================*/


const ForgeName = (() => {


    function generate(options = {}) {

	const generationSeed =
    		options.seed ||
    		ForgeSeed.create();


	ForgeRandom.setSeed(
    		generationSeed
);

        const packID = options.pack || "fantasy-core";

        const cultureID = options.culture || "common";


        const culture =
            ForgeLanguage
                .get(packID)
                .cultures[cultureID];


        if(!culture){

            console.error(
                "Culture not found:",
                packID,
                cultureID
            );

            return null;

        }


let namePool;


if(options.gender && culture.given[options.gender]){

    namePool = culture.given[options.gender];

}
else{

    namePool = culture.given.neutral;

}


const given =
    buildWord(
        namePool,
        culture.profile
    );


        let surname = null;


        if(
            options.surname ||
            rollChance(culture.profile.surnameChance)
        ){

            surname =
                buildSurname(
                    culture.surname
                );

        }



        function buildWord(parts, profile = {}) {


    let structureOptions = [];


    const lengths = profile.syllableLength || [];


    lengths.forEach(item => {


        if(item.value === 1){

            structureOptions.push({

                value:"open-end",

                weight:item.weight

            });

        }


        if(item.value === 2){

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
                pick(parts.openings)
                +
                pick(parts.endings);


            break;



        case "open-middle-end":


            word =
                pick(parts.openings)
                +
                pick(parts.middles)
                +
                pick(parts.endings);


            break;



        case "open-middle-middle-end":


            word =
                pick(parts.openings)
                +
                pick(parts.middles)
                +
                pick(parts.middles)
                +
                pick(parts.endings);


            break;

    }



    return clean(word);

}



    function buildSurname(parts){


        return clean(

            pick(parts.openings)
            +
            pick(parts.endings)

        );


    }





    function pick(list){

        return ForgeRandom
            .weighted(list)
            .text;

    }





    function rollChance(chance){


        return (
            ForgeRandom.random() * 100
        ) < chance;


    }





    function clean(word){


        word = word.trim();


        // Remove accidental triple letters

        word =
            word.replace(
                /(.)\1\1+/g,
                "$1$1"
            );



        // Remove ugly vowel collisions

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


        word =
            word.charAt(0).toUpperCase()
            +
            word.slice(1);


        return word;

    }

	function applyNamingStyle(result, culture){


    switch(culture.profile.namingStyle){


        case "ceremonial":

    if(
        culture.titles &&
        culture.titles.length &&
        rollChance(culture.profile.titleChance)
    ){

        result.title =
            ForgeRandom
                .weighted(culture.titles)
                .text;

    }

    break;



        case "clan":

            if(result.surname){

                result.surname =
                    result.surname;

            }

            break;



        case "flowing":

            result.fullName =
                smoothName(
                    result.fullName
                );

            break;



    }


    return result;

}

let result = {

    fullName:
        surname
        ? `${given} ${surname}`
        : given,


    given: given,

    surname: surname,

    title: null,

    nickname: null,

    trueName: null,


    culture: cultureID,

    pack: packID,

    seed: generationSeed

};


result =
    applyNamingStyle(
        result,
        culture
    );


return result;


}


function smoothName(name){

    return name
        .replace(/aa+/gi,"a")
        .replace(/ee+/gi,"e")
        .replace(/ii+/gi,"i");

}



return {

    generate

};


})();