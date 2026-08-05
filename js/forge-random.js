/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 FORGE RANDOM ENGINE

 Version 1.0

 "The seed remembers."

=========================================================
*/


const ForgeRandom = (()=>{


let seed = 1;



/*
=========================================================
 SET SEED
=========================================================
*/


function setSeed(value){


    if(typeof value === "number"){

        seed=value;

        return;

    }



    seed =
        hashString(
            value || "default"
        );


}



/*
=========================================================
 RANDOM NUMBER
=========================================================
*/


function next(){


    /*
    Mulberry32 algorithm

    Fast.
    Deterministic.
    Perfect for procedural generation.

    */


    seed += 0x6D2B79F5;


    let t = seed;


    t =
        Math.imul(
            t ^ t >>> 15,
            t | 1
        );


    t ^=
        t +
        Math.imul(
            t ^ t >>> 7,
            t | 61
        );


    return (
        (
            t ^
            t >>> 14
        )
        >>>0
    )
    /
    4294967296;


}



/*
=========================================================
 RANGE
=========================================================
*/


function range(min,max){


    return (

        next()
        *
        (
            max-min
        )

    )
    +
    min;


}



/*
=========================================================
 INTEGER
=========================================================
*/


function integer(min,max){


    return Math.floor(

        range(
            min,
            max+1
        )

    );

}



/*
=========================================================
 CHOICE
=========================================================
*/


function choose(array){


    return array[

        integer(
            0,
            array.length-1
        )

    ];

}



/*
=========================================================
 STRING HASH
=========================================================
*/


function hashString(str){


    let h=0;


    for(
        let i=0;
        i<str.length;
        i++
    ){

        h =
            Math.imul(
                31,
                h
            )
            +
            str.charCodeAt(i)
            |
            0;

    }


    return h;

}



return{

    setSeed,

    next,

    range,

    integer,

    choose

};


})();