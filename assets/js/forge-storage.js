/*
=========================================================
 RPG CORNUCOPIA
 Forge Local Storage
 Browser Only
=========================================================
*/

const ForgeStorage = (() => {


    function save(key,data){

        localStorage.setItem(

            key,

            JSON.stringify(data)

        );

    }



    function load(key){

        const data = localStorage.getItem(key);

        if(!data){

            return null;

        }


        return JSON.parse(data);

    }



    function remove(key){

        localStorage.removeItem(key);

    }



    return {

        save,
        load,
        remove

    };


})();