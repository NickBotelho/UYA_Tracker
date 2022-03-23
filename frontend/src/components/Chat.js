import React, { createRef, useState, useCallback } from "react";
import {useMediaQuery} from 'react-responsive'


function Chat(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    async function getChat(){
        const requestSearch = {
            method: "GET",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache",
                'Access-Control-Allow-Origin': '*',
                'origin':'null'
            },
        }

        const search_result = await fetch(`${props.address}/api/online/chat`, requestSearch)
        const players = await search_result.json()
        props.hasLoaded({
            data:players,
        })
        return players
    }
    const getChatRow = (chat, index) => { 
        const ref1 = createRef()
        const ref3 = createRef()
        const name = chat[0]
        const message = chat[1]
        return (
            <tr key = {index} ref = {ref3}>
                <td 
                ref = {ref1}
                style = {{textAlign:"left",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                cursor:'pointer',
                paddingLeft:"10px",

           }} 
                
                >{`${name}: ${message}`}</td>
                
            </tr>

        );
    }
    const blankRow = (index) => { 
        const ref1 = createRef()
        const ref3 = createRef()
        
        return (
            <tr key = {index}  ref = {ref3} >
                <td 
                ref = {ref1}
                style = {{textAlign:"center",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                cursor:'pointer',
                paddingLeft:"10px",
                height: "32px"
           }} 
                
                > </td>
                
            </tr>

        );
    }
    if (props.isLoaded == null){
        getChat()

    }
    let rows = []
    if (props.isLoaded == null){
        while (rows.length < 15){
            rows.push(blankRow(rows.length))
        }
    }else{
        rows = props.isLoaded.data.map(getChatRow)  
        while (rows.length < 15){
            rows.push(blankRow(rows.length))
        }
    }    
    return (
        <div style={{
            display:'block'
            
        }}>
            <table style = {{
                    fontSize: props.isDesktop ? "20pt" : "14pt",
                    color: 'rgb(141,113,24)',
                    width: props.isDesktop ? "500px" : "200px",
                    // height: props.isDesktop ? '400px' : "300px",
                    height: "100%",
                    letterSpacing:"-1.5px",
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black",
                    border : "3px solid rgb(141,113,24)",
                    scrollBehavior:"smooth",
                    scrollMargin:"4px, 4px",
                    scrollPadding:"4px",
                    scrollbarWidth:"5px",
                    overflowX:"hidden",
                    overflowY:"auto",

                    
                }}>
                <caption style={{
                    border : "3px solid rgb(141,113,24)",


                }}>{`Aquatos`}</caption>
                <tbody>
                    {rows}
                </tbody>
            </table>
            
                
            

        </div>

    )
        
    


}

export {Chat}