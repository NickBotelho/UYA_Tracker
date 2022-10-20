import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { statList, stat_keys } from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'
import { AnalyticChart } from "./AnalyticChart.js";
import { AnalyticsCategory } from "./AnalyticsCategory.js";
import { LiveMap } from "./LiveMap.js";
import { LiveEvents } from "./LiveEvents.js";
import { LivePlayer } from "./LivePlayer.js";
import { LivePlayerStates } from "./LivePlayerStates.js";
const DEBUG = false
var address = null
if (DEBUG==true){
    address = "http://127.0.0.1:5000"
}
else{
    address = "https://uyatracker.herokuapp.com"
}


function Streams(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [map, changeMap] = useState(GetLargeMap())
    let myStorage = window.localStorage;
    myStorage.clear()
    let [home, goHome] = useState(null)
    const returnHome = () =>{
        goHome(true)
    }
    
    if (home != null){
        const redirect = "/leaderboards"
        return <Redirect push to = {redirect}/>
    }
    else{


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


                }}>Streams</h1>
            </div>


            <div style = {{
                color: 'rgb(141,113,24)',
                fontSize:'20pt',
                letterSpacing:"-1.5px",
                borderCollapse:"collapse",
                fontWeight:"bolder",
                textShadow:"1px 1px 1px black",
            }}>
                
            </div>
                {/* <iframe src="https://player.twitch.tv/?channel=nickmercs&parent=localhost" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
                <iframe src="https://player.twitch.tv/?channel=nadeshot&parent=localhost" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
                <iframe src="https://player.twitch.tv/?channel=faux&parent=localhost" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
                <iframe src="https://player.twitch.tv/?channel=alfie&parent=localhost" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe> */}
                {/* <LiveMap/> */}
                {/* <LivePlayerStates/> */}
                {/* <LiveEvents isDesktop = {isDesktop}/> */}
                <LiveMap isDesktop = {isDesktop}/>
    
            </div>
            
    
        )
    }
    
        
        
        
    


}

export {Streams}