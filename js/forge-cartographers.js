/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 THE CARTOGRAPHER'S GUILD

 Version 1.0

 "Every map tells the truth.
 Every cartographer chooses which truth to show."

=========================================================
*/


const ForgeCartographers = (()=>{


/*
=========================================================
 CARTOGRAPHER DATABASE

 Each member modifies the way the world is drawn.

=========================================================
*/


const guild = {


/*
---------------------------------------------------------
 THE OLD EXPLORER
---------------------------------------------------------

A weathered adventurer.
Maps feel discovered rather than created.

---------------------------------------------------------
*/


oldExplorer:{

    name:
        "Aldren Mossfoot",

    title:
        "The Old Explorer",

    description:
        "A wandering scholar who charts forgotten roads and lost kingdoms.",


    style:{

        coast:
        "coarse",

        lineWeight:
        1.4,

        detail:
        "high",

        decoration:
        "aged",

        labels:
        "handwritten"

    },


    quote:
        "A blank space is not empty. It is waiting."

},




/*
---------------------------------------------------------
 THE ROYAL SURVEYOR
---------------------------------------------------------

Precise.
Clean.
Made for armies and merchants.

---------------------------------------------------------
*/


royalSurveyor:{

    name:
        "Seraphine Vale",

    title:
        "The Royal Surveyor",

    description:
        "Official cartographer of the great courts.",


    style:{

        coast:
        "precise",

        lineWeight:
        1,

        detail:
        "moderate",

        decoration:
        "minimal",

        labels:
        "formal"

    },


    quote:
        "Accuracy is the foundation upon which empires stand."

},




/*
---------------------------------------------------------
 THE WILDERNESS CHRONICLER
---------------------------------------------------------

Nature-focused.
Forests and mountains dominate.

---------------------------------------------------------
*/


wildernessChronicler:{

    name:
        "Brother Rowan Thorne",

    title:
        "The Wilderness Chronicler",

    description:
        "A naturalist who believes the land itself has a voice.",


    style:{

        coast:
        "organic",

        lineWeight:
        1.8,

        detail:
        "very high",

        decoration:
        "natural",

        labels:
        "sketched"

    },


    quote:
        "The oldest roads were made by roots and rivers."

},




/*
---------------------------------------------------------
 THE NAVIGATOR
---------------------------------------------------------

Sea charts.
Islands.
Trade routes.

---------------------------------------------------------
*/


seaNavigator:{

    name:
        "Captain Elara Voss",

    title:
        "The Sea Navigator",

    description:
        "Explorer of oceans and forgotten shores.",


    style:{

        coast:
        "waveworn",

        lineWeight:
        1.2,

        detail:
        "coastal",

        decoration:
        "nautical",

        labels:
        "inkscript"

    },


    quote:
        "Every horizon hides another story."

}



};




/*
=========================================================
 GET CARTOGRAPHER
=========================================================
*/


function get(id){

    return guild[id]
    ||
    guild.oldExplorer;

}




/*
=========================================================
 LIST MEMBERS
=========================================================
*/


function list(){

    return Object.keys(guild)
    .map(
        key=>({

            id:key,

            name:guild[key].name,

            title:guild[key].title

        })
    );

}





/*
=========================================================
 PUBLIC API
=========================================================
*/


return{


    get,

    list,

    guild


};



})();