import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { useMediaQuery } from 'react-responsive'
import { GetLargeMap, GetHalfLargeMap, getSpecifiedMap } from "./extras.js";
import { HomeButton } from "./HomeButton.js";
import { populateCTFRow, populateDMRow, populateSiegeRow } from "./populateRows.js";

const DEBUG = false
var address = null
if (DEBUG == true) {
    address = "http://127.0.0.1:5000"
}
else {
    address = "https://uyatracker.herokuapp.com/"
}

function DetailedGame(props) {
    let [map, changeMap] = useState(GetLargeMap())
    let [searchName, setSearchName] = useState(null)
    let [goBack, setBack] = useState(null)

    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
    });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const game_id = urlParams.get('id')
    let [game, setGame] = useState(null)
    let [weaponBreakdown, setWeaponBreakdown] = useState(null)

    async function getGameDetails(game_id) {
        const requestSearch = {
            method: "POST",
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
            body: JSON.stringify({
                id: game_id
            }),
        }
        const res = await fetch(`${address}/api/games/details`, requestSearch)
        const gameInfo = await res.json()
        setGame(gameInfo)
    }

    if (game == null) {
        getGameDetails(game_id)
        return <div style={{
            background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                url(${map})`,
            fontFamily: "Roboto, sans-serif",
            height: '100vh'
        }}>
            <HomeButton />


            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>

                <h1 style={{
                    fontSize: "75pt",
                    textAlign: "center",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '6px 4px 4px black',
                    cursor: 'pointer'

                }} onMouseDown={
                    () => {
                        setBack(true)
                    }
                }
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = 'rgb(141,113,24)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgb(229, 197, 102)'
                    }}>GAME HISTORY</h1>
            </div>
            <div style = {{
                position:'fixed',
                top:"50%",
                left:"50%",
                transform :"translate(-50%, -50%)",
                maxHeight:'250px',
                minHeight:'250px',
            }}>
                <img src = "../../static/images/loading_circle.gif"
                height = '253' width = '255'></img>
            </div>
        </div>
    }
    const cellWidth = isDesktop ? 250 : 80
    let mode = 0
    let winners = []
    let losers = []
    let disconnects = []

    let tie = []
    if (game['gamemode'] == "CTF") {
        winners = populateCTFRow(game['game_results']['winners'], cellWidth, setWeaponBreakdown, game['weapons'], setSearchName, isDesktop, game['liveGame'], game['map'], false)
        losers = populateCTFRow(game['game_results']['losers'], cellWidth, setWeaponBreakdown, game['weapons'], setSearchName, isDesktop, game['liveGame'], game['map'], false)
        disconnects = 'disconnect' in game['game_results'] ? populateCTFRow(game['game_results']['disconnect'], cellWidth, setWeaponBreakdown, game['weapons'], setSearchName, isDesktop, game['liveGame'], game['map'], true) : null
        mode = 5
        if (winners.length == 1 && losers.length == 1) {
            tie = populateCTFRow(game['game_results']['tie'], cellWidth, setWeaponBreakdown, game['weapons'], setSearchName, isDesktop, game['liveGame'], game['map'], false, true)
        }
    }
    else if (game['gamemode'] == 'Siege') {
        winners = populateSiegeRow(game['game_results']['winners'], cellWidth, setWeaponBreakdown, game['weapons'], setSearchName, isDesktop, game['liveGame'], game['map'])
        losers = populateSiegeRow(game['game_results']['losers'], cellWidth, setWeaponBreakdown, game['weapons'], setSearchName, isDesktop, game['liveGame'], game['map'])
        disconnects = 'disconnect' in game['game_results'] ? populateSiegeRow(game['game_results']['disconnect'], cellWidth, setWeaponBreakdown, game['weapons'], setSearchName, isDesktop, game['liveGame'], game['map']) : null
        mode = 5
    }
    else {
        winners = populateDMRow(game['game_results']['winners'], cellWidth, setWeaponBreakdown, game['weapons'], setSearchName, isDesktop, game['liveGame'], game['map'])
        losers = populateDMRow(game['game_results']['losers'], cellWidth, setWeaponBreakdown, game['weapons'], setSearchName, isDesktop, game['liveGame'], game['map'])
        disconnects = 'disconnect' in game['game_results'] ? populateDMRow(game['game_results']['disconnect'], cellWidth, setWeaponBreakdown, game['weapons'], setSearchName, isDesktop, game['liveGame'], game['map']) : null

        mode = 3
    }
    if (searchName != null) {
        const redirect = "/players" + "?name=" + encodeURIComponent(searchName)
        return <Redirect push to={redirect} />
    }
    if (goBack != null) {
        let redirect = "/gamehistory"
        return <Redirect push to={redirect} />
    }   
    // console.log(game)     
    let firstWinner = game['game_results']["winners"].length > 0 ? game['game_results']['winners'][0]['username'] : null
    let winningColor = game['liveGame'] != null && firstWinner != null ? game['liveGame'][firstWinner.toLowerCase()]['team'] : null

    if (isDesktop) {



        return (
            <div style={{
                background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily: "Roboto, sans-serif",
                height: '100vh',
            }}>
                <HomeButton />


                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <h1 style={{
                        fontSize: "75pt",
                        textAlign: "center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
                        cursor: 'pointer'

                    }} onMouseDown={
                        () => {
                            setBack(true)
                        }
                    }
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = 'rgb(141,113,24)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgb(229, 197, 102)'
                        }}>GAME HISTORY</h1>
                </div>

                <div style={{
                    marginTop: '30px',
                    fontSize: "30pt",
                    textAlign: "center",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '6px 4px 4px black',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'


                }}>
                    <h2>{game['map'].replace("_", " ")}</h2>
                    <h2>{game['gamemode']}</h2>
                    <h2>{game['date']}</h2>

                </div>

                <div style={{
                    marginTop: '30px',
                    fontSize: "30pt",
                    textAlign: "center",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '6px 4px 4px black',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'


                }}>
                    <h2>{`TIME: ${game['minutes']} Minutes`}</h2>
                    <h2>{`SCORE: ${game['game_results']['winner_score']}-${game['game_results']['loser_score']}`}</h2>

                </div>



                <div style={{
                    marginTop: '35px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: `${cellWidth * mode}px`,
                    color: 'rgb(141,113,24)',
                    textShadow: "1px 1px 1px black",
                    fontWeight: "bolder",

                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div>
                            <h4 style={{ color: 'rgb(229, 197, 102)' }}>{winners.length > 1 && game['liveGame'] != null ? `Winning Team: ${winningColor.toUpperCase()}` : "Tie Game"}</h4>
                            <div style={{
                                border: "4px solid rgb(141,113,24)",

                            }}>
                                {winners.length > 1 ? winners : tie}

                            </div>
                        </div>

                        {losers.length == 1 ? null : <div style={{
                            marginTop: '50px'
                        }}>
                            <h4 style={{ color: 'rgb(229, 197, 102)' }}>{losers.length > 1 ? "Losing Team" : null}</h4>
                            <div style={{
                                border: "4px solid rgb(141,113,24)",

                            }}>
                                {losers.length > 1 ? losers : null}


                            </div>
                        </div>}

                        {disconnects == null ? null : <div style={{
                            marginTop: '50px',

                        }}>
                            {disconnects != null ? <h4 style={{ color: 'rgb(229, 197, 102)' }}>Disconnects</h4> : null}
                            <div style={{
                                border: "4px solid rgb(141,113,24)",

                            }}>
                                {disconnects != null ? disconnects : null}


                            </div>
                        </div>}

                        <div style={{
                            marginTop: '50px',
                            display: 'flex',
                            justifyContent: 'center'

                        }}>
                            {weaponBreakdown == null ? <div /> : weaponBreakdown}
                        </div>

                    </div>

                </div>
            </div>

        )
    }
    else {
        return (
            <div style={{
                background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily: "Roboto, sans-serif",
                height: '1100px',
                width:"410px"
            }}>
                <HomeButton />


                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <h1 style={{
                        fontSize: "30pt",
                        textAlign: "center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',


                    }} onMouseDown={
                        () => {
                            setBack(true)
                        }
                    } onMouseOver={(e) => {
                        e.currentTarget.style.color = 'rgb(141,113,24)'
                    }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgb(229, 197, 102)'
                        }}>GAME HISTORY</h1>
                </div>

                <div style={{
                    marginTop: '30px',
                    fontSize: "15pt",
                    textAlign: "center",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '6px 4px 4px black',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'


                }}>
                    <h2>{game['map'].replace("_", " ")}</h2>
                    <h2>{game['date']}</h2>

                </div>
                <div style={{
                    marginTop: '30px',
                    fontSize: "15pt",
                    textAlign: "center",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '6px 4px 4px black',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',


                }}>
                    <h2>{game['gamemode']}</h2>
                    <h2>{`TIME: ${game['minutes']} Minutes`}</h2>


                </div>

                <div style={{
                    marginTop: '30px',
                    fontSize: "15pt",
                    textAlign: "center",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '6px 4px 4px black',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'


                }}>
                    <h2>{`SCORE: ${game['game_results']['winner_score']}-${game['game_results']['loser_score']}`}</h2>

                </div>



                <div style={{
                    marginTop: '35px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: `${cellWidth * mode}px`,
                    color: 'rgb(141,113,24)',
                    textShadow: "1px 1px 1px black",
                    fontWeight: "bolder",

                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',

                    }}>
                        <div>
                            <h4 style={{ color: 'rgb(229, 197, 102)' }}>{winners.length > 1 && game['liveGame'] != null ? `Winning Team: ${winningColor.toUpperCase()}` : "Tie Game"}</h4>
                            <div style={{
                                border: "4px solid rgb(141,113,24)",

                            }}>
                                {winners.length > 1 ? winners : tie}

                            </div>
                        </div>

                        {losers.length == 1 ? null : <div style={{
                            marginTop: '50px'
                        }}>
                            <h4 style={{ color: 'rgb(229, 197, 102)' }}>{losers.length > 1 ? "Losing Team" : null}</h4>
                            <div style={{
                                border: "4px solid rgb(141,113,24)",

                            }}>
                                {losers.length > 1 ? losers : null}


                            </div>
                        </div>}

                        {disconnects == null ? null : <div style={{
                            marginTop: '50px',

                        }}>
                            {disconnects != null ? <h4 style={{ color: 'rgb(229, 197, 102)' }}>Disconnects</h4> : null}
                            <div style={{
                                border: "4px solid rgb(141,113,24)",

                            }}>
                                {disconnects != null ? disconnects : null}


                            </div>
                        </div>}

                        <div style={{
                            marginTop: '25px',
                            display: 'flex',
                            justifyContent: 'center'

                        }}>
                            {weaponBreakdown == null ? <div /> : weaponBreakdown}
                        </div>

                    </div>

                </div>

            </div>

        )
    }


}

export { DetailedGame }