import React, { createRef, useState, useCallback , useEffect} from "react";
import {LeaderboardCategory} from "./LeaderboardCategory.js"
import forward from '../../static/images/forward_arrow.svg';
// import forward from '../../server/build/forward_arrow.svg';

import backward from '../../static/images/backward_arrow.svg';
import {stat_keys} from './extras'
import { Redirect } from "react-router";

function LeaderboardBoard(props){

    
    const address = props.address
    let pages = {}
    let [currentPage, changePage] = useState(1)
    let [isLoaded, hasLoaded] = useState(null);
    let [searching, setSearch] = useState(null);
    if (isLoaded != null && isLoaded.category == props.category && isLoaded.stat != stat_keys[props.category][props.stat]){
        hasLoaded(null)
    }
    else if (isLoaded != null && isLoaded.category != props.category){
        hasLoaded(null)
    }

    if (isLoaded == null && currentPage != 1){
        changePage(1)
    }

    async function getTop10(){
        const requestSearch = {
            method: "POST",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
            body: JSON.stringify({
                category:props.category,
                stat:stat_keys[props.category][props.stat]
            }),    
        }
        const search_result = await fetch(`${address}/stats/all`, requestSearch)
        const players = await search_result.json()
        hasLoaded({
            data:players,
            category:props.category,
            stat:stat_keys[props.category][props.stat]
        })
        return players
    }
    const getPlayerRow = (player, index) => { 
        const ref1 = createRef()
        const ref2 = createRef()
        const ref3 = createRef()
        const buttonHover = (e) => {

            ref1.current.style.backgroundColor = hoverStyle.backgroundColor
            ref2.current.style.backgroundColor = hoverStyle.backgroundColor

        }
        const buttonLeave = (e) => {

            ref1.current.style.backgroundColor = unHoverStyle.backgroundColor
            ref2.current.style.backgroundColor = unHoverStyle.backgroundColor
        }
        return (
            <tr key = {index} ref = {ref3} onMouseEnter = {buttonHover}
            onMouseLeave={buttonLeave}>
                <td 
                ref = {ref1}
                style = {{textAlign:"left",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                borderBottom: '2px solid rgb(251, 245, 180)',
                paddingLeft:"10px",
           }} 
                onClick={() => {
                    setSearch(player.name)
                }} 
                value ={player.name}
                >{player.name}</td>
                <td style = {{textAlign:"right",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                borderBottom: '2px solid rgb(251, 245, 180)',
                paddingRight:"10px",
            }} ref = {ref2}>{player[stat_keys[props.category][props.stat]]}</td>
            </tr>

        );
    }
    if (isLoaded == null){
        getTop10()
    }else{

        const total = isLoaded.data.length - (isLoaded.data.length % 10)
        
        let page = 1
        var i = 0
        for (i = 0; i < total; i+=10){
            let current = isLoaded.data.slice(i,i+10)

            let current_pages = current.map(getPlayerRow)
            pages[page] = current_pages
            page+=1
        }
        
    }
    const hoverStyle = {
        backgroundColor: "rgb(217,163,58)",
    }
    const unHoverStyle = {
        backgroundColor:"rgb(190, 177, 54)",
    }

    function nextPage(){
        if (currentPage <= (isLoaded.data.length - (isLoaded.data.length % 10)) / 10){
            changePage(currentPage+=1)
        }   
    }

    function prevPage(){
        if (currentPage > 1){
            changePage(currentPage-=1)
        }
        
    }
    if (searching != null){
        const redirect = "/components/PlayerProfile"+"?name="+encodeURIComponent(searching)
        return <Redirect push to = {redirect}/>
    }
    if (isLoaded == null){
        return <div style = {{border:"3pt solid rgb(92, 73, 0)", maxHeight:"100px", minWidth:"100px",
        }}>
            <img src = "../../static/images/loading_circle.gif"
        height = '100' width = '100'></img>
        </div>
    }else{

        return (
            <div style={{
                display:'block'
                
            }}>
                <table style = {{
                        fontSize: props.isDesktop ? "20pt" : "14pt",
                        color: 'rgb(141,113,24)',
                        width: props.isDesktop ? "300px" : "200px",
                        height: props.isDesktop ? '400px' : "300px",
                        letterSpacing:"-1.5px",
                        borderCollapse:"collapse",
                        fontWeight:"bolder",
                        textShadow:"1px 1px 1px black",
                        border : "3px solid rgb(141,113,24)",


                        
                    }}>
                    <caption style={{
                        border : "3px solid rgb(141,113,24)",


                    }}>{`${props.category}\t${props.stat}`.toUpperCase()}</caption>
                    <tbody>
                        {pages[currentPage]}
                    </tbody>
                </table>

                <div style = {{
                    display:'flex',
                    justifyContent:'center'
                }}>

                    <img src = '../../static/images/backward_arrow.svg' onMouseDown={prevPage}
                    height= {props.isDesktop ? "25" : "15"} width = {props.isDesktop ? "150" : "75"}></img>
                    
                    <img src = '../../static/images/forward_arrow.svg' onMouseDown={nextPage}
                    height= {props.isDesktop ? "25" : "15"} width = {props.isDesktop ? "150" : "75"}></img>
                </div>
               
                    
                

            </div>
        )
    }
    


}

export {LeaderboardBoard}