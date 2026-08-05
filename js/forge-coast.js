/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 FORGE COAST

 Version 2.0.0

 "The sea defines the shore."

=========================================================
*/

const ForgeCoast = (()=>{

/*
=========================================================
GENERATE
=========================================================
*/

function generate(world){

    if(
        !world ||
        !world.land ||
        !world.land.cells
    ){

        console.warn(
            "ForgeCoast: Missing land."
        );

        return [];

    }

    const width =
        world.land.width;

    const height =
        world.land.height;

    const cells =
        world.land.cells;

    const lookup =
        new Map();

    cells.forEach(cell=>{

        lookup.set(
            `${cell.x},${cell.y}`,
            cell
        );

    });

    const coastline=[];

    cells.forEach(cell=>{

        if(!cell.land){

            return;

        }

        if(
            touchesOcean(
                cell,
                lookup,
                width,
                height
            )
        ){

            coastline.push({

                x:cell.x,
                y:cell.y

            });

        }

    });

    world.land.coastline=
        coastline;

    return coastline;

}

/*
=========================================================
TOUCHES OCEAN
=========================================================
*/

function touchesOcean(
    cell,
    lookup,
    width,
    height
){

    const dirs=[

        [-1,0],
        [1,0],
        [0,-1],
        [0,1],

        [-1,-1],
        [1,-1],
        [-1,1],
        [1,1]

    ];

    for(
        let i=0;
        i<dirs.length;
        i++
    ){

        const nx=
            cell.x+dirs[i][0];

        const ny=
            cell.y+dirs[i][1];

        if(
            nx<0 ||
            ny<0 ||
            nx>=width ||
            ny>=height
        ){

            return true;

        }

        const neighbor=
            lookup.get(
                `${nx},${ny}`
            );

        if(
            !neighbor ||
            !neighbor.land
        ){

            return true;

        }

    }

    return false;

}

return{

    generate

};

})();