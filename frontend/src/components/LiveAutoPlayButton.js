import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { statList, stat_keys } from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'
import {PlayersOnline} from './PlayersOnline'
import {GamesOnline} from './GamesOnline'
import {Chat} from './Chat'
import { LiveMap2 } from "./LiveMap.js";
const DEBUG = false
var address = null
if (DEBUG==true){
    address = "http://127.0.0.1:5000"
}
else{
    address = "https://uyatracker.herokuapp.com"
}


function LiveAutoPlayButton(props){
    
    let [home, setHome] = useState(null)
    let homeButtonRef = createRef()


    const restingStyle = {
        background:"rgba(190, 177, 54, 0.8)",
        cursor:'pointer',
        fontSize:"17pt",
        border : "3px solid rgb(141,113,24)",
        fontFamily:"Roboto, sans-serif",
        fontWeight:"bolder",
        textShadow:"1px 1px 1px black",
        color: 'rgb(141,113,24)',
        userSelect:"none"


    }
    const hoverStyle={
        background:"rgba(217,163,58,0.8)",
        cursor:'pointer',
        border : "3px solid rgb(141,113,24)",
        fontFamily:"Roboto, sans-serif",
        fontWeight:"bolder",
        textShadow:"1px 1px 1px black",

    }
    const buttonHover = (e) => {
        homeButtonRef.current.style.background = hoverStyle.background
    }
    const buttonLeave = (e) =>  {
        homeButtonRef.current.style.background = restingStyle.background
    }
    const goHome = () =>{
        setHome(true)
    }

    if (home != null){
        const redirect = `/autoplayer`
        return <Redirect push to = {redirect}/>
    }

    return (
        <div>
            <button style = {restingStyle}
            ref = {homeButtonRef}
            onMouseOver = {buttonHover}
            onMouseLeave = {buttonLeave}
            onMouseDown = {goHome}>
                AutoPlayer
            </button>

        </div>
    )

}

export {LiveAutoPlayButton}