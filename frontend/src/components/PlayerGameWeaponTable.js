import React, { createRef, useState, useCallback } from "react";
import {weapon_keys} from './extras'
function PlayerGameWeaponTable(props){

    const header = <div style ={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        backgroundColor:"rgba(190, 177, 54, 1)",
        borderBottom: '2px solid rgb(251, 245, 180)',
        fontSize: props.isDesktop? "15px" : "13px",



    }}
    key = {-1}>
        <div style = {{
            width:`${props.cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>WEAPON</h3>

        </div>
        <div style = {{
            width:`${props.cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>KILLS</h3>

        </div><div style = {{
            width:`${props.cellWidth}px`,
            textAlign:'center'
        }}>
            <h3>DEATHS</h3>

        </div>

    </div> 

    let weapon_entries = [header]
    for (let i in props.game_weapons){
        let gun=props.game_weapons[i]
        let gun_key = weapon_keys[gun]
        let kills = gun_key+"_kills"
        let deaths = gun_key+"_deaths"
        kills = props.player_weapons[kills]
        deaths = props.player_weapons[deaths]
        weapon_entries.push(
            <div style = {{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-evenly',
                backgroundColor:"rgba(190, 177, 54, 0.8)",
                borderBottom: '2px solid rgb(251, 245, 180)',
                fontSize: props.isDesktop? "15px" : "13px",
            }} key = {i}>
                <div style = {{
                    width:`${props.cellWidth}px`,
                    textAlign:'center'
                }}>
                   <h3>{`${gun.toUpperCase()}`}</h3>
                </div>
                <div style = {{
                    width:`${props.cellWidth}px`,
                    textAlign:'center'
                }}>
                    <h3>{`${kills}`}</h3>

                </div>
                <div style = {{
                    width:`${props.cellWidth}px`,
                    textAlign:'center'
                }}>
                    <h3>{`${deaths}`}</h3>

                </div>

            </div>
        )
    }

    return (
        <div style ={{
            display:'flex',
            justifyContent:'center',
            backgroundColor:"rgba(190, 177, 54, 1)",
            fontSize: props.isDesktop ? "20px" : "15px",
            width : props.isDesktop? `${props.cellWidth*3}px` : '300px',
            border : "4px solid rgb(141,113,24)",

        }}>

            <div style = {{
                display:'flex',
                flexDirection:'column',

            }}>
                <h2 style = {{
                    textAlign:'center',
                borderBottom: '2px solid rgb(251, 245, 180)',


                }}>{`${props.name+"'s"} WEAPON BREAKDOWN`}</h2>
                {weapon_entries}

            </div>

         




        </div>
    )


}


export{PlayerGameWeaponTable}