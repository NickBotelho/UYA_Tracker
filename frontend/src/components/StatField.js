import React, { createRef, useState, useCallback } from "react";

//prop fields : player, stat (field of player dict)
function StatField(props){
    // console.log(props.advanced, props.streaks, props.maps, props.medals)
    if (props.advanced == true){
        var stat_value = props.player.advanced_stats[props.category][props.stat]
    }
    else if (props.streaks == true){
        var stat_value = props.player.advanced_stats.streaks[props.category][props.stat]
    }
    else if (props.maps == true){
        var stat_value = props.player.advanced_stats.per_gm[props.category][props.stat]
    }
    else if (props.medals == true){
        var stat_value = props.player.advanced_stats.live[props.category][props.stat]
    }
    else{
        var stat_value = props.player.stats[props.category][props.stat]

    }

    return (
        
        <tr style = {{
            lineHeight:"35px",
        }}>
            <td
            style ={{
                textAlign:"left",
                backgroundColor:"rgb(190, 177, 54)",
                opacity:"0.8",
                whiteSpace:"nowrap",
                borderBottom: '2px solid rgb(251, 245, 180)',
                paddingLeft:"10px",
                width:'150px'

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
                width:'150px'

            }}>
                {stat_value}
            </td>
        </tr>
        
    )

}

export {StatField}