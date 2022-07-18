import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'
import { LivePlayer } from "./LivePlayer.js";

//<img src={`data:image/png;base64,${this.state.image}`}/>
function LivePlayerStates(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [gameInfo, updateGame] = useState(null)

    let myStorage = window.localStorage;
   
    async function getGameInfo(dme_id){
        const requestSearch = {
            method: "POST",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
            body: JSON.stringify({
                dme_id: dme_id,
            }),    
        }
        const search_result = await fetch(`${props.address}/api/live/game`, requestSearch)
        const gameInfo = await search_result.json()
        updateGame(gameInfo)
        return gameInfo
    }
    useEffect(() => {
        const interval = setInterval(() => {
            updateGame(null);
        }, props.refresh);
        return () => clearInterval(interval);
    }, []);
    function makePlayers(players, index){
        let res = []
        for (const [key, value] of Object.entries(players)){
            res.push(<LivePlayer player = {value} key = {key} isDesktop = {props.isDesktop}/>)
        }
        return res
    }

    if (gameInfo == null){
        getGameInfo(props.dme_id)
        let cache = myStorage.getItem("player_states")
        if (cache != null){
            cache = JSON.parse(cache)
            let playerComponents = makePlayers(cache)
            return (
                <div style = {{
                    width : props.isDesktop? '650px': '100%',
                    display:'flex',
                    justifyContent:"center",
                }}>
                    <div style = {{
                        width:props.isDesktop? '650px':'325px',
                        height:"100%",
                        display:'flex',
                        flexWrap:'wrap',
                        marginTop: props.isDesktop? '50px': '15px',
                        justifyContent:'space-evenly',
                    }}>
                        {playerComponents}   
                    </div>
                </div>
            )
        }else{
            return (
                <div>HI</div>
            )
        }
 
        
    }else{
        let players = gameInfo.player_states
        myStorage.setItem("player_states", JSON.stringify(players))
        let playerComponents = makePlayers(players)
        return (
            <div style = {{
                width : props.isDesktop? '650px': '100%',
                display:'flex',
                justifyContent:"center",
            }}>
                <div style = {{
                marginTop: props.isDesktop? '50px': '15px',

                width:props.isDesktop? '650px':'325px',
                height:"100%",
                display:'flex',
                flexWrap:'wrap',
                justifyContent:'space-evenly'
            }}>
                {playerComponents}

                </div>
            </div>
            
    
        )
    }

    
    

}

export {LivePlayerStates}