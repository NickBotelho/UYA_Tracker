import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { StatTable } from "./StatTable";
import {PlayerGameHistoryTable} from "./PlayerGameHistoryTable"
function GameHistoryController(props){
    let [games, setGames] = useState(null)

    async function getRecentGames(player){
        const requestSearch = {
            method: "POST",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
            body: JSON.stringify({
                name: player['username'],
                num_games:10
            }),  
        }
        const res = await fetch(`${props.address}/api/players/recent_games`, requestSearch)
        const recent_games = await res.json()
        setGames(recent_games)
    }

    const showTable = () =>{
        props.changeTable(
            <PlayerGameHistoryTable
                games = {games}
                isDesktop = {props.isDesktop}
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
    if (games == null){
        getRecentGames(props.player)
        return <div style = {{border:"3pt solid rgb(92, 73, 0)", maxHeight:"100px", minWidth:"100px",
        }}>
            <img src = "../../static/images/loading_circle.gif"
        height = '100' width = '100'></img>
        </div>
    }
    else{
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
                <h3>GAME HISTORY</h3>
            </div>
        )
    }
    

}


export {GameHistoryController}