import React, { createRef, useState, useCallback } from "react";
import {HomePage} from "./homepage.js";
import { PlayerProfile } from "./PlayerProfile.js";
import "../../static/css/app.css";
import {Routing} from "../routing.js";
import { Redirect } from "react-router";
import {GetLargeMap} from "./extras.js"
function App(props){
    const map = GetLargeMap()
    document.body.style = 'background:rgba(129,102,13,.5)'
    let [initialized, setInitialized] = useState(true)
    const myRef = createRef()

    
    
    if (initialized) {
        return(
            <div style = {{
                zIndex:"1",
                position:"relative",
                background:"rgba(129,102,13,.5)"
            }}>
            
                <Routing/>
                {/* <HomePage/>
                <PlayerProfile/> */}
            </div>
            
        );
    }else{
        return <h1>Not ready</h1>
    }
}

export {App};

