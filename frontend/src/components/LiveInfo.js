import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'

//<img src={`data:image/png;base64,${this.state.image}`}/>
function LiveInfo(props){


    return (  
        <div style = {{
            height : props.isDesktop? '150px' : '75px',
            width: props.isDesktop? '320px' : '125px',
            fontSize : props.isDesktop? "16pt" : "9pt",
            textAlign:"center",
            color: 'rgb(229, 197, 102)',
            textShadow: '2px 2px 2px black',
            marginTop:"50px"
        }}>

            <h1>{`Gamemode: ${props.info.gamemode}`}</h1>
            
        </div>
    )

}

export {LiveInfo}