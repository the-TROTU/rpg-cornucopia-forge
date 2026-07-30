/*
=========================================================
 RPG CORNUCOPIA

 THE KEEPER OF FATE

 Version 2.0

 "The bones fall.
  The Keeper remembers."

=========================================================
*/

const KeeperOfFate = (()=>{

let fateHistory=[];


/*======================================================
UTILITY
======================================================*/

function randomFrom(list){

    return list[
        Math.floor(
            Math.random()*list.length
        )
    ];

}


/*======================================================
NORMALIZE RESULTS
======================================================*/

function normalizeResult(result){

    return{

        name:
            result.name || "Fate Roll",

        expression:
            result.expression || "Basic Roll",

        total:
            result.total ?? 0,

        blueprint:
            result.blueprint || "UNKNOWN",

        tags:
            result.tags || [],

        category:
            result.category || "General",

        results:
            result.results || []

    };

}


/*======================================================
HISTORY
======================================================*/

function recordFate(result){

    fateHistory.unshift({

        name:result.name,

        expression:result.expression,

        total:result.total,

        tags:result.tags

    });


    if(fateHistory.length>5){

        fateHistory.pop();

    }


    renderHistory();

}



function renderHistory(){

    const history=document.getElementById(
        "fate-history"
    );


    if(!history){

        return;

    }


    if(fateHistory.length===0){

        history.innerHTML=

        "The Keeper remembers nothing yet.";

        return;

    }


    history.innerHTML=fateHistory.map(fate=>`

<div class="history-entry">

<strong>${fate.name}</strong>

<br>

${fate.expression}

<br>

Total:
${fate.total}

${
fate.tags.length
?
`<br>Tags: ${fate.tags.join(", ")}`
:
""
}

</div>

`).join("");

}


/*======================================================
DISPLAY
======================================================*/

function displayKeeperResult(result){

    const output=document.getElementById(
        "dice-result"
    );

    if(!output){

        return;

    }


    const breakdown=result.results
    .filter(r=>r.type==="dice")
    .map(r=>`

<div>

${r.dice}

→

${r.rolls.join(", ")}

</div>

`)
    .join("");



    output.innerHTML=`

<div class="keeper-report">

<div class="forge-result-name">

${result.total}

</div>

<h3>

${result.name}

</h3>

<p>

<strong>Expression</strong><br>

${result.expression}

</p>

<p>

<strong>Category</strong><br>

${result.category}

</p>

<p>

<strong>Tags</strong><br>

${result.tags.length
?result.tags.join(", ")
:"None"}

</p>

${breakdown}

<div class="forge-blueprint">

🐉 Blueprint No.<br>

${result.blueprint}

</div>

<div class="forge-signature">

${ForgeSignatures.random("keeperOfFate")}

<br><br>

~ The Keeper of Fate

</div>

</div>

`;

}

/*======================================================
BASIC DICE ROLL
======================================================*/

function castFate(){

    const button=document.getElementById(
        "roll-dice-button"
    );

    const output=document.getElementById(
        "dice-result"
    );

    button.disabled=true;

    button.textContent=
        "🐉 Consulting Fate...";

    output.innerHTML=`
    <div class="forge-signature">
    ${randomFrom([
        "The bones are awakened...",
        "Counting possibilities...",
        "Consulting forgotten dragons...",
        "Measuring destiny...",
        "Listening to ancient echoes..."
    ])}
    </div>
    `;

    setTimeout(()=>{

        const sides=Number(
            document.getElementById(
                "dice-type"
            ).value
        );

        const count=Number(
            document.getElementById(
                "dice-count"
            ).value
        );

        const modifier=Number(
            document.getElementById(
                "dice-modifier"
            ).value
        );

        const roll=ForgeDice.roll(
            sides,
            count,
            modifier
        );

        const result=normalizeResult({

            name:"Fate Roll",

            expression:
                `${count}d${sides}` +
                (
                    modifier
                    ? (modifier>0
                        ? `+${modifier}`
                        : modifier)
                    : ""
                ),

            total:roll.total,

            blueprint:roll.blueprint,

            tags:[],

            category:"General",

            results:[{

                type:"dice",

                dice:`${count}d${sides}`,

                rolls:roll.results

            }]

        });

        displayKeeperResult(result);

        recordFate(result);

        button.disabled=false;

        button.textContent=
            "🐉 Cast the Bones";

    },500);

}


/*======================================================
ADVANCED EXPRESSIONS
======================================================*/

function resolveExpression(){

    const input=document.getElementById(
        "expression-input"
    );

    if(!input){

        return;

    }

    const expression=input.value.trim();

    if(!expression){

        document.getElementById(
            "dice-result"
        ).innerHTML=`

<div class="forge-signature">

The Keeper requires an expression.

</div>

`;

        return;

    }

    const result=
        normalizeResult(

            ForgeExpression.evaluate(
                expression
            )

        );

    displayKeeperResult(result);

    recordFate(result);

}

/*======================================================
RUNE SHELF
======================================================*/

function initializeRunes(){

    const runeButtons =
        document.querySelectorAll(
            ".rune-button"
        );


    runeButtons.forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                const tag =
                    button.dataset.tag;


                const input =
                    document.getElementById(
                        "expression-input"
                    );


                if(!input){

                    return;

                }



                let expression =
                    input.value.trim();



                if(expression===""){

                    expression="1d20";

                }



                expression +=
                    `[${tag}]`;



                input.value =
                    expression;


            }
        );


    });


}


/*======================================================
START KEEPER
======================================================*/


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        const rollButton =
            document.getElementById(
                "roll-dice-button"
            );


        if(rollButton){

            rollButton.addEventListener(
                "click",
                castFate
            );

        }



        const expressionButton =
            document.getElementById(
                "expression-roll-button"
            );


        if(expressionButton){

            expressionButton.addEventListener(
                "click",
                resolveExpression
            );

        }



        initializeRunes();


    }

);
/*======================================================
PUBLIC API
======================================================*/

return {

    initialize:function(){

        console.log(
            "The Keeper of Fate awakens."
        );

    }

};


})();