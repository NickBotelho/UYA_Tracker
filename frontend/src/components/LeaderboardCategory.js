import React, { createRef, useState, useCallback } from "react";
import { LeaderboardStats } from "./LeaderboardStats";
import { statList, stat_keys } from "./extras";
function LeaderboardCategory(props){

    let category_stats = []

    for (let stat in statList[props.category]){
        stat = statList[props.category][stat]
        // const api_key = stat_keys[props.category][stat]
        // console.log(api_key)
        category_stats.push(
            <LeaderboardStats
                category = {props.category}
                stat = {stat}
                address = {props.address}
                currentBoard = {props.currentBoard}
                changeBoard = {props.changeBoard}
                isDesktop = {props.isDesktop}
                key = {stat}
            />
        )

    }

    const buttonHover = (e) =>{
        categoryRef.current.style.background = 'rgba(217,163,58,0.8)'
    }
    const buttonRest = (e) =>{
        categoryRef.current.style.background ="rgba(190, 177, 54, 0.8)"
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
                    backgroundColor:"rgba(190, 177, 54, 0.8)",
                    fontSize:"20pt",
                    whiteSpace:"nowrap",
                    // borderBottom: '2px solid rgb(251, 245, 180)',
                    paddingLeft:"10px",
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
                    paddingRight:"5px",
                    paddingBottom:"2px",
                    paddingLeft:"2px",
                    marginLeft:'2px',
                    marginRight:'2px',
                    textAlign:"center",
                    backgroundColor:"rgba(190, 177, 54, 0.8)",
                    fontSize:"12pt",
                    whiteSpace:"nowrap",
                    // borderBottom: '2px solid rgb(251, 245, 180)',
                    paddingLeft:"10px",
                }} onMouseDown = {showStats}
                onMouseEnter = {buttonHover}
                onMouseLeave = {buttonRest}>
    
                    {props.category.toUpperCase()}
                </div>
            </div>
    
        )
    }
    


}

export {LeaderboardCategory}