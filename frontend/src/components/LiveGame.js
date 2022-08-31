import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'
import { LiveMap } from "./LiveMap.js";
import { LiveEvents } from "./LiveEvents.js";
import { LivePlayerStates } from "./LivePlayerStates.js";
import { LiveScore } from "./LiveScore.js";
import { LiveInfo } from "./LiveInfo.js";
import online_circle from '../../static/images/online_circle.png';

const DEBUG = false
var address = null
if (DEBUG==true){
    address = "http://127.0.0.1:5000"
}
else{
    address = "https://uyatracker.herokuapp.com"
}

const REFRESH_TIME = 1200
function LiveGame(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [map, changeMap] = useState(GetLargeMap())
    let [games, loadGames] = useState(null)
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const game_id = urlParams.get('id')
    
    let [home, goHome] = useState(null)
    const returnHome = () =>{
        goHome(true)
    }
    if (home != null){
        const redirect = "/leaderboards"
        return <Redirect push to = {redirect}/>
    }

    async function getGames(){
        const requestSearch = {
            method: "GET",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
        }

        const search_result = await fetch(`${address}/api/online/games`, requestSearch)
        const dme_result = await fetch(`${address}/api/live/available`, requestSearch)
        const dmes = await dme_result.json()
        const players = await search_result.json()
        loadGames({
            data:players,
            dme:dmes
        })
        return players
    }
    
    if (games == null){
        getGames()
    }
    if (games == null){
        return <div style = {{
            background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
            url(${map})`,
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
    
    let gameInfo = null;
    for (let i = 0; i < games.data.length; i+=1){
        if (games.data[i]['game_id'].toString() == game_id.toString()){
            gameInfo = games.data[i]
        }
    }
    if (gameInfo == null){
        return <div style = {{
            background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
            url(${map})`,
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
    let players = gameInfo.details.players
    let playerString = ''
    for (let i = 0 ; i < players.length; i+=1){
        playerString+= players[i] + "\n"
    }
    if (gameInfo.details.status == "Staging"){
        return (
            <div style = {{
                background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily:"Roboto, sans-serif",
                height: isDesktop? '100vh' : '750px'
    
                
            }}>
                <HomeButton/>
                <div style = {{
                display:"flex",
                justifyContent:"center"
            }}>
        
                <h1 style = {{
                    fontSize : isDesktop? "75pt" : "35pt",
                    textAlign:"center",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '6px 4px 4px black',
    
    
                }}>{`${gameInfo.details.host}'s Game`}</h1>
            </div>
    
            {/* Details about the game */}
            <div style = {{
                color: 'rgb(141,113,24)',
                fontSize:'20pt',
                letterSpacing:"-1.5px",
                borderCollapse:"collapse",
                fontWeight:"bolder",
                textShadow:"1px 1px 1px black",
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-evenly'
            }}>
                <div style = {{
                        marginTop:'30px',
                        fontSize : "30pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center'
    
    
                    }}>
                        <h2 style = {{
                            marginBottom : '25px'
                        }}>Details</h2>
                        <h4>{`Status: ${gameInfo.details.status.replace("_"," ")}`}</h4>
                        <h4>{`Map: ${gameInfo.details.map.replace("_"," ")}`}</h4>
                        <h4>{`Mode: ${gameInfo.details.gamemode.replace("_"," ")}`}</h4>
                        <h4>{`Weapons: ${gameInfo.details.weapons.toString()}`}</h4>
    
                </div>
                <div style = {{
                        marginTop:'70px',
                        fontSize : "30pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'space-evenly'
    
    
                    }}>
                        <h2 style = {{
                            marginBottom : '25px'
                        }}>Players</h2>
                        <h4>{playerString}</h4>
                        

    
                </div>
            </div>
    
            </div>
            
    
        )
    }else if(gameInfo.details.status == "In_Progress"){
        if (games.dme.includes(gameInfo.dme_id)){
            if (isDesktop){
                return (
                    <div style = {{
                        background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                            url(${map})`,
                        fontFamily:"Roboto, sans-serif",
                        height: isDesktop? '100vh' : '750px'
            
                        
                    }}>
                        <HomeButton/>
                        <div style = {{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                
                        <h1 style = {{
                            fontSize : isDesktop? "75pt" : "35pt",
                            textAlign:"center",
                            color: 'rgb(229, 197, 102)',
                            textShadow: '6px 4px 4px black',
        
        
                        }}>Live Game</h1>
                    </div>
        
        
                    <div style = {{
                        color: 'rgb(141,113,24)',
                        fontSize:'20pt',
                        letterSpacing:"-1.5px",
                        borderCollapse:"collapse",
                        fontWeight:"bolder",
                        textShadow:"1px 1px 1px black",
                        display:"flex",
                        flexDirection:'row',
                        justifyContent:"space-evenly"
                    }}>
                        <div style = {{
                            display:'flex',
                            justifyContent:"space-evenly",
                            flexDirection:'column'
                        }}>
                            <LiveMap address = {address} isDesktop = {isDesktop} dme_id = {gameInfo.dme_id} refresh = {REFRESH_TIME} map = {gameInfo.details.map}/>
                            <LiveScore address = {address} isDesktop = {isDesktop} dme_id = {gameInfo.dme_id} refresh = {REFRESH_TIME}/>
                        </div>
                        <LivePlayerStates address = {address} isDesktop = {isDesktop} dme_id = {gameInfo.dme_id} refresh = {REFRESH_TIME}/>
                        <div style = {{
                            display:'flex',
                            justifyContent:"space-evenly",
                            flexDirection:'column'
                        }}>
                            <LiveEvents address = {address} isDesktop = {isDesktop} dme_id = {gameInfo.dme_id} refresh = {REFRESH_TIME}/>
                            <LiveInfo info = {gameInfo.details} address = {address} isDesktop = {isDesktop} dme_id = {gameInfo.dme_id} refresh = {REFRESH_TIME} />

                        </div>
                    </div>
        
            
                    </div>
                )
            }else{
                return (
                    <div style = {{
                        background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                            url(${map})`,
                        fontFamily:"Roboto, sans-serif",
                        height: isDesktop? '100vh' : '750px'
            
                        
                    }}>
                        <HomeButton/>
                        <div style = {{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                
                        
                    </div>
        
        
                    <div style = {{
                        color: 'rgb(141,113,24)',
                        fontSize:'20pt',
                        letterSpacing:"-1.5px",
                        borderCollapse:"collapse",
                        fontWeight:"bolder",
                        textShadow:"1px 1px 1px black",
                        display:"flex",
                        flexDirection:'column',
                        justifyContent:"center",
                    }}>
                        <LiveScore address = {address} isDesktop = {isDesktop} dme_id = {gameInfo.dme_id} refresh = {REFRESH_TIME}/>
                        <LiveMap address = {address} isDesktop = {isDesktop} dme_id = {gameInfo.dme_id} refresh = {REFRESH_TIME} map = {gameInfo.details.map}/>
                        <LivePlayerStates address = {address} isDesktop = {isDesktop} dme_id = {gameInfo.dme_id} refresh = {REFRESH_TIME}/>
                        {/* <LiveEvents address = {address} isDesktop = {isDesktop} dme_id = {gameInfo.dme_id}/> */}
                    </div>
        
            
                    </div>
                )
            }
        }else{
            return (
                <div style = {{
                    background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                        url(${map})`,
                    fontFamily:"Roboto, sans-serif",
                    height: isDesktop? '100vh' : '750px'
        
                    
                }}>
                    <HomeButton/>
                    <div style = {{
                    display:"flex",
                    flexDirection:'column',
                    justifyContent:"center"
                }}>
            
                    <h1 style = {{
                        fontSize : isDesktop? "75pt" : "35pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
    
    
                    }}>GAME COULD NOT BE LOADED</h1>
                    <h3 style = {{
                        fontSize : isDesktop? "45pt" : "25pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
                        marginTop:'100px'
    
    
                    }}>Game needs a few seconds to buffer</h3>
                    <h3 style = {{
                        fontSize : isDesktop? "45pt" : "25pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
                        marginTop:'100px'
    
    
                    }}>OR</h3>
                    <h3 style = {{
                        fontSize : isDesktop? "45pt" : "25pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
                        marginTop:'100px'
    
    
                    }}>Sometimes we just miss a few important packets</h3>
                </div>
            </div>)
        }
        
        
    }

    
        
    


}

export {LiveGame}