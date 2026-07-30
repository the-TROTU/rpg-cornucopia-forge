/*======================================================

    RPG CORNUCOPIA
    THE FORGE

    File:
        forge-tags.js

    Version:
        1.0.0

    Purpose:
        Keeper of Fate Tag Library

======================================================*/


const ForgeTags = {

    Combat: [

        {
            id:"attack",
            icon:"⚔",
            label:"Attack"
        },

        {
            id:"defense",
            icon:"🛡",
            label:"Defense"
        },

        {
            id:"melee",
            icon:"🗡",
            label:"Melee"
        },

        {
            id:"ranged",
            icon:"🏹",
            label:"Ranged"
        },

        {
            id:"magic",
            icon:"✨",
            label:"Magic"
        },

        {
            id:"critical",
            icon:"💥",
            label:"Critical"
        }

    ],


    Damage:[

        {
            id:"fire",
            icon:"🔥",
            label:"Fire"
        },

        {
            id:"ice",
            icon:"❄",
            label:"Ice"
        },

        {
            id:"lightning",
            icon:"⚡",
            label:"Lightning"
        },

        {
            id:"acid",
            icon:"🧪",
            label:"Acid"
        },

        {
            id:"poison",
            icon:"☠",
            label:"Poison"
        },

        {
            id:"necrotic",
            icon:"💀",
            label:"Necrotic"
        }

    ],


    Terrain:[

        {
            id:"forest",
            icon:"🌲",
            label:"Forest"
        },

        {
            id:"mountain",
            icon:"⛰",
            label:"Mountain"
        },

        {
            id:"desert",
            icon:"🏜",
            label:"Desert"
        },

        {
            id:"swamp",
            icon:"🐸",
            label:"Swamp"
        },

        {
            id:"underground",
            icon:"🕳",
            label:"Underground"
        },

        {
            id:"urban",
            icon:"🏰",
            label:"Settlement"
        }

    ],


    Conditions:[

        {
            id:"blessed",
            icon:"✨",
            label:"Blessed"
        },

        {
            id:"cursed",
            icon:"☠",
            label:"Cursed"
        },

        {
            id:"stunned",
            icon:"💫",
            label:"Stunned"
        },

        {
            id:"prone",
            icon:"⬇",
            label:"Prone"
        },

        {
            id:"hidden",
            icon:"👁",
            label:"Hidden"
        },

        {
            id:"invisible",
            icon:"🌫",
            label:"Invisible"
        }

    ],


    Environment:[

        {
            id:"day",
            icon:"☀",
            label:"Day"
        },

        {
            id:"night",
            icon:"🌙",
            label:"Night"
        },

        {
            id:"rain",
            icon:"🌧",
            label:"Rain"
        },

        {
            id:"snow",
            icon:"❄",
            label:"Snow"
        },

        {
            id:"fog",
            icon:"🌫",
            label:"Fog"
        },

        {
            id:"storm",
            icon:"⛈",
            label:"Storm"
        }

    ]


    
};

ForgeTags.getCategories = function(){

    return Object.keys(this)
        .filter(key =>
            Array.isArray(this[key])
        );

};


ForgeTags.getCategory = function(category){

    return this[category] || [];

};


ForgeTags.find = function(id){

    id = id.toLowerCase();

    for(const category of this.getCategories()){

        const tag = this[category].find(
            t => t.id === id
        );

        if(tag){

            return tag;

        }

    }

    return null;

};