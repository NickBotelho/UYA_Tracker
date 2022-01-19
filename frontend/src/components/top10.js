import React, { createRef, useState, useCallback } from "react";
import "../../static/css/top10.css";
import { Redirect } from "react-router";
import kisi from '../../static/images/kisi.png';
import bwc from '../../static/images/bwc.png';
import hoven from '../../static/images/hoven.png';
import x12 from '../../static/images/x12.png';
import marcadia from '../../static/images/marcadia.png';
import metropolis from '../../static/images/metropolis.png';
import {GetMap} from '../../static/images/maps.js';

// fields:
// category
function Top10(props){
    const category = props.category
    const stat = props.stat
    const url = `${props.address}/stats/top10/${category}/${stat}`


    
    const [isLoaded, hasLoaded] = useState(null);
    const [searching, setSearch] = useState(null);
    async function getTop10Kills(url){
        const request = await fetch(url,{
                method: "GET",
                    headers:  {
                        'Content-Type': "application/json; charset=utf-8",
                        Accept: "application/json",
                        "Cache-Control": "no-cache"
                    },
                    credentials: "include",
            })
        const players = await request.json()
        hasLoaded(players);
        return players
    }
    async function getTop10(url){
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
                stat:props.stat
            }),  
        }
        const res = await fetch(`${props.address}/stats/top10`, requestSearch)
        const players = await res.json()
        hasLoaded(players)
    }
    if (isLoaded === null){
        if (stat == 'kills' && category == 'overall'){
            getTop10Kills(url)
        }
        else{
            getTop10(url)
        }
    }
   
    const hoverStyle = {
        backgroundColor: "rgb(217,163,58)",
        cursor:'pointer'

    }
    const unHoverStyle = {
        backgroundColor:"rgb(190, 177, 54)",
        cursor:'pointer'

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
            onMouseLeave={buttonLeave} >
                <td 
                ref = {ref1}
                style = {{textAlign:"left",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                borderBottom: '2px solid rgb(251, 245, 180)',
                paddingLeft:"10px",
                cursor:'pointer'

           }} 
                onClick={() => {
                    setSearch(player.name)
                }} 
                value ={player.name}
                >{`${(index+1)}. ${player.name}`}</td>
                <td style = {{textAlign:"right",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                borderBottom: '2px solid rgb(251, 245, 180)',
                paddingRight:"10px",
                cursor:'pointer'
            }} ref = {ref2}
            >{player[`${props.category}_${props.stat}`]}</td>
            </tr>

        );
    }
    if (searching != null){
        const redirect = "/players"+"?name="+encodeURIComponent(searching)
        return <Redirect push to = {redirect}/>
    }
    
    if (isLoaded === null){
        return <div style = {{maxHeight:"100px", minWidth:"100px",
        }}>
            <img src = "../../static/images/loading_circle.gif"
        height = '100' width = '100'></img>
        </div>
    }else{
        // console.log(isLoaded)
        return(
            <div className='outside_border' >
                <table 
                style = {{
                    fontSize:'20pt',
                    color: 'rgb(141,113,24)',
                    width:"300px",
                    height:'400px',
                    letterSpacing:"-1.5px",
                    // backgroundImage: `url(${map})`,
                    border : "3px solid rgb(141,113,24)",
                
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black",
                }}>
                    
                    <caption style = {{
                        border : "4px solid rgb(141,113,24)",
                        borderCollapse:"collapse",

                    }}>{props.title.toUpperCase()}</caption>
                    
                    <tbody>
                        {isLoaded.map(getPlayerRow)}
                    </tbody>
                </table>

            </div>
        );
    }
}


// style = {{backgroundImage: `url(${kisi})`}}
export {Top10}