import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { statList, stat_keys } from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'
import {PlayersOnline} from './PlayersOnline'
import {GamesOnline} from './GamesOnline'
import {Chat} from './Chat'
import { LiveMap2 } from "./LiveMap.js";
const DEBUG = true
var address = null
if (DEBUG==true){
    address = "http://127.0.0.1:5000"
}
else{
    address = "https://uyatracker.herokuapp.com"
}


function Live(props){
    // const [seconds, setSeconds] = useState(0);
    let [players, loadPlayers] = useState({
        needsRefresh:true,
        online:[]
    });
    let [games, loadGames] = useState({
        needsRefresh:true,
        online:[]
    });
    let [chat, loadChat] = useState(null)

    

    useEffect(() => {
        const interval = setInterval(() => {
        loadPlayers( players => ({
            online : players.online,
            needsRefresh : true
        }));
        loadGames( games => ({
            online : games.online,
            needsRefresh : true
        }));
        loadChat(null);
        }, 30000);
        return () => clearInterval(interval);
    }, []);
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [map, changeMap] = useState(GetLargeMap())
   

    
    let [home, goHome] = useState(null)
    const returnHome = () =>{
        goHome(true)
    }
    if (home != null){
        const redirect = "/live"
        return <Redirect push to = {redirect}/>
    }
    
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


                }}>Live</h1>
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
                justifyContent:'center',
                marginTop:'50px'
            }}>
                <div>
                    {isDesktop? <Chat address = {address} isDesktop = {isDesktop} isLoaded = {chat} hasLoaded = {loadChat}/> : null}
                </div>
                <div style = {{
                    marginLeft:"5%"
                }}>
                    <div>
                        <GamesOnline address = {address} isDesktop = {isDesktop} isLoaded = {games} hasLoaded = {loadGames}/>
                    </div>

                    <div style = {{
                        marginTop:"15px"
                    }}>
                        <PlayersOnline address = {address} isDesktop = {isDesktop} isLoaded = {players} hasLoaded = {loadPlayers}/>
                    </div>
                </div>
            </div>
                
    
                
    
        </div>
        )
    


}

export {Live}