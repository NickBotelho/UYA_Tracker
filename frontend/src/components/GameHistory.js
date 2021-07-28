import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import {useMediaQuery} from 'react-responsive'
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { AllGameHistoryTable } from "./AllGameHistoryTable.js";
import { HomeButton } from "./HomeButton.js";
import online_circle from '../../static/images/online_circle.png';


const DEBUG = false
var address = null
if (DEBUG==true){
    address = "http://127.0.0.1:5000"
}
else{
    address = "https://uyatracker.herokuapp.com/"
}

function GameHistory(props){
    let [map, changeMap] = useState(GetLargeMap())

    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 420px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 420px)",
    });

    let [games, setGames] = useState(null)
    const numEntries = 15
    async function getRecentGames(numEntries){
        const requestSearch = {
            method: "POST",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
            body: JSON.stringify({
                limit:numEntries
            }),  
        }
        const res = await fetch(`${address}/general/recent_games`, requestSearch)
        const recent_games = await res.json()
        setGames(recent_games)
    }

    if (games == null){
        getRecentGames(numEntries)

        return <div style = {{
            position:'fixed',
            top:"50%",
            left:"50%",
            transform :"translate(-50%, -50%)",
            border: "8pt solid rgb(92, 73, 0)",
            maxHeight:'250px',
            minHeight:'250px',
        }}>
            <img src = "../../static/images/loading_circle.gif"
            height = '253' width = '255'></img>
        </div>
        
    }
    

    if (isDesktop){
        
        return (
            <div style = {{
                background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily:"Roboto, sans-serif",
                height:'100vh'  
            }}>
                <HomeButton/>
        
        
                <div style = {{
                    display:"flex",
                    justifyContent:"center"
                }}>
    
                    <h1 style = {{
                        fontSize : "75pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
    
    
                    }}>GAME HISTORY</h1>
                </div>
    
    
                <div style = {{
                    display:'flex',
                    justifyContent:'center',
                    marginTop:'25px'
                }}>
                    <AllGameHistoryTable games = {games} numEntries = {numEntries} isDesktop = {isDesktop} />
                </div>
    
    
    
    
                
            </div>
        )
    }
    else{
        return (
            <div style = {{
                background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily:"Roboto, sans-serif",
                height:'100vh'  
            }}>
                <HomeButton/>
        
        
                <div style = {{
                    display:"flex",
                    justifyContent:"center"
                }}>
    
                    <h1 style = {{
                        fontSize : "40pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
    
    
                    }}>GAME HISTORY</h1>
                </div>
    
    
                <div style = {{
                    display:'flex',
                    justifyContent:'center',
                    marginTop:'25px'
                }}>
                    <AllGameHistoryTable games = {games} numEntries = {numEntries} isDesktop = {isDesktop} />
                </div>
    
    
    
    
                
            </div>
        )
    }
    


}

export {GameHistory}