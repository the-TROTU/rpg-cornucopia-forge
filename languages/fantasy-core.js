/*
=========================================================
 RPG CORNUCOPIA
 Fantasy Core Language Pack
 Version 1.0
=========================================================
*/


ForgeLanguage.register({

    id: "fantasy-core",

    name: "Fantasy Core",

    author: "RPG Cornucopia",


    cultures: {


        common: {

            name: "Common",

            profile: {

                syllableLength: [

                    { value: 1, weight: 15 },
                    { value: 2, weight: 55 },
                    { value: 3, weight: 30 }

                ],

                apostropheChance: 0,

                hyphenChance: 5,

                surnameChance: 75,

                titleChance: 15,

		namingStyle:"simple"

            },
            
            given:{

    male:{

        openings:[
            // Male openings go here
            {text:"Al",weight:10},
            {text:"Ald",weight:8},
            {text:"Ar",weight:8},
            {text:"Bar",weight:6},
            {text:"Bren",weight:7},
            {text:"Cal",weight:8},
            {text:"Ced",weight:7},
            {text:"Cor",weight:10},
            {text:"Dar",weight:8},
            {text:"Dav",weight:5},
            {text:"Ed",weight:7},
            {text:"Edric",weight:3},
            {text:"Fen",weight:6},
            {text:"Gar",weight:8},
            {text:"Garr",weight:5},
            {text:"Hal",weight:8},
            {text:"Hen",weight:5},
            {text:"Ian",weight:7},
            {text:"Jar",weight:6},
            {text:"Kael",weight:5},
            {text:"Kel",weight:5},
            {text:"Lan",weight:7},
            {text:"Lin",weight:6},
            {text:"Lor",weight:5},
            {text:"Luc",weight:7},
            {text:"Mal",weight:8},
            {text:"Mar",weight:8},
            {text:"Mic",weight:6},
            {text:"Nath",weight:6},
            {text:"Nic",weight:6},
            {text:"Oren",weight:5},
            {text:"Perr",weight:4},
            {text:"Quin",weight:5},
            {text:"Ran",weight:8},
            {text:"Ren",weight:7},
            {text:"Roder",weight:4},
            {text:"Row",weight:7},
            {text:"Sam",weight:7},
            {text:"Seb",weight:5},
            {text:"Ste",weight:5},
            {text:"Tal",weight:7},
            {text:"Tar",weight:6},
            {text:"Theo",weight:5},
            {text:"Ther",weight:4},
            {text:"Tor",weight:10},
            {text:"Va",weight:3},
            {text:"Val",weight:8},
            {text:"Var",weight:6},
            {text:"Wes",weight:6},
            {text:"Wil",weight:6},
            {text:"Xan",weight:3},

            {text:"Brae",weight:5},
            {text:"Cald",weight:4},
            {text:"Darin",weight:6},
            {text:"Eran",weight:5},
            {text:"Fael",weight:4},
            {text:"Galen",weight:5},
            {text:"Harr",weight:5},
            {text:"Joren",weight:5},
            {text:"Kieran",weight:4},
            {text:"Levin",weight:5},
            {text:"Marek",weight:5},
            {text:"Nolan",weight:5},
            {text:"Orin",weight:6},
            {text:"Ravin",weight:4},
            {text:"Soren",weight:5},
            {text:"Tavian",weight:4},
            {text:"Ulric",weight:3},
            {text:"Warren",weight:4}
        ],

        middles:[
            // Male middles go here
            {text:"a",weight:8},
            {text:"ae",weight:3},
            {text:"an",weight:10},
            {text:"ar",weight:10},
            {text:"ard",weight:4},
            {text:"el",weight:10},
            {text:"en",weight:8},
            {text:"er",weight:7},
            {text:"ic",weight:10},
            {text:"il",weight:5},
            {text:"in",weight:10},
            {text:"ir",weight:5},
            {text:"on",weight:10},
            {text:"or",weight:10},
            {text:"ric",weight:8},
            {text:"rin",weight:5},
            {text:"ron",weight:6},
            {text:"ul",weight:4},
            {text:"ur",weight:4},
            {text:"vin",weight:4},

            {text:"ian",weight:7},
            {text:"cel",weight:4},
            {text:"len",weight:6},
            {text:"lan",weight:6},
            {text:"mar",weight:6},
            {text:"ren",weight:6},
            {text:"dar",weight:5},
            {text:"tor",weight:5},
            {text:"var",weight:5},
            {text:"wyn",weight:3}
        ],

        endings:[
            // Male endings go here
            {text:"an",weight:8},
            {text:"ar",weight:8},
            {text:"as",weight:5},
            {text:"en",weight:8},
            {text:"er",weight:7},
            {text:"ic",weight:10},
            {text:"ian",weight:7},
            {text:"in",weight:7},
            {text:"is",weight:5},
            {text:"on",weight:10},
            {text:"or",weight:10},
            {text:"us",weight:6},
            {text:"ald",weight:4},
            {text:"ard",weight:4},
            {text:"ance",weight:4},
            {text:"ick",weight:4},
            {text:"ric",weight:8},
            {text:"rick",weight:3},
            {text:"ton",weight:6},
            {text:"lot",weight:4},
            {text:"vin",weight:4},

            {text:"wyn",weight:4},
            {text:"ford",weight:3},
            {text:"helm",weight:3},
            {text:"mund",weight:3},
            {text:"wald",weight:3},
            {text:"rican",weight:2},
            {text:"mere",weight:3},
            {text:"well",weight:3}
        ]

    },


    female:{

        openings:[
            // Female openings go here
            {text:"Ari",weight:8},
            {text:"Ada",weight:5},
            {text:"Ala",weight:4},
            {text:"Ama",weight:4},
            {text:"Bel",weight:6},
            {text:"Bri",weight:5},
            {text:"Cala",weight:5},
            {text:"Can",weight:6},
            {text:"Cel",weight:6},
            {text:"Cin",weight:5},
            {text:"Dara",weight:5},
            {text:"Ela",weight:8},
            {text:"El",weight:7},
            {text:"Eli",weight:6},
            {text:"Eva",weight:5},
            {text:"Fara",weight:4},
            {text:"Feli",weight:4},
            {text:"Gia",weight:5},
            {text:"Hel",weight:5},
            {text:"Ila",weight:5},
            {text:"Ina",weight:5},
            {text:"Isa",weight:5},
            {text:"Jara",weight:4},
            {text:"Jan",weight:5},
            {text:"Lia",weight:8},
            {text:"Lina",weight:6},
            {text:"Lora",weight:5},
            {text:"Luna",weight:4},
            {text:"Mara",weight:8},
            {text:"Mari",weight:6},
            {text:"Mela",weight:5},
            {text:"Nara",weight:5},
            {text:"Neria",weight:4},
            {text:"Nora",weight:5},
            {text:"Rena",weight:5},
            {text:"Ria",weight:5},
            {text:"Sin",weight:5},
            {text:"Sara",weight:6},
            {text:"Sel",weight:5},
            {text:"Talia",weight:6},
            {text:"Vera",weight:5},
            {text:"Yara",weight:4}
        ],

        middles:[
            // Female middles go here
            {text:"a",weight:8},
            {text:"ae",weight:3},
            {text:"al",weight:6},
            {text:"an",weight:7},
            {text:"ara",weight:5},
            {text:"bel",weight:5},
            {text:"el",weight:8},
            {text:"ela",weight:5},
            {text:"en",weight:6},
            {text:"ia",weight:8},
            {text:"iel",weight:4},
            {text:"in",weight:6},
            {text:"ira",weight:5},
            {text:"is",weight:4},
            {text:"la",weight:7},
            {text:"len",weight:5},
            {text:"lia",weight:6},
            {text:"lin",weight:5},
            {text:"mar",weight:5},
            {text:"mel",weight:5},
            {text:"nar",weight:4},
            {text:"ra",weight:7},
            {text:"ria",weight:6},
            {text:"rin",weight:4},
            {text:"sel",weight:5},
            {text:"thel",weight:3},
            {text:"wen",weight:4}
        ],

        endings:[
            // Female endings go here
            {text:"a",weight:8},
            {text:"ae",weight:3},
            {text:"al",weight:4},
            {text:"ara",weight:5},
            {text:"elle",weight:6},
            {text:"ena",weight:6},
            {text:"ene",weight:4},
            {text:"dice",weight:4},
            {text:"dy",weight:4},
            {text:"ia",weight:8},
            {text:"iel",weight:4},
            {text:"ine",weight:7},
            {text:"ira",weight:5},
            {text:"is",weight:4},
            {text:"lyn",weight:4},
            {text:"na",weight:5},
            {text:"ora",weight:6},
            {text:"ra",weight:5},
            {text:"ria",weight:6},
            {text:"rose",weight:3},
            {text:"wen",weight:4},
            {text:"wyn",weight:3}
        ]

    },


    neutral:{

        openings:[
            // Existing neutral list stays here
             { text:"Al", weight:5 },
                    { text:"Bar", weight:5 }
        ],

        middles:[
            // Existing neutral list stays here
            { text:"an", weight:8 },
                    { text:"el", weight:8 },
                    { text:"or", weight:8 },
                    { text:"in", weight:8 },
                    { text:"ar", weight:8 }
        ],

        endings:[
            // Existing neutral list stays here
              { text:"ic", weight:5 },
                    { text:"on", weight:5 },
                    { text:"us", weight:5 },
                    { text:"en", weight:5 },
                    { text:"a", weight:5 }
        ]
    }
        },



            surname: {

                openings: [

                    { text:"Ash", weight:5 },
                    { text:"Black", weight:5 },
                    { text:"Bright", weight:5 },
                    { text:"Iron", weight:5 },
                    { text:"Silver", weight:5 },
                    { text:"Stone", weight:5 }

                ],


                endings: [

                    { text:"wood", weight:5 },
                    { text:"timber", weight:5 },
                    { text:"grove", weight:5 },
                    { text:"tree", weight:5 },
                    { text:"trees", weight:5 },
                    { text:"bush", weight:5 },
                    { text:"thorn", weight:5 },
                    { text:"brush", weight:5 },
                    { text:"rose", weight:5 },
                    { text:"hurst", weight:5 },
                    { text:"pine", weight:5 },
                    { text:"oak", weight:5 },
                    { text:"stick", weight:5 },
                    { text:"trunk", weight:5 },
                    { text:"cedar", weight:5 },
                    { text:"club", weight:5 },
                    { text:"board", weight:5 },
                    { text:"bord", weight:5 },
                    { text:"pole", weight:5 },
                    { text:"club", weight:5 },
                    { text:"hazel", weight:5 },
                    { text:"beam", weight:5 },
                    { text:"cherry", weight:5 },
                    { text:"fern", weight:5 },
                    { text:"grove", weight:5 },
                    { text:"stake", weight:5 },
                    { text:"block", weight:5 },
                    { text:"sill", weight:5 },
                    { text:"bar", weight:5 },
                    { text:"bars", weight:5 },
                    { text:"brace", weight:5 },
                    { text:"pile", weight:5 },
                    { text:"piles", weight:5 },
                    { text:"thicket", weight:5 },
                    { text:"brook", weight:5 },
                    { text:"river", weight:5 },
                    { text:"brooks", weight:5 },
                    { text:"rivers", weight:5 },
                    { text:"streams", weight:5 },
                    { text:"pond", weight:5 },
                    { text:"ponds", weight:5 },
                    { text:"puddle", weight:5 },
                    { text:"flood", weight:5 },
                    { text:"floods", weight:5 },
                    { text:"way", weight:5 },
                    { text:"ways", weight:5 },
                    { text:"trough", weight:5 },
                    { text:"pool", weight:5 },
                    { text:"pools", weight:5 },
                    { text:"sea", weight:5 },
                    { text:"lake", weight:5 },
                    { text:"lakes", weight:5 },
                    { text:"wave", weight:5 },
                    { text:"ripple", weight:5 },
                    { text:"flow", weight:5 },
                    { text:"spout", weight:5 },
                    { text:"trickle", weight:5 },
                    { text:"swamp", weight:5 },
                    { text:"rain", weight:5 },
                    { text:"drip", weight:5 },
                    { text:"rush", weight:5 },
                    { text:"rushes", weight:5 },
                    { text:"tide", weight:5 },
                    { text:"coast", weight:5 },
                    { text:"surf", weight:5 },
                    { text:"weed", weight:5 },
                    { text:"weeds", weight:5 },
                    { text:"wind", weight:5 },
                    { text:"storm", weight:5 },
                    { text:"cloud", weight:5 },
                    { text:"strike", weight:5 },
                    { text:"grain", weight:5 },
                    { text:"ice", weight:5 },
                    { text:"tear", weight:5 },
                    { text:"run", weight:5 },
                    { text:"wash", weight:5 },
                    { text:"grotto", weight:5 },
                    { text:"marsh", weight:5 },
                    { text:"basin", weight:5 },
                    { text:"bowl", weight:5 },
                    { text:"ball", weight:5 },
                    { text:"tingle", weight:5 },
                    { text:"toy", weight:5 },
                    { text:"brick", weight:5 },
                    { text:"wheel", weight:5 },
                    { text:"fire", weight:5 },
                    { text:"field", weight:5 },
                    { text:"hand", weight:5 },
                    { text:"ward", weight:5 }

                ]

            }

        },
	    
        
        elven: {

    name: "Elven",

    profile: {

        syllableLength: [

            { value:2, weight:25 },
            { value:3, weight:55 },
            { value:4, weight:20 }

        ],

        apostropheChance: 8,

        hyphenChance: 3,

        surnameChance: 85,

        titleChance: 30,

	namingStyle:"flowing"

    },


    given: {
	
	neutral: {

        openings: [

            {text:"Ae",weight:8},
            {text:"Ela",weight:7},
            {text:"Lia",weight:7},
            {text:"Syl",weight:6},
            {text:"Vae",weight:8},
            {text:"Cae",weight:6},
            {text:"Ith",weight:4}

        ],


        middles: [

            {text:"la",weight:8},
            {text:"ri",weight:8},
            {text:"el",weight:8},
            {text:"an",weight:5},
            {text:"ith",weight:4}

        ],


        endings: [

            {text:"ion",weight:8},
            {text:"iel",weight:8},
            {text:"ael",weight:6},
            {text:"ith",weight:5},
            {text:"wyn",weight:4}

        ]
	}

    },


    surname: {

        openings: [

            {text:"Moon",weight:5},
            {text:"Silver",weight:5},
            {text:"Star",weight:5},
            {text:"Dawn",weight:5},
            {text:"Mist",weight:5}

        ],


        endings: [

            {text:"whisper",weight:5},
            {text:"song",weight:5},
            {text:"leaf",weight:5},
            {text:"shade",weight:5},
            {text:"fall",weight:5}

        ]

    }

},

dwarven: {

    name:"Dwarven",

    profile: {

        syllableLength:[

            {value:2,weight:70},
            {value:3,weight:30}

        ],

        apostropheChance:0,

        hyphenChance:10,

        surnameChance:90,

        titleChance:40,

	namingStyle:"clan"

    },


    given: {
	
	neutral: {

        openings:[

            {text:"Bor",weight:8},
            {text:"Dur",weight:8},
            {text:"Kar",weight:7},
            {text:"Thar",weight:6},
            {text:"Brom",weight:6},
            {text:"Gor",weight:5}

        ],


        middles:[

            {text:"in",weight:7},
            {text:"an",weight:7},
            {text:"grim",weight:5},
            {text:"or",weight:7}

        ],


        endings:[

            {text:"ik",weight:8},
            {text:"ar",weight:8},
            {text:"in",weight:8},
            {text:"or",weight:5},
            {text:"um",weight:4}

        ]
	
	}

    },


    surname: {

        openings:[

            {text:"Stone",weight:7},
            {text:"Iron",weight:7},
            {text:"Oak",weight:5},
            {text:"Deep",weight:5},
            {text:"Hammer",weight:5}

        ],


        endings:[

            {text:"beard",weight:8},
            {text:"forge",weight:5},
            {text:"hand",weight:5},
            {text:"shield",weight:5},
            {text:"heart",weight:5}

        ]

    }

},

dragonkin: {

    name: "Dragonkin",


    profile: {

        syllableLength: [

            { value:3, weight:35 },
            { value:4, weight:50 },
            { value:5, weight:15 }

        ],

        apostropheChance:15,

        hyphenChance:5,

        surnameChance:60,
	
	trueNameChance:80,

        titleChance:80,

	namingStyle:"ceremonial"

    },

	titles:[

    {
        text:"The Ashen",
        weight:5
    },

    {
        text:"The Eternal",
        weight:2
    },

    {
        text:"The First Flame",
        weight:3
    },

    {
        text:"The Storm Remembered",
        weight:2
    },

      {
        text:"The Last Light",
        weight:5
    },

    {
        text:"Not Just A First Flame",
        weight:2
    },

    {
        text:"World Eater",
        weight:3
    },

    {
        text:"The Forgotten",
        weight:2
    }

],

    given: {

        neutral: {

            openings: [

                {text:"Vael",weight:8},
                {text:"Zyr",weight:6},
                {text:"Kael",weight:7},
                {text:"Thar",weight:5},
                {text:"Azh",weight:4},
                {text:"Xyr",weight:3}

            ],


            middles:[

                {text:"ael",weight:8},
                {text:"ith",weight:7},
                {text:"or",weight:6},
                {text:"rax",weight:5},
                {text:"uun",weight:3}

            ],


            endings:[

                {text:"ion",weight:8},
                {text:"ath",weight:7},
                {text:"yr",weight:5},
                {text:"yx",weight:4},
                {text:"ael",weight:5}

            ]


        }

    },


    surname: {

        openings:[

            {text:"Ember",weight:5},
            {text:"Storm",weight:5},
            {text:"Scale",weight:5},
            {text:"Ash",weight:5},
            {text:"Ancient",weight:3}

        ],


        endings:[

            {text:"wing",weight:5},
            {text:"claw",weight:5},
            {text:"flame",weight:5},
            {text:"heart",weight:5},
            {text:"crest",weight:5}

        ]

    }

}

}

});