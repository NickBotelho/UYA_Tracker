import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { StatTable } from "./StatTable";


function PlayerProfileController(props){

    let categoryRef = createRef()
    const showTable = () =>{
        // console.log("tryna show table", props.category)
        props.changeTable(
            <StatTable
                category = {props.category}
                player = {props.player}
                address = {props.address}
            />
        )
    }
    const buttonHover = (e) =>{
        categoryRef.current.style.background = 'rgba(217,163,58,0.8)'
    }
    const buttonRest = (e) =>{
        categoryRef.current.style.background ="rgba(190, 177, 54, 0.8)"
    }
    return (
        <div style = {{
            paddingTop :"10px",
            paddingRight:"50px",
            paddingBottom:"10px",
            paddingLeft:"50px",
            textAlign:"center",
            backgroundColor:"rgba(190, 177, 54, 0.8)",
            opacity:"0.8",
            whiteSpace:"nowrap",
            border : "3px solid rgb(141,113,24)",
            color: 'rgb(141,113,24)',
            fontWeight:"bolder",
            textShadow:"1px 1px 1px black",
            userSelect:"none"



        }}
        onMouseDown = {showTable}
        onMouseOver = {buttonHover}
        onMouseLeave = {buttonRest}
        ref = {categoryRef}>
            <h3>{props.category.toUpperCase()}</h3>
        </div>
    )



}



export {PlayerProfileController}