import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import { GetLargeMap, GetHalfLargeMap } from "./extras.js";
import { statList, stat_keys } from "./extras.js";
import { HomeButton } from './HomeButton'
import { useMediaQuery } from 'react-responsive'
import { PlayersOnline } from './PlayersOnline'
import { GamesOnline } from './GamesOnline'
import { Chat } from './Chat'
import { LiveMap2 } from "./LiveMap.js";
const DEBUG = false
var address = null
if (DEBUG == true) {
    address = "http://127.0.0.1:5000"
}
else {
    address = "http://216.146.25.171"
}


function Medals(props) {

    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
    });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [map, changeMap] = useState(GetLargeMap())



    return (

        <div style={{
            background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                url(${map})`,
            fontFamily: "Roboto, sans-serif",
            height: isDesktop ? '100vh' : '100vh'


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


                }}>Medals</h1>
            </div>


            <div style={{
                color: 'rgb(229, 197, 102)',

                fontSize: isDesktop? '22pt' : "14pt",
                letterSpacing: "-1.5px",
                borderCollapse: "collapse",
                fontWeight: "bolder",
                textShadow: isDesktop? '3px 2px 2px black' : "2px 2px 2px black",

                display: "flex",
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '50px'
            }}>
                <div>
                    <h2>Medal Definitions</h2>
                    <ul>
                        <li>Nuke = 35 Kill streak</li>
                        <li>Brtual = 25 Kill streak</li>
                        <li>Relentless = 20 Kill streak</li>
                        <li>Undying = 15 Kill streak</li>
                        <li>Merciless = 10 Kill streak</li>
                        <li>Bloodthirsty = 5 Kill streak</li>
                        <li>Distributor = 35 Death streak</li>
                        <li>Brutalized = 25 Death streak</li>
                        <li>Thickskull = 15 Death streak</li>
                        <li>Bloodfilled = 5 Death streak</li>
                        <li>Radioactive = A single kill after dropping a nuke on the same life</li>
                        <li>Shify = Getting back to back caps without dying</li>
                        <li>LockOn = Hitting 5 consecutive flux shots on players without missing</li>
                        <li>Juggernaut = Make a jug from scratch in a single life</li>
                        <li>Dropper = Drop the flag and kill a player within 10 seconds</li>
                        <li>RatFuck = Consume 2 packs that contain a v2 in the same life</li>
                        <li>Healthrunner = Consume 5 HP boxes in a single life</li>
                        <li>HeatingUp = Hit 3 flux shots in a row without missing</li>
                        <li>Untouchable = Cap a flag without taking any damage</li>
                        <li>MachineGun = Kill 4 enemies in 15 seconds</li>
                    </ul>
                </div>
            </div>




        </div>
    )



}

export { Medals }