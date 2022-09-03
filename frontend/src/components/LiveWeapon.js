import React, { createRef, useState, useCallback, useEffect } from "react";
import blitz from '../../static/images/weapons/blitz.png'
import flux from '../../static/images/weapons/flux.png'
import gravity from '../../static/images/weapons/gravity.png'
import lava from '../../static/images/weapons/lava.png'
import mines from '../../static/images/weapons/mines.png'
import n60 from '../../static/images/weapons/n60.png'
import morph from '../../static/images/weapons/morph.png'
import rockets from '../../static/images/weapons/rockets.png'

function LiveWeapon(props) {
    let weaponRef = createRef()
    const weaponIcons = {
        "N60": n60,
        "Blitz": blitz,
        "Flux": flux,
        "Rockets": rockets,
        "Gravity Bomb": gravity,
        "Mines": mines,
        "Lava Gun": lava,
        "Morph O' Ray": morph,
    }
    const weaponBars = {
        0:0,
        1:33,
        2:66,
        3:100,
    }
    const filters = {
        'v1': "invert(100%) sepia(100%) saturate(0%) hue-rotate(215deg) brightness(109%) contrast(102%)",
        'v2': 'invert(10%) sepia(100%) saturate(6489%) hue-rotate(243deg) brightness(94%) contrast(141%)'
    }
    const streak = props.info.killstreak >= 3? 3 : props.info.killstreak

    const toggleOn = (e) => {
        weaponRef.current.style.visibility = "visible"
    }
    const toggleOff = (e) => {
        weaponRef.current.style.visibility = "hidden"

    }
    return (
        <div >
            <img src={weaponIcons[props.weapon]}
                height= {props.isDesktop ? props.isCycle? '60' : '28' : '12'} width= {props.isDesktop ? props.isCycle? '60' : '30' : '12'}
                onMouseOver = {toggleOn} onMouseLeave = {toggleOff}
                style={{
                    filter: `${props.info.isV2 ? filters['v2'] : filters['v1']}`,
                    paddingRight: `${props.isDesktop ? '5' : '2'}`,
                    zIndex:"0"
                }} />

            <div style={{
                height: props.isDesktop ? '5px' : '2px',
                width: props.isDesktop ? props.isCycle? '60px' : '28px' : '12px',
                borderColor: "black",
                border: '1px solid rgb(144,99,30)',
                paddingRight: `${props.isDesktop ? '5' : '2'}`,
                textAlign: "center",
                background: `linear-gradient(to right,  rgb(198,151,64) 0%,rgb(198,151,64) ${weaponBars[streak]}%,rgb(118,83,25) ${weaponBars[streak]}%,rgb(118,83,25) 100%)`,
                color: "rgb(225,218,113)",
                textShadow: '2px 2px 2px black',
                fontSize: props.isDesktop ? "24pt" : '12pt',
                zIndex:"0"
            }}>
            </div>

            <div ref = {weaponRef} style={{
                marginTop:'10px',
                height: props.isDesktop ? '120px' : '80px',
                width: props.isDesktop ? '200px' : '100px',
                borderColor: "black",
                border: '1px solid rgb(144,99,30)',
                textAlign: "center",
                background: `rgb(118,83,25)`,
                color: "rgb(225,218,113)",
                textShadow: '2px 2px 2px black',
                fontSize: props.isDesktop ? "18pt" : '10pt',
                visibility:"hidden",
                zIndex:"10",
                position:"absolute"
            }} >
                <p>Kills: {props.info.kills}</p>
                <p>Shots: {props.info.shots}</p>
                <p>Current Streak: {props.info.killstreak}</p>
                <p>Best Streak: {props.info.bestStreak}</p>
            </div>


        </div>
    )

}

export { LiveWeapon }