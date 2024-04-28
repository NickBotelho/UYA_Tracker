import React, { createRef, useState, useCallback , useEffect} from "react";
import {LeaderboardCategory} from "./LeaderboardCategory.js"
import forward from '../../server/build//forward_arrow.svg';
// import forward from '../../server/build/forward_arrow.svg';

import backward from '../../server/build//backward_arrow.svg';
import {stat_keys} from './extras'
import { Redirect } from "react-router";

function PlayersOnline(props){

    
    const address = props.address
    let pages = {}
    let [currentPage, changePage] = useState(0)
    // let [isLoaded, hasLoaded] = useState(null);
    let [searching, setSearch] = useState(null);



    async function getPlayers(){
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

        const search_result = await fetch(`${props.address}/api/online/players`, requestSearch)
        let players = await search_result.json()
        players = JSON.parse(players)
        let on = []
        for (var player in players){
            on.push(players[player].username)
        }
        props.hasLoaded({
            needsRefresh: false,
            online:on
        })
        return on
    }
    const hoverStyle = {
        backgroundColor: "rgb(217,163,58)",
    }
    const unHoverStyle = {
        backgroundColor:"rgb(190, 177, 54)",
    }
    const getPlayerRow = (player, index) => { 
        const ref1 = createRef()
        const ref3 = createRef()
        const buttonHover = (e) => {

            ref1.current.style.backgroundColor = hoverStyle.backgroundColor

        }
        const buttonLeave = (e) => {

            ref1.current.style.backgroundColor = unHoverStyle.backgroundColor
        }
        return (
            <tr key = {index} ref = {ref3} onMouseEnter = {buttonHover}
            onMouseLeave={buttonLeave} 
            onClick={() => {
                setSearch(player)          
            }} >
                <td 
                ref = {ref1}
                style = {{textAlign:"center",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                borderBottom: '2px solid rgb(144,99,30)',
                height:"32px",
                cursor:'pointer',
                paddingLeft:"10px",
           }} 
                
                value ={player}
                >{`${player}`}</td>
                
            </tr>

        );
    }
    const blankRow = (index) => { 
        const ref1 = createRef()
        const ref3 = createRef()
        
        return (
            <tr key = {index}  ref = {ref3} >
                <td 
                ref = {ref1}
                style = {{textAlign:"center",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                borderBottom: '2px solid rgb(144,99,30)',
                cursor:'pointer',
                paddingLeft:"10px",
                height: "32px"
           }} 
                
                > </td>
                
            </tr>

        );
    }
    if (searching != null){
        const redirect = "/players"+"?name="+encodeURIComponent(searching)
        return <Redirect push to = {redirect}/>
    }
    
    if (props.isLoaded.needsRefresh == true){
        getPlayers()
    }
    let rows = []
    if (props.isLoaded.needsRefresh == true){
        rows = props.isLoaded.online.map(getPlayerRow)  
        while (rows.length < 10){
            rows.push(blankRow(rows.length))
        }
    }else{
        rows = props.isLoaded.online.map(getPlayerRow)  
        while (rows.length < 10){
            rows.push(blankRow(rows.length))
        }
    }

        

    return (
        <div style={{
            display:'block',
            height:"420px",
            scrollBehavior:"smooth",
            scrollMargin:"4px, 4px",
            scrollPadding:"4px",
            scrollbarWidth:"5px",
            overflowX:"hidden",
            overflowY:"auto",
        }}>
            <table style = {{
                    fontSize: props.isDesktop ? "20pt" : "15pt",
                    color: 'rgb(141,113,24)',
                    width: props.isDesktop ? "300px" : "250px",
                    // height: props.isDesktop ? '400px' : "300px",
                    letterSpacing:"-1.5px",
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black",
                    border : "3px solid rgb(141,113,24)",


                    
                }}>
                <caption style={{
                    border : "3px solid rgb(141,113,24)",


                }}>{`Players (${props.isLoaded != null ? props.isLoaded.online.length : 0})`}</caption>
                <tbody>
                    {rows}
                </tbody>
            </table>
            
                
            

        </div>
    )
    
    


}

export {PlayersOnline}