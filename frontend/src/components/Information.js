import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { GetLargeMap, GetHalfLargeMap } from "./extras.js";
import { statList, stat_keys } from "./extras.js";
import { HomeButton } from './HomeButton'
import { useMediaQuery } from 'react-responsive'
import { AnalyticChart } from "./AnalyticChart.js";
import { AnalyticsCategory } from "./AnalyticsCategory.js";
import { LiveMap } from "./LiveMap.js";
import { LiveEvents } from "./LiveEvents.js";
import { LivePlayer } from "./LivePlayer.js";
import { LivePlayerStates } from "./LivePlayerStates.js";
const DEBUG = false
var address = null
if (DEBUG == true) {
    address = "http://127.0.0.1:5000"
}
else {
    address = "https://uyatracker.herokuapp.com"
}


function Information(props) {
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
    });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });   
    const isTooLarge = useMediaQuery({
        query: "(min-height:2000px)"
    })
    let [map, changeMap] = useState(GetLargeMap())
    let myStorage = window.localStorage;
    myStorage.clear()
    let [home, goHome] = useState(null)
    const returnHome = () => {
        goHome(true)
    }
    const spacing = {
        marginTop: "30px"
    }
    if (home != null) {
        const redirect = "/leaderboards"
        return <Redirect push to={redirect} />
    }

    else {


        return (
            <div style={{
                background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily: "Roboto, sans-serif",
                height: isDesktop ? isTooLarge ? "100vh" : "100"
                : '1500px' //mobile


            }}>
                <HomeButton />
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: 'column'

                }}>

                    <h1 style={{
                        fontSize: isDesktop ? "75pt" : "35pt",
                        textAlign: "center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',


                    }}>Information</h1>

                    <div style={{
                        color: 'rgb(229, 197, 102)',
                        fontSize: isDesktop ? '20pt' :"14pt",
                        letterSpacing: "-1.5px",
                        borderCollapse: "collapse",
                        fontWeight: "bolder",
                        textShadow: isDesktop ? "3px 3px 3px black" : "2px 2px 2px black",
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        textAlign: "center"
                    }}>
                        <div>
                            <marquee scrollamount="10">Welcome to UYA Online Revival!</marquee>

                        </div>


                        <div style={{
                            paddingLeft: "20%",
                            paddingRight: "20%"
                        }}>
                            <p style={spacing}>Ratchet and Clank: Up Your Arsenal has been brought back to life. In 2021 the servers were brought back to life by the fans
                                and are available for all to play on PS2 and even PC emulators.
                            </p>

                            <p style={spacing}>Not only has the vanilla experience been restored, the game has been modded and retrofitted to be more modern aswell.
                                This includes things like discord commands, this website, and even new in game features.
                            </p>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: "center",
                            }}>
                                <iframe width= {isDesktop ? "600" : "300"} height={isDesktop ? "300" : "150"} src="https://www.youtube.com/embed/0jjPfo1uiVE" title="UYA Online: Custom Maps" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                            </div>


                            <p style={spacing}>UYATracker also allows for viewing of stats that were never around on the vanilla game such as killstreaks, game histories, and live viewing to name a few.</p>
                            <p style={spacing}>All thats needed to play on PS2 is the original setup. Navigate to the network settings and change the DNS address to: <code>107.155.81.113</code></p>

                            <p style={spacing}>Join the discord!</p>
                            <div style={spacing}>
                                <iframe src="https://discord.com/widget?id=357568581178884107&theme=dark" width={isDesktop ? "300" : "250"} height={isDesktop ? "500" : "500"} allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                            </div>

                        </div>


                    </div>
                </div>

            </div>


        )
    }







}

export { Information }