/*
=========================================================
 RPG CORNUCOPIA
 Forge Random Engine
=========================================================
*/

const ForgeRandom = (() => {

    let seed = null;

	function getSeed(){

    return seed;

}


    function random(){

        if(seed === null){

            return Math.random();

        }

        seed = (seed * 9301 + 49297) % 233280;

        return seed / 233280;

    }


    function setSeed(value){

        seed = value;

    }


    function pick(array){

        return array[
            Math.floor(random() * array.length)
        ];

    }


    function weighted(items){

        let total = 0;

        items.forEach(item => {

            total += item.weight;

        });


        let roll = random() * total;


        for(let item of items){

            roll -= item.weight;

            if(roll <= 0){

                return item;

            }

        }


        return items[items.length - 1];

    }


    return {

        random,
        setSeed,
        getSeed,
	pick,
        weighted

    };


})();