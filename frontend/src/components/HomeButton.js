import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";

function HomeButton(props){
    let [home, setHome] = useState(null)
    let homeButtonRef = createRef()


    const restingStyle = {
        background:"rgba(190, 177, 54, 0.8)",
        cursor:'pointer',
        fontSize:"17pt",
        border : "3px solid rgb(141,113,24)",
        fontFamily:"Roboto, sans-serif",
        fontWeight:"bolder",
        textShadow:"1px 1px 1px black",
        color: 'rgb(141,113,24)',


    }
    const hoverStyle={
        background:"rgba(217,163,58,0.8)",
        cursor:'pointer',
        border : "3px solid rgb(141,113,24)",
        fontFamily:"Roboto, sans-serif",
        fontWeight:"bolder",
        textShadow:"1px 1px 1px black",

    }
    const buttonHover = (e) => {
        homeButtonRef.current.style.background = hoverStyle.background
    }
    const buttonLeave = (e) =>  {
        homeButtonRef.current.style.background = restingStyle.background
    }
    const goHome = () =>{
        setHome(true)
    }

    if (home != null){
        const redirect = "/components/homepage"
        return <Redirect push to = {redirect}/>
    }

    return (
        <div>
            <button style = {restingStyle}
            ref = {homeButtonRef}
            onMouseOver = {buttonHover}
            onMouseLeave = {buttonLeave}
            onMouseDown = {goHome}>
                Home
            </button>

        </div>
    )

}


export {HomeButton}