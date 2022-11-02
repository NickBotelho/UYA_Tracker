import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import { GetLargeMap, GetHalfLargeMap } from "./extras.js";
import { HomeButton } from './HomeButton'
import { useMediaQuery } from 'react-responsive'

//<img src={`data:image/png;base64,${this.state.image}`}/>
function LiveSettings(props) {

    return (
        <div style={{
            fontFamily:"Roboto, sans-serif",
            fontSize:"14pt",
            color: 'rgb(229, 197, 102)',
            textShadow: '3px 2px 2px black',
            marginLeft:"50px"
        }}>

            <h4>Settings</h4>
            <div style = {{
                display:"flex",
                flexDirection:"column",
                color: 'rgb(229, 197, 102)',
                textShadow: '3px 2px 2px black',
            }}>
                <label>
                    <input
                        type="checkbox"
                        checked={props.isFullscreen}
                        onChange={props.handleFullscreen}
                    />
                    Fullscreen
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={props.isBigMap}
                        onChange={props.handleBigMap}
                    />
                    Big Map
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={props.hasPlayerInformation}
                        onChange={props.handlePlayerInformation}

                    />
                    Player Information
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={props.hasEventFeed}
                        onChange={props.handleEventFeed}

                    />
                    Event Feed
                </label>
            </div>
        </div>
    )

}

export { LiveSettings }