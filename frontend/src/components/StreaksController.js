import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { StatTable } from "./StatTable";
function StreaksController(props){


    const showTable = () =>{
        props.changeTable(
            <StatTable
                player = {props.player}
                advanced = {false}
                category = {props.category}
                address = {props.address}
                streaks = {true}
                medals = {false}
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
        paddingTop :props.isDesktop? "10px" : "2px",
        paddingRight:props.isDesktop? "50px" : "10px",
        paddingBottom:props.isDesktop? "10px" : "2px",
        paddingLeft:props.isDesktop? "50px" : "10px",
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


export { StreaksController }