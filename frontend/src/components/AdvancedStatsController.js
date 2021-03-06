import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { StatTable } from "./StatTable";
function AdvancedStatsController(props){


    const showTable = () =>{
        props.changeTable(
            <StatTable
                player = {props.player}
                advanced = {true}
                category = {props.category}
                address = {props.address}
                maps = {false}

            />
        )
    }
    const buttonHover = (e) =>{
        gameControllerRef.current.style.background = 'rgba(217,163,58,0.8)'
    }
    const buttonRest = (e) =>{
        gameControllerRef.current.style.background ="rgba(190, 177, 54, 0.8)"
    }

    let gameControllerRef = createRef()
   
    return(
        <div style = {{
        border : "3px solid rgb(141,113,24)",
        paddingTop :"10px",
        paddingRight:"50px",
        paddingBottom:"10px",
        paddingLeft:"50px",
        textAlign:"center",
        backgroundColor:"rgba(190, 177, 54, 0.8)",
        opacity:"0.8",
        whiteSpace:"nowrap",
        color: 'rgb(141,113,24)',
        fontWeight:"bolder",
        textShadow:"1px 1px 1px black",
        userSelect:"none",
        
    }}
        ref = {gameControllerRef}
        onMouseDown= {showTable}
        onMouseOver = {buttonHover}
        onMouseLeave = {buttonRest}
    >
            <h3>{props.title}</h3>
        </div>
    )
    

}


export { AdvancedStatsController }