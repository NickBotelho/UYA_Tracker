import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'

//<img src={`data:image/png;base64,${this.state.image}`}/>
function LivePlayer(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
   
    // const props.player = {
    //     name:'props.player#1',
    //     hp:100,
    //     kills:50,
    //     deaths:24,
    //     caps:1
    // }

    // console.log(props.player)
    return (  
        <div style = {{
            height : props.isDesktop? '150px' : '75px',
            width: props.isDesktop? '250px' : '125px'
        }}>
            <div style = {{
                    fontSize : props.isDesktop? "18pt" : "9pt",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '2px 2px 2px black',
                }}>
                <h3 style = {{color:props.player.team}}>{props.player.name}</h3>
            </div>

            <div style = {{
                height : props.isDesktop? '40px' : '20px',
                width: props.isDesktop? '250px' : '125px',
                borderColor : "black",
                border:'2px solid rgb(144,99,30)',
                textAlign:"center",
                background: `linear-gradient(to right,  rgb(198,151,64) 0%,rgb(198,151,64) ${props.player.hp}%,rgb(118,83,25) ${props.player.hp}%,rgb(118,83,25) 100%)`,
                color:"rgb(225,218,113)",
                textShadow: '2px 2px 2px black',
                fontSize:props.isDesktop ? "24pt" : '12pt'
            }}>
                {`${props.player.hp}/100`}
            </div>

            <div style = {{
                    fontSize : props.isDesktop? "15pt" : "9pt",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '2px 2px 2px black',
                    display:"flex",
                    flexDirection:"row",

                }}>
                <h3>{`Kills: ${props.player.kills}`}</h3>
                <h3 style = {{marginLeft : '25px'}}>{`Deaths: ${props.player.deaths}`}</h3>
            </div>


        </div>
    )

}

export {LivePlayer}