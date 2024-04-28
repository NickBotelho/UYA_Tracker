import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import {useMediaQuery} from 'react-responsive'

//<img src={`data:image/png;base64,${this.state.image}`}/>
function LiveEvents(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });        
    // let [events, addEvents] = useState(null)
    let [rows, updateRows] = useState({
        queued: false,
        rows:[],
        batch_num:-1
    })
    let myStorage = window.localStorage;

    const eventRow = (event, index) => { 
        const ref1 = createRef()
        const ref3 = createRef()

        return (

                <div
                ref = {ref1}
                key = {index}
                style = {{textAlign:"left",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8", 
                whiteSpace:"nowrap", 
                borderBottom: '2px solid rgb(144,99,30)',
 
                cursor:'pointer',
                paddingLeft:"10px",
                width:props.isDesktop? "320px" : "100px",
           }} 

                >{`${event}`}</div>
                


        );
    }

    if(props.isFullscreen || !props.hasEventFeed || props.isBigMap){
        return null
    }
    return (  
        <div style = {{
            width:props.isDesktop? "320px" : "100px",
            marginTop:'50px'
        }}>
            <h2 style = {{
                    fontSize : isDesktop? "35pt" : "15pt",
                    textAlign:"center",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '6px 4px 4px black',


                }}>Event Feed</h2>


            <div style={{
                    display:'block',
                    height:props.isDesktop? "450px" : "200px",
                    backgroundColor:"rgba(141,113,24, 0.3)",

                    scrollBehavior:"smooth",
                    scrollMargin:"4px, 4px",
                    scrollPadding:"4px",
                    scrollbarWidth:"5px",
                    overflowX:"hidden",
                    overflowY:"auto",
                    fontSize: props.isDesktop ? "14pt" : "8pt",
                    color: 'rgb(141,113,24)',
                    letterSpacing:"-1.5px",
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black",
                    border : "3px solid rgb(141,113,24)",
                }}>
                    {rows.rows}

            </div>
        </div>
        
    )

}

export {LiveEvents}