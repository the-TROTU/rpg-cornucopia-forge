/*
=========================================================
 RPG CORNUCOPIA

 THE KEEPER OF FATE
 Dice Engine

 Version 1.0.0

 The bones fall.
 The Keeper watches.

=========================================================
*/


const ForgeDice = (() => {



    function roll(sides, count = 1, modifier = 0){



        const results = [];

        let total = 0;



        for(let i = 0; i < count; i++){


            const value =
                Math.floor(
                    Math.random() * sides
                ) + 1;



            results.push(value);


            total += value;


        }



        total += modifier;



        return {


            sides,

            count,

            modifier,

            results,

            total,


            blueprint:

                ForgeSeed.create()


        };


    }





    return {


        roll


    };



})();