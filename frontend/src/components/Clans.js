import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { GetLargeMap, GetHalfLargeMap } from "./extras.js";
import { HomeButton } from './HomeButton'
import { useMediaQuery } from 'react-responsive'
import { ScrollableList } from "./general/ScrollableList.js";
import { ClanInformation } from "./ClanInformation.js";
import { Dropdown } from "./general/Dropdown.js";
const DEBUG = false
var address = null
if (DEBUG == true) {
    address = "http://127.0.0.1:5000"
}
else {
    address = "https://uyatracker.herokuapp.com"
}


function Clans(props) {
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
    });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [map, changeMap] = useState(GetLargeMap())

    let [currentClan, searchClan] = useState("Smokers")
    let [clans, setClans] = useState(null)
    let [isRealClans, setRealClans] = useState(false)

    async function getClans() {
        const requestSearch = {
            method: "GET",
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
        }
        const search_result = await fetch(`${address}/api/clans/all`, requestSearch)
        if (search_result.status == 200) {
            setClans(await search_result.json())
        }
    }
    async function getRealClans() {
        const requestSearch = {
            method: "GET",
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
        }
        const search_result = await fetch(`${address}/api/clans/all/real`, requestSearch)
        if (search_result.status == 200) {
            setClans(await search_result.json())
        }
    }

    const toggleClanType = () => {

        if (!isRealClans) {
            getRealClans()
            setRealClans(true)
        }
        else {
            getClans()
            setRealClans(false)
        }

    }

    if (clans == null) {
        getClans()
        return (<div style={{
            position: 'fixed',
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "8pt solid rgb(92, 73, 0)",
            maxHeight: isDesktop ? '250px' : "80px",
            minHeight: isDesktop ? '250px' : "80px"
        }}>
            <img src="../../static/images/loading_circle.gif"
                height={isDesktop ? '250px' : "80px"} width={isDesktop ? '250px' : "80px"}></img>
        </div>)

    }
    if (isDesktop) {
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


                    }}>Clans</h1>
                </div>


                <div className="flex-row" style={{
                    color: 'rgb(141,113,24)',
                    fontSize: '20pt',
                    letterSpacing: "-1.5px",
                    borderCollapse: "collapse",
                    fontWeight: "bolder",
                    textShadow: "1px 1px 1px black",
                    justifyContent: "space-evenly"
                }}>
                    <div>
                        <label className="radio-text">
                            <input
                                type="checkbox"
                                checked={isRealClans}
                                onChange={toggleClanType}
                            />
                            Real Clans Only
                        </label>
                        <ScrollableList isDesktop={isDesktop} title="Clans" listMembers={clans.clans} handleClick={searchClan} listLength={20} />
                    </div>
                    <ClanInformation currentClan={currentClan} isDesktop={isDesktop} address={address} />
                </div >

            </div>


        )
    }
    else {
        return (
            <div style={{
                background: `linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily: "Roboto, sans-serif",
                height: "1000px"


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


                    }}>Clans</h1>
                </div>


                <div className="flex-list" style={{
                    color: 'rgb(141,113,24)',
                    fontSize: '14pt',
                    letterSpacing: "-1.5px",
                    borderCollapse: "collapse",
                    fontWeight: "bolder",
                    textShadow: "1px 1px 1px black",
                    justifyContent: "space-evenly",
                    marginTop: "25px"
                }}>
                    <div className="flex-list">
                        <label className="center radio-text-mobile">
                            <input
                                type="checkbox"
                                checked={isRealClans}
                                onChange={toggleClanType}
                            />
                            Real Clans Only
                        </label>
                        <Dropdown title="" values={clans.clans} handleClick={searchClan} />
                    </div>
                    <ClanInformation currentClan={currentClan} isDesktop={isDesktop} address={address} />

                </div >

            </div>


        )
    }








}

export { Clans }