import React, { createRef, useState, useCallback } from "react";
import {TimeTable} from "./TimeTable";
import "../../static/css/PlayerProfile.css";
import {StatTable} from "./StatTable.js";
import {GetLargeMap} from "./extras.js";
import { Redirect } from "react-router";
import online_circle from '../../static/images/online_circle.png';
import { PlayerProfileController } from "./PlayerProfileController";
import {AdvancedStatsController} from './AdvancedStatsController';
import { MapStatsController } from "./MapStatsController";
import { GameHistoryController } from "./GameHistoryController";
import { StreaksController } from "./StreaksController";
import { MedalController } from "./MedalController";
import { HomeButton } from "./HomeButton";
import {useMediaQuery} from 'react-responsive'

const DEBUG = false
var address = null
if (DEBUG==true){
    address = "https://localhost:7139"
}
else{
    address = "http://216.146.25.171"
}

function PlayerProfile(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const player_name = urlParams.get('name')
    document.title = `UYATracker | ${player_name}`

    let [table, changeTable] = useState(null)

    let [player, setData] = useState(null)
    let [isOnline, setOnline] = useState(false)
    let [map, changeMap] = useState(GetLargeMap())
    const general_style = {
        fontFamily:"Roboto, sans-serif",
        letterSpacing: "-1px",
        color: 'rgb(229, 197, 102)',
        position:"relative",
        background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
        url(${map})`,
        height:"100vh"
    }
    const player_name_style = {
        fontSize : "75pt",
        textAlign:"center",
        textShadow: '6px 4px 4px black',

    }

    async function checkOnline(player){
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
        const search_result = await fetch(`${address}/api/online/players`, requestSearch)
        let players = await search_result.json()
        players = JSON.parse(players)
        console.log(players, player)
        if (players.some(user => user.username.toLowerCase() === player)){
            console.log("g")
            setOnline(true)
        }else{
            setOnline(false)
        }
    }


    // write function to find it player is online
    //write current online players to DB and check DB
    // //console.log(`${player_name} is online : ${isOnline}`)
    let online = null
    if (isOnline){
        online = <img src = {online_circle} height = {isDesktop ? "75" : "25"} width = {isDesktop ? "75" : "25"} style = {{
            paddingTop:'25px',
            paddingRight:'10px'
        }}/>
    }

    async function getPlayerData(player){
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
        const search_result = await fetch(`${address}/api/players/stats/${encodeURIComponent(player_name)}`, requestSearch)
        let data = await search_result.json()
        data = JSON.parse(data)

        //console.log(data)
        setData(data)
    }
    if (player ===null){
        getPlayerData(player_name)
        checkOnline(player_name)
    }
    //FOR RETURNING HOME###########################
    let [home, goHome] = useState(null)
    const returnHome = () =>{
        goHome(true)
    }
    if (home != null){
        const redirect = "/components/homepage"
        return <Redirect push to = {redirect}/>
    }
    //#############################################
    if (isDesktop){
        if (player ===null){
        
            return <div style = {{
                position:'fixed',
                top:"50%",
                left:"50%",
                transform :"translate(-50%, -50%)",
                border: "8pt solid rgb(92, 73, 0)",
                maxHeight:'250px',
                minHeight:'250px',
            }}>
                <img src = "../../server/build//loading_circle.gif"
                height = '253' width = '255'></img>
            </div>
        }
        else{
    
            // //console.log(player)
            const categories = ['overall', 'ctf', 'siege', 'tdm', 'weapon kills', 'weapon deaths']
            let controller = []
            for (let category in categories){
                controller.push(
                    <PlayerProfileController
                        category = {categories[category]}
                        player = {player}
                        address = {address}
                        key = {category}
                        table = {table}
                        changeTable = {changeTable}
                        isDesktop = {isDesktop}
                    />
    
                )
            }
        
    
            return(
                    <div style = {general_style}>
                        <HomeButton/>
                        <div style = {{
                            display:"flex",
                            justifyContent:"center"
                        }}>
                            {online}
                            <h1 style = {player_name_style}>{player.username}</h1>
                        </div>
    
                        <div style = {{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            flexWrap:"wrap"
                        }}>
                            {controller}
                            <GameHistoryController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={true}/>
                            <AdvancedStatsController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={true} category = {'per_min'} title = {"ADVANCED (MINS)"}/>
                            <AdvancedStatsController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={true} category = {'per_gm'} title = {"ADVANCED (GMS)"}/>
                            <MapStatsController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={true} category = {'maps'}/>
                            <StreaksController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={true} category = {'best streaks'} title={"BEST STREAKS"}/>
                            <StreaksController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={true} category = {'current streaks'} title={"CURRENT STREAKS"}/>
                            <MedalController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={true} category = {'medals'} title = {"MEDALS"}/>

                        </div>
    
                        <div style ={{
                            display:'flex',
                            justifyContent:'center',
                            marginTop:'100px'
                        }}>
                            {table != null ? table : <StatTable category = 'overall' player = {player} address = {address} advanced = {false} maps = {false} streaks = {false} medals = {false}/>}
                        </div>
    
    
    
    
    
    
                    </div>
            )
        }
    }
    else{
        if (player ===null){
        
            return <div style = {{
                position:'fixed',
                top:"50%",
                left:"50%",
                transform :"translate(-50%, -50%)",
                maxHeight:'250px',
                minHeight:'250px',
            }}>
                <img src = "../../server/build//loading_circle.gif"
                height = '253' width = '255'></img>
            </div>
        }
        else{
    
            // //console.log(player)
            const categories = ['overall', 'ctf', 'siege', 'tdm', 'weapon kills', 'weapon deaths']
            let controller = []
            for (let category in categories){
                controller.push(
                    <PlayerProfileController
                        category = {categories[category]}
                        player = {player}
                        address = {address}
                        key = {category}
                        table = {table}
                        isDesktop = {isDesktop}
                        changeTable = {changeTable}
                    />
    
                )
            }
        
    
            return(
                    <div style = {{
                        fontFamily:"Roboto, sans-serif",
                        letterSpacing: "-1px",
                        color: 'rgb(229, 197, 102)',
                        position:"relative",
                        background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                        url(${map})`,
                        height:"1200px"
                    }}>
                        <HomeButton/>
                        <div style = {{
                            display:"flex",
                            justifyContent:"center"
                        }}>
                            {online}
                            <h1 style = {{
                                fontSize : "45pt",
                                textAlign:"center",
                                textShadow: '6px 4px 4px black',
                            }}>{player.username}</h1>
                        </div>
    
                        <div style = {{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            flexWrap:'wrap'
                        }}>
                            {controller}
                            <GameHistoryController player = {player} address = {address} table = {table} changeTable = {changeTable}  isDesktop={false}/>
                            <AdvancedStatsController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={false} category = {'per_min'} title = {"ADVANCED (MINS)"}/>
                            <AdvancedStatsController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={false} category = {'per_gm'} title = {"ADVANCED (GMS)"}/>
                            <MapStatsController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={false} category = {'maps'}/>
                            <StreaksController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={false} category = {'best streaks'} title={"BEST STREAKS"}/>
                            <StreaksController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={false} category = {'current streaks'} title={"CURRENT STREAKS"}/>
                            <MedalController player = {player} address = {address} table = {table} changeTable = {changeTable} isDesktop={false} category = {'medals'} title = {"MEDALS"}/>

                        </div>
    
                        <div style ={{
                            display:'flex',
                            justifyContent:'center',
                            marginTop:'50px'
                        }}>
                            {table != null ? table : <StatTable category = 'overall' player = {player} address = {address} advanced = {false} maps = {false} streaks = {false} medals = {false}/>}
                        </div>
    
    
    
    
    
    
                    </div>
            )
        }
    }
    
}

export {PlayerProfile};