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
                stat_key = {stat}
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


    return (
        <div style = {{
            lineHeight:"35px"
        }}>
            <div
            ref = {categoryRef}
            style ={{
                border : "3px solid rgb(141,113,24)",
                paddingTop :props.isDesktop? "5px" : "2px",
                paddingRight:props.isDesktop? "13px" : "10px",
                paddingBottom:props.isDesktop? "5px" : "2px",
                paddingLeft:props.isDesktop? "13px" : "10px",
                fontSize:props.isDesktop?"18pt":"12pt",
                marginLeft:'0px',
                // marginRight:'2px',
                textAlign:"center",
                backgroundColor:"rgba(190, 177, 54, 0.8)",
                whiteSpace:"nowrap",
                cursor:'pointer',
                userSelect:"none"
            }} onMouseDown = {showStats}
            onMouseEnter = {buttonHover}
            onMouseLeave = {buttonRest}>

                {props.category.toUpperCase()}
            </div>
        </div>

    )
    
}

export {LeaderboardCategory}