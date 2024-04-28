import React, { createRef, useState, useCallback } from "react";
import { PlayerGameWeaponTable } from "./PlayerGameWeaponTable";
import { DetailedLiveHistory } from './DetailedLiveHistory'
const restingStyle = {
    background: "rgba(198,151,64)",
    cursor: 'pointer',
    fontSize: "12pt",
    border: "3px solid rgb(141,113,24)",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bolder",
    textShadow: "2px 2px 2px black",
    color: 'rgb(225,218,113)',
    marginLeft: "0",
    userSelect: "none",
    height: "30px",
    width: '50px',
    marginTop: '3px'

}

const buttonHover = (e) => {
    let ref = e.currentTarget
    ref.style.background = hoverStyle.background
}
const buttonLeave = (e) => {
    let ref = e.currentTarget
    ref.style.background = restingStyle.background
}
const hoverStyle = {
    background: "rgba(118,83,25,0.8)",
}
function populateCTFRow(team, cellWidth, setWeaponBreakdown, game_weapons, setSearchName, isDesktop, liveGame,
    map, isDisconnect) {
        const restingStyle = {
            background: "rgba(198,151,64)",
            cursor: 'pointer',
            fontSize: isDesktop ? "12pt" : '8pt',
            border: "3px solid rgb(141,113,24)",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bolder",
            textShadow: "2px 2px 2px black",
            color: 'rgb(225,218,113)',
            marginLeft: "0",
            marginRight: isDesktop? "0" : "5px",
            userSelect: "none",
            height: isDesktop ? "30px" : '20px',
            width: isDesktop ? "50px" : '35px',
            marginTop: isDesktop ? '3px' : '0px'
        
        }

    const header = <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: "rgba(190, 177, 54, 1)",
        borderBottom: '2px solid rgb(251, 245, 180)',
        fontSize: isDesktop ? "28px" : "14px",
        paddingLeft: "50px",
    }}

        key={-1}>

        <div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>NAME</h3>

        </div>
        <div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>KILLS</h3>

        </div><div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>DEATHS</h3>

        </div><div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>CAPS</h3>

        </div><div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>SAVES</h3>

        </div>

    </div>
    function populate(team) {
        let row = [header]
        for (let i = 0; i < team.length; i++) {
            const name = team[i]['username']
            const saves = team[i]['saves']
            const player_weapons = team[i]['weapons']
            let ref = createRef()
            const showLive = (e) => {
                ref.current.children[0].style.visibility = "visible"
            }
            const info = liveGame != null && liveGame['results'][name.toLowerCase()]['medals'] != undefined ? liveGame['results'][name.toLowerCase()] : null
            const kills = isDisconnect == true && info != null ? info['kills'] : team[i]['kills'] 
            const deaths = isDisconnect == true && info != null ? info['deaths'] : team[i]['deaths'] 
            const caps = isDisconnect == true && info != null ? info['caps'] : team[i]['caps'] 
            const color = info != null ? info['team'] :  "rgb(141,113,24)"
            //console.log(info)
            row.push(
                <div ref={ref} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    backgroundColor: "rgba(190, 177, 54, 0.8)",
                    paddingLeft: "10px",
                    borderBottom: '2px solid rgb(251, 245, 180)',
                    fontSize: isDesktop ? "25px" : "11px",
                    cursor: 'pointer',
                    zIndex: "1"
                }}
                    key={i}>
                    <DetailedLiveHistory isDesktop={isDesktop} info={info}
                        name={name} map={map} />

                    <button style={restingStyle} onMouseEnter={buttonHover}
                        onMouseLeave={buttonLeave} onMouseDown={showLive}>Live</button>
                    <div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center',
                        fontSize: isDesktop ? "25px" : "10px",
                    }} onMouseDown={() => {
                        setSearchName(name)
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(217,163,58,0.8)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>

                        <h3 style={{
                            color:color
                        }}>{isDisconnect == true && info != null ? `(${info['team'].toUpperCase()}) ` : null}{name.length > 9? `${name.substring(0,9)}.` : name}</h3>

                    </div>
                    <div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
                    }} onMouseDown={() => {
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons={game_weapons} player_weapons={player_weapons} name={name} cellWidth={cellWidth} isDesktop={isDesktop} />
                        )
                    }} onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)'
                    }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{kills}</h3>

                    </div><div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
                    }} onMouseDown={() => {
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons={game_weapons} player_weapons={player_weapons} name={name} cellWidth={cellWidth} isDesktop={isDesktop} />
                        )
                    }} onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)'
                    }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{deaths}</h3>

                    </div><div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
                    }}>
                        <h3>{caps}</h3>

                    </div><div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
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

