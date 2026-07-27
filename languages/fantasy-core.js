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
            {text:"ae",weight:1},
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
            {text:"ae",weight:2},
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
            { text:"Al", weight:8 },
            { text:"Ar", weight:6 },
            { text:"Bar", weight:5 },
            { text:"Bel", weight:5 },
            { text:"Cal", weight:6 },
            { text:"Cor", weight:7 },
            { text:"Dar", weight:5 },
            { text:"Eli", weight:6 },
            { text:"Fen", weight:5 },
            { text:"Gal", weight:5 },
            { text:"Hal", weight:5 },
            { text:"Ira", weight:5 },
            { text:"Jor", weight:5 },
            { text:"Kai", weight:6 },
            { text:"Kel", weight:6 },
            { text:"Lan", weight:7 },
            { text:"Lin", weight:7 },
            { text:"Lor", weight:6 },
            { text:"Mar", weight:7 },
            { text:"Ner", weight:5 },
            { text:"Or", weight:5 },
            { text:"Perr", weight:4 },
            { text:"Quin", weight:5 },
            { text:"Ral", weight:5 },
            { text:"Ren", weight:6 },
            { text:"Rin", weight:5 },
            { text:"Row", weight:5 },
            { text:"Sar", weight:5 },
            { text:"Tal", weight:6 },
            { text:"Th", weight:7 },
            { text:"Tor", weight:5 },
            { text:"Val", weight:7 },
            { text:"Var", weight:5 },
            { text:"Wil", weight:4 }
        ],

        middles:[
            // Existing neutral list stays here
            { text:"an", weight:8 },
            { text:"a", weight:5 },
            { text:"ae", weight:3 },
            { text:"al", weight:8 },
            { text:"an", weight:10 },
            { text:"ar", weight:10 },
            { text:"d", weight:5 },
            { text:"el", weight:10 },
            { text:"en", weight:8 },
            { text:"er", weight:6 },
            { text:"ia", weight:5 },
            { text:"il", weight:6 },
            { text:"in", weight:10 },
            { text:"ir", weight:5 },
            { text:"or", weight:10 },
            { text:"ra", weight:5 },
            { text:"rin", weight:5 },
            { text:"ron", weight:6 },
            { text:"s", weight:7 },
            { text:"ss", weight:4 },
            { text:"t", weight:6 },
            { text:"tt", weight:4 },
            { text:"ul", weight:4 },
            { text:"ur", weight:4 },
            { text:"ven", weight:5 }
        ],

        endings:[
            // Existing neutral list stays here
            { text:"a", weight:5 },
            { text:"an", weight:8 },
            { text:"ar", weight:8 },
            { text:"el", weight:8 },
            { text:"en", weight:8 },
            { text:"er", weight:6 },
            { text:"ian", weight:5 },
            { text:"ic", weight:8 },
            { text:"in", weight:7 },
            { text:"is", weight:5 },
            { text:"on", weight:10 },
            { text:"or", weight:8 },
            { text:"us", weight:6 },
            { text:"yn", weight:4 },
            { text:"ir", weight:5 },
            { text:"eth", weight:4 },
            { text:"oth", weight:4 },
            { text:"ock", weight:4 }
        ]
    }
        },



            surname: {

                openings: [

                // Nature
                {text:"Ash",weight:5},
                {text:"Birch",weight:5},
                {text:"Black",weight:5},
                {text:"Bright",weight:5},
                {text:"Briar",weight:5},
                {text:"Brook",weight:5},
                {text:"Cedar",weight:5},
                {text:"Cold",weight:4},
                {text:"Dawn",weight:4},
                {text:"Deep",weight:4},
                {text:"Elder",weight:5},
                {text:"Fallow",weight:5},
                {text:"Fox",weight:5},
                {text:"Green",weight:5},
                {text:"Haw",weight:5},
                {text:"Hazel",weight:5},
                {text:"High",weight:5},
                {text:"Hollow",weight:5},
                {text:"Iron",weight:5},
                {text:"Ivory",weight:4},
                {text:"Long",weight:5},
                {text:"Meadow",weight:5},
                {text:"Mist",weight:5},
                {text:"Moon",weight:3},
                {text:"Oak",weight:5},
                {text:"Old",weight:4},
                {text:"Raven",weight:5},
                {text:"Red",weight:5},
                {text:"River",weight:5},
                {text:"Rose",weight:5},
                {text:"Silver",weight:5},
                {text:"Snow",weight:4},
                {text:"Stone",weight:5},
                {text:"Storm",weight:4},
                {text:"Swift",weight:5},
                {text:"Thorn",weight:5},
                {text:"True",weight:3},
                {text:"West",weight:5},
                {text:"White",weight:5},
                {text:"Wild",weight:5},
                {text:"Wolf",weight:5},

                 // Positions-Conditions
                {text:"Under",weight:1},
                {text:"Over",weight:2},
                {text:"Dead",weight:5},
                {text:"Living",weight:5},
                {text:"Bright",weight:5},
                {text:"Dark",weight:5},
                {text:"Red",weight:5},
                {text:"Green",weight:5},
                {text:"Blue",weight:5},
                {text:"Black",weight:5},
                {text:"White",weight:5},
                {text:"Grey",weight:5},
                {text:"Long",weight:5},
                {text:"Thick",weight:5},
                {text:"Thin",weight:5},
                {text:"Soft",weight:5},
                {text:"Slow",weight:5},
                {text:"Quick",weight:5},


                // Occupational
                {text:"Baker",weight:4},
                {text:"Blacksmith",weight:3},
                {text:"Carver",weight:4},
                {text:"Cooper",weight:4},
                {text:"Farmer",weight:3},
                {text:"Fletcher",weight:4},
                {text:"Hunter",weight:4},
                {text:"Miller",weight:4},
                {text:"Rider",weight:4},
                {text:"Scribe",weight:3},
                {text:"Smith",weight:5},
                {text:"Weaver",weight:4},
                {text:"Wright",weight:4}

            ],


            endings: [

                // Nature
                {text:"wood",weight:5},
                {text:"grove",weight:5},
                {text:"field",weight:5},
                {text:"brook",weight:5},
                {text:"vale",weight:5},
                {text:"hill",weight:5},
                {text:"dale",weight:5},
                {text:"stone",weight:5},
                {text:"fall",weight:5},
                {text:"thorn",weight:5},
                {text:"bloom",weight:4},
                {text:"leaf",weight:5},
                {text:"root",weight:4},
                {text:"branch",weight:4},
                {text:"bark",weight:4},
                {text:"wolf",weight:5},
                {text:"deer",weight:5},
                {text:"hare",weight:5},
                {text:"bird",weight:5},
                {text:"fish",weight:5},
                {text:"hawk",weight:5},
                {text:"shade",weight:5},
                {text:"bear",weight:5},
                {text:"drake",weight:3},
                {text:"gull",weight:5},
                {text:"rock",weight:4},


                // Family / Heritage
                {text:"son",weight:5},
                {text:"born",weight:4},
                {text:"kin",weight:5},
                {text:"ward",weight:5},
                {text:"heart",weight:4},
                {text:"blood",weight:3},


                // Strong / Old Names
                {text:"guard",weight:4},
                {text:"blade",weight:3},
                {text:"shield",weight:4},
                {text:"watch",weight:4},
                {text:"hold",weight:5},
                {text:"keep",weight:4},
                {text:"crest",weight:4},
                {text:"crown",weight:3},


                // Places
                {text:"ford",weight:5},
                {text:"bridge",weight:4},
                {text:"gate",weight:4},
                {text:"wall",weight:4},
                {text:"tower",weight:3},
                {text:"brook",weight:5},
                {text:"marsh",weight:4},
                {text:"lake",weight:4},
                {text:"sea",weight:3},
                {text:"dock",weight:2},
                {text:"pool",weight:2},
                {text:"well",weight:4},
                {text:"river",weight:4},

                // Actions or Position Ends
                {text:"run",weight:5},
                {text:"tell",weight:5},
                {text:"cry",weight:5},
                {text:"fit",weight:5},
                {text:"over",weight:5},
                {text:"under",weight:3},
                {text:"tall",weight:5},
                {text:"short",weight:5},
                {text:"hale",weight:4}

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

    male: {

    openings:[

        {text:"Ael",weight:8},
        {text:"Aer",weight:7},
        {text:"Cael",weight:8},
        {text:"Cyr",weight:5},
        {text:"Dael",weight:5},
        {text:"Elar",weight:7},
        {text:"Ery",weight:6},
        {text:"Fael",weight:5},
        {text:"Ith",weight:4},
        {text:"Laer",weight:6},
        {text:"Lorien",weight:4},
        {text:"Maer",weight:6},
        {text:"Nael",weight:7},
        {text:"Oryn",weight:5},
        {text:"Rael",weight:6},
        {text:"Sael",weight:7},
        {text:"Syl",weight:8},
        {text:"Thael",weight:5},
        {text:"Thalan",weight:5},
        {text:"Vael",weight:8},
        {text:"Varyn",weight:5},
        {text:"Yll",weight:4},
        {text:"Arian",weight:5},
        {text:"Cele",weight:5},
        {text:"Elendir",weight:3},
        {text:"Faeron",weight:4},
        {text:"Gal",weight:6},
        {text:"Isil",weight:4},
        {text:"Luth",weight:5},
        {text:"Myth",weight:3},
        {text:"Nym",weight:4},
        {text:"Olor",weight:4},
        {text:"Quen",weight:4},
        {text:"Ryn",weight:5},
        {text:"Silar",weight:5},
        {text:"Talan",weight:5},
        {text:"Ther",weight:4},
        {text:"Uvael",weight:3},
        {text:"Val",weight:6},
        {text:"Yavar",weight:3}

    ],


    middles:[

        {text:"a",weight:5},
        {text:"ae",weight:4},
        {text:"an",weight:8},
        {text:"ar",weight:8},
        {text:"el",weight:9},
        {text:"en",weight:6},
        {text:"ien",weight:5},
        {text:"iel",weight:8},
        {text:"il",weight:6},
        {text:"in",weight:7},
        {text:"ion",weight:7},
        {text:"ir",weight:6},
        {text:"ith",weight:7},
        {text:"la",weight:5},
        {text:"lin",weight:5},
        {text:"lor",weight:5},
        {text:"mir",weight:4},
        {text:"or",weight:6},
        {text:"ran",weight:5},
        {text:"rin",weight:5},
        {text:"thal",weight:4},
        {text:"ther",weight:4},
        {text:"var",weight:5},
        {text:"viel",weight:4},
        {text:"wyn",weight:5}

    ],


    endings:[

        {text:"ael",weight:7},
        {text:"an",weight:6},
        {text:"ar",weight:5},
        {text:"as",weight:4},
        {text:"el",weight:6},
        {text:"en",weight:6},
        {text:"iel",weight:9},
        {text:"ien",weight:6},
        {text:"ion",weight:8},
        {text:"ir",weight:5},
        {text:"ith",weight:7},
        {text:"or",weight:5},
        {text:"ran",weight:4},
        {text:"ril",weight:4},
        {text:"ryn",weight:4},
        {text:"thal",weight:3},
        {text:"viel",weight:3},
        {text:"wyn",weight:5}

    ]

},



    female: {

    openings:[

        {text:"Aela",weight:8},
        {text:"Aelia",weight:6},
        {text:"Ari",weight:6},
        {text:"Caeli",weight:8},
        {text:"Calia",weight:5},
        {text:"Cele",weight:5},
        {text:"Eila",weight:7},
        {text:"Elya",weight:8},
        {text:"Faela",weight:6},
        {text:"Fira",weight:4},
        {text:"Ilya",weight:5},
        {text:"Lia",weight:7},
        {text:"Lira",weight:8},
        {text:"Maela",weight:7},
        {text:"Maeria",weight:5},
        {text:"Naeva",weight:8},
        {text:"Nalia",weight:5},
        {text:"Nym",weight:4},
        {text:"Raela",weight:6},
        {text:"Riala",weight:5},
        {text:"Saela",weight:7},
        {text:"Syl",weight:8},
        {text:"Sylia",weight:6},
        {text:"Thaela",weight:5},
        {text:"Vaela",weight:8},
        {text:"Vaeria",weight:5},
        {text:"Yllia",weight:5},
        {text:"Ariella",weight:4},
        {text:"Elira",weight:6},
        {text:"Isila",weight:4},
        {text:"Lunara",weight:4},
        {text:"Myra",weight:5},
        {text:"Seri",weight:5},
        {text:"Thalia",weight:5},
        {text:"Vanya",weight:4}

    ],


    middles:[

        {text:"a",weight:6},
        {text:"ae",weight:5},
        {text:"al",weight:6},
        {text:"an",weight:7},
        {text:"ara",weight:5},
        {text:"el",weight:9},
        {text:"ela",weight:7},
        {text:"ia",weight:8},
        {text:"iel",weight:8},
        {text:"ien",weight:5},
        {text:"il",weight:5},
        {text:"ira",weight:6},
        {text:"ith",weight:7},
        {text:"la",weight:6},
        {text:"lia",weight:7},
        {text:"lith",weight:5},
        {text:"na",weight:5},
        {text:"riel",weight:7},
        {text:"ria",weight:8},
        {text:"sil",weight:4},
        {text:"thel",weight:5},
        {text:"thil",weight:4},
        {text:"va",weight:5},
        {text:"wen",weight:6},
        {text:"wyn",weight:5}

    ],


    endings:[

        {text:"a",weight:7},
        {text:"ae",weight:4},
        {text:"ael",weight:6},
        {text:"ara",weight:7},
        {text:"elle",weight:8},
        {text:"ena",weight:5},
        {text:"eth",weight:5},
        {text:"ia",weight:8},
        {text:"iel",weight:10},
        {text:"ielle",weight:7},
        {text:"ien",weight:6},
        {text:"ira",weight:6},
        {text:"ith",weight:5},
        {text:"lia",weight:7},
        {text:"lune",weight:4},
        {text:"ria",weight:6},
        {text:"wen",weight:6},
        {text:"wyn",weight:5},
        {text:"yra",weight:5},
        {text:"ielyn",weight:3}

    ]

},

  neutral: {

    openings:[

        {text:"Ae",weight:8},
        {text:"Ael",weight:8},
        {text:"Aeri",weight:6},
        {text:"Cael",weight:8},
        {text:"Cae",weight:6},
        {text:"Elar",weight:8},
        {text:"Elya",weight:5},
        {text:"Fael",weight:6},
        {text:"Ith",weight:5},
        {text:"Lia",weight:7},
        {text:"Lorien",weight:4},
        {text:"Mael",weight:6},
        {text:"Nae",weight:6},
        {text:"Rael",weight:6},
        {text:"Ryn",weight:7},
        {text:"Sael",weight:7},
        {text:"Syl",weight:8},
        {text:"Thael",weight:5},
        {text:"Vael",weight:8},
        {text:"Vae",weight:6},
        {text:"Yll",weight:4},
        {text:"Ari",weight:6},
        {text:"Calen",weight:5},
        {text:"Elan",weight:6},
        {text:"Iriel",weight:4},
        {text:"Luth",weight:5},
        {text:"Myth",weight:3},
        {text:"Oryn",weight:5},
        {text:"Silar",weight:5},
        {text:"Tae",weight:5}

    ],


    middles:[

        {text:"a",weight:6},
        {text:"ae",weight:5},
        {text:"al",weight:6},
        {text:"an",weight:8},
        {text:"ar",weight:8},
        {text:"el",weight:9},
        {text:"en",weight:6},
        {text:"ia",weight:7},
        {text:"iel",weight:8},
        {text:"ien",weight:6},
        {text:"il",weight:5},
        {text:"in",weight:7},
        {text:"ion",weight:7},
        {text:"ir",weight:5},
        {text:"ith",weight:7},
        {text:"la",weight:5},
        {text:"lin",weight:5},
        {text:"lor",weight:5},
        {text:"ra",weight:5},
        {text:"riel",weight:6},
        {text:"rin",weight:5},
        {text:"thal",weight:4},
        {text:"ther",weight:4},
        {text:"var",weight:5},
        {text:"wyn",weight:5}

    ],


    endings:[

        {text:"ael",weight:8},
        {text:"an",weight:6},
        {text:"ar",weight:6},
        {text:"el",weight:7},
        {text:"en",weight:7},
        {text:"iel",weight:9},
        {text:"ien",weight:7},
        {text:"ion",weight:8},
        {text:"ir",weight:5},
        {text:"ith",weight:8},
        {text:"or",weight:5},
        {text:"rael",weight:4},
        {text:"ril",weight:4},
        {text:"rin",weight:5},
        {text:"thal",weight:4},
        {text:"viel",weight:4},
        {text:"wyn",weight:6},
        {text:"yra",weight:4},
        {text:"eth",weight:5},
        {text:"is",weight:4}

    ]
}
        },


    surname: {

    openings:[

        {text:"Moon",weight:8},
        {text:"Silver",weight:8},
        {text:"Star",weight:7},
        {text:"Dawn",weight:7},
        {text:"Mist",weight:7},
        {text:"Sun",weight:5},
        {text:"Bright",weight:5},
        {text:"Crystal",weight:4},
        {text:"Ember",weight:4},
        {text:"Frost",weight:5},
        {text:"Golden",weight:5},
        {text:"Green",weight:5},
        {text:"High",weight:4},
        {text:"Lunar",weight:4},
        {text:"Night",weight:6},
        {text:"River",weight:5},
        {text:"Rose",weight:4},
        {text:"Shadow",weight:5},
        {text:"Sky",weight:6},
        {text:"Snow",weight:4},
        {text:"Spring",weight:4},
        {text:"Storm",weight:4},
        {text:"Sunrise",weight:3},
        {text:"Twilight",weight:5},
        {text:"Velvet",weight:3},
        {text:"Wild",weight:4},
        {text:"Wind",weight:6},
        {text:"Winter",weight:4},
        {text:"Willow",weight:7},
        {text:"Oak",weight:5}

    ],


    endings:[

        {text:"whisper",weight:8},
        {text:"song",weight:8},
        {text:"leaf",weight:8},
        {text:"shade",weight:7},
        {text:"fall",weight:7},
        {text:"bloom",weight:5},
        {text:"branch",weight:4},
        {text:"brook",weight:5},
        {text:"dancer",weight:3},
        {text:"dream",weight:5},
        {text:"flower",weight:4},
        {text:"glen",weight:5},
        {text:"grove",weight:8},
        {text:"heart",weight:5},
        {text:"hollow",weight:4},
        {text:"keeper",weight:3},
        {text:"light",weight:7},
        {text:"melody",weight:4},
        {text:"mist",weight:4},
        {text:"moon",weight:5},
        {text:"path",weight:4},
        {text:"petal",weight:4},
        {text:"rain",weight:4},
        {text:"river",weight:5},
        {text:"root",weight:3},
        {text:"rose",weight:5},
        {text:"shadow",weight:5},
        {text:"silence",weight:3},
        {text:"star",weight:6},
        {text:"thorn",weight:4},
        {text:"veil",weight:6},
        {text:"wood",weight:7},
        {text:"wooden",weight:3},
        {text:"song",weight:7},
        {text:"bough",weight:4},
        {text:"branch",weight:4},
        {text:"crest",weight:4}

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
	
	male: {

    openings:[

        {text:"Bor",weight:8},
        {text:"Borin",weight:6},
        {text:"Brom",weight:8},
        {text:"Bran",weight:5},
        {text:"Dain",weight:7},
        {text:"Dar",weight:6},
        {text:"Dorn",weight:8},
        {text:"Dur",weight:9},
        {text:"Fald",weight:5},
        {text:"Farin",weight:6},
        {text:"Gald",weight:5},
        {text:"Gar",weight:6},
        {text:"Garin",weight:6},
        {text:"Gor",weight:7},
        {text:"Grim",weight:8},
        {text:"Hal",weight:5},
        {text:"Harn",weight:6},
        {text:"Kald",weight:7},
        {text:"Kar",weight:8},
        {text:"Korin",weight:6},
        {text:"Mor",weight:7},
        {text:"Mord",weight:5},
        {text:"Narin",weight:5},
        {text:"Orrik",weight:6},
        {text:"Rogar",weight:6},
        {text:"Thar",weight:8},
        {text:"Thorin",weight:6},
        {text:"Tor",weight:7},
        {text:"Ulf",weight:5},
        {text:"Var",weight:6},
        {text:"Varr",weight:4},
        {text:"Wulf",weight:4}

    ],


    middles:[

        {text:"a",weight:5},
        {text:"an",weight:8},
        {text:"ar",weight:8},
        {text:"bar",weight:4},
        {text:"din",weight:7},
        {text:"dor",weight:7},
        {text:"gar",weight:8},
        {text:"grim",weight:6},
        {text:"in",weight:8},
        {text:"ir",weight:6},
        {text:"mar",weight:5},
        {text:"or",weight:8},
        {text:"rik",weight:8},
        {text:"rin",weight:6},
        {text:"rok",weight:5},
        {text:"thor",weight:5},
        {text:"um",weight:5},
        {text:"var",weight:6},
        {text:"vin",weight:5}

    ],


    endings:[

        {text:"ak",weight:7},
        {text:"ar",weight:8},
        {text:"din",weight:7},
        {text:"dor",weight:8},
        {text:"gar",weight:8},
        {text:"grim",weight:7},
        {text:"ik",weight:8},
        {text:"in",weight:8},
        {text:"ir",weight:6},
        {text:"or",weight:7},
        {text:"rak",weight:5},
        {text:"rin",weight:6},
        {text:"rok",weight:5},
        {text:"thor",weight:5},
        {text:"um",weight:4},
        {text:"var",weight:5}

    ]

},

female: {

    openings:[

        {text:"Alda",weight:7},
        {text:"Bara",weight:6},
        {text:"Bera",weight:6},
        {text:"Brina",weight:7},
        {text:"Dara",weight:6},
        {text:"Dorna",weight:7},
        {text:"Dura",weight:6},
        {text:"Fara",weight:5},
        {text:"Filda",weight:5},
        {text:"Gara",weight:6},
        {text:"Gilda",weight:7},
        {text:"Grina",weight:5},
        {text:"Halda",weight:6},
        {text:"Hara",weight:5},
        {text:"Kara",weight:8},
        {text:"Kelda",weight:6},
        {text:"Kora",weight:6},
        {text:"Lora",weight:5},
        {text:"Mara",weight:7},
        {text:"Morda",weight:5},
        {text:"Nara",weight:6},
        {text:"Runa",weight:7},
        {text:"Sarna",weight:5},
        {text:"Thara",weight:8},
        {text:"Thorna",weight:5},
        {text:"Tilda",weight:6},
        {text:"Vara",weight:6},
        {text:"Vilda",weight:5},
        {text:"Yara",weight:4}

    ],


    middles:[

        {text:"a",weight:5},
        {text:"an",weight:8},
        {text:"ar",weight:7},
        {text:"din",weight:6},
        {text:"dor",weight:6},
        {text:"gar",weight:7},
        {text:"gil",weight:5},
        {text:"in",weight:7},
        {text:"ir",weight:6},
        {text:"ka",weight:6},
        {text:"lin",weight:5},
        {text:"mar",weight:6},
        {text:"ra",weight:6},
        {text:"rin",weight:6},
        {text:"sa",weight:5},
        {text:"thir",weight:5},
        {text:"var",weight:6},
        {text:"ya",weight:4}

    ],


    endings:[

        {text:"a",weight:7},
        {text:"da",weight:6},
        {text:"din",weight:6},
        {text:"dora",weight:5},
        {text:"gar",weight:6},
        {text:"grim",weight:5},
        {text:"ia",weight:4},
        {text:"in",weight:7},
        {text:"ira",weight:5},
        {text:"ka",weight:6},
        {text:"na",weight:7},
        {text:"ra",weight:7},
        {text:"rin",weight:6},
        {text:"thir",weight:5},
        {text:"var",weight:5},
        {text:"ya",weight:4}

    ]

},

  neutral: {

    openings:[

        {text:"Bor",weight:8},
        {text:"Borin",weight:7},
        {text:"Brom",weight:8},
        {text:"Dain",weight:7},
        {text:"Dar",weight:6},
        {text:"Dorn",weight:8},
        {text:"Dur",weight:9},
        {text:"Fald",weight:5},
        {text:"Farin",weight:6},
        {text:"Gald",weight:5},
        {text:"Gar",weight:7},
        {text:"Gor",weight:7},
        {text:"Grim",weight:8},
        {text:"Hald",weight:6},
        {text:"Kar",weight:8},
        {text:"Karin",weight:6},
        {text:"Keld",weight:7},
        {text:"Mor",weight:7},
        {text:"Mord",weight:5},
        {text:"Norn",weight:5},
        {text:"Orin",weight:7},
        {text:"Rok",weight:5},
        {text:"Ror",weight:4},
        {text:"Thar",weight:9},
        {text:"Thor",weight:7},
        {text:"Tor",weight:6},
        {text:"Uld",weight:5},
        {text:"Var",weight:7},
        {text:"Vorn",weight:5},
        {text:"Zor",weight:4}

    ],


    middles:[

        {text:"an",weight:8},
        {text:"ar",weight:8},
        {text:"bar",weight:5},
        {text:"din",weight:8},
        {text:"dor",weight:8},
        {text:"gar",weight:8},
        {text:"grim",weight:6},
        {text:"in",weight:8},
        {text:"ir",weight:6},
        {text:"mar",weight:6},
        {text:"or",weight:8},
        {text:"rik",weight:7},
        {text:"rin",weight:6},
        {text:"rok",weight:5},
        {text:"thar",weight:5},
        {text:"thor",weight:5},
        {text:"um",weight:5},
        {text:"var",weight:6}

    ],


    endings:[

        {text:"ak",weight:6},
        {text:"ar",weight:8},
        {text:"din",weight:8},
        {text:"dor",weight:8},
        {text:"gar",weight:9},
        {text:"grim",weight:7},
        {text:"ik",weight:7},
        {text:"in",weight:8},
        {text:"ir",weight:6},
        {text:"or",weight:7},
        {text:"rak",weight:5},
        {text:"rin",weight:6},
        {text:"rok",weight:5},
        {text:"thor",weight:5},
        {text:"um",weight:5},
        {text:"var",weight:6},
        {text:"vald",weight:4},
        {text:"dur",weight:4}

    ]

}
        },


    surname: {

    openings:[

        {text:"Stone",weight:8},
        {text:"Iron",weight:8},
        {text:"Steel",weight:7},
        {text:"Gold",weight:6},
        {text:"Silver",weight:5},
        {text:"Bronze",weight:5},
        {text:"Copper",weight:4},
        {text:"Deep",weight:8},
        {text:"Dark",weight:5},
        {text:"High",weight:5},
        {text:"Black",weight:6},
        {text:"Bright",weight:5},
        {text:"Frost",weight:5},
        {text:"Fire",weight:6},
        {text:"Ember",weight:5},
        {text:"Ash",weight:5},
        {text:"Mountain",weight:6},
        {text:"Thunder",weight:5},
        {text:"Storm",weight:4},
        {text:"Oak",weight:4},
        {text:"Hammer",weight:8},
        {text:"Rune",weight:7},
        {text:"Anvil",weight:7},
        {text:"Forge",weight:8},
        {text:"Shield",weight:5},
        {text:"Axe",weight:5},
        {text:"Crown",weight:5},
        {text:"Vault",weight:5},
        {text:"Cinder",weight:4},
        {text:"Granite",weight:5}

    ],


    endings:[

        {text:"beard",weight:8},
        {text:"forge",weight:8},
        {text:"hand",weight:7},
        {text:"hammer",weight:8},
        {text:"stone",weight:7},
        {text:"heart",weight:6},
        {text:"shield",weight:6},
        {text:"axe",weight:5},
        {text:"blade",weight:5},
        {text:"brow",weight:4},
        {text:"breaker",weight:5},
        {text:"carver",weight:6},
        {text:"cutter",weight:4},
        {text:"delver",weight:5},
        {text:"drill",weight:3},
        {text:"fall",weight:4},
        {text:"fist",weight:5},
        {text:"foot",weight:4},
        {text:"guard",weight:6},
        {text:"keeper",weight:6},
        {text:"maker",weight:5},
        {text:"mine",weight:4},
        {text:"pick",weight:3},
        {text:"root",weight:4},
        {text:"rune",weight:6},
        {text:"smith",weight:8},
        {text:"song",weight:3},
        {text:"spire",weight:4},
        {text:"vault",weight:6},
        {text:"ward",weight:5},
        {text:"wall",weight:5},
        {text:"watch",weight:5},
        {text:"wright",weight:5}

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

    openings:[

        {text:"Vael",weight:8},
        {text:"Vaelor",weight:6},
        {text:"Vyr",weight:5},
        {text:"Zyr",weight:7},
        {text:"Zyra",weight:5},
        {text:"Kael",weight:7},
        {text:"Kaelor",weight:5},
        {text:"Thar",weight:8},
        {text:"Tharion",weight:6},
        {text:"Azh",weight:5},
        {text:"Azhar",weight:6},
        {text:"Xyr",weight:5},
        {text:"Xyrael",weight:4},
        {text:"Rhae",weight:5},
        {text:"Rhaelor",weight:4},
        {text:"Myth",weight:4},
        {text:"Nyx",weight:4},
        {text:"Or",weight:5},
        {text:"Orath",weight:5},
        {text:"Syl",weight:4},
        {text:"Tyr",weight:5},
        {text:"Vorn",weight:5},
        {text:"Kyr",weight:4},
        {text:"Zar",weight:5},
        {text:"Aurel",weight:4}

    ],


    middles:[

        {text:"ael",weight:8},
        {text:"ath",weight:7},
        {text:"ith",weight:7},
        {text:"or",weight:7},
        {text:"rax",weight:6},
        {text:"uun",weight:4},
        {text:"yrr",weight:4},
        {text:"var",weight:6},
        {text:"ion",weight:8},
        {text:"iel",weight:6},
        {text:"aris",weight:5},
        {text:"eth",weight:5},
        {text:"aryn",weight:5},
        {text:"ul",weight:4},
        {text:"yx",weight:3}

    ],


    endings:[

        {text:"ion",weight:8},
        {text:"ath",weight:8},
        {text:"yr",weight:6},
        {text:"yx",weight:5},
        {text:"ael",weight:7},
        {text:"ith",weight:6},
        {text:"oras",weight:5},
        {text:"uun",weight:4},
        {text:"arion",weight:5},
        {text:"vyr",weight:4},
        {text:"eth",weight:5},
        {text:"yxia",weight:3}

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