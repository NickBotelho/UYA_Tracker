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

    // console.log(url)


    function GetMap(){
        const mapNames = [kisi, bwc, hoven, x12, marcadia, metropolis]
        
        //max not inclusive
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        var index = getRandomInt(mapNames.length)
        return mapNames[index]
    }
    const map = GetMap()

    
    const [isLoaded, hasLoaded] = useState(null);
    const [searching, setSearch] = useState(null);
    async function getTop10(url){
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
        // console.log("1",players)
        hasLoaded(players);
        return players
    }
    if (isLoaded === null){
        getTop10(url)
    }
   
    const hoverStyle = {
        backgroundColor: "rgb(217,163,58)",
    }
    const unHoverStyle = {
        backgroundColor:"rgb(190, 177, 54)",
    }

    
    const getPlayerRow = (player, index) => { 
        const ref1 = createRef()
        const ref2 = createRef()
        const ref3 = createRef()
        const buttonHover = (e) => {
            // for (let prop in hoverStyle) {
            //     e.target.style[prop] = hoverStyle[prop];
            // }
            
            ref1.current.style.backgroundColor = hoverStyle.backgroundColor
            ref2.current.style.backgroundColor = hoverStyle.backgroundColor

        }
        const buttonLeave = (e) => {
            // for (let prop in unHoverStyle) {
            //     e.target.style[prop] = unHoverStyle[prop];
                
            // }
            
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
            }} ref = {ref2}>{player[`${props.category}_${props.stat}`]}</td>
            </tr>

        );
    }
    if (searching != null){
        const redirect = "/components/PlayerProfile"+"?name="+encodeURIComponent(searching)
        return <Redirect push to = {redirect}/>
    }
    
    if (isLoaded === null){
        return <div style = {{border:"3pt solid rgb(92, 73, 0)", maxHeight:"100px", minWidth:"100px",
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
                    
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black"
                }}>
                    
                    <caption >{props.title.toUpperCase()}</caption>
                    
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