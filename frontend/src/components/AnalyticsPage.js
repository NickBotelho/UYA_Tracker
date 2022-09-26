import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { GetLargeMap, GetHalfLargeMap } from "./extras.js";
import { statList, stat_keys } from "./extras.js";
import { HomeButton } from './HomeButton'
import { useMediaQuery } from 'react-responsive'
import { AnalyticChart } from "./AnalyticChart.js";
import { AnalyticsCategory } from "./AnalyticsCategory.js";
const DEBUG = true
var address = null
if (DEBUG == true) {
    address = "http://127.0.0.1:5000"
}
else {
    address = "https://uyatracker.herokuapp.com"
}


function AnalyticsPage(props) {
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
    });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [map, changeMap] = useState(GetLargeMap())
    let [currentCategory, changeCategory] = useState(<div></div>)
    let [currentBoard, changeBoard] = useState(<div></div>)
    let [year, changeYear] = useState("all")
    const gameSizes = ["all", '1v1', '2v2', '3v3', '4v4']
    const colors = {
        'all': 'rgba(190, 177, 54, 0.8)',
        '1v1': 'rgba(210, 178, 55, 0.8)',
        '2v2': 'rgba(230, 179, 56, 0.8)',
        '3v3': 'rgba(250, 180, 57, 0.8)',
        '4v4': 'rgba(270, 180, 58, 0.8)',
    }
    let stat_categories = []
    for (let category in gameSizes) {
        // console.log(category)
        stat_categories.push(
            <AnalyticsCategory
                category={gameSizes[category]}
                currentCategory={currentCategory}
                changeCategory={changeCategory}
                currentBoard={currentBoard}
                changeBoard={changeBoard}
                address={address}
                isDesktop={isDesktop}
                key={category}
                color={colors[gameSizes[category]]}
                year={year}

            />
        )

    }
    const restingStyle = {
        background: "rgba(190, 177, 54, 0.8)",
        cursor: 'pointer',
        fontSize: isDesktop ? "12pt" : "10pt",
        border: "1px solid rgb(141,113,24)",
        fontFamily: "Roboto, sans-serif",
        fontWeight: "bolder",
        textShadow: "1px 1px 1px black",
        color: 'rgb(141,113,24)',
        marginLeft: "0",
        userSelect: "none",
        height: '30px',

    }
    const hoverStyle = {
        background: "rgba(217,163,58,0.8)",
    }
    const buttonHover = (e) => {
        let ref = e.currentTarget
        ref.style.background = hoverStyle.background
    }
    const buttonLeave = (e) => {
        let ref = e.currentTarget
        ref.style.background = restingStyle.background
    }
    let [home, goHome] = useState(null)
    const returnHome = () => {
        goHome(true)
    }
    let updateYear = () => {
        // console.log(document.getElementById("yearInput").value)
        changeYear(document.getElementById("yearInput").value)
        changeBoard(<div></div>)
        changeCategory(<div></div>)
    }
    if (home != null) {
        const redirect = "/leaderboards"
        return <Redirect push to={redirect} />
    }

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
                <div style = {{
                    display:"flex",
                }}>
                    <h1 style={{
                        fontSize: isDesktop ? "75pt" : "35pt",
                        textAlign: "center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',


                    }}>Analytics</h1>

                    <div style={{
                        marginTop: isDesktop ? '35px' : "0px",
                        marginLeft: "20px",
                    }}>
                        <h6
                            style={{
                                fontSize: isDesktop ? "12pt" : "12pt",
                                color: 'rgb(229, 197, 102)',
                                textShadow: '6px 4px 4px black',
                                marginLeft:"20px"


                            }}>Year</h6>
                        <input id="yearInput" type="text" placeholder="all"
                            style={{
                                backgroundColor: "rgba(190, 177, 54, 0.8)",
                                border: "3px solid rgb(141,113,24)",
                                cursor: 'pointer',
                                fontFamily: "Roboto, sans-serif",
                                fontWeight: "bolder",
                                textAlign: 'center',
                                height: '20px',
                                width: "65px",
                                textShadow: "0px 0px 1px black",
                                color: 'rgb(141,113,24)',
                                userSelect: 'none'

                            }} ></input>
                        <button onClick={updateYear} style={restingStyle}
                            onMouseEnter={buttonHover}
                            onMouseLeave={buttonLeave}>SET</button>
                    </div>
                </div>



            </div>


            <div style={{
                color: 'rgb(141,113,24)',
                fontSize: '20pt',
                letterSpacing: "-1.5px",
                borderCollapse: "collapse",
                fontWeight: "bolder",
                textShadow: "1px 1px 1px black",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'center'
                }}>
                    {stat_categories}
                </div>

                <div style={{
                    marginTop: '25px',
                    display: "flex",
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {currentCategory}
                </div>

                <div style={{
                    marginTop: '25px',
                    display: "flex",
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'center'
                }}>
                    {currentBoard}
                </div>
            </div>



        </div>


    )




}

export { AnalyticsPage }