import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
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
    let myStorage = window.localStorage;
    async function getScore(dme_id){
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
        const search_result = await fetch(`${props.address}/api/live/game`, requestSearch)
        const gameInfo = await search_result.json()
        let s = gameInfo.scores
        

        setScores({
            queued:true,
            score: s
        })
        return gameInfo
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setScores( scores => ({
                score:scores.score,
                queued:false
            }))
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    if (scores.queued == false){
        getScore(props.dme_id)
    }
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
    for (const [team, value] of Object.entries(scores.score)){
        teams.push(displayScore(team, value))
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
                marginLeft: props.isDesktop? '50px':'0px',
                width:props.isDesktop? "300px": '100%',
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