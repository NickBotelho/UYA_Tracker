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


function Streams(props) {
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
    });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [map, changeMap] = useState(GetLargeMap())
    let myStorage = window.localStorage;
    myStorage.clear()
    let [home, goHome] = useState(null)
    const returnHome = () => {
        goHome(true)
    }
    async function getDevices() {
        let res = await navigator.mediaDevices.enumerateDevices()
        let mic = res[0]
        console.log(mic)

        var audioContext = new AudioContext();
        return mic
    }
    let devices = getDevices()

    // let constraintObj = { 
    //     audio: true, 
    // }; 
    // navigator.mediaDevices.getUserMedia(constraintObj)
    //     .then(function (mediaStreamObj) {

    //         //add listeners for saving video/audio
    //         let start = document.getElementById('btnStart');
    //         let stop = document.getElementById('btnStop');
    //         let mediaRecorder = new MediaRecorder(mediaStreamObj);
    //         let chunks = [];

    //         start.addEventListener('click', (ev) => {
    //             mediaRecorder.start();
    //             console.log(mediaRecorder.state);
    //         })
    //         stop.addEventListener('click', (ev) => {
    //             mediaRecorder.stop();
    //             console.log(mediaRecorder.state);
    //         });
    //         mediaRecorder.ondataavailable = function (ev) {
    //             chunks.push(ev.data);
    //         }
    //         mediaRecorder.onstop = (ev) => {
    //             console.log(chunks)
    //             let blob = new Blob(chunks, { 'type': 'audio/mpeg;' });
    //             chunks = [];
    //             // let videoURL = window.URL.createObjectURL(blob);
    //             // vidSave.src = videoURL;
    //         }
    //     })
    //     .catch(function (err) {
    //         console.log(err.name, err.message);
    //     });

    // function getLocation() {
    // if (navigator.geolocation) {
    //     var g = navigator.geolocation.getCurrentPosition(showPosition);
    //     console.log(g)
    // } else {
    //     console.log("Geolocation is not supported by this browser.")
    // }
    // }

    // function showPosition(position) {
    // console.log("Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude)
    // }

    // getLocation()



    const recordAudio = () => {
        return new Promise(resolve => {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();

                    const audioChunks = [];
                    mediaRecorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                    });

                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        audio.play();
                    });

                    setTimeout(() => {
                        mediaRecorder.stop();
                    }, 3000);
                });
        });
    };

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


                    }}>Streams</h1>
                </div>


                <div style={{
                    color: 'rgb(141,113,24)',
                    fontSize: '20pt',
                    letterSpacing: "-1.5px",
                    borderCollapse: "collapse",
                    fontWeight: "bolder",
                    textShadow: "1px 1px 1px black",
                }}>

                </div>
                TEMPLATE
                <button onMouseDown={recordAudio}>PLAY</button>


                <audio></audio>

            </div>


        )
    }







}

export { Streams }