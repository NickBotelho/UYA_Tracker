import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import io from 'socket.io-client'
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import radarKisi from '../../static/images/radars/kisi.png'
import radarHoven from '../../static/images/radars/hoven.png'
import radarX12 from '../../static/images/radars/x12.png'
import radarKorgon from '../../static/images/radars/korgon.png'
import radarMetro from '../../static/images/radars/metro.png'
import radarBwc from '../../static/images/radars/bwc.png'
import radarCommand from '../../static/images/radars/command.png'
import radarSewers from '../../static/images/radars/sewers.png'
import radarDox from '../../static/images/radars/dox.png'
import radarMarc from '../../static/images/radars/marcadia.png'
import {useMediaQuery} from 'react-responsive'

function LiveMap(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    const filters = {
        //https://codepen.io/sosuke/pen/Pjoqqp
        'blue':'invert(10%) sepia(100%) saturate(6489%) hue-rotate(243deg) brightness(94%) contrast(141%)',
        'red':'invert(23%) sepia(55%) saturate(4393%) hue-rotate(349deg) brightness(86%) contrast(139%)',
        'green':'invert(57%) sepia(49%) saturate(5332%) hue-rotate(78deg) brightness(98%) contrast(105%)',
        'orange':'invert(73%) sepia(47%) saturate(2337%) hue-rotate(359deg) brightness(103%) contrast(101%)',
        'yellow':'invert(95%) sepia(58%) saturate(2506%) hue-rotate(354deg) brightness(107%) contrast(104%)',
        'purple':'invert(22%) sepia(94%) saturate(6238%) hue-rotate(288deg) brightness(84%) contrast(119%)',
        'aqua':'invert(88%) sepia(75%) saturate(3250%) hue-rotate(114deg) brightness(105%) contrast(108%)',
        'pink':'invert(39%) sepia(46%) saturate(2873%) hue-rotate(291deg) brightness(103%) contrast(101%)',
    }
    const determineColor = (color, hasFlag) => {
        if (props.gamemode != "CTF"){
            return color
        }
        else{
            if (hasFlag == false){
                return color
            }
            else{
                if (color == "blue"){
                    return "red"
                }else{
                    return "blue"
                }
            }
        }
    }
    const radars = {
        'Bakisi_Isle':radarKisi,
        'Aquatos_Sewers':radarSewers,
        "Hoven_Gorge":radarHoven,
        "Outpost_x12":radarX12,
        "Korgon_Outpost":radarKorgon,
        "Metropolis":radarMetro,
        "Blackwater_City":radarBwc,
        "Command_Center":radarCommand,
        "Blackwater_Dox":radarDox,
        "Marcadia_Palace":radarMarc,
    }
    const mapBounds = {
        //name: [left, right, bottom, top]
        'Bakisi_Isle':[9650, 40500, 11000, 40000],
        'Aquatos_Sewers':[21685,28487,17589,24391],
        "Hoven_Gorge":[7900, 24300,7200,25500],
        "Outpost_x12":[5000, 50000,7200,23200],
        "Korgon_Outpost":[10300, 30500,12172,31500],
        "Metropolis":[40000, 57500, 12656, 30759],
        "Blackwater_City":[8700,19000,7500,26300],
        "Command_Center":[19200,23050,21500,25200],
        "Blackwater_Dox":[10000,19600,10500,19100],
        "Marcadia_Palace":[25700,35700,50500,60500],
    }
    const radarBounds = {
        //[[desktop], [mobile]]
        //[xMax, yMax]
        'Bakisi_Isle':[[550,500],[350,300]],
        'Aquatos_Sewers':[[550,500],[350,300]],
        "Hoven_Gorge":[[550,500],[350,300]],
        "Outpost_x12":[[550, 225],[350, 175]],
        "Korgon_Outpost":[[550,500],[350,300]],
        "Metropolis":[[550,500],[350,300]],
        "Blackwater_City":[[400, 550],[300, 350]],
        "Command_Center":[[550,500],[350,300]],
        "Blackwater_Dox":[[550,500],[350,300]],
        "Marcadia_Palace":[[550,500],[350,300]],
        Ultrawide : {
            'Bakisi_Isle':[1200,900],
            'Aquatos_Sewers':[1200,900],
            "Hoven_Gorge":[1200,900],
            "Outpost_x12":[1200,600],
            "Korgon_Outpost":[1200,900],
            "Metropolis":[1200,900],
            "Blackwater_City":[1200,10010],
            "Command_Center":[1200,900],
            "Blackwater_Dox":[1200,900],
            "Marcadia_Palace":[1200,900],
        }
    }
    let mapName = props.map
    let [players, setPlayers] = useState({
        playerInfo:null,
        updateId:null
    })
    let map = radars[mapName]
    let myStorage = window.localStorage;

    async function getMap(dme_id){
        const requestSearch = {
            method: "POST",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
            body: JSON.stringify({
                dme_id: dme_id,
            }),    
        }
        const search_result = await fetch(`${props.address}/api/live/map`, requestSearch)
        // const search_result = await fetch(`${props.address}/api/live/map`, requestSearch)
        // const radarPost = await search_result
        const playerInfos = await search_result.json()
        setPlayers({
            playerInfo:sortPlayers(playerInfos),
            updateId:playerInfos['updateId']
        })
        
    }
    function sortPlayers(info){
        const totalPlayers = info['x'].length
        let res = []
        for (let i = 0; i < totalPlayers; i++){
            let current = {}
            current['x'] = info['x'][i]
            current['y'] = info['y'][i]
            current['name'] = info['names'][i]
            current['hp'] = info['hp'][i]
            current['color'] = info['color'][i]
            current['hasFlag'] = info['hasFlag'][i]
            current['rotation'] = info['rotations'][i]
            res.push(current)
        }
        return res
    }
    const convertGameRotation = (gameRotation) => {
        return Math.floor(270-(1.38*gameRotation))
    }
    function createPlayer(player, idx){
        /**
         * player is a dict object of x,y,names,color,hp
         */
        
        const radarPoints = convert([player['x'], player['y']], mapName)
        return <div key = {idx}>
            {/* <img src = '../../static/images/dot.svg' */}
            <img src = {player['hasFlag'] == true? '../../static/images/flag.png' : player['hp'] > 0 ? '../../static/images/playerIndicator.png' : '../../static/images/skull.png'}
                height= "20" width = "20"
                style = {{
                    userSelect:"none",
                    marginLeft: `${radarPoints[0]}px`,
                    marginTop:`${radarPoints[1]}px`,
                    filter:filters[determineColor(player['color'], player['hasFlag'])],
                    position:'absolute',
                    transform: player['hp'] > 0 ? `rotate(${convertGameRotation(player['rotation'])}deg)` : 'rotate(0deg)'
                    }}/>
            <div style={{
                height: props.isDesktop ? '4px' : '2px',
                width: props.isDesktop ? "30px ": '12px',
                borderColor: "black",
                border: '1px solid rgb(144,99,30)',
                // paddingRight: `${props.isDesktop ? '5' : '2'}`,
                textAlign: "center",
                background: `linear-gradient(to right,  rgb(198,151,64) 0%,rgb(198,151,64) ${player['hp']}%,rgb(118,83,25) ${player['hp']}%,rgb(118,83,25) 100%)`,
                color: "rgb(225,218,113)",
                textShadow: '2px 2px 2px black',
                fontSize: props.isDesktop ? "24pt" : '12pt',
                marginLeft: `${radarPoints[0]}px`,
                marginTop:`${radarPoints[1]-8}px`,
                position:'absolute',

            }}>
            </div>
            <h4 style = {{
                height:"10px",
                width:'100px',
                userSelect:"none",
                marginLeft: `${radarPoints[0]}px`,
                marginTop:`${radarPoints[1]-30}px`,
                position:'absolute',
                fontWeight:'bold',
                fontSize: '12pt'
                }}>
                {player['name']}
            </h4>
            </div>
    }
    function convert(coords, map){
        /**
         * coords = [x,y]
         */
        const bias = 10
        var edges = mapBounds[map]
        var xDist = edges[1] - edges[0]
        var xPercent = (coords[0] - edges[0]) / xDist
        var radrBounds = props.isDesktop ? radarBounds[map][0][0] : radarBounds[map][1][0]
        var xPlot = Math.floor(radrBounds * xPercent)
        edges = mapBounds[map]
        var yDist = edges[3] - edges[2]
        var yPercent = (coords[1] - edges[2]) / yDist
        radrBounds = props.isDesktop ? radarBounds[map][0][1] : radarBounds[map][1][1]
        var yPlot = Math.floor(radrBounds * yPercent + bias)
        
        return [xPlot, radrBounds - yPlot]
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setPlayers({
                updateId: players['updateId'],
                playerInfo:null,
            });
        }, props.refresh);
        return () => clearInterval(interval);
    }, []);
    if (players.playerInfo == null){
        getMap(props.dme_id)
        let cache = myStorage.getItem("playerInfo")
        if (cache == null){
            return (
                <div style = {{
                    marginTop:props.isDesktop? '75px' : '10px',
                    height: props.isDesktop? `${radarBounds[mapName][0][1]}px` : `${radarBounds[mapName][1][1]}px`,
                    width: props.isDesktop? `${radarBounds[mapName][0][0]}px` : `${radarBounds[mapName][1][0]}px`,
                    marginLeft: props.isDesktop? '0': '25px',
                    border : "3px solid rgb(141,113,24)",
                    borderCollapse:"collapse",
                }} >
                        <img src = "../../static/images/loading_circle.gif"
                            height = '253' width = '255'></img>  
                </div>
            )
        }else{
            cache = JSON.parse(cache)
            let updateId = JSON.parse(myStorage.getItem("updateId"))
            const points = cache.map(createPlayer)
            return (
                <div style = {{
                    marginTop:props.isDesktop? '35px' : '10px',
                    height: props.isDesktop? `${radarBounds[mapName][0][1]}px` : `${radarBounds[mapName][1][1]}px`,
                    width: props.isDesktop? `${radarBounds[mapName][0][0]}px` : `${radarBounds[mapName][1][0]}px`,
                    border : "3px solid rgb(141,113,24)",
                    borderCollapse:"collapse",
                    marginLeft: props.isDesktop? '0': '5%',

                }}>
                        <img src = {map} height = {props.isDesktop? `${radarBounds[mapName][0][1]}px` : `${radarBounds[mapName][1][1]}px`} 
                        width= {props.isDesktop? `${radarBounds[mapName][0][0]}px` : `${radarBounds[mapName][1][0]}px`} style = {{
                            position:'absolute'
                        }}></img>
    
                        {points}
     
                </div>
            )
        }
    }else{
        let lastUpdateId = JSON.parse(myStorage.getItem("updateId"))
        if (lastUpdateId > players.updateId){ //not a new update
            console.log("display cache")
            let cache = JSON.parse(myStorage.getItem("playerInfo"))
            const points = cache.map(createPlayer)
            return (
                <div style = {{
                    marginTop:props.isDesktop? '35px' : '10px',
                    height: props.isDesktop? `${radarBounds[mapName][0][1]}px` : `${radarBounds[mapName][1][1]}px`,
                    width: props.isDesktop? `${radarBounds[mapName][0][0]}px` : `${radarBounds[mapName][1][0]}px`,
                    border : "3px solid rgb(141,113,24)",
                    borderCollapse:"collapse",
                    marginLeft: props.isDesktop? '0': '5%',

                }}>
                        <img src = {map} height = {props.isDesktop? `${radarBounds[mapName][0][1]}px` : `${radarBounds[mapName][1][1]}px`} 
                        width= {props.isDesktop? `${radarBounds[mapName][0][0]}px` : `${radarBounds[mapName][1][0]}px`} style = {{
                            position:'absolute'
                        }}></img>
    
                        {points}
     
                </div>
            )
        }
        myStorage.setItem("playerInfo", JSON.stringify(players.playerInfo))
        myStorage.setItem("updateId", JSON.stringify(players.updateId))
        const points = players.playerInfo.map(createPlayer)
        console.log("display new update")

        return (
            <div style = {{
                marginTop:props.isDesktop? '35px' : '10px',
                height: props.isDesktop? `${radarBounds[mapName][0][1]}px` : `${radarBounds[mapName][1][1]}px`,
                width: props.isDesktop? `${radarBounds[mapName][0][0]}px` : `${radarBounds[mapName][1][0]}px`,
                marginLeft: props.isDesktop? '0': '5%',
                border : "3px solid rgb(141,113,24)",
                borderCollapse:"collapse",

            }}>
                    <img src = {map} height = {props.isDesktop? `${radarBounds[mapName][0][1]}px` : `${radarBounds[mapName][1][1]}px`} 
                    width= {props.isDesktop? `${radarBounds[mapName][0][0]}px` : `${radarBounds[mapName][1][0]}px`}  style = {{
                        
                        position:'absolute'
                    }}></img>

                    {points}
 
            </div>
        )
    }

    
}
export {LiveMap}
