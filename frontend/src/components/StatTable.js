import React, { createRef, useState, useCallback } from "react";
import {StatField} from "./StatField.js";
import { categories } from "./extras.js";
//fields: player json, broad type of stats (general, CTF...)
function StatTable(props){
    const category = props.category
    
    let arr = []
    for (let stat in categories[category]){
        arr.push(<StatField title = {categories[category][stat]['title']}
        category = {categories[category][stat]['category']} 
        stat = {categories[category][stat]['stat']} 
        player = {props.player} 
        address = {props.address}
        key = {stat}/>)
    }
    return (
        <div style = {{
            // border : "3px solid rgb(165,154,46)",
            
            display:"inline-block",
            border : "4px solid rgb(141,113,24)",

                    }}>
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
                    {category.toUpperCase()}
                </caption>
                <tbody>

                    {arr}
                      
                </tbody>
            </table>
        </div>
    )

}

export {StatTable}