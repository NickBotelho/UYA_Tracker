import React, { createRef, useState, useCallback } from "react";
import {DetailedGame} from './DetailedGame'
import { Redirect } from "react-router";

function AllGameHistoryTable(props){
    let entries = []
    let [redirectID, isRedirecting] = useState(null)
    const cellWidth = 250 //change for mobile
    let i = 0 
    for (let entry = props.start; entry < (props.start + props.numEntries); entry++){
        const date = props.games[entry]['date']
        const map = props.games[entry]['map']
        const mode = props.games[entry]['gamemode']
        const result = props.games[entry]['score'] 
        const id = props.games[entry]['game_id']
        entries.push(
            <div style ={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-evenly',
                backgroundColor:"rgba(190, 177, 54, 0.8)",
                paddingLeft:"10px",
                borderBottom: '2px solid rgb(251, 245, 180)',
                cursor:'pointer',

            

            }}
            onMouseEnter = {(e) =>{
                e.currentTarget.style.backgroundColor = "rgba(217,163,58,0.8)"
            }}
            onMouseLeave = {(e) =>{
                e.currentTarget.style.backgroundColor = "rgba(190, 177, 54, 0.8)"
            }}
            onMouseDown = {() =>{
                isRedirecting(id)
            }}
            key = {id}>
                {props.isDesktop ? <div style = {{
                    width:`${cellWidth}px`,
                    textAlign:'center'
                }}>
                    <h3>{date}</h3>

                </div> : null}
                <div style = {{
                    width:`${cellWidth}px`,
                    textAlign:'center'
                }}>
                    <h3>{mode}</h3>

                </div>
                <div style = {{
                    width:`${cellWidth}px`,
                    textAlign:'center'
                }}>
                    <h3>{map.replace("_", " ")}</h3>

                </div>
                {props.isDesktop ? <div style = {{
                    width:`${cellWidth}px`,
                    textAlign:'center'
                }}>
                    <h3>{result}</h3>

                </div> : null}


            </div>

        )
        i++
        if (i == Object.keys(props.games).length){
            break
        }
    }
    if (redirectID != null){
        const redirect = "/components/detailedgame"+"?id="+encodeURIComponent(redirectID) //redirectt will hoold game id
        return <Redirect push to = {redirect}/>
    }
    
    if (props.isDesktop) { //desktop
        return(
            <div style = {{
                // border : "3px solid rgb(165,154,46)",
                paddingTop :"10px",
                paddingRight:"10px",
                paddingBottom:"10px",
                paddingLeft:"10px",
                display:"inline-block",
                        }}>
                <div style = {{
                    fontSize:'20pt',
                    color: 'rgb(141,113,24)',
                    width:"1000px",
                    // height:'400px',
                    letterSpacing:"-1.5px",
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black",
                    textAlign:"center",
                    border : "4px solid rgb(141,113,24)",
                }}>
                    <h3 style = {{
                        borderBottom: '2pt solid burlywood',
                        backgroundColor:"rgba(190, 177, 54, 1)",
                        
                    }}
                    >GAME HISTORY</h3>

                    <div style = {{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                    backgroundColor:"rgba(190, 177, 54, 1)",
                    paddingLeft:"10px",
                    borderBottom: '2px solid rgb(251, 245, 180)',
                }}>
                        <div style = {{
                            width:`${cellWidth}px`,
                            textAlign:'center'
                        }}>
                            <h3>NAME</h3>

                        </div>
                        <div style = {{
                            width:`${cellWidth}px`,
                            textAlign:'center'
                        }}>
                            <h3>MODE</h3>

                        </div>
                        <div style = {{
                            width:`${cellWidth}px`,
                            textAlign:'center'
                        }}>
                            <h3>MAP</h3>

                        </div>
                        <div style = {{
                            width:`${cellWidth}px`,
                            textAlign:'center'
                        }}>
                            <h3>SCORE</h3>

                        </div>
                    </div>
                    {entries}
                    
                </div>
            </div>
        )
    }
    else{
        return(
            <div style = {{
                // border : "3px solid rgb(165,154,46)",
                paddingTop :"10px",
                paddingRight:"10px",
                paddingBottom:"10px",
                paddingLeft:"10px",
                display:"inline-block",
                        }}>
                <div style = {{
                    fontSize:'12pt',
                    color: 'rgb(141,113,24)',
                    width:"300px",
                    // height:'400px',
                    letterSpacing:"-1.5px",
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black",
                    textAlign:"center",
                    border : "4px solid rgb(141,113,24)",
                    
                }}>
                    <h3 style = {{
                        borderBottom: '2pt solid burlywood',
                        backgroundColor:"rgba(190, 177, 54, 1)",
    
                    }}
                    >GAME HISTORY</h3>
                    
                    
                    {entries}
                    
                </div>
            </div>
        )
    }
    
}

export{AllGameHistoryTable}