function populateDMRow(team, cellWidth, setWeaponBreakdown, game_weapons, setSearchName, isDesktop, liveGame,
    map, isDisconnect) {

    const header = <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: "rgba(190, 177, 54, 1)",
        borderBottom: '2px solid rgb(251, 245, 180)',
        fontSize: isDesktop ? "28px" : "11px",
        paddingLeft: "50px",



    }}
        key={-1}>
        <div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>NAME</h3>

        </div>
        <div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>KILLS</h3>

        </div><div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>DEATHS</h3>

        </div>
        <div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>SUICIDES</h3>

        </div>

    </div>
    function populate(team) {
        let row = [header]
        for (let i = 0; i < team.length; i++) {
            const name = team[i]['username']
            const suicides = team[i]['suicides']
            const player_weapons = team[i]['weapons']
            let ref = createRef()
            const showLive = (e) => {
                ref.current.children[0].style.visibility = "visible"
            }
            const info = liveGame != null && liveGame['results'][name.toLowerCase()]['medals'] != undefined ? liveGame['results'][name.toLowerCase()] : null
            const kills = isDisconnect == true && info != null ? info['kills'] : team[i]['kills'] 
            const deaths = isDisconnect == true && info != null ? info['deaths'] : team[i]['deaths'] 
            const color = info != null ? info['team'] :  "rgb(141,113,24)"
            row.push(
                <div ref={ref} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    backgroundColor: "rgba(190, 177, 54, 0.8)",
                    paddingLeft: "10px",
                    borderBottom: '2px solid rgb(251, 245, 180)',
                    fontSize: isDesktop ? "25px" : "11px",
                    cursor: 'pointer',


                }}
                    key={i}>
                    <DetailedLiveHistory isDesktop={isDesktop} info={info}
                        name={name} map={map} />

                    <button style={restingStyle} onMouseEnter={buttonHover}
                        onMouseLeave={buttonLeave} onMouseDown={showLive}>Live</button>
                    <div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
                    }} onMouseDown={() => {
                        setSearchName(name)
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(217,163,58,0.8)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3 style = {{
                            color:color
                        }}>{name.length > 9? `${name.substring(0,9)}.` : name}</h3>

                    </div>
                    <div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
                    }} onMouseDown={() => {
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons={game_weapons} player_weapons={player_weapons} name={name} cellWidth={cellWidth} isDesktop={isDesktop} />
                        )
                    }} onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)'
                    }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{kills}</h3>

                    </div><div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
                    }} onMouseDown={() => {
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons={game_weapons} player_weapons={player_weapons} name={name} cellWidth={cellWidth} isDesktop={isDesktop} />
                        )
                    }} onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)'
                    }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{deaths}</h3>

                    </div><div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
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
function populateSiegeRow(team, cellWidth, setWeaponBreakdown, game_weapons, setSearchName, isDesktop, liveGame,
    map, isDisconnect) {

    const header = <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: "rgba(190, 177, 54, 1)",
        borderBottom: '2px solid rgb(251, 245, 180)',
        fontSize: isDesktop ? "28px" : "11px",
        cursor: 'pointer',
        paddingLeft: "50px",

    }}
        key={-1}>
        <div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>NAME</h3>

        </div>
        <div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>KILLS</h3>

        </div><div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>DEATHS</h3>

        </div><div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>BASE DMG</h3>

        </div><div style={{
            width: `${cellWidth}px`,
            textAlign: 'center'
        }}>
            <h3>NODES</h3>

        </div>

    </div>
    function populate(team) {
        let row = [header]
        for (let i = 0; i < team.length; i++) {
            const name = team[i]['username']
            const base_dmg = team[i]['base_dmg']
            const nodes = team[i]['nodes']
            const player_weapons = team[i]['weapons']
            let ref = createRef()
            const showLive = (e) => {
                ref.current.children[0].style.visibility = "visible"
            }
            const info = liveGame != null && liveGame['results'][name.toLowerCase()]['medals'] != undefined ? liveGame['results'][name.toLowerCase()] : null
            const kills = isDisconnect == true && info != null ? info['kills'] : team[i]['kills'] 
            const deaths = isDisconnect == true && info != null ? info['deaths'] : team[i]['deaths'] 
            const color = info != null ? info['team'] :  "rgb(141,113,24)"
            row.push(
                <div ref={ref} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    backgroundColor: "rgba(190, 177, 54, 0.8)",
                    paddingLeft: "10px",
                    borderBottom: '2px solid rgb(251, 245, 180)',
                    fontSize: isDesktop ? "25px" : "11px",



                }}
                    key={i}>
                    <DetailedLiveHistory isDesktop={isDesktop} info={info}
                        name={name} map={map} />

                    <button style={restingStyle} onMouseEnter={buttonHover}
                        onMouseLeave={buttonLeave} onMouseDown={showLive}>Live</button>
                    <div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
                    }} onMouseDown={() => {
                        setSearchName(name)
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(217,163,58,0.8)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3 style = {{
                            color:color
                        }}>{name.length > 9? `${name.substring(0,9)}.` : name}</h3>

                    </div>
                    <div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
                    }} onMouseDown={() => {
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons={game_weapons} player_weapons={player_weapons} name={name} cellWidth={cellWidth} isDesktop={isDesktop} />
                        )
                    }} onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)'
                    }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{kills}</h3>

                    </div><div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
                    }} onMouseDown={() => {
                        setWeaponBreakdown(
                            <PlayerGameWeaponTable game_weapons={game_weapons} player_weapons={player_weapons} name={name} cellWidth={cellWidth} isDesktop={isDesktop} />
                        )
                    }} onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(217,163,58,0.8)'
                    }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                        }}>
                        <h3>{deaths}</h3>

                    </div><div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
                    }}>
                        <h3>{base_dmg}</h3>

                    </div><div style={{
                        width: `${cellWidth}px`,
                        textAlign: 'center'
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


export { populateCTFRow, populateDMRow, populateSiegeRow }