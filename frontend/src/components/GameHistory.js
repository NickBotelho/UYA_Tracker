import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import {useMediaQuery} from 'react-responsive'
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { AllGameHistoryTable } from "./AllGameHistoryTable.js";
import { HomeButton } from "./HomeButton.js";
import online_circle from '../../static/images/online_circle.png';
import forward from '../../static/images/forward_arrow.svg';
import backward from '../../static/images/backward_arrow.svg';


const DEBUG = true
var address = null
if (DEBUG==true){
    address = "http://127.0.0.1:5000"
}
else{
    address = "https://uyatracker.herokuapp.com"
}

function GameHistory(props){
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
            method: "POST",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
            body: JSON.stringify({
                start:start,
                end:end
            }),  
        }
        const res = await fetch(`${address}/general/recent_games`, requestSearch)
        const recent_games = await res.json()
        
        setGames({
            start:start,
            games:recent_games,
            max: games.max
        })
    }
    async function getTotalGames(url){
        const request = await fetch(url,{
                method: "GET",
                    headers:  {
                        'Content-Type': "application/json; charset=utf-8",
                        Accept: "application/json",
                        "Cache-Control": "no-cache"
                    },
                    credentials: "include",
            })
        const total = await request.json()
        setGames({
            start:games.start,
            games:games.games,
            max : total
        })
    }
   
    
    if (games.max == 0){
        getTotalGames(`${address}/api/general/total_games`)
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
                            <img src = "../../static/images/loading_circle.gif"
                            height = {isDesktop ? '250' : "125"} width = {isDesktop ? '250' : "125"}></img>
                        </div>
            </div>
        ) 
        
        
    }


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
                    {games.start - numEntries < 0 ? null : <img src = '../../static/images/backward_arrow.svg'
                        onMouseDown={ () =>{

                            setGames({
                                start:games.start-numEntries,
                                games:null,
                                max:games.max
                            })
                        }}height= {isDesktop ? "50" : "15"} width = {isDesktop ? "200" : "75"} 
                        style = {{userSelect:"none",cursor:"pointer"}}></img>}
                    {games.start + numEntries > games.max ? null :<img src = '../../static/images/forward_arrow.svg'
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
                    {games.start - numEntries < 0 ? null : <img src = '../../static/images/backward_arrow.svg'
                        onMouseDown={ () =>{

                            setGames({
                                start:games.start-numEntries,
                                games:null,
                                max:games.max
                            })
                        }}height= "20" width = "100"
                        style = {{userSelect:"none",cursor:"pointer"}}></img>}
                    {games.start + numEntries > games.max ? null :<img src = '../../static/images/forward_arrow.svg'
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