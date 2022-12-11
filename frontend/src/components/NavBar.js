import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { Dropdown } from "./general/Dropdown";

function NavBar(props) {
    let [leaderboards, setLeaderboards] = useState(null)
    let leaderboardRef = createRef()
    let [gameHistory, setGameHistory] = useState(null)
    let gameHistoryRef = createRef()
    let [analytics, setAnalytics] = useState(null)
    let analyticsRef = createRef()
    let [live, setLive] = useState(null)
    let liveRef = createRef()
    let [clans, setClans] = useState(null)
    let clansRef = createRef()
    let [info, setInfo] = useState(null)
    let infoRef = createRef()
    let [autoplayer, setAutoplayer] = useState(null)
    let autoplayerRef = createRef()
    const restingStyle = {
        background: "rgba(190, 177, 54, 0.8)",
        cursor: 'pointer',
        fontSize: props.isDesktop ? "14pt" : "10pt",
        marginBottom: "15px",
        border: "3px solid rgb(141,113,24)",
        fontFamily: "Roboto, sans-serif",
        fontWeight: "bolder",
        textShadow: "1px 1px 1px black",
        color: 'rgb(141,113,24)',
        paddingLeft: props.isDesktop ? "18px" : "10px",
        paddingRight: props.isDesktop ? "18px" : "10px",
        marginLeft: '5px',
        marginRight: '5px',
        userSelect: "none"
    }
    const hoverStyle = {
        background: "rgba(217,163,58,0.8)",
    }
    const goToLeaderboards = () => {
        setLeaderboards(true)
    }
    const goToGameHistory = () => {
        setGameHistory(true)
    }
    const goToAnalytics = () => {
        setAnalytics(true)
    }
    const goToLive = () => {
        setLive(true)
    }
    const goToClans = () => {
        setClans(true)
    }

    const sections = ["Home", 'Leaderboards', 'Game History', "Analytics", "Live", "Clans", "Information", "Autoplayer"]
    const setSection = (section) => {
        switch (section) {
            case 'Leaderboards':
                setLeaderboards(true)
                break;
            case 'Game History':
                setGameHistory(true)
                break;
            case 'Analytics':
                setAnalytics(true)
                break;
            case 'Live':
                setLive(true)
                break;
            case 'Clans':
                setClans(true)
                break
            case 'Information':
                setInfo(true)
                break
            case "Autoplayer":
                setAutoplayer(true)
                break
        }
    }
    const buttonHover = (e) => {
        let ref = e.currentTarget
        ref.style.background = hoverStyle.background
    }
    const buttonLeave = (e) => {
        let ref = e.currentTarget
        ref.style.background = restingStyle.background
    }

    if (leaderboards != null) {
        let redirect = "/leaderboards"
        return <Redirect push to={redirect} />
    }
    if (gameHistory != null) {
        let redirect = "/gamehistory"
        return <Redirect push to={redirect} />
    }
    if (analytics != null) {
        let redirect = "/analytics"
        return <Redirect push to={redirect} />
    }
    if (live != null) {
        let redirect = "/live"
        return <Redirect push to={redirect} />
    }
    if (clans != null) {
        let redirect = '/clans'
        return <Redirect push to={redirect} />
    }
    if (info != null){
        let redirect = '/info'
        return <Redirect push to ={redirect}/>
    }
    if (autoplayer != null){
        let redirect = '/autoplayer'
        return <Redirect push to = {redirect}/>
    }
    if (props.isDesktop) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <button style={restingStyle}
                    ref={leaderboardRef}
                    onMouseOver={buttonHover}
                    onMouseLeave={buttonLeave}
                    onMouseDown={goToLeaderboards}>
                    Leaderboards
                </button>
                <button style={restingStyle}
                    ref={gameHistoryRef}
                    onMouseOver={buttonHover}
                    onMouseLeave={buttonLeave}
                    onMouseDown={goToGameHistory}>
                    Game History
                </button>
                <button style={restingStyle}
                    ref={analyticsRef}
                    onMouseOver={buttonHover}
                    onMouseLeave={buttonLeave}
                    onMouseDown={goToAnalytics}>
                    Analytics
                </button>
                <button style={restingStyle}
                    ref={liveRef}
                    onMouseOver={buttonHover}
                    onMouseLeave={buttonLeave}
                    onMouseDown={goToLive}>
                    Live
                </button>
                <button style={restingStyle}
                    ref={clansRef}
                    onMouseOver={buttonHover}
                    onMouseLeave={buttonLeave}
                    onMouseDown={goToClans}>
                    Clans
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <Dropdown title="" values={sections} handleClick={setSection} />
            </div>
        )
    }
}


export { NavBar }