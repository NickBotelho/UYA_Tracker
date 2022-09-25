import React, { createRef, useState, useCallback, useEffect } from "react";
import {LeaderboardBoard} from "./LeaderboardBoard.js"
import { statList, stat_keys } from "./extras.js";

function LeaderboardStats(props){

    const buttonHover = (e) =>{
        statRef.current.style.background = 'rgba(217,163,58,0.8)'
    }
    const buttonRest = (e) =>{
        statRef.current.style.background ="rgba(190, 177, 54, 0.8)"
    }

    const getBoard = () =>{
        props.changeBoard(
            <LeaderboardBoard 
                category = {props.category} //ctf
                stat = {props.stat}         //wins
                stat_key = {props.stat_key}      //wins
                address = {props.address}
                isDesktop = {props.isDesktop}
            />
        )
        
    }
    let statRef = createRef()
    return (
        <div style = {{
            border : "3px solid rgb(141,113,24)",
            paddingTop :props.isDesktop? "10px" : "2px",
            paddingRight:props.isDesktop? "25px" : "10px",
            paddingBottom:props.isDesktop? "10px" : "2px",
            paddingLeft:props.isDesktop? "25px" : "10px",
            fontSize:props.isDesktop?"18pt":"12pt",
            textAlign:"center",
            backgroundColor:"rgba(190, 177, 54, 0.8)",
            whiteSpace:"nowrap",
            marginRight:props.isDesktop ? "5px" : "0px",
            marginLeft:props.isDesktop ? "5px" : "0px",
            cursor:'pointer',
            userSelect:"none",
                    }}
            ref = {statRef}
            onMouseDown = {getBoard}
            onMouseEnter = {buttonHover}
            onMouseLeave = {buttonRest}>
            <h3>{props.stat.toUpperCase()}</h3>
        </div>
    )

























}

export {LeaderboardStats}