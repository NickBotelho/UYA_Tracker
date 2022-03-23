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

    async function addRow(dme_id){
        const requestSearch = {
            method: "POST",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
            body: JSON.stringify({
                dme_id: dme_id,
            }),    
        }
        const search_result = await fetch(`${props.address}/api/live/game`, requestSearch)
        const gameInfo = await search_result.json()
        let logger = gameInfo.logger
        let newRow = logger.map(eventRow)
        let currentRows = rows.rows
        let batch_num = myStorage.getItem("batch_num")
        if (batch_num == null || batch_num!=gameInfo.batch_num){
            currentRows.unshift(newRow)
            myStorage.setItem("batch_num", batch_num)
        }
        updateRows({
            queued:true,
            rows:currentRows,
            batch_num:gameInfo.batch_num
        })
        return gameInfo
    }
    useEffect(() => {
        const interval = setInterval(() => {
            updateRows({
                queued:false,
                rows:rows.rows,
            })
        }, props.refresh);
        return () => clearInterval(interval);
    }, []);
    const events = [
        'Nick#1 Killed Jumper',

    ]


    if(rows.queued == false){
        addRow(props.dme_id)
    }
    if (rows.queued == true){
        myStorage.setItem("batch_num",rows.batch_num)
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