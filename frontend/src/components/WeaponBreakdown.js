import React, { createRef, useState, useCallback, useEffect } from "react";
import blitz from '../../static/images/weapons/blitz.png'
import flux from '../../static/images/weapons/flux.png'
import gravity from '../../static/images/weapons/gravity.png'
import lava from '../../static/images/weapons/lava.png'
import mines from '../../static/images/weapons/mines.png'
import n60 from '../../static/images/weapons/n60.png'
import morph from '../../static/images/weapons/morph.png'
import rockets from '../../static/images/weapons/rockets.png'

//props dicts of weapons
function WeaponBreakdown(props) {
    const filters = {
        'v1': "invert(100%) sepia(100%) saturate(0%) hue-rotate(215deg) brightness(109%) contrast(102%)",
        'v2': 'invert(10%) sepia(100%) saturate(6489%) hue-rotate(243deg) brightness(94%) contrast(141%)'
    }

    const weaponPics = {
        "Flux": flux,
        "Blitz": blitz,
        "Gravity Bomb": gravity,
        "Rockets": rockets,
        "Morph O' Ray": morph,
        "N60": n60,
        "Lava Gun": lava,
        "Mines": mines
    }

    let weaponRef = createRef()
    let imageRef = createRef()
    const toggleOn = () => {
        imageRef.current.style.filter = filters['v2']
        props.updateGun(<div ref={weaponRef} style={{
            fontSize: props.isDesktop ? '20pt' :'11pt',

        }}>
            <p>BEST KILLSTREAK {props.info['bestStreak']}</p>
            <p>SHOTS {props.info['shots']}</p>
            <p>KILLS {props.info['kills']}</p>
        </div>)
    }
    const toggleOff = () => {
        imageRef.current.style.filter = filters['v1']


    }
    return (
        <div style={{

            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
        }}>
            <img ref={imageRef} src={weaponPics[props.info["weapon"]]} onMouseOver={toggleOn} onMouseLeave={toggleOff}
                height={props.isDesktop ? '75' : "35"} width={props.isDesktop ? '75' : "35"} style={{
                    filter: `${filters['v1']}`

                }}></img>



        </div>

    )
}

export { WeaponBreakdown }