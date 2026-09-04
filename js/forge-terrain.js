/*
=========================================================

 RPG CORNUCOPIA
 THE FORGE

 TERRAIN ENGINE

 Version 4.8.1

 "The land chooses its own character."

=========================================================
*/

const ForgeTerrain = (()=>{

/*
=========================================================
 GENERATE TERRAIN
=========================================================
*/

function generate(world){

    if(
        !world ||
        !world.elevation
    ){

        console.error(
            "ForgeTerrain: Missing elevation data."
        );

        return null;

    }


    const terrain={

        mountains:[],
        mountainRanges:[],

        hills:[],
        plains:[],
        forests:[],
        deserts:[],
        wetlands:[],
        tundra:[]

    };


    /*
    First classify the land.

    Terrain classification is deliberately
    deterministic. The old engine used
    Math.random() here, which meant terrain
    could change independently of the world
    seed every time this function ran.
    */

    world.elevation.cells.forEach(
        cell=>{

            if(!cell.land){

                return;

            }


            const type=
                determineTerrain(
                    cell,
                    world
                );


            terrain[type].push({

                x:Number(cell.x),
                y:Number(cell.y),
                height:Number(cell.height || 0)

            });

        }
    );


    /*
    Mountains are now organized into ranges.

    The individual mountain cells remain in
    terrain.mountains for compatibility, but
    the renderer should prefer mountainRanges.
    */

    terrain.mountainRanges=
        buildMountainRanges(
            terrain.mountains,
            world
        );


    return terrain;

}


/*
=========================================================
 DETERMINE TERRAIN
=========================================================
*/

function determineTerrain(
    cell,
    world
){

    const height=
        Number(cell.height || 0);


    const climate=
        world.settings &&
        world.settings.climate;


    /*
    Highest elevations.

    Raise this threshold slightly so mountains
    are naturally rarer than before.
    */

    if(height>.80){

        return "mountains";

    }


    /*
    Medium-high elevations.
    */

    if(height>.48){

        return "hills";

    }


    /*
    Cold climates.
    */

    if(
        climate==="cold" &&
        height>.20
    ){

        return "tundra";

    }


    /*
    Tropical forest.
    */

    if(
        climate==="tropical" &&
        deterministicChance(
            cell.x,
            cell.y,
            0.58
        )
    ){

        return "forests";

    }


    /*
    Arid desert.
    */

    if(
        climate==="arid" &&
        deterministicChance(
            cell.x,
            cell.y,
            0.60
        )
    ){

        return "deserts";

    }


    /*
    Wetlands are deliberately uncommon.
    */

    if(
        deterministicChance(
            cell.x,
            cell.y,
            0.16
        )
    ){

        return "wetlands";

    }


    return "plains";

}


/*
=========================================================
 BUILD MOUNTAIN RANGES
=========================================================
*/

function buildMountainRanges(
    mountains,
    world
){

    if(
        !Array.isArray(mountains) ||
        mountains.length<3
    ){

        return [];

    }


    const cells=
        mountains
        .filter(isPoint)
        .map(
            mountain=>({

                x:Number(mountain.x),
                y:Number(mountain.y),
                height:Number(
                    mountain.height || 0
                )

            })
        );


    if(cells.length<3){

        return [];

    }


    /*
    -----------------------------------------------------
    STEP 1
    -----------------------------------------------------

    Group mountain cells into broad geographic
    components.

    This prevents a range from being assembled
    from mountains scattered across the map.
    */

    const components=
        connectedComponents(
            cells,
            3.4
        );


    const ranges=[];


    components.forEach(
        component=>{

            if(
                component.length<3
            ){

                return;

            }


            /*
            A component may contain several
            adjacent mountain clusters.

            Break very broad components into
            directional ridge chains.
            */

            const range=
                buildRangeFromComponent(
                    component
                );


            if(
                range &&
                range.length>=3
            ){

                ranges.push(
                    range
                );

            }

        }
    );


    /*
    Largest ranges first.

    Keeps the renderer's visual hierarchy
    predictable.
    */

    ranges.sort(
        (a,b)=>
            b.length-a.length
    );


    return ranges.slice(
        0,
        8
    );

}


/*
=========================================================
 CONNECTED COMPONENTS
=========================================================
*/

function connectedComponents(
    cells,
    connectionDistance
){

    const remaining=
        cells.slice();


    const components=[];


    while(
        remaining.length
    ){

        const seed=
            remaining.pop();


        const component=[
            seed
        ];


        const queue=[
            seed
        ];


        while(
            queue.length
        ){

            const current=
                queue.pop();


            for(
                let i=remaining.length-1;
                i>=0;
                i--
            ){

                const candidate=
                    remaining[i];


                const distance=
                    Math.hypot(
                        current.x-candidate.x,
                        current.y-candidate.y
                    );


                if(
                    distance<=
                    connectionDistance
                ){

                    remaining.splice(
                        i,
                        1
                    );


                    component.push(
                        candidate
                    );


                    queue.push(
                        candidate
                    );

                }

            }

        }


        components.push(
            component
        );

    }


    return components;

}


/*
=========================================================
 BUILD RANGE FROM COMPONENT
=========================================================
*/

function buildRangeFromComponent(
    component
){

    if(
        component.length<3
    ){

        return null;

    }


    /*
    -----------------------------------------------------
    FIND MAJOR AXIS
    -----------------------------------------------------

    Instead of simply drawing triangles at every
    mountain cell, determine the dominant direction
    of the group.
    */

    const center=
        component.reduce(
            (sum,p)=>({

                x:
                    sum.x+p.x,

                y:
                    sum.y+p.y

            }),
            {x:0,y:0}
        );


    center.x/=
        component.length;


    center.y/=
        component.length;


    let xx=0;
    let yy=0;
    let xy=0;


    component.forEach(
        point=>{

            const dx=
                point.x-center.x;


            const dy=
                point.y-center.y;


            xx+=dx*dx;
            yy+=dy*dy;
            xy+=dx*dy;

        }
    );


    const angle=
        .5*
        Math.atan2(
            2*xy,
            xx-yy
        );


    const axisX=
        Math.cos(angle);


    const axisY=
        Math.sin(angle);


    /*
    Project every mountain onto the major axis.
    */

    const projected=
        component
        .map(
            point=>({

                point,

                along:
                    (
                        point.x-center.x
                    )*
                    axisX
                    +
                    (
                        point.y-center.y
                    )*
                    axisY,

                across:
                    (
                        point.x-center.x
                    )*
                    -axisY
                    +
                    (
                        point.y-center.y
                    )*
                    axisX

            })
        )
        .sort(
            (a,b)=>
                a.along-b.along
        );


    /*
    -----------------------------------------------------
    SAMPLE RIDGE PEAKS
    -----------------------------------------------------

    We deliberately use fewer peaks than mountain
    cells. This is what prevents the old
    "army of teepees" appearance.
    */

    const desired=
        Math.max(
            3,
            Math.min(
                7,
                Math.round(
                    Math.sqrt(
                        component.length
                    )*.72
                )
            )
        );


    const minAlong=
        projected[0].along;


    const maxAlong=
        projected[
            projected.length-1
        ].along;


    const span=
        Math.max(
            1,
            maxAlong-minAlong
        );


    const peaks=[];


    for(
        let i=0;
        i<desired;
        i++
    ){

        const target=
            minAlong+
            span*
            (
                i/
                Math.max(
                    1,
                    desired-1
                )
            );


        const window=
            span/
            desired*
            .85;


        const candidates=
            projected.filter(
                item=>
                    Math.abs(
                        item.along-target
                    )<=window
            );


        if(!candidates.length){

            continue;

        }


        /*
        Prefer higher ground, but add a tiny
        deterministic positional bias so the
        ridge does not become perfectly uniform.
        */

        candidates.sort(
            (a,b)=>{

                const scoreA=
                    a.point.height+
                    deterministicValue(
                        a.point.x,
                        a.point.y
                    )*.10;


                const scoreB=
                    b.point.height+
                    deterministicValue(
                        b.point.x,
                        b.point.y
                    )*.10;


                return scoreB-scoreA;

            }
        );


        const selected=
            candidates[0].point;


        /*
        Avoid duplicate peaks.
        */

        if(
            peaks.some(
                peak=>
                    Math.hypot(
                        peak.x-selected.x,
                        peak.y-selected.y
                    )<2.2
            )
        ){

            continue;

        }


        peaks.push({

            x:selected.x,
            y:selected.y,
            height:selected.height

        });

    }


    if(
        peaks.length<3
    ){

        return null;

    }


    /*
    Sort once more along the range axis.
    */

    peaks.sort(
        (a,b)=>{

            const aa=
                (
                    a.x-center.x
                )*axisX+
                (
                    a.y-center.y
                )*axisY;


            const bb=
                (
                    b.x-center.x
                )*axisX+
                (
                    b.y-center.y
                )*axisY;


            return aa-bb;

        }
    );


    return peaks;

}


/*
=========================================================
 DETERMINISTIC CHANCE
=========================================================
*/

function deterministicChance(
    x,
    y,
    probability
){

    return(
        deterministicValue(x,y)
        <
        probability
    );

}


/*
=========================================================
 DETERMINISTIC VALUE
=========================================================
*/

function deterministicValue(
    x,
    y
){

    const value=
        Math.sin(
            Number(x)*12.9898+
            Number(y)*78.233
        )
        *
        43758.5453;


    return(
        value-
        Math.floor(value)
    );

}


/*
=========================================================
 UTILITIES
=========================================================
*/

function isPoint(value){

    return(
        value &&
        Number.isFinite(Number(value.x)) &&
        Number.isFinite(Number(value.y))
    );

}


return{

    generate

};

})();