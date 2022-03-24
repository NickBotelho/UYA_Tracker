import React, { createRef, useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'
const DEBUG = true

//<img src={`data:image/png;base64,${this.state.image}`}/>
function LiveMap(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    // let [map, changeMap] = useState(GetLargeMap())
   
    let [radar, updateRadar] = useState( null )

    let myStorage = window.localStorage;
    // console.log(myStorage)
    async function getMap(dme_id){
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
        const search_result = await fetch(`${props.address}/api/live/map`, requestSearch)
        // const radarPost = await search_result
        const j = await search_result.json()


        updateRadar(j.status)
        
    }



    if (radar== null){
        getMap(props.dme_id)

    }
    useEffect(() => {
        const interval = setInterval(() => {
            updateRadar(null);
        }, props.refresh);
        return () => clearInterval(interval);
    }, []);
    if (radar == null){
        let cache = myStorage.getItem("radar")
        cache = cache != null? <img style = {{border : "3px solid rgb(141,113,24)",}} src={`data:image/png;base64, ${cache}`} height = {props.isDesktop? '100%' : '300'} alt = "Map"/> 
        : <img style = {{border : "3px solid rgb(141,113,24)",}}  src = "../../static/images/loading_circle.gif" height = '253' width = '255' alt = "Map"></img>
 
        return (

        <div style = {{
            paddingTop:props.isDesktop? '75px' : '10px',
            height: props.isDesktop? '100%' : '100%',
            width: props.isDesktop? '100%' : '100%',
            display:"flex",
            justifyContent:"center"
        }}>
            {cache}
        </div>
        )
    }else{
        myStorage.setItem("radar", radar)
        return (
            
            <div style = {{
                paddingTop:props.isDesktop? '75px' : '10px',
                height: props.isDesktop? '100%' : '100%',
                width: props.isDesktop? '100%' : '100%',
                display:"flex",
                justifyContent:"center",

            }}>
              <img style = {{
                border : "3px solid rgb(141,113,24)",

              }} src={`data:image/png;base64, ${radar}`} height = {props.isDesktop? '100%' : '300'}/>
                
            </div>
            
    
        )
    }

        
        
        
    


}

export {LiveMap}