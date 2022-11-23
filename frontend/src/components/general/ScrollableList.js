import React, { createRef, useState, useCallback , useEffect} from "react";
import { Redirect } from "react-router";

function ScrollableList({isDesktop, title, listMembers, handleClick, listLength}){

    const hoverStyle = {
        backgroundColor: "rgb(217,163,58)",
    }
    const unHoverStyle = {
        backgroundColor:"rgb(190, 177, 54)",
    }
    const clanRow = (index) => { 
        const rowRef = createRef()
        const entryRef = createRef()

        return (
            <tr key = {index}  ref = {rowRef} onMouseDown = {() => {
                handleClick(index)
            }}
                >
                <td 
                ref = {entryRef}
                onMouseOver = {() => {
                    entryRef.current.style.backgroundColor = hoverStyle.backgroundColor
                }}
                onMouseLeave = {() => {
                    entryRef.current.style.backgroundColor = unHoverStyle.backgroundColor
                }}
                style = {{textAlign:"center",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                borderBottom: '2px solid rgb(144,99,30)',
                cursor:'pointer',
                paddingLeft: isDesktop ? "10px" : "1px",
                height: "32px"
           }} 
                
                >{index}</td>
                
            </tr>

        );
    }
    const blankRow = (index) => { 
        const rowRef = createRef()
        const entryRef = createRef()
        
        return (
            <tr key = {index}  ref = {rowRef} >
                <td 
                ref = {entryRef}
                style = {{textAlign:"center",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                borderBottom: '2px solid rgb(144,99,30)',
                cursor:'pointer',
                paddingLeft: isDesktop ? "10px" : "1px",
                height: "32px"
           }} 
                
                > </td>
                
            </tr>

        );
    }

    let rows = []

    rows = listMembers.map(clanRow)
    while (rows.length < listLength){
        rows.push(blankRow(rows.length))
    }
    return (
        <div className = {"scrollbar-hide"} style={{
            display:'block',
            height:`${32*listLength + 55}px`,
            scrollBehavior:"smooth",
            scrollMargin:"4px, 4px",
            scrollPadding:"4px",
            scrollbarWidth:"5px",
            overflowX:"hidden",
            overflowY:"scroll",
            width: isDesktop ? "300px" : "auto",
            scrollbarWidth:"none",
        }}>
            <table style = {{
                    fontSize: isDesktop ? "20pt" : "14pt",
                    color: 'rgb(141,113,24)',
                    width: isDesktop ? "300px" : "100px",
                    // height: props.isDesktop ? '400px' : "300px",
                    letterSpacing:"-1.5px",
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black",
                    border : "3px solid rgb(141,113,24)",

                    
                }}>
                <caption style={{
                    border : "3px solid rgb(141,113,24)",


                }}>{`${title.toUpperCase()}`}&ensp;{`(${listMembers.length})`}</caption>
                <tbody>
                    {rows}
                </tbody>
            </table>
            
                
            

        </div>
    )
    


}

export {ScrollableList}