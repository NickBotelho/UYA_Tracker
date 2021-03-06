import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { statList, stat_keys } from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'
import { AnalyticChart } from "./AnalyticChart.js";
import { AnalyticsCategory } from "./AnalyticsCategory.js";
const DEBUG = false
var address = null
if (DEBUG==true){
    address = "http://127.0.0.1:5000"
}
else{
    address = "https://uyatracker.herokuapp.com"
}


function AnalyticsPage(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [map, changeMap] = useState(GetLargeMap())
    let [currentCategory, changeCategory] = useState(<div></div>)
    let [currentBoard, changeBoard] = useState(<div></div>)

    const gameSizes = ["all", '1v1', '2v2', '3v3', '4v4']
    const colors = {
        'all':'rgba(190, 177, 54, 0.8)',
        '1v1':'rgba(210, 178, 55, 0.8)',
        '2v2':'rgba(230, 179, 56, 0.8)',
        '3v3':'rgba(250, 180, 57, 0.8)',
        '4v4':'rgba(270, 180, 58, 0.8)',
    }
    let stat_categories = []
    for (let category in gameSizes){
        // console.log(category)
        stat_categories.push(
            <AnalyticsCategory
                category = {gameSizes[category]}
                currentCategory = {currentCategory}
                changeCategory  = {changeCategory}
                currentBoard = {currentBoard}
                changeBoard = {changeBoard}
                address = {address}
                isDesktop = {isDesktop}
                key = {category}
                color = {colors[gameSizes[category]]}

            />
        )

    }

    
    let [home, goHome] = useState(null)
    const returnHome = () =>{
        goHome(true)
    }
    if (home != null){
        const redirect = "/leaderboards"
        return <Redirect push to = {redirect}/>
    }
    
        
        return (
            <div style = {{
                background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily:"Roboto, sans-serif",
                height: isDesktop? '100vh' : '750px'
    
                
            }}>
                <HomeButton/>
                <div style = {{
                display:"flex",
                justifyContent:"center"
            }}>
        
                <h1 style = {{
                    fontSize : isDesktop? "75pt" : "35pt",
                    textAlign:"center",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '6px 4px 4px black',


                }}>Analytics</h1>
            </div>


            <div style = {{
                color: 'rgb(141,113,24)',
                fontSize:'20pt',
                letterSpacing:"-1.5px",
                borderCollapse:"collapse",
                fontWeight:"bolder",
                textShadow:"1px 1px 1px black",
            }}>
                <div style = {{
                    display:"flex",
                    flexDirection:'row',
                    flexWrap:'nowrap',
                    justifyContent:'center'
                }}>
                    {stat_categories}
                </div>

                <div style = {{
                    marginTop:'25px',
                    display:"flex",
                    flexDirection:'row',
                    flexWrap:'wrap',
                    justifyContent:'center'
                }}>
                    {currentCategory}
                </div>

                <div style = {{
                    marginTop:'25px',
                    display:"flex",
                    flexDirection:'row',
                    flexWrap:'nowrap',
                    justifyContent:'center'
                }}>
                    {currentBoard}
                </div>
            </div>
    
    
    
            </div>
            
    
        )
        
    


}

export {AnalyticsPage}