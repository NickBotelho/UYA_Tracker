import React, { createRef, useState, useCallback } from "react";
import "../../static/css/TimeTable.css";

function TimeTable (props){
    const row_style = {
        lineHeight:"35px"
    }
    
    const field_style = {
        textAlign:"left",
        backgroundColor:"rgb(190, 177, 54)",
        opacity:"0.8",
        whiteSpace:"nowrap",
        borderBottom: '2px solid rgb(251, 245, 180)',
        paddingLeft:'10px',
    }

    const stat_style = {
        textAlign:"right",
        backgroundColor:"rgb(190, 177, 54)",
        opacity:"0.8",
        whiteSpace:"nowrap",
        borderBottom: '2px solid rgb(251, 245, 180)',
        paddingRight:'10px',
    }
    return(
        <div style = {{
            border : "3px solid rgb(165,154,46)",
            paddingTop :"10px",
            paddingRight:"10px",
            paddingBottom:"10px",
            paddingLeft:"10px",
            display:"inline-block",}}>
            <table style = {{
                fontSize:'20pt',
                color: 'rgb(141,113,24)',
                width:"300px",
                // height:'400px',
                letterSpacing:"-1.5px",
                borderCollapse:"collapse",
                fontWeight:"bolder",
                textShadow:"1px 1px 1px black",
                
            }}>
                <caption style={{
                    paddingLeft:"10px",
                    paddingRight:'10px',
                    borderBottom: '2pt solid burlywood',
                }}>
                    PLAYTIME HISTORY
                </caption>
                <tbody>
                    <tr style = {row_style}>
                        <td style = {field_style}>
                            NUMBER OF LOGINS : 
                        </td>
                        <td style = {stat_style}>{props.player.num_logins}</td>
                    </tr>
                    <tr style = {row_style}>
                        <td style = {field_style}>HOURS PLAYED : </td>
                    <td style = {stat_style}>{props.player.time_played}</td>
                    </tr>
                      
                </tbody>
            </table>
        </div>
    );

}


export{TimeTable}


// <table>
//                 <caption>Time History</caption>

//                 <tbody>
                    
//                 </tbody>
//             </table>