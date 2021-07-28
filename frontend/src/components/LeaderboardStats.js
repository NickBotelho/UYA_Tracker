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
                category = {props.category}
                stat = {props.stat}
                stat_key = {props.key}
                address = {props.address}
            />
        )
        
    }
    let statRef = createRef()
    return (
        <div style = {{
            border : "3px solid rgb(141,113,24)",
            paddingTop :"10px",
            paddingRight:"10px",
            paddingBottom:"10px",
            paddingLeft:"10px",
            textAlign:"center",
            backgroundColor:"rgba(190, 177, 54, 0.8)",
            whiteSpace:"nowrap",
            paddingLeft:"10px",
            marginRight:'10px',
            marginLeft:'10px',
            fontSize: props.isDesktop ? "15pt" : "11pt"
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