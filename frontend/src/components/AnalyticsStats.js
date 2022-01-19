import React, { createRef, useState, useCallback, useEffect } from "react";
import { graph_keys } from "./extras.js";
import {AnalyticChart} from './AnalyticChart';

function AnalyticsStats(props){

    const buttonHover = (e) =>{
        statRef.current.style.background = 'rgba(217,163,58,0.8)'
    }
    const buttonRest = (e) =>{
        statRef.current.style.background =props.color
    }

    const getBoard = () =>{
        props.changeBoard(
            <AnalyticChart
                category = {props.category}
                stat = {props.stat}
                graph_key = {graph_keys[props.stat]}
                address = {props.address}
                isDesktop = {props.isDesktop}
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
            // backgroundColor:"rgba(190, 177, 54, 0.8)",
            backgroundColor:props.color,
            whiteSpace:"nowrap",
            paddingLeft:"10px",
            marginRight:'10px',
            marginLeft:'10px',
            cursor:'pointer',
            userSelect:"none",
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

export {AnalyticsStats}