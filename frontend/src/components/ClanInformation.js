import React, { createRef, useState, useCallback } from "react";
import { ClanStatDisplay } from "./ClanStatDisplay";
import { ScrollableList } from "./general/ScrollableList";
import { Redirect } from "react-router";

function ClanInformation(props) {
    const LIST_LENGTH = 9

    let [clanInfo, setClanInfo] = useState(null)
    let [currentMode, setMode] = useState("legacy")
    let [redirectId, setRedirectId] = useState(null)
    let [redirectPlayer, setRedirectPlayer] = useState(null)

    if (redirectId != null) {
        const redirect = "/detailedgame" + "?id=" + encodeURIComponent(redirectId) //redirectt will hoold game id
        return <Redirect push to={redirect} />
    }
    if (redirectPlayer != null) {
        const redirect = "/players" + "?name=" + encodeURIComponent(redirectPlayer) //redirectt will hoold game id
        return <Redirect push to={redirect} />
    }

    async function getClanInfo(clan) {
        const requestSearch = {
            method: "GET",
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
        }
        const search_result = await fetch(`${props.address}/api/clans/${clan}`, requestSearch)
        if (search_result.status == 200) {
            setClanInfo(await search_result.json())
        }

    }
    if (clanInfo == null || props.currentClan != clanInfo?.clanName) {
        getClanInfo(props.currentClan)
        return (<div style={{
            position: 'fixed',
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "8pt solid rgb(92, 73, 0)",
            maxHeight: props.isDesktop ? '675px' : "160px",
            minHeight: props.isDesktop ? '1000px' : "160px"
        }}>
            <img src="../../static/images/loading_circle.gif"
                height={props.isDesktop ? '675px' : "160px"} width={props.isDesktop ? '1000px' : "160px"}></img>
        </div>)

    }
    if (props.isDesktop) {
        return (
            <div className="flex-list" style={{
                border: "4px solid rgb(141, 113, 24)",
                backgroundColor: "rgba(141, 113, 24, 0.3)",
                width: props.isDesktop ? "1000px" : "350px",
                height: props.isDesktop ? "500px" : "300px"
            }}>
                <h2 className="header" style={{ marginBottom: "50px" }}>{props.currentClan}&ensp; [&ensp;{clanInfo.clanTag}&ensp;]&ensp;&ensp;Leader:&ensp;{clanInfo.leader}</h2>

                <div className='flex-row' style={{ justifyContent: "space-evenly" }}>

                    <ScrollableList //CLAN ROSTER
                        isDesktop={props.isDesktop}
                        title="Members"
                        listMembers={clanInfo.members}
                        handleClick={setRedirectPlayer}
                        listLength={LIST_LENGTH}
                    />

                    <ScrollableList //GAME HISTORY
                        isDesktop={props.isDesktop}
                        title="Game History"
                        listMembers={clanInfo.gameHistory}
                        handleClick={setRedirectId}
                        listLength={LIST_LENGTH}
                    />

                    <div className="flex-list" style={{
                        width: props.isDesktop ? "300px" : "100px",

                    }}>
                        {/* STATS PORTION */}
                        <div className="flex-list">
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Legacy
                                <input className="radio-button" type="radio" value="Legacy" checked={currentMode == 'legacy'} onChange={() => { setMode("legacy") }} />
                            </label>
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Modern CTF
                                <input type="radio" value="Modern CTF" checked={currentMode == 'ctf'} onChange={() => { setMode("ctf") }} />
                            </label>
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Modern Siege
                                <input type="radio" value="Modern Siege" checked={currentMode == 'siege'} onChange={() => { setMode("siege") }} />
                            </label>
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Modern Deathmatch
                                <input type="radio" value="Modern TDM" checked={currentMode == 'tdm'} onChange={() => { setMode("tdm") }} />
                            </label>
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Modern Overall
                                <input type="radio" value="Modern Overall" checked={currentMode == 'overall'} onChange={() => { setMode("overall") }} />
                            </label>
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Power Stats
                                <input type="radio" value="Power Stats" checked={currentMode == 'powerStats'} onChange={() => { setMode("powerStats") }} />
                            </label>
                        </div>

                        <ClanStatDisplay mode={getMode(currentMode, clanInfo)} isDesktop={props.isDesktop} />
                    </div>


                </div>


            </div>


        )
    }
    else {
        return (
            <div className="flex-list" style={{
                width: props.isDesktop ? "1000px" : "auto",
                height: props.isDesktop ? "500px" : "300px",
                marginTop:"200px"
            }}>
                <h2 className="header center" style={{ marginBottom: "50px" }}>{props.currentClan}&ensp; [&ensp;{clanInfo.clanTag}&ensp;]&ensp;&ensp;Leader:&ensp;{clanInfo.leader}</h2>

                <div>
                    <div className="flex-row center" style={{
                        width: props.isDesktop ? "300px" : "100%",

                    }}>
                        {/* STATS PORTION */}
                        <div className="flex-list">
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Legacy
                                <input className="radio-button" type="radio" value="Legacy" checked={currentMode == 'legacy'} onChange={() => { setMode("legacy") }} />
                            </label>
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Modern CTF
                                <input type="radio" value="Modern CTF" checked={currentMode == 'ctf'} onChange={() => { setMode("ctf") }} />
                            </label>
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Modern Siege
                                <input type="radio" value="Modern Siege" checked={currentMode == 'siege'} onChange={() => { setMode("siege") }} />
                            </label>
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Modern Deathmatch
                                <input type="radio" value="Modern TDM" checked={currentMode == 'tdm'} onChange={() => { setMode("tdm") }} />
                            </label>
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Modern Overall
                                <input type="radio" value="Modern Overall" checked={currentMode == 'overall'} onChange={() => { setMode("overall") }} />
                            </label>
                            <label className={props.isDesktop ? "radio-text" : "radio-text-mobile"}>Power Stats
                                <input type="radio" value="Power Stats" checked={currentMode == 'powerStats'} onChange={() => { setMode("powerStats") }} />
                            </label>
                        </div>

                        <ClanStatDisplay mode={getMode(currentMode, clanInfo)} isDesktop={props.isDesktop} />
                    </div>
                </div>

                <div className='flex-row' style={{ justifyContent: "space-evenly", marginTop:'25px', width:"auto"}}>

                    <ScrollableList //CLAN ROSTER
                        isDesktop={props.isDesktop}
                        title="Members"
                        listMembers={clanInfo.members}
                        handleClick={setRedirectPlayer}
                        listLength={LIST_LENGTH}
                    />

                    <ScrollableList //GAME HISTORY
                        isDesktop={props.isDesktop}
                        title="Game History"
                        listMembers={clanInfo.gameHistory}
                        handleClick={setRedirectId}
                        listLength={LIST_LENGTH}
                    />




                </div>


            </div>


        )
    }
}
function getMode(currentMode, info) {
    if (currentMode == 'legacy') {
        return info.legacyStats
    }
    else if (currentMode == 'powerStats') {
        return info.powerStats
    }
    else {
        return info.advancedStats[currentMode]
    }
}
export { ClanInformation }