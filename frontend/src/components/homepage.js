import React, { createRef, useState, useCallback } from "react";
import {Searchbar} from "./searchbar";
import {Top10} from "./top10";
import {NavBar} from './NavBar.js';
import { Redirect } from "react-router";
import {useMediaQuery} from 'react-responsive'
import "../../static/css/homepage.css";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
const DEBUG = true
var address = null
if (DEBUG==true){
    address = "http://127.0.0.1:5000"
}

function HomePage(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 420px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 420px)",
    });
    const isTooLarge = useMediaQuery({
        query: "(min-height:1110px)"
    })
    
    
    

    const map = GetLargeMap()
    const background = {
        position:"relative",
        background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
        url(${map})`,
        fontFamily:"Roboto, sans-serif",
        height: isTooLarge ? "100vh" : "100",
    }
    const titleStyle = {
        fontSize: isDesktop ? "75pt" : "40pt",
        fontFamily:"Roboto, sans-serif",
        letterSpacing: "-3px",
        textAlign: 'center',
        color: 'rgb(229, 197, 102)',
        textShadow: '6px 4px 4px black',
    }
    const myRef = createRef()

    let [search, searchState] = useState()

    if (isDesktop){
        return(
            <div style = {background}>
                <NavBar />
                <h1 style = {titleStyle}>UYA Tracker</h1>
                
                <Searchbar myRef = {myRef} search = {search} searchState = {searchState} address = {address} isDesktop = {isDesktop}></Searchbar>
                
                <div className='leaderboards'>
                    <div>
                        <Top10 title = "Overall Kills" category = 'overall' stat = 'kills' address = {address}/>     
                    </div>
                    <div>
                        <Top10 title = "Overall Deaths" category = 'overall' stat = 'deaths'address = {address}/>     
                    </div>
                    
                </div>
    
                <div className='leaderboards'>
                    <div>
                        <Top10 title = "Overall Wins" category = 'overall' stat = 'wins'address = {address}/>        
                    </div>
                    <div>
                        <Top10 title = "Overall Losses" category = 'overall' stat = 'losses'address = {address}/>       
                    </div>
                    
                </div>
                
                
            </div>
            
        );
    }
    else{
        return(
            <div style = {background}>
                <NavBar />
                <h1 style = {titleStyle}>UYA Tracker</h1>
                
                <Searchbar myRef = {myRef} search = {search} searchState = {searchState} address = {address} isDesktop = {isDesktop}></Searchbar>
                
                <div className='leaderboards'>
                    <div>
                        <Top10 title = "Overall Kills" category = 'overall' stat = 'kills' address = {address}/>     
                    </div>          
                </div>
    
                <div className='leaderboards'>
                    <div>
                        <Top10 title = "Overall Wins" category = 'overall' stat = 'wins'address = {address}/>        
                    </div>                  
                </div>
                
                
            </div>
            
        );
    }
    
}

export {HomePage};
