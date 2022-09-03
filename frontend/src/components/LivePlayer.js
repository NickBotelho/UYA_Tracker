import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import { GetLargeMap, GetHalfLargeMap } from "./extras.js";
import { HomeButton } from './HomeButton'
import { useMediaQuery } from 'react-responsive'
import { LiveLoadout } from "./LiveLoadout.js";
import { LiveHeatMap } from "./LiveHeatMap.js";

//<img src={`data:image/png;base64,${this.state.image}`}/>
function LivePlayer(props) {
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
    });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let detailedInfoRef = createRef()
    const toggleOn = (e) => {
        detailedInfoRef.current.style.visibility = "visible"
    }
    const toggleOff = (e) => {
        detailedInfoRef.current.style.visibility = "hidden"

    }
    console.log()
    if (props.isDesktop) {
        return (
            <div style={{
                height: props.isDesktop ? '225px' : '75px',
                width: props.isDesktop ? '250px' : '125px',
                marginTop: props.isDesktop ? '0' : '10px',
                marginBottom: props.isDesktop ? '0' : '15px'
            }}>
                <div style={{
                    fontSize: props.isDesktop ? "18pt" : "9pt",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '2px 2px 2px black',
                }}onMouseOver={toggleOn} onMouseLeave={toggleOff}
                >
                    <h3 style={{ color: props.player.team }} >{props.player.name}</h3>
                    <div ref={detailedInfoRef}
                        style={{
                            marginTop: '10px',
                            height: props.isDesktop ? '300px' : '75px',
                            width: props.isDesktop ? '525px' : '125px',
                            borderColor: "black",
                            border: '1px solid rgb(144,99,30)',
                            textAlign: "right",
                            background: `rgb(118,83,25)`,
                            color: "rgb(225,218,113)",
                            textShadow: '2px 2px 2px black',
                            fontSize: props.isDesktop ? "18pt" : '12pt',
                            visibility: "hidden",
                            zIndex: "10",
                            position: "absolute",
                            display: 'flex',
                            flexDirection: 'row',
                            left:'0%',
                            top:'0%'
                        }}>
                        <div>
                            <LiveHeatMap map={props.map} kills={props.player.killHeatMap} deaths={props.player.deathHeatMap} isDesktop={props.isDesktop} />
                        </div>
                        <div style={{
                            height: props.isDesktop ? '300px' : '100px',
                            width: props.isDesktop ? '1000px' : '333px',
                            fontSize: props.isDesktop ? '18t' : '10pt'
                        }}
                        >
                            <p>Distance Travelled: {props.player.distance_travelled}</p>
                            <p>Flags Captured: {props.player.caps}</p>
                            <p>Flag Pickups: {props.player.flag_pickups}</p>
                            <p>Flag Drops: {props.player.flag_drops}</p>
                            <p>HP Boxes Grabbed: {props.player.health_boxes}</p>
                            <p>Niks Given: {props.player.nicks_given}</p>
                            <p>Niks Received: {props.player.nicks_received}</p>
                            <p>Total Damage Taken: {props.player.damage_taken} </p>
                            <p>Current Killstreak: {props.player.killstreak} </p>
                            <p>Best Killstreak: {props.player.bestKillstreak} </p>
                        </div>

                    </div>
                </div>

                <div style={{
                    height: props.isDesktop ? '40px' : '20px',
                    width: props.isDesktop ? '250px' : '125px',
                    borderColor: "black",
                    border: '2px solid rgb(144,99,30)',
                    textAlign: "center",
                    background: `linear-gradient(to right,  rgb(198,151,64) 0%,rgb(198,151,64) ${props.player.hp}%,rgb(118,83,25) ${props.player.hp}%,rgb(118,83,25) 100%)`,
                    color: "rgb(225,218,113)",
                    textShadow: '2px 2px 2px black',
                    fontSize: props.isDesktop ? "24pt" : '12pt'
                }}>
                    {`${props.player.hp}/100`}
                </div>

                <div style={{
                    fontSize: props.isDesktop ? "15pt" : "9pt",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '2px 2px 2px black',
                    display: "flex",
                    flexDirection: "row",

                }}>
                    <h3>{`Kills: ${props.player.kills}`}</h3>
                    <h3 style={{ marginLeft: '25px' }}>{`Deaths: ${props.player.deaths}`}</h3>
                </div>
                <LiveLoadout weapons={props.player.weapons} isDesktop={props.isDesktop} isCycle = {Object.entries(props.player.weapons).length - 3 <= 4}/>


            </div>
        )
    } else {
        return (
            <div style={{
                height: props.isDesktop ? '150px' : '75px',
                width: props.isDesktop ? '250px' : '125px',
                marginTop: props.isDesktop ? '0' : '10px',
                marginBottom: props.isDesktop ? '0' : '15px'
            }}>
                <div style={{
                    fontSize: props.isDesktop ? "18pt" : "9pt",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '2px 2px 2px black',
                }}
                >
                    <h3 style={{ color: props.player.team }} onMouseOver={toggleOn} onMouseLeave={toggleOff}>{props.player.name}</h3>
                    <div ref={detailedInfoRef}
                        style={{
                            marginTop: '10px',
                            height: props.isDesktop ? '300px' : '75px',
                            width: props.isDesktop ? '525px' : '125px',
                            borderColor: "black",
                            border: '1px solid rgb(144,99,30)',
                            textAlign: "right",
                            background: `rgb(118,83,25)`,
                            color: "rgb(225,218,113)",
                            textShadow: '2px 2px 2px black',
                            fontSize: props.isDesktop ? "18pt" : '12pt',
                            visibility: "hidden",
                            zIndex: "10",
                            position: "absolute",
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                        <div>
                            <LiveHeatMap map={props.map} kills={props.player.killHeatMap} deaths={props.player.deathHeatMap} isDesktop={props.isDesktop} isCycle = {Object.entries(props.player.weapons).length - 3 <= 4}/>
                        </div>


                    </div>
                </div>

                <div style={{
                    height: props.isDesktop ? '40px' : '20px',
                    width: props.isDesktop ? '250px' : '125px',
                    borderColor: "black",
                    border: '2px solid rgb(144,99,30)',
                    textAlign: "center",
                    background: `linear-gradient(to right,  rgb(198,151,64) 0%,rgb(198,151,64) ${props.player.hp}%,rgb(118,83,25) ${props.player.hp}%,rgb(118,83,25) 100%)`,
                    color: "rgb(225,218,113)",
                    textShadow: '2px 2px 2px black',
                    fontSize: props.isDesktop ? "24pt" : '12pt'
                }}>
                    {`${props.player.hp}/100`}
                </div>

                <div style={{
                    fontSize: props.isDesktop ? "15pt" : "9pt",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '2px 2px 2px black',
                    display: "flex",
                    flexDirection: "row",

                }}>
                    <h3>{`Kills: ${props.player.kills}`}</h3>
                    <h3 style={{ marginLeft: '25px' }}>{`Deaths: ${props.player.deaths}`}</h3>
                </div>
                <LiveLoadout weapons={props.player.weapons} isDesktop={props.isDesktop} />


            </div>
        )
    }

}

export { LivePlayer }