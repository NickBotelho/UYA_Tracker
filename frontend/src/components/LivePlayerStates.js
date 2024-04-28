import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap, mapCodeToString} from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'
import { LivePlayer } from "./LivePlayer.js";

//<img src={`data:image/png;base64,${this.state.image}`}/>
function LivePlayerStates(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });

    let myStorage = window.localStorage;


    function makePlayers(){
        let res = []
        for (let i = 0; i < props.message.Lobby.length; i++){
            res.push(<LivePlayer player = {props.message.Lobby[i]} key = {i} isDesktop = {props.isDesktop} map = {mapCodeToString[props.message.GameObjects.Map]}/>)
        }
        return res
    }
    if(props.isFullscreen || !props.hasPlayerInformation){
        return null
    }

    let playerComponents = makePlayers()
    return (
        <div style = {{
            width : props.isDesktop? '650px': '100%',
            display:'flex',
            justifyContent:"center",
        }}>
            <div style = {{
            marginTop: props.isDesktop? '50px': '15px',

            width:props.isDesktop? '650px':'325px',
            height:"100%",
            display:'flex',
            flexWrap:'wrap',
            justifyContent:'space-evenly'
        }}>
            {playerComponents}

            </div>
        </div>
        

    )

}

export {LivePlayerStates}