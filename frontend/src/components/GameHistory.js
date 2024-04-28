import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import {useMediaQuery} from 'react-responsive'
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { AllGameHistoryTable } from "./AllGameHistoryTable.js";
import { HomeButton } from "./HomeButton.js";
import online_circle from '../../static/images/online_circle.png';
import forward from '../../server/build//forward_arrow.svg';
import backward from '../../server/build//backward_arrow.svg';


const DEBUG = false
var address = null
if (DEBUG==true){
    address = "https://localhost:7139"
}
else{
    address = "http://216.146.25.171"
}

function GameHistory(props){
    document.title = "UYATracker | Game History"

    let [map, changeMap] = useState(GetLargeMap())

    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    const tooShort = useMediaQuery({
        query: "(max-height: 940px)",
    });

    let [games, setGames] = useState({
        start : 0,
        games : null,
        max : 0
    })
    const numEntries = 15
    async function getRecentGames(start, end){
        const requestSearch = {
            method: "GET",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache",
                'Access-Control-Allow-Origin': '*',
                'origin':'null'
            },
        }
        const res = await fetch(`${address}/api/games/recentGames/${games.start}/${games.start+15}`, requestSearch)
        let recent_games = await res.json()
        recent_games = JSON.parse(recent_games)
        setGames({
            start:start,
            games:recent_games,
            max: games.max
        })
    }
    async function getTotalGames(url){
        const requestSearch = {
            method: "GET",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache",
                'Access-Control-Allow-Origin': '*',
                'origin':'null'
            },
        }
        const total = await fetch(`${address}/api/games/totalGames`, requestSearch)
        setGames({
            start:games.start,
            games:games.games,
            max : total
        })
    }
   
    
    if (games.max == 0){
        getTotalGames(`${address}/api/general/totalGames`)
    }
    
    if (games.games == null){
        getRecentGames(games.start, games.start+numEntries)

        return(
            <div style = {{
                background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                                    url(${map})`,
                height:'100vh',
                fontFamily:"Roboto, sans-serif",

            }}>
                <HomeButton/>

                <div style = {{
                    display:"flex",
                    justifyContent:"center"
                }}>
    
                    <h1 style = {{
                        fontSize : isDesktop ? "75pt" :"40pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
                        borderCollapse:"collapse",
    
                    }}>GAME HISTORY</h1>
                </div>
                <div style = {{
                            
                            position:'fixed',
                            top:"50%",
                            left:"50%",
                            transform :"translate(-50%, -50%)",
                            maxHeight:'250px',
                            minHeight:'250px',
                        }}>
                            <img src = "../../server/build//loading_circle.gif"
                            height = {isDesktop ? '250' : "125"} width = {isDesktop ? '250' : "125"}></img>
                        </div>
            </div>
        ) 
        
        
    }

    console.log(games)
    if (isDesktop){
        return (
            <div  style = {{
                background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily:"Roboto, sans-serif",
                height: !tooShort? '100vh' : "100%",
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
                        borderCollapse:"collapse",
    
                    }}>GAME HISTORY</h1>
                </div>
    
    
                <div style = {{
                    display:'flex',
                    justifyContent:'center',
                    marginTop:'25px'
                }}>
                    <AllGameHistoryTable games = {games.games} start = {games.start} numEntries = {numEntries} isDesktop = {isDesktop} />
                </div>
                
                <div style = {{
                    display:'flex',
                    justifyContent:'center'
                }}>
                    {games.start - numEntries < 0 ? null : <img src = '../../server/build//backward_arrow.svg'
                        onMouseDown={ () =>{

                            setGames({
                                start:games.start-numEntries,
                                games:null,
                                max:games.max
                            })
                        }}height= {isDesktop ? "50" : "15"} width = {isDesktop ? "200" : "75"} 
                        style = {{userSelect:"none",cursor:"pointer"}}></img>}
                    {games.start + numEntries > games.max ? null :<img src = '../../server/build//forward_arrow.svg'
                        onMouseDown={ () =>{

                            setGames({
                                start:games.start+numEntries,
                                games:null,
                                max:games.max

                            })
                        }}height= {isDesktop ? "50" : "15"} width = {isDesktop ? "200" : "75"} 
                        style = {{
                            userSelect:"none",
                            cursor:"pointer"
                            }}></img>} 
                    
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
                        <AllGameHistoryTable games = {games.games} start = {games.start} numEntries = {numEntries} isDesktop = {isDesktop} />
                </div>
                
                <div style = {{
                    display:'flex',
                    justifyContent:'center'
                }}>
                    {games.start - numEntries < 0 ? null : <img src = '../../server/build//backward_arrow.svg'
                        onMouseDown={ () =>{

                            setGames({
                                start:games.start-numEntries,
                                games:null,
                                max:games.max
                            })
                        }}height= "20" width = "100"
                        style = {{userSelect:"none",cursor:"pointer"}}></img>}
                    {games.start + numEntries > games.max ? null :<img src = '../../server/build//forward_arrow.svg'
                        onMouseDown={ () =>{

                            setGames({
                                start:games.start+numEntries,
                                games:null,
                                max:games.max

                            })
                        }}height= "20" width = "100"
                        style = {{userSelect:"none",cursor:"pointer"}}></img>}
                    
                </div>
    
    
    
    
                
            </div>
        )
    }
    


}

export {GameHistory}