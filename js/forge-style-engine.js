/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 CARTOGRAPHER STYLE ENGINE

 Version 1.0

 "The world is unchanged.
 The hand that remembers it is not."

=========================================================
*/


const ForgeStyleEngine = (()=>{


/*
=========================================================
 STYLE LIBRARY

 Each style describes a visual philosophy.

 Not just colors.

 Personality.

=========================================================
*/


const styles = {


/*
---------------------------------------------------------
 THE OLD SURVEYOR
---------------------------------------------------------

A weathered explorer's map.

*/
oldSurveyor:{

    name:
        "The Old Surveyor",


    description:
        "Aged parchment, careful notes, and decades of wandering.",



    ink:

    {

        color:
            "#24180f",

        weight:
            "medium",

        pressure:
            "variable",

        age:
            "heavy"

    },


    terrain:

    {

        density:
            "high",

        detail:
            "hand-drawn",

        exaggeration:
            "low"

    },


    symbols:

    {

        set:
            "classic",

        size:
            "small",

        decoration:
            "moderate"

    },


    labels:

    {

        style:
            "handwritten",

        frequency:
            "medium"

    },


    imperfections:

    {

        wobble:
            3,

        fading:
            0.35,

        corrections:
            true

    }

},





/*
---------------------------------------------------------
 ROYAL CARTOGRAPHER
---------------------------------------------------------
*/


royalCartographer:{

    name:
        "The Royal Cartographer",


    description:
        "Precise charts commissioned by kingdoms and armies.",


    ink:{

        color:
            "#17120d",

        weight:
            "fine",

        pressure:
            "controlled",

        age:
            "light"

    },


    terrain:{

        density:
            "medium",

        detail:
            "precise",

        exaggeration:
            "none"

    },


    symbols:{

        set:
            "official",

        size:
            "uniform",

        decoration:
            "minimal"

    },


    labels:{

        style:
            "formal",

        frequency:
            "high"

    },


    imperfections:{

        wobble:
            1,

        fading:
            0.1,

        corrections:
            false

    }

},





/*
---------------------------------------------------------
 FRONTIER EXPLORER
---------------------------------------------------------
*/


frontierExplorer:{

    name:
        "The Frontier Explorer",


    description:
        "A dangerous journey recorded by an uncertain hand.",


    ink:{

        color:
            "#302014",

        weight:
            "heavy",

        pressure:
            "wild",

        age:
            "medium"

    },


    terrain:{

        density:
            "high",

        detail:
            "rough",

        exaggeration:
            "high"

    },


    symbols:{

        set:
            "wilderness",

        size:
            "large",

        decoration:
            "rough"

    },


    labels:{

        style:
            "quick notes",

        frequency:
            "low"

    },


    imperfections:{

        wobble:
            5,

        fading:
            0.45,

        corrections:
            true

    }

},





/*
---------------------------------------------------------
 ARCANE ARCHIVIST
---------------------------------------------------------

Ancient magical records.

*/
arcaneArchivist:{

    name:
        "The Arcane Archivist",


    description:
        "A mysterious record copied from forgotten sources.",


    ink:{

        color:
            "#21152d",

        weight:
            "delicate",

        pressure:
            "uneven",

        age:
            "ancient"

    },


    terrain:{

        density:
            "strange",

        detail:
            "symbolic",

        exaggeration:
            "high"

    },


    symbols:{

        set:
            "arcane",

        size:
            "varied",

        decoration:
            "ornate"

    },


    labels:{

        style:
            "ancient script",

        frequency:
            "medium"

    },


    imperfections:{

        wobble:
            4,

        fading:
            0.55,

        corrections:
            true

    }

}


};




/*
=========================================================
 CURRENT STYLE
=========================================================
*/


let activeStyle =
    "oldSurveyor";




/*
=========================================================
 SET STYLE
=========================================================
*/


function setStyle(name){


    if(
        styles[name]
    ){

        activeStyle =
            name;

    }


}





/*
=========================================================
 GET STYLE
=========================================================
*/


function getStyle(){


    return styles[
        activeStyle
    ];

}




/*
=========================================================
 GET ALL STYLES
=========================================================
*/


function getStyles(){


    return styles;


}




/*
=========================================================
 STYLE SUMMARY

 Used by UI later.

=========================================================
*/


function summary(){


    const style =
        getStyle();



    return {

        name:
            style.name,


        description:
            style.description

    };


}





return{


    setStyle,

    getStyle,

    getStyles,

    summary


};



})();