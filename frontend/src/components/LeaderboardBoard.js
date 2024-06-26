import React, { createRef, useState, useCallback, useEffect } from "react";
import { LeaderboardCategory } from "./LeaderboardCategory.js"
import forward from '../../server/build//forward_arrow.svg';
// import forward from '../../server/build/forward_arrow.svg';

import backward from '../../server/build//backward_arrow.svg';
import { stat_keys } from './extras'
import { Redirect, Link } from "react-router";

function LeaderboardBoard(props) {


    const address = props.address
    let pages = {}
    let [currentPage, changePage] = useState(0)
    let [isLoaded, hasLoaded] = useState(null);
    let [searching, setSearch] = useState(null);
    if (isLoaded != null && isLoaded.category == props.category && isLoaded.stat != stat_keys[props.category][props.stat]) {
        hasLoaded(null)
    }
    else if (isLoaded != null && isLoaded.category != props.category) {
        hasLoaded(null)
    }

    if (isLoaded == null && currentPage != 0) {
        changePage(0)
    }

    async function getTop10() {
        const requestSearch = {
            method: "GET",
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache",
                'Access-Control-Allow-Origin': '*',
                'origin': 'null'
            },
        }
        const search_result = await fetch(`${address}/${props.endpoint}`, requestSearch)
        const players = await search_result.json()
        // //console.log(props.category, props.stat)
        hasLoaded({
            data: players,
            category: props.category,
            stat: stat_keys[props.category][props.stat]
        })
        return players
    }
    const getPlayerRow = (player, index) => {
        const ref1 = createRef()
        const ref2 = createRef()
        const ref3 = createRef()
        const buttonHover = (e) => {

            ref1.current.style.backgroundColor = hoverStyle.backgroundColor
            ref2.current.style.backgroundColor = hoverStyle.backgroundColor

        }
        const buttonLeave = (e) => {

            ref1.current.style.backgroundColor = unHoverStyle.backgroundColor
            ref2.current.style.backgroundColor = unHoverStyle.backgroundColor
        }
        return (
            <tr key={index} ref={ref3} onMouseEnter={buttonHover}
                onMouseLeave={buttonLeave}>
                <td
                    ref={ref1}
                    style={{
                        textAlign: "left",
                        backgroundColor: "rgb(190, 177, 54)",
                        opacity: "0.8",
                        whiteSpace: "nowrap",
                        borderBottom: '2px solid rgb(251, 245, 180)',
                        cursor: 'pointer',
                        paddingLeft: "10px",
                    }}
                    onClick={() => {
                        setSearch(player.username)
                    }}
                    value={player.username}
                >{`${((page * 10) + index) + 1}. ${player.username}`}</td>
                <td style={{
                    textAlign: "right",
                    backgroundColor: "rgb(190, 177, 54)",
                    opacity: "0.8",
                    whiteSpace: "nowrap",
                    borderBottom: '2px solid rgb(251, 245, 180)',
                    paddingRight: "10px",
                    cursor: 'pointer',
                }} ref={ref2}>{player.statValue}</td>
            </tr>

        );
    }
    var i = 1
    var page = 0
    if (isLoaded == null) {
        getTop10()
    } else {

        const total = isLoaded.data.length - (isLoaded.data.length % 10)

        // let page = 1

        for (i = 0; i <= total; i += 10) {
            let current = isLoaded.data.slice(i, i + 10)

            let current_pages = current.map(getPlayerRow)
            pages[page] = current_pages
            page += 1
        }

    }
    const hoverStyle = {
        backgroundColor: "rgb(217,163,58)",
    }
    const unHoverStyle = {
        backgroundColor: "rgb(190, 177, 54)",
    }

    function nextPage() {
        if (currentPage <= (isLoaded.data.length - (isLoaded.data.length % 10)) / 10) {
            changePage(currentPage += 1)
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            changePage(currentPage -= 1)
        }
    }

    // let prevPageButton = 

    if (searching != null) {
        const redirect = "/players" + "?name=" + encodeURIComponent(searching)
        setSearch(null)
        window.open(redirect,'_blank')
    }
    if (isLoaded == null) {
        return <div style={{
            border: "3pt solid rgb(92, 73, 0)", maxHeight: "100px", minWidth: "100px",
        }}>
            <img src="../../server/build//loading_circle.gif"
                height='100' width='100'></img>
        </div>
    } else {

        return (
            <div style={{
                display: 'block'

            }}>
                <table style={{
                    fontSize: props.isDesktop ? "20pt" : "14pt",
                    color: 'rgb(141,113,24)',
                    width: props.isDesktop ? "300px" : "200px",
                    height: props.isDesktop ? '400px' : "300px",
                    letterSpacing: "-1.5px",
                    borderCollapse: "collapse",
                    fontWeight: "bolder",
                    textShadow: "1px 1px 1px black",
                    border: "3px solid rgb(141,113,24)",
                }}>
                    <caption style={{
                        border: "3px solid rgb(141,113,24)",

                    }}>{`${props.category}\t${props.stat}`.toUpperCase()}</caption>
                    <tbody>
                        {pages[currentPage]}
                    </tbody>
                </table>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: "10px"
                }}>
                    {currentPage > 0 ? <img src='../../server/build//backward_arrow.svg' onMouseDown={prevPage}
                        height={props.isDesktop ? "25" : "20"}
                        width={props.isDesktop ? "150" : "85"}
                        style={{ userSelect: "none", cursor: "pointer" }} /> : <></>
                    }
                    <img src='../../server/build//forward_arrow.svg' onMouseDown={nextPage}
                        height={props.isDesktop ? "25" : "20"} width={props.isDesktop ? "150" : "85"}
                        style={{ userSelect: "none", cursor: "pointer" }}></img>
                </div>
            </div>
        )
    }
}

export { LeaderboardBoard }