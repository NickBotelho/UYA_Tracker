import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";

function NavBar(props){
    let [leaderboards, setLeaderboards] = useState(null)
    let leaderboardRef = createRef()
    let [gameHistory, setGameHistory] = useState(null)
    let gameHistoryRef = createRef()
    const restingStyle = {
        background:"rgba(190, 177, 54, 0.8)",
        cursor:'pointer',
        fontSize: props.isDesktop ? "17pt" : "12pt",
        marginBottom : "15px",
        border : "3px solid rgb(141,113,24)",
        fontFamily:"Roboto, sans-serif",
        fontWeight:"bolder",
        textShadow:"1px 1px 1px black",
        color: 'rgb(141,113,24)',
        paddingLeft:"25px",
        paddingRight:'25px',
        marginLeft:'5px',
        marginRight:'5px',
        userSelect:"none"
    }
    const hoverStyle={
        background:"rgba(217,163,58,0.8)",
    }
    const goToLeaderboards = () =>{
        setLeaderboards(true)
    }
    const goToGameHistory = () =>{
        setGameHistory(true)
    }
    const buttonHover = (e) => {
        let ref = e.currentTarget
        ref.style.background = hoverStyle.background
    }
    const buttonLeave = (e) =>  {
        let ref = e.currentTarget
        ref.style.background = restingStyle.background
    }

    if (leaderboards != null){
        let redirect = "/leaderboards"
        return <Redirect push to = {redirect}/>
    }
    if (gameHistory != null){
        let redirect = "/gamehistory"
        return <Redirect push to = {redirect}/>
    }

    return(
        <div style = {{
            display:'flex',
            justifyContent:'center'
        }}>
            <button style = {restingStyle}
            ref = {leaderboardRef}
            onMouseOver = {buttonHover}
            onMouseLeave = {buttonLeave}
            onMouseDown = {goToLeaderboards}>
                Leaderboards
            </button>
            <button style = {restingStyle}
            ref = {gameHistoryRef}
            onMouseOver = {buttonHover}
            onMouseLeave = {buttonLeave}
            onMouseDown = {goToGameHistory}>
                Game History
            </button>
        </div>
    )
}


export{NavBar}