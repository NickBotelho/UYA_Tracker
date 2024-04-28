import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import {colorCodeToString} from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'

//<img src={`data:image/png;base64,${this.state.image}`}/>
function LiveScore(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [scores, setScores] = useState({
        queued: false,
        score:{}
    })

    const displayScore = (team, value)=>{
        return <div style={{
            textShadow: '2px 2px 2px black',
            color:team,
            fontSize : props.isDesktop? "35pt" : "15pt",
            width:props.isDesktop? '50px': "90px",
            paddingRight: props.isDesktop? '10px': '0px',
            paddingLeft: props.isDesktop? '10px': '0px',
        }} key = {team}>
            <h4>{value}</h4>
        </div>
    }

    let teams = []
    for (let i = 0; i< props.message.Teams.length; i++){
        let teamColor = colorCodeToString[props.message.Teams[i].TeamColor]
        let score = props.message.Teams[i].Score
        teams.push(displayScore(teamColor, score))
    }
    return (  
        <div style = {{
            height : props.isDesktop? '150px' : '75px',
            width:props.isDesktop? '100%': "100%px",
            display:'flex',
            flexDirection:'column',
            textAlign:'center',
            justifyContent:'center',
            // marginLeft: props.isDesktop? '50px':'0px'
        }}>
            <h2 style = {{
                fontSize : props.isDesktop? "35pt" : "25pt",
                textAlign:"center",
                color: 'rgb(229, 197, 102)',
                textShadow: '6px 4px 4px black',
            }}>Scores</h2>
            <div style = {{
                marginLeft: props.isDesktop? '0px':'0px',
                width:props.isDesktop? "100%": '100%',
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                justifyContent:'center'
            }}>
               {teams}

            </div>


        </div>
    )

}

export {LiveScore}