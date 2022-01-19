import React, { createRef, useState, useCallback } from "react";
import { statList, stat_keys } from "./extras";
import {AnalyticsStats} from './AnalyticsStats'
function AnalyticsCategory(props){

    let category_stats = []
    const graphTypes = ['Weapon Kills', 'Weapon Usage', 'Maps Played' , 'Avg. Game Length',
'Weekday Activity', "Monthly Activity"]

    for (let stat in graphTypes){
        stat = graphTypes[stat]
        // const api_key = stat_keys[props.category][stat]
        category_stats.push(
            <AnalyticsStats
                category = {props.category} //game size
                stat = {stat} //type of graph
                address = {props.address}   
                currentBoard = {props.currentBoard}
                changeBoard = {props.changeBoard}
                isDesktop = {props.isDesktop}
                key = {stat}
                color = {props.color}
            />
        )

    }

    const buttonHover = (e) =>{
        categoryRef.current.style.background = 'rgba(217,163,58,0.8)'
    }
    const buttonRest = (e) =>{
        categoryRef.current.style.background =props.color
    }
    const showStats = () =>{
        props.changeCategory(category_stats)
        
    }
    const categoryRef = createRef()

    if (props.isDesktop){
        return (
            <div style = {{
                lineHeight:"35px"
            }}>
                <div
                ref = {categoryRef}
                style ={{
                    border : "3px solid rgb(141,113,24)",
                    paddingTop :"10px",
                    paddingRight:"10px",
                    paddingBottom:"10px",
                    paddingLeft:"10px",
                    marginLeft:'2px',
                    marginRight:'2px',
                    textAlign:"center",
                    // backgroundColor:"rgba(190, 177, 54, 0.8)",
                    backgroundColor:props.color,
                    fontSize:"20pt",
                    whiteSpace:"nowrap",
                    cursor:'pointer',
                    paddingLeft:"10px",
                    userSelect:"none"
                }} onMouseDown = {showStats}
                onMouseEnter = {buttonHover}
                onMouseLeave = {buttonRest}>
    
                    {props.category.toUpperCase()}
                </div>
            </div>
    
        )
    }
    else{
        return (
            <div style = {{
                lineHeight:"35px"
            }}>
                <div
                ref = {categoryRef}
                style ={{
                    border : "3px solid rgb(141,113,24)",
                    paddingTop :"2px",
                    paddingRight:"15px",
                    paddingBottom:"2px",
                    paddingLeft:"2px",
                    marginLeft:'2px',
                    marginRight:'2px',
                    textAlign:"center",
                    // backgroundColor:"rgba(190, 177, 54, 0.8)",
                    backgroundColor:props.color,

                    fontSize:"12pt",
                    whiteSpace:"nowrap",
                    // borderBottom: '2px solid rgb(251, 245, 180)',
                    paddingLeft:"15px",
                }} onMouseDown = {showStats}
                onMouseEnter = {buttonHover}
                onMouseLeave = {buttonRest}>
    
                    {props.category.toUpperCase()}
                </div>
            </div>
    
        )
    }
    


}

export {AnalyticsCategory}