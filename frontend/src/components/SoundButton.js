import React, { createRef, useState, useCallback } from "react";
import audio_on from "../../static/images/audio_on.svg";
import audio_off from "../../static/images/audio_off.svg";


function SoundButton (props){
    const audio_on = "../../static/images/audio_on.svg";
    const audio_off = "../../static/images/audio_off.svg";

    const onClick = (e) => {
        if (props.isAudioOn == false){
            audio_ref.current.on = true
            audio_ref.current.src = audio_on
            props.isAudioOn = true
        }
        else{
            audio_ref.current.on = false
            audio_ref.current.src = audio_off
            props.isAudioOn = false
        }
    }
    
    const audio_ref = createRef()
    return (
        <div>
            <img src = {audio_off} ref = {audio_ref} onMouseDown={onClick}
            height = "100" width = "100"></img>
        </div>
    )

}

export {SoundButton}