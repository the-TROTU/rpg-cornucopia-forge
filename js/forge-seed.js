/*
=========================================================
 RPG CORNUCOPIA
 Forge Seed Engine
 Version 1.0
=========================================================
*/


const ForgeSeed = (() => {


    function create(){

        return Math.floor(
            Math.random() * 999999999
        );

    }



    function hash(value){


        let hash = 0;


        const string =
            String(value);



        for(let i = 0; i < string.length; i++){


            hash =
                (
                    hash << 5
                )
                -
                hash
                +
                string.charCodeAt(i);


            hash =
                hash & hash;


        }


        return Math.abs(hash);


    }



    return {

        create,

        hash

    };


})();