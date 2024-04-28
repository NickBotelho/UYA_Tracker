import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import { GetLargeMap, GetHalfLargeMap } from "./extras.js";
import { HomeButton } from './HomeButton'
import { useMediaQuery } from 'react-responsive'
import { LiveMap } from "./LiveMap.js";
import { LiveEvents } from "./LiveEvents.js";
import { LivePlayerStates } from "./LivePlayerStates.js";
import { LiveScore } from "./LiveScore.js";
import { LiveInfo } from "./LiveInfo.js";
import { LiveSettings } from "./LiveSettings.js";
import online_circle from '../../static/images/online_circle.png';

const DEBUG = false
var address = null
if (DEBUG==true){
    address = "https://localhost:7139"
}
else {
    address = "http://216.146.25.171"
}

const REFRESH_TIME = 250
function LiveGame(props) {
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
    });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [map, changeMap] = useState(GetLargeMap())
    let [games, loadGames] = useState(null)
    let [gameInfo, updateGameInfo] = useState(null)
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const game_id = urlParams.get('id')
    const [gameState, setGameState] = useState(null);
    //////////SETTINGS
    const [isFullscreen, toggleFullscreen] = useState(false);
    const [isBigMap, toggleBigMap] = useState(false);
    const [hasPlayerInformation, togglePlayerInformation] = useState(true);
    const [hasEventFeed, toggleEventFeed] = useState(true);
    const handleFullscreen = () => {
        toggleFullscreen(isFullscreen == true ? false : true);
        toggleBigMap(false)
        togglePlayerInformation(false)
        toggleEventFeed(false)
    };
    const handlePlayerInformation = () => {
        toggleFullscreen(false)
        togglePlayerInformation(hasPlayerInformation == true ? false : true)
    }
    const handleEventFeed = () => {
        toggleFullscreen(false)
        toggleBigMap(false)
        toggleEventFeed(hasEventFeed == true ? false : true)
    }
    const handleBigMap = () => {
        toggleFullscreen(false)
        toggleBigMap(isBigMap ? false : true)
        toggleEventFeed(false)
    }
    //////////////////

    useEffect(() => {
        const ws = new WebSocket(`ws://${DEBUG == true ? "localhost" : "216.146.25.171"}:5001`);
    
        // Event handler for when the connection is established
        ws.onopen = () => {
          //console.log('Connected to the WebSocket server');
        };
    
        // Event handler for incoming messages
        ws.onmessage = event => {
          const message = event.data;
          try {
            const parsedData = JSON.parse(message);
            // Now you can work with the parsed JSON data
            if (parsedData.GameId == game_id){
                setGameState(parsedData);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        };
    
        // Event handler for connection errors
        ws.onerror = error => {
          console.error('WebSocket error:', error);
        };
    
        // Event handler for when the connection is closed
        ws.onclose = () => {
          //console.log('Connection to WebSocket server closed');
        };
    
        // Clean up the WebSocket connection on component unmount
        return () => {
          ws.close();
        };
      }, []);

      function handleDmeMessage(message){
        return (
            <div style={{
                background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily: "Roboto, sans-serif",
                height: isFullscreen || isBigMap ? `${window.innerHeight + 0.3 * window.innerHeight}px`
                    : isDesktop ? '100vh' : '1200px'


            }}>
                <HomeButton />
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <h1 style={{
                        fontSize: isDesktop ? "75pt" : "35pt",
                        textAlign: "center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',


                    }}>Live Game</h1>
                    <LiveSettings isFullscreen={isFullscreen} handleFullscreen={handleFullscreen}
                        hasPlayerInformation={hasPlayerInformation} handlePlayerInformation={handlePlayerInformation}
                        hasEventFeed={hasEventFeed} handleEventFeed={handleEventFeed}
                        isBigMap={isBigMap} handleBigMap={handleBigMap} />
                </div>


                <div style={{
                    color: 'rgb(141,113,24)',
                    fontSize: '20pt',
                    letterSpacing: "-1.5px",
                    borderCollapse: "collapse",
                    fontWeight: "bolder",
                    textShadow: "1px 1px 1px black",
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: "space-evenly"
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: "space-evenly",
                        flexDirection: 'column'
                    }}>
                        <LiveMap
                            address={address}
                            isDesktop={isDesktop}
                            dme_id={gameInfo.DmeId}
                            refresh={REFRESH_TIME}
                            map={gameInfo.map}
                            gamemode={gameInfo.gamemode}
                            isFullscreen={isFullscreen}
                            isBigMap={isBigMap}
                            message={message} />
                            

                        <LiveScore
                            address={address}
                            isDesktop={isDesktop}
                            dme_id={gameInfo.DmeId}
                            refresh={REFRESH_TIME}
                            isFullscreen={isFullscreen}
                            isBigMap={isBigMap}
                            message={message} />
                    </div>
                    <LivePlayerStates
                        address={address}
                        isDesktop={isDesktop}
                        dme_id={gameInfo.DmeId}
                        refresh={REFRESH_TIME}
                        map={gameInfo.map}
                        isFullscreen={isFullscreen}
                        hasPlayerInformation={hasPlayerInformation}
                        message={message}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: "space-evenly",
                        flexDirection: 'column'
                    }}>
                        <LiveEvents
                            address={address}
                            isDesktop={isDesktop}
                            dme_id={gameInfo.DmeId}
                            refresh={REFRESH_TIME}
                            isFullscreen={isFullscreen}
                            hasEventFeed={false}
                            isBigMap={isBigMap}
                        />
                        <LiveInfo
                            info={gameInfo}
                            address={address}
                            isDesktop={isDesktop}
                            dme_id={gameInfo.DmeId}
                            refresh={REFRESH_TIME}
                            isFullscreen={isFullscreen}
                            hasEventFeed={hasEventFeed}
                            isBigMap={isBigMap} />

                    </div>
                </div>


            </div>
        )
    }
    let [home, goHome] = useState(null)
    const returnHome = () => {
        goHome(true)
    }
    if (home != null) {
        const redirect = "/leaderboards"
        return <Redirect push to={redirect} />
    }
    async function getGames() {
        //console.log(gameInfo)
        const requestSearch = {
            method: "GET",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache",
                'Access-Control-Allow-Origin': '*',
                'origin':'null'
            },
        }
        const search_result = await fetch(`${address}/api/online/games`, requestSearch)
        // const dme_result = await fetch(`${address}/api/live/available`, requestSearch)
        // let dmes = await dme_result.json()
        // dmes = JSON.parse(dmes)

        let games = await search_result.json()
        games = JSON.parse(games)
        //console.log(games)
        for (let i = 0; i < games.length; i += 1) {
            if (games[i]['game_id'].toString() == game_id.toString()) {
                updateGameInfo(
                    games[i]
                    // dme: dmes
                )
            }
        }
        return games
    }

    if (gameInfo == null) {
        getGames()
    }
    if (gameInfo == null) {
        return <div style={{
            background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
            url(${map})`,
            position: 'fixed',
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "8pt solid rgb(92, 73, 0)",
            maxHeight: '250px',
            minHeight: '250px',
        }}>
            <img src="../../server/build//loading_circle.gif"
                height='253' width='255'></img>
        </div>
    }


    if (gameInfo == null) {
        return <div style={{
            background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
            url(${map})`,
            position: 'fixed',
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "8pt solid rgb(92, 73, 0)",
            maxHeight: '250px',
            minHeight: '250px',
        }}>
            <HomeButton />
            <img src="../../server/build//loading_circle.gif"
                height='253' width='255'></img>
        </div>
    }

    let players = gameInfo.players
    let playerString = ''
    for (let i = 0; i < players.length; i += 1) {
        playerString += players[i] + "\n"
    }
    if (gameInfo.status == "Staging") {


        return (
            <div style={{
                background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily: "Roboto, sans-serif",
                height: isDesktop ? '100vh' : '750px'


            }}>
                <HomeButton />
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>

                    <h1 style={{
                        fontSize: isDesktop ? "75pt" : "35pt",
                        textAlign: "center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',


                    }}>{`${gameInfo.host}'s Game`}</h1>
                </div>

                {/* Details about the game */}
                <div style={{
                    color: 'rgb(141,113,24)',
                    fontSize: '20pt',
                    letterSpacing: "-1.5px",
                    borderCollapse: "collapse",
                    fontWeight: "bolder",
                    textShadow: "1px 1px 1px black",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly'
                }}>
                    <div style={{
                        marginTop: '30px',
                        fontSize: "30pt",
                        textAlign: "center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'


                    }}>
                        <h2 style={{
                            marginBottom: '25px'
                        }}>Details</h2>
                        <h4>{`Status: ${gameInfo.status.replace("_", " ")}`}</h4>
                        <h4>{`Map: ${gameInfo.map.replace("_", " ")}`}</h4>
                        <h4>{`Mode: ${gameInfo.gamemode.replace("_", " ")}`}</h4>
                        <h4>{`Weapons: ${gameInfo.weapons.toString()}`}</h4>

                    </div>
                    <div style={{
                        marginTop: '70px',
                        fontSize: "30pt",
                        textAlign: "center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly'


                    }}>
                        {/* <h2 style={{
                            marginBottom: '25px'
                        }}>Players</h2>
                        <h4>{playerString}</h4> */}



                    </div>
                </div>

            </div>


        )
    } else if (gameInfo.status == "InProgress") {
        return (
            <div>
              {gameState ? handleDmeMessage(gameState) : <p>No data yet...</p>}
            </div>
        );




        






        // if (gameInfo.dme.includes(gameInfo.data.dme_id)) {
        //     window.localStorage.clear()
        //     if (isDesktop) {
        //         return (
        //             <div style={{
        //                 background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
        //                     url(${map})`,
        //                 fontFamily: "Roboto, sans-serif",
        //                 height: isFullscreen || isBigMap ? `${window.innerHeight + 0.3 * window.innerHeight}px`
        //                     : isDesktop ? '100vh' : '1200px'


        //             }}>
        //                 <HomeButton />
        //                 <div style={{
        //                     display: "flex",
        //                     justifyContent: "center"
        //                 }}>

        //                     <h1 style={{
        //                         fontSize: isDesktop ? "75pt" : "35pt",
        //                         textAlign: "center",
        //                         color: 'rgb(229, 197, 102)',
        //                         textShadow: '6px 4px 4px black',


        //                     }}>Live Game</h1>
        //                     <LiveSettings isFullscreen={isFullscreen} handleFullscreen={handleFullscreen}
        //                         hasPlayerInformation={hasPlayerInformation} handlePlayerInformation={handlePlayerInformation}
        //                         hasEventFeed={hasEventFeed} handleEventFeed={handleEventFeed}
        //                         isBigMap={isBigMap} handleBigMap={handleBigMap} />
        //                 </div>


        //                 <div style={{
        //                     color: 'rgb(141,113,24)',
        //                     fontSize: '20pt',
        //                     letterSpacing: "-1.5px",
        //                     borderCollapse: "collapse",
        //                     fontWeight: "bolder",
        //                     textShadow: "1px 1px 1px black",
        //                     display: "flex",
        //                     flexDirection: 'row',
        //                     justifyContent: "space-evenly"
        //                 }}>
        //                     <div style={{
        //                         display: 'flex',
        //                         justifyContent: "space-evenly",
        //                         flexDirection: 'column'
        //                     }}>
        //                         <LiveMap
        //                             address={address}
        //                             isDesktop={isDesktop}
        //                             dme_id={gameInfo.data.dme_id}
        //                             refresh={REFRESH_TIME}
        //                             map={gameInfo.data.details.map}
        //                             gamemode={gameInfo.data.details.gamemode}
        //                             isFullscreen={isFullscreen}
        //                             isBigMap={isBigMap} />

        //                         <LiveScore
        //                             address={address}
        //                             isDesktop={isDesktop}
        //                             dme_id={gameInfo.data.dme_id}
        //                             refresh={REFRESH_TIME}
        //                             isFullscreen={isFullscreen}
        //                             isBigMap={isBigMap} />
        //                     </div>
        //                     <LivePlayerStates
        //                         address={address}
        //                         isDesktop={isDesktop}
        //                         dme_id={gameInfo.data.dme_id}
        //                         refresh={REFRESH_TIME}
        //                         map={gameInfo.data.details.map}
        //                         isFullscreen={isFullscreen}
        //                         hasPlayerInformation={hasPlayerInformation}
        //                     />
        //                     <div style={{
        //                         display: 'flex',
        //                         justifyContent: "space-evenly",
        //                         flexDirection: 'column'
        //                     }}>
        //                         <LiveEvents
        //                             address={address}
        //                             isDesktop={isDesktop}
        //                             dme_id={gameInfo.data.dme_id}
        //                             refresh={REFRESH_TIME}
        //                             isFullscreen={isFullscreen}
        //                             hasEventFeed={hasEventFeed}
        //                             isBigMap={isBigMap}
        //                         />
        //                         <LiveInfo
        //                             info={gameInfo.data.details}
        //                             address={address}
        //                             isDesktop={isDesktop}
        //                             dme_id={gameInfo.data.dme_id}
        //                             refresh={REFRESH_TIME}
        //                             isFullscreen={isFullscreen}
        //                             hasEventFeed={hasEventFeed}
        //                             isBigMap={isBigMap} />

        //                     </div>
        //                 </div>


        //             </div>
        //         )
        //     } else {
        //         return (
        //             <div style={{
        //                 background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
        //                     url(${map})`,
        //                 fontFamily: "Roboto, sans-serif",
        //                 height: isDesktop ? '100vh' : '1000px'


        //             }}>
        //                 <HomeButton />
        //                 <div style={{
        //                     display: "flex",
        //                     justifyContent: "center"
        //                 }}>


        //                 </div>


        //                 <div style={{
        //                     color: 'rgb(141,113,24)',
        //                     fontSize: '20pt',
        //                     letterSpacing: "-1.5px",
        //                     borderCollapse: "collapse",
        //                     fontWeight: "bolder",
        //                     textShadow: "1px 1px 1px black",
        //                     display: "flex",
        //                     flexDirection: 'column',
        //                     justifyContent: "center",
        //                 }}>
        //                     <LiveScore address={address} isDesktop={isDesktop} dme_id={gameInfo.data.dme_id} refresh={REFRESH_TIME} />
        //                     <LiveMap address={address} isDesktop={isDesktop} dme_id={gameInfo.data.dme_id} refresh={REFRESH_TIME} map={gameInfo.data.details.map} gamemode={gameInfo.data.details.gamemode} />
        //                     <LivePlayerStates address={address} isDesktop={isDesktop} dme_id={gameInfo.data.dme_id} refresh={REFRESH_TIME} map={gameInfo.data.details.map} isFullscreen={false} hasPlayerInformation={true} />
        //                     {/* <LiveEvents address = {address} isDesktop = {isDesktop} dme_id = {gameInfo.data.dme_id}/> */}
        //                 </div>


        //             </div>
        //         )
        //     }
        // } else {
        //     return (
        //         <div style={{
        //             background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
        //                 url(${map})`,
        //             fontFamily: "Roboto, sans-serif",
        //             height: isDesktop ? '100vh' : '750px'


        //         }}>
        //             <HomeButton />
        //             <div style={{
        //                 display: "flex",
        //                 flexDirection: 'column',
        //                 justifyContent: "center"
        //             }}>

        //                 <h1 style={{
        //                     fontSize: isDesktop ? "75pt" : "35pt",
        //                     textAlign: "center",
        //                     color: 'rgb(229, 197, 102)',
        //                     textShadow: '6px 4px 4px black',


        //                 }}>GAME COULD NOT BE LOADED</h1>
        //                 <h3 style={{
        //                     fontSize: isDesktop ? "45pt" : "25pt",
        //                     textAlign: "center",
        //                     color: 'rgb(229, 197, 102)',
        //                     textShadow: '6px 4px 4px black',
        //                     marginTop: '100px'


        //                 }}>Game needs a few seconds to buffer</h3>
        //                 <h3 style={{
        //                     fontSize: isDesktop ? "45pt" : "25pt",
        //                     textAlign: "center",
        //                     color: 'rgb(229, 197, 102)',
        //                     textShadow: '6px 4px 4px black',
        //                     marginTop: '100px'


        //                 }}>OR</h3>
        //                 <h3 style={{
        //                     fontSize: isDesktop ? "45pt" : "25pt",
        //                     textAlign: "center",
        //                     color: 'rgb(229, 197, 102)',
        //                     textShadow: '6px 4px 4px black',
        //                     marginTop: '100px'


        //                 }}>Sometimes we just miss a few important packets</h3>
        //             </div>
        //         </div>)
        // }


    




    }

}

export { LiveGame }