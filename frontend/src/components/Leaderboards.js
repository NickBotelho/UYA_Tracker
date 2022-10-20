import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import {LeaderboardCategory} from "./LeaderboardCategory.js"
import {GetLargeMap, GetHalfLargeMap} from "./extras.js";
import { statList, stat_keys } from "./extras.js";
import { HomeButton } from './HomeButton'
import {useMediaQuery} from 'react-responsive'

const DEBUG = false
var address = null
if (DEBUG==true){
    address = "http://127.0.0.1:5000"
}
else{
    address = "https://uyatracker.herokuapp.com/"
}


function Leaderboards(props){
    const isMobile = useMediaQuery({
        query: "(min-width: 10px) and (max-width: 600px)", //norm is 390x800
      });
    const isDesktop = useMediaQuery({
        query: "(min-width: 600px)",
    });
    let [map, changeMap] = useState(GetLargeMap())
    let [currentCategory, changeCategory] = useState(<div></div>)
    let [currentBoard, changeBoard] = useState(<div></div>)

    const isTooLarge = useMediaQuery({
        query: "(max-height:600px)"
    })
    let stat_categories = []
    for (let category in statList){
        // console.log(category)
        stat_categories.push(
            <LeaderboardCategory
                category = {category}
                currentCategory = {currentCategory}
                changeCategory  = {changeCategory}
                currentBoard = {currentBoard}
                changeBoard = {changeBoard}
                address = {address}
                isDesktop = {isDesktop}
                key = {category}

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
 
    if (isDesktop){
        return (
            <div style = {{
                background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily:"Roboto, sans-serif",
                height:'100vh'
    
                
            }}>
                <HomeButton/>
    
    
                <div style = {{
                    display:"flex",
                    justifyContent:"center"
                }}>
         
                    <h1 style = {{
                        fontSize : "75pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
    
    
                    }}>LEADERBOARDS</h1>
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
                        flexWrap:'wrap',
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
    else{
        // console.log(isTooLarge)
        return (
            <div style = {{
                background:`linear-gradient(rgba(129,102,13,.5), rgba(129,102,13,.5)), 
                    url(${map})`,
                fontFamily:"Roboto, sans-serif",
                height:'1050px',
    
                
            }}>
                <HomeButton/>
    
    
                <div style = {{
                    display:"flex",
                    justifyContent:"center"
                }}>
         
                    <h1 style = {{
                        fontSize : "32pt",
                        textAlign:"center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
    
    
                    }}>LEADERBOARDS</h1>
                </div>
    
    
                <div style = {{
                    marginTop:'30px',
                    color: 'rgb(141,113,24)',
                    fontSize:'15pt',
                    letterSpacing:"-1.5px",
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black",
                }}>
                    <div style = {{
                        display:"flex",
                        flexDirection:'row',
                        flexWrap:'wrap',
                        justifyContent:'center'
                    }}>
                        {stat_categories}
                    </div>
    
                    <div style = {{
                        marginTop:'30px',
                        display:"flex",
                        flexDirection:'row',
                        flexWrap:'wrap',
                        justifyContent:'center'
                    }}>
                        {currentCategory}
                    </div>
    
                    <div style = {{
                        marginTop:'30px',
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


}

export {Leaderboards}