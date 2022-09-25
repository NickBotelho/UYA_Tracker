import React, { createRef, useState, useCallback } from "react";

function AnnouncementsWindow(props) {
    let [annoucements, setAnnouncements] = useState(null)
    async function getAnnouncements() {
        const requestSearch = {
            method: "GET",
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache",
                'Access-Control-Allow-Origin': 'true',
                'origin': 'null'
            },
        }
        const res = await fetch(`${props.address}/server/announcements/read`, requestSearch)
        const players = await res.json()
        setAnnouncements(players)
    }
    function printAnnouncements() {
        var res = []
        for (var i = 0; i < annoucements.length ; i++) {
            console.log(annoucements[i])
            res.push(
                <h3 key={i} style ={{
                    textAlign:'center',
                    marginTop:"10px"
                }}>- {annoucements[i]}</h3>
            )
        }
        return res
    }
    if (annoucements == null) {
        getAnnouncements()
        return null
    }
    console.log(annoucements)
    if (annoucements.length == 0) {
        return null
    }

    var res =printAnnouncements()
    console.log(res)
    return (
        <div ref={props.reference} onMouseDown={props.hide} style={{
            marginTop: '10px',
            height: props.isDesktop ? '400px' : '500px',
            width: props.isDesktop ? '800px' : '325px',
            border: '2px solid  rgb(229, 197, 102)',
            left: props.isDesktop ? '50%' : '50%',
            textAlign: "right",
            background: `rgb(118,83,25)`,
            color: "rgb(225,218,113)",
            textShadow: '2px 2px 2px black',
            fontSize: props.isDesktop ? "18pt" : '14pt',
            // visibility: "hidden",
            zIndex: "10",
            position: "absolute",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "center",
            top: props.isDesktop ? '40%' : "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <div>
                <h2 style = {{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:'center',
                }}>ANNOUNCEMENTS</h2>
                {res}
            </div>

        </div>
    )
}
export { AnnouncementsWindow };
