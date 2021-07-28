import React, { createRef, useState, useCallback } from "react";

//prop fields : player, stat (field of player dict)
function StatField(props){

    var stat_value = props.player.stats[props.category][props.stat]

    return (
        
        <tr style = {{
            lineHeight:"35px"
        }}>
            <td
            style ={{
                textAlign:"left",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8",
                whiteSpace:"nowrap",
                borderBottom: '2px solid rgb(251, 245, 180)',
                paddingLeft:"10px",
            }}>
                {props.title.toUpperCase()+" :"}
            </td>
            <td
            style ={{
                textAlign:"right",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8",
                whiteSpace:"nowrap",
                borderBottom: '2px solid rgb(251, 245, 180)',
                paddingRight:"10px",
            }}>
                {stat_value}
            </td>
        </tr>
        
    )

}

export {StatField}