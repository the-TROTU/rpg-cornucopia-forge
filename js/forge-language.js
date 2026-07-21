/*
=========================================================
 RPG CORNUCOPIA
 Forge Language Engine
=========================================================
*/

const ForgeLanguage = (() => {


    const packs = {};



    function register(pack){

        packs[pack.id] = pack;

    }



    function get(id){

        return packs[id];

    }



    function list(){

        return Object.keys(packs);

    }



    return {

        register,
        get,
        list

    };


})();