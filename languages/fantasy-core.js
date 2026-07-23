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


            given: {

    		neutral: {

                openings: [

                    { text:"Al", weight:5 },
                    { text:"Bar", weight:5 },
                    { text:"Cor", weight:5 },
                    { text:"Dar", weight:5 },
                    { text:"El", weight:5 },
                    { text:"Gar", weight:5 },
                    { text:"Hal", weight:5 },
                    { text:"Mar", weight:5 },
                    { text:"Ran", weight:5 },
                    { text:"Tor", weight:5 }

                ],


                middles: [

                    { text:"an", weight:8 },
                    { text:"el", weight:8 },
                    { text:"or", weight:8 },
                    { text:"in", weight:8 },
                    { text:"ar", weight:8 }

                ],


                endings: [

                    { text:"ic", weight:5 },
                    { text:"on", weight:5 },
                    { text:"us", weight:5 },
                    { text:"en", weight:5 },
                    { text:"a", weight:5 }

                ]
		}

            },

	male: {

    openings: [

        {text:"Ald",weight:5},
        {text:"Bran",weight:5},
        {text:"Ced",weight:5},
        {text:"Garr",weight:5}

    ],

    middles:[

        {text:"er",weight:5},
        {text:"an",weight:5},
        {text:"ic",weight:5}

    ],

    endings:[

        {text:"on",weight:5},
        {text:"ald",weight:5},
        {text:"ric",weight:5}

    ]

},

female: {

    openings:[

        {text:"Ari",weight:5},
        {text:"El",weight:5},
        {text:"Lia",weight:5},
        {text:"Mar",weight:5}

    ],

    middles:[

        {text:"el",weight:5},
        {text:"ia",weight:5},
        {text:"an",weight:5}

    ],

    endings:[

        {text:"a",weight:5},
        {text:"elle",weight:5},
        {text:"ine",weight:5}

    ]

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
                    { text:"brook", weight:5 },
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
        text:"World Eater",
        weight:1
    },

    {
        text:"Skull Crusher",
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