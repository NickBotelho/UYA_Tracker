import React, { createRef, useState, useCallback } from "react";
import { PlayerGameWeaponTable } from "./PlayerGameWeaponTable";


function populateCTFRow(team,  cellWidth, setWeaponBreakdown, game_weapons, setSearchName, isDesktop){
    const header = <div style ={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        backgroundColor:"rgba(190, 177, 54, 1)",
        borderBottom: '2px solid rgb(251, 245, 180)',
        fontSize: isDesktop ? "28px": "14px",
        paddingLeft:"10px",



    }}
    key = {-1}>
        <div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>NAME</h3>

        </div>
        <div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>KILLS</h3>

        </div><div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>DEATHS</h3>

        </div><div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>CAPS</h3>

        </div><div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>SAVES</h3>

        </div>

    </div>
    function populate(team){
        let row = [header]
        for (let i = 0; i < team.length; i++){
            const name = team[i]['username']
            const kills = team[i]['kills']
            const deaths = team[i]['deaths']
            const caps = team[i]['caps']
            const saves = team[i]['saves']
            const player_weapons =  team[i]['weapons']
            row.push(
                <div style ={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                    backgroundColor:"rgba(190, 177, 54, 0.8)",
                    paddingLeft:"10px",
                    borderBottom: '2px solid rgb(251, 245, 180)',
                    fontSize: isDesktop ? "25px": "11px",


                

                }}
                key = {i}>
                    <div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center',
                        fontSize: isDesktop ? "25px": "10px",
                    }} onMouseDown = { () =>{
                        setSearchName(name)
                    }} 
                    onMouseEnter = { (e) =>{
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)' 
                    }}
                        onMouseLeave = {(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3 >{name}</h3>

                    </div>
                    <div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }} onMouseDown = {() =>{
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons = {game_weapons} player_weapons = {player_weapons} name = {name} cellWidth = {cellWidth} isDesktop = {isDesktop}/>
                        )
                    }} onMouseEnter = { (e) =>{
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)' 
                    }}
                        onMouseLeave = {(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{kills}</h3>

                    </div><div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }} onMouseDown = {() =>{
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons = {game_weapons} player_weapons = {player_weapons} name = {name} cellWidth = {cellWidth} isDesktop = {isDesktop}/>
                        )
                    }} onMouseEnter = { (e) =>{
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)' 
                    }}
                        onMouseLeave = {(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{deaths}</h3>

                    </div><div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }}>
                        <h3>{caps}</h3>

                    </div><div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }}>
                        <h3>{saves}</h3>

                    </div>

                </div>
            )
        }
        return row
    }
    return populate(team)
}

function populateDMRow(team,  cellWidth, setWeaponBreakdown, game_weapons, setSearchName, isDesktop){

    const header = <div style ={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        backgroundColor:"rgba(190, 177, 54, 1)",
        borderBottom: '2px solid rgb(251, 245, 180)',
        fontSize: isDesktop ? "28px": "11px",
        paddingLeft:"10px",



    }}
    key = {-1}>
        <div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>NAME</h3>

        </div>
        <div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>KILLS</h3>

        </div><div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>DEATHS</h3>

        </div>
        <div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>SUICIDES</h3>

        </div>

    </div>
    function populate(team){
        let row = [header]
        for (let i = 0; i < team.length; i++){
            const name = team[i]['username']
            const kills = team[i]['kills']
            const deaths = team[i]['deaths']
            const suicides = team[i]['suicides']
            const player_weapons =  team[i]['weapons']
            row.push(
                <div style ={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                    backgroundColor:"rgba(190, 177, 54, 0.8)",
                    paddingLeft:"10px",
                    borderBottom: '2px solid rgb(251, 245, 180)',
                    fontSize: isDesktop ? "25px": "11px",

                

                }}
                key = {i}>
                    <div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }} onMouseDown = { () =>{
                        setSearchName(name)
                    }} 
                    onMouseEnter = { (e) =>{
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)' 
                    }}
                        onMouseLeave = {(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{name}</h3>

                    </div>
                    <div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }} onMouseDown = {() =>{
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons = {game_weapons} player_weapons = {player_weapons} name = {name} cellWidth = {cellWidth} isDesktop = {isDesktop}/>
                        )
                    }} onMouseEnter = { (e) =>{
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)' 
                    }}
                        onMouseLeave = {(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{kills}</h3>

                    </div><div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }} onMouseDown = {() =>{
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons = {game_weapons} player_weapons = {player_weapons} name = {name} cellWidth = {cellWidth} isDesktop = {isDesktop}/>
                        )
                    }} onMouseEnter = { (e) =>{
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)' 
                    }}
                        onMouseLeave = {(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{deaths}</h3>

                    </div><div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }}>
                        <h3>{suicides}</h3>

                    </div>

                </div>
            )
        }
        return row
    }
    return populate(team)
}
function populateSiegeRow(team,  cellWidth, setWeaponBreakdown, game_weapons, setSearchName, isDesktop){

    const header = <div style ={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        backgroundColor:"rgba(190, 177, 54, 1)",
        borderBottom: '2px solid rgb(251, 245, 180)',
        fontSize: isDesktop ? "28px": "11px",
        paddingLeft:"10px",



    }}
    key = {-1}>
        <div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>NAME</h3>

        </div>
        <div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>KILLS</h3>

        </div><div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>DEATHS</h3>

        </div><div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>BASE DMG</h3>

        </div><div style = {{
            width:`${cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>NODES</h3>

        </div>

    </div>
    function populate(team){
        let row = [header]
        for (let i = 0; i < team.length; i++){
            const name = team[i]['username']
            const kills = team[i]['kills']
            const deaths = team[i]['deaths']
            const base_dmg = team[i]['base_dmg']
            const nodes = team[i]['nodes']
            const player_weapons =  team[i]['weapons']
            row.push(
                <div style ={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                    backgroundColor:"rgba(190, 177, 54, 0.8)",
                    paddingLeft:"10px",
                    borderBottom: '2px solid rgb(251, 245, 180)',
                    fontSize: isDesktop ? "25px": "11px",

                

                }}
                key = {i}>
                    <div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }} onMouseDown = { () =>{
                        setSearchName(name)
                    }} 
                    onMouseEnter = { (e) =>{
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)' 
                    }}
                        onMouseLeave = {(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{name}</h3>

                    </div>
                    <div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }} onMouseDown = {() =>{
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons = {game_weapons} player_weapons = {player_weapons} name = {name} cellWidth = {cellWidth} isDesktop = {isDesktop}/>
                        )
                    }} onMouseEnter = { (e) =>{
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)' 
                    }}
                        onMouseLeave = {(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{kills}</h3>

                    </div><div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }} onMouseDown = {() =>{
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons = {game_weapons} player_weapons = {player_weapons} name = {name} cellWidth = {cellWidth} isDesktop = {isDesktop}/>
                        )
                    }} onMouseEnter = { (e) =>{
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)' 
                    }}
                        onMouseLeave = {(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{deaths}</h3>

                    </div><div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }}>
                        <h3>{base_dmg}</h3>

                    </div><div style = {{
                        width:`${cellWidth}px`,
                        textAlign:'center'
                    }}>
                        <h3>{nodes}</h3>

                    </div>

                </div>
            )
        }
        return row
    }
    return populate(team)
}


export {populateCTFRow, populateDMRow, populateSiegeRow}