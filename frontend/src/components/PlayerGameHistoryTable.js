import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";

function PlayerGameHistoryTable(props){
    const numEntries = props.games.length >= 10 ? 10 : props.games.length
    let entries = []
    let [redirectID, setRedirectID] = useState(null)
    let cellWidth = props.isDesktop ? 225 : 100 
    for (let entry = 0; entry < numEntries; entry++){
        const date = props.games[entry]['date']
        const map = props.games[entry]['map'].replace("_", " ")
        const result = props.games[entry]['win'] == true ? 'Win' : "Loss"
        const game_id = props.games[entry]['game_id']
        // console.log(date, map, entry)
        entries.push(
            <div style ={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-evenly',
                backgroundColor:"rgba(190, 177, 54, 0.8)",
                paddingLeft:"10px",
                borderBottom: '2px solid rgb(251, 245, 180)',
                cursor:'pointer'
            }}
            key = {entry}
            onMouseDown = {() => {
                setRedirectID(game_id)
            }}onMouseEnter = {(e) =>{
                e.currentTarget.style.backgroundColor = "rgba(217,163,58,0.8)"
            }}
            onMouseLeave = {(e) =>{
                e.currentTarget.style.backgroundColor = "rgba(190, 177, 54, 0.8)"
            }}>
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
                    <h3>{map}</h3>

                </div>
                <div style = {{
                    width:`${cellWidth}px`,
                    textAlign:'center'
                }}>
                    <h3>{result}</h3>

                </div>


            </div>

        )
    }
    if (redirectID != null){
        const redirect = "/detailedgame"+"?id="+encodeURIComponent(redirectID) //redirectt will hoold game id
        return <Redirect push to = {redirect}/>
    }
    // console.log(`is desktop = ${props.isDesktop}`)
    if (props.isDesktop) { //desktop
        return(
            <div style = {{
                // border : "3px solid rgb(165,154,46)",
                
                display:"inline-block",
                border : "4px solid rgb(141,113,24)",
                

                        }}>
                <div style = {{
                    fontSize:'20pt',
                    color: 'rgb(141,113,24)',
                    width:"775px",
                    // height:'400px',
                    letterSpacing:"-1.5px",
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black",
                    textAlign:"center",
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
                    fontSize:'15pt',
                    color: 'rgb(141,113,24)',
                    width:"300px",
                    // height:'400px',
                    letterSpacing:"-1.5px",
                    borderCollapse:"collapse",
                    fontWeight:"bolder",
                    textShadow:"1px 1px 1px black",
                    textAlign:"center",
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

export{PlayerGameHistoryTable}