import React, { createRef, useState, useCallback, useEffect } from "react";
import { LiveWeapon } from "./LiveWeapon";
import blitz from '../../static/images/weapons/blitz.png'
import flux from '../../static/images/weapons/flux.png'
import gravity from '../../static/images/weapons/gravity.png'
import lava from '../../static/images/weapons/lava.png'
import mines from '../../static/images/weapons/mines.png'
import n60 from '../../static/images/weapons/n60.png'
import morph from '../../static/images/weapons/morph.png'
import rockets from '../../static/images/weapons/rockets.png'
function LiveLoadout(props){
    const weaponIcons = {
        "N60":n60,
        "Blitz":blitz,
        "Flux":flux,
        "Rockets":rockets,
        "Gravity Bomb":gravity,
        "Mines":mines,
        "Lava Gun":lava,
        "Morph O' Ray":morph,
    }
    function createWeapons(weapons){
        let res = []
        for (const [key, value] of Object.entries(weapons)){
            if (key in weaponIcons){
                res.push(<LiveWeapon weapon = {key} info = {value} isDesktop = {props.isDesktop} key = {key} isCycle = {props.isCycle}/>)
            }
        }
        
        return res
    }
    
    const loadout = createWeapons(props.weapons)
    return (  
        <div style = {{
            height : props.isDesktop? '150px' : '75px',
            width: props.isDesktop? '250px' : '125px',
            display: 'flex',
            flexDirection:"row",
            flexWrap:'wrap'
        }}>
           {loadout}


        </div>
    )

}

export {LiveLoadout}