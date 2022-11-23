import React, { createRef, useState, useCallback } from "react";
import {Searchbar} from "./searchbar";
import {Top10} from "./top10";
import {NavBar} from './NavBar.js';
import { Redirect } from "react-router";
import {useMediaQuery} from 'react-responsive'
import "../../static/css/homepage.css";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { AnnouncementsWindow } from "./AnnouncementsWindow";
const DEBUG = false
var address = null
if (DEBUG==true){
    address = "http://127.0.0.1:5000"
}
else{
    address = "https://uyatracker.herokuapp.com/"
}

function HomePage(props){
    console.log("v3.1.0")
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    const isTooLarge = useMediaQuery({
        query: "(min-height:1100px)"
    })
    // const isMaxWidth = useMediaQuery({
    //     query:"(min-width: 2000px)"
    // })
    // style = {isMaxWidth ? fixedDistance : null}
    console.log(isTooLarge)
    const fluidDistance = {
        display:'flex',
        justifyContent: 'space-evenly',
        marginTop:'30px'
    }

    const map = GetLargeMap()
    const desktopBackground = {
        position:"relative",
        background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
        url(${map})`,
        fontFamily:"Roboto, sans-serif",
        height: isTooLarge ? "100vh" : "100",
        zIndex:"1"
    }
    const mobileBackground = {
        position:"relative",
        background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
        url(${map})`,
        fontFamily:"Roboto, sans-serif",
        height: "100vh",
        zIndex:"1"
    }
    const titleStyle = {
        fontSize: isDesktop ? "75pt" : "40pt",
        fontFamily:"Roboto, sans-serif",
        letterSpacing: "-3px",
        textAlign: 'center',
        color: 'rgb(229, 197, 102)',
        textShadow: '6px 4px 4px black',
    }
    let announcementsRef = createRef()

    const hideAnnouncements = () => {
        if (announcementsRef.current != null){
            announcementsRef.current.style.visibility = "hidden"
        }
    }
    const myRef = createRef()
    let [search, searchState] = useState()
    if (isDesktop){
        return(
            <div style = {desktopBackground} onMouseDown = {hideAnnouncements}>
                <NavBar isDesktop={isDesktop}/>
                <h1 style = {titleStyle}>UYA Tracker</h1>
                
                <Searchbar myRef = {myRef} search = {search} searchState = {searchState} address = {address} isDesktop = {isDesktop}></Searchbar>
                <AnnouncementsWindow address = {address} isDesktop = {isDesktop} reference = {announcementsRef} hide = {hideAnnouncements} />
                
                <div style = {fluidDistance}>
                    <div >
                        <Top10 title = "Overall Kills" category = 'overall' stat = 'kills' address = {address}/>     
                    </div>
                    <div >
                        <Top10 title = "Overall Wins" category = 'overall' stat = 'wins' address = {address}/>     
                    </div>
                    
                </div>
    
                <div  style = {fluidDistance}>
                    <div >
                        <Top10 title = "Flags Captured" category = 'ctf' stat = 'ctf_caps'address = {address}/>        
                    </div>
                    <div >
                        <Top10 title = "Flux Kills" category = 'weapons' stat = 'flux_kills'address = {address}/>       
                    </div>
                    
                </div>
                
                
            </div>
            
        );
    }
    else{
        titleStyle['marginTop'] = '40px'
        return(
            <div style = {mobileBackground}>
                <NavBar isDesktop={isDesktop}/>
                <h1 style = {titleStyle}>UYA Tracker</h1>
                
                <Searchbar myRef = {myRef} search = {search} searchState = {searchState} address = {address} isDesktop = {isDesktop}></Searchbar>
                <AnnouncementsWindow address = {address} isDesktop = {isDesktop} reference = {announcementsRef} hide = {hideAnnouncements} />
                
                <div style = {fluidDistance}>
                    <div style = {{
                        marginTop:"25px"
                    }}>
                        <Top10 title = "Overall Kills" category = 'overall' stat = 'kills' address = {address}/>     
                    </div>          
                </div>
    
                
                
                
            </div>
            
        );
    }
    
}

export {HomePage};
