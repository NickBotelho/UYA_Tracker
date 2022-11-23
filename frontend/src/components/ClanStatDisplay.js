import React, { createRef, useState, useCallback } from "react";
import { StatRow } from "./general/StatRow";


function ClanStatDisplay(props) {

    return (
        <div style={{

        }}>

            <div style={{
                display: "flex",
                flexDirection: 'column',
                fontSize:"12pt",
                marginLeft: props.isDesktop ? "0px" : "25px"
            }}>

                <StatRow stat = {"kills"} value = {props.mode.kills} isDesktop={props.isDesktop}/>
                <StatRow stat = {"deaths"} value = {props.mode.deaths} isDesktop={props.isDesktop}/>
                <StatRow stat = {"wins"} value = {props.mode.wins} isDesktop={props.isDesktop}/>
                <StatRow stat = {"losses"} value = {props.mode.losses} isDesktop={props.isDesktop}/>
            </div>
        </div>


    )
}

export { ClanStatDisplay }