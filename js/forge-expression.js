/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 File:
    forge-expression.js

 Version:
    1.8.0

 Purpose:
    Advanced Dice Expression Parser

 Supported:

    2d20+5
    2d20+1d6+5
    2d20kh1
    2d20kl1
    1d6!

=========================================================
*/


const ForgeExpression = (() => {

let lastResults = [];

let rollContext = {

    name:null,

    profile:null,

    category:null,

    tags:[],

    advantage:false,

    disadvantage:false

};

function classifyRoll(name){


    if(!name){

        return null;

    }


    const value =
        name.toLowerCase();



    if(
        value.includes("attack")
    ){

        return "attack";

    }



    if(
        value.includes("damage")
    ){

        return "damage";

    }



    if(
        value.includes("save")
    ){

        return "save";

    }



    if(
        value.includes("check")
    ){

        return "check";

    }



    if(
        value.includes("initiative")
    ){

        return "initiative";

    }



    return "general";

}

function hasTag(tag){

    return rollContext.tags.includes(

        tag.toLowerCase()

    );

}

function addTag(tag){

    if(

        !hasTag(tag)

    ){

        rollContext.tags.push(

            tag.toLowerCase()

        );

    }

}



function evaluate(expression){


    if(!expression){

        return error(
            "No expression supplied"
        );

    }


    expression =
        expression
        .toLowerCase()
        .replace(
            /\s+/g,
            ""
        );



    try{

        lastResults = [];

        rollContext = {

            name:null,

            profile:null,

            category:null,

            tags:[],

            advantage:false,

            disadvantage:false

        };

        const result =
            resolveExpression(
                expression
            );


        return {

            success:true,

            expression,


            name:
                rollContext.name,


            profile:
                rollContext.profile,
                


            category:
                classifyRoll(
                    rollContext.name
                ),

            tags:
                rollContext.tags,

            total:
                result.total,


            results:
                lastResults,


            fate:
                analyzeFate(
                    lastResults
                ),


            advantage:
                rollContext.advantage,


            disadvantage:
                rollContext.disadvantage,


            blueprint:
                createBlueprint()

        };


    }

    catch(error){


        return {

            success:false,

            message:
                error.message,

            total:0,

            blueprint:"ERROR"

        };


    }


}

function resolveExpression(expression){

    // ---------------------------------
    // Named Roll
    // ---------------------------------


    if(
    expression.includes("=")
    ){

    const equals =
    expression.indexOf("=");

rollContext.name =
    expression.slice(0, equals);

expression =
    expression.slice(equals + 1);



    if(
        expression.includes(":")
    ){

        const colon =
    expression.indexOf(":");

rollContext.profile =
    expression.slice(0, colon);

expression =
    expression.slice(colon + 1);

    }


}

const tagPattern =
    /\[(.*?)\]/g;

let match;

while(
    (match = tagPattern.exec(expression))
){

    addTag(

    match[1]
        .trim()

);

}

expression =
    expression.replace(
        /\[(.*?)\]/g,
        ""
    ).trim();

    if(
        expression.startsWith("adv(")
    ){

        rollContext.advantage=true;

        expression =
            expression
            .slice(4,-1);

    }



    if(
        expression.startsWith("dis(")
    ){

        rollContext.disadvantage=true;

        expression =
            expression
            .slice(4,-1);

    } 

    let depth = 0;


    for(
        let i=0;
        i<expression.length;
        i++
    ){

        if(
            expression[i]==="("
        ){

            depth++;

        }


        if(
            expression[i]===")"
        ){

            depth--;


            if(depth===0){


                const inner =
                    expression.substring(
                        i+1
                    );



                const start =
                    expression.lastIndexOf(
                        "(",
                        i
                    );



                const inside =
                    expression.substring(
                        start+1,
                        i
                    );



                const result =
                    resolveExpression(
                        inside
                    );



                const rebuilt =
                    expression.substring(
                        0,
                        start
                    )
                    +
                    result.total
                    +
                    expression.substring(
                        i+1
                    );



                return resolveExpression(
                    rebuilt
                );

            }

        }

    }




    return evaluateFlat(
        expression
    );


}

function evaluateFlat(expression){


    let values =
        expression.split(/([*/+-])/);



    let total =
        parseValue(
            values.shift()
        );



    let results = [];



    while(values.length){


        const operator =
            values.shift();


        const next =
            parseValue(
                values.shift()
            );



        switch(operator){


            case "+":
                total += next;
                break;


            case "-":
                total -= next;
                break;


            case "*":
                total *= next;
                break;


            case "/":
                total /= next;
                break;


        }

    }



    return {

        total,

        results

    };


}

function parseValue(value){


    if(
    value.includes("d")
){

    const roll =
        rollDice(value);


    lastResults.push(
        roll
    );


    return roll.total;

}


    return Number(value);


}

function rollDice(token){



    let exploding =
        token.includes("!");



    let keep = null;

    let mode = null;



    if(
        token.includes("kh")
    ){

        mode="highest";

        keep =
            Number(
                token.split("kh")[1]
            );


    }


    if(
        token.includes("kl")
    ){

        mode="lowest";

        keep =
            Number(
                token.split("kl")[1]
            );

    }



    token =
        token
        .replace(
            "!",
            ""
        )
        .replace(
            /kh\d+/,
            ""
        )
        .replace(
            /kl\d+/,
            ""
        );



    const parts =
        token.split("d");



    const count =
        Number(parts[0]);



    const sides =
        Number(parts[1]);



    let rolls=[];



    for(
        let i=0;
        i<count;
        i++
    ){


        let roll =
            randomDie(
                sides
            );


        rolls.push(
            roll
        );



        while(
            exploding &&
            roll === sides
        ){

            roll =
                randomDie(
                    sides
                );


            rolls.push(
                roll
            );


        }


    }




    let used =
        [...rolls];



    if(
        keep &&
        mode==="highest"
    ){

        used =
            rolls
            .sort(
                (a,b)=>b-a
            )
            .slice(
                0,
                keep
            );

    }



    if(
        keep &&
        mode==="lowest"
    ){

        used =
            rolls
            .sort(
                (a,b)=>a-b
            )
            .slice(
                0,
                keep
            );

    }



    return {


        type:"dice",


        dice:

            `${count}d${sides}`,


        rolls,


        kept:used,


        total:
            used.reduce(
                (a,b)=>a+b,
                0
            )


    };


}

function rollAdvantage(expression){


    const first =
        resolveExpression(
            expression
        );


    const second =
        resolveExpression(
            expression
        );



    let chosen;



    if(
        rollContext.advantage
    ){

        chosen =
            Math.max(
                first.total,
                second.total
            );

    }


    if(
        rollContext.disadvantage
    ){

        chosen =
            Math.min(
                first.total,
                second.total
            );

    }



    return {

        total:chosen,

        rolls:[

            first.total,

            second.total

        ]

    };

}



function randomDie(sides){


    return Math.floor(

        Math.random()
        *
        sides

    )
    +
    1;


}

function analyzeFate(results){


    const fate = {

        critical:false,

        failure:false,

        events:[]

    };



    if(
        !results ||
        results.length === 0
    ){

        return fate;

    }



    results.forEach(
        roll => {


            if(
                roll.type !== "dice"
            ){

                return;

            }



            /*
            Only single d20 rolls
            receive natural fate tags.
            */


            if(
                roll.dice === "1d20"
            ){


                const value =
                    roll.rolls[0];



                if(
                    value === 20
                ){

                    fate.critical = true;

                    fate.events.push(
                        "critical-success"
                    );

                }



                if(
                    value === 1
                ){

                    fate.failure = true;

                    fate.events.push(
                        "critical-failure"
                    );

                }

            }


        }

    );



    return fate;


}



function createBlueprint(){


    return Date.now()
    .toString(36)
    .toUpperCase();


}





function error(message){


    return {

        success:false,

        message,

        total:0,

        blueprint:"ERROR"

    };


}



return {


    evaluate,

    resolve:
        evaluate


};



})();