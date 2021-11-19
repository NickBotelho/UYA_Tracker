import React, { createRef, useState, useCallback } from "react";
import {StatField} from "./StatField.js";
import { categories } from "./extras.js";
//fields: player json, broad type of stats (general, CTF...)
function StatTable(props){
    const category = props.category
    console.log(category)
    
    let arr = []
    if (props.advanced == false && props.maps == false){

        for (let stat in categories[category]){
            arr.push(<StatField title = {categories[category][stat]['title']}
            category = {categories[category][stat]['category']} 
            stat = {categories[category][stat]['stat']} 
            player = {props.player} 
            address = {props.address}
            key = {stat}
            advanced = {false}
            maps = {false}/>)
        }
    }else if (props.maps == true){

        for (let stat in categories[category]){
            arr.push(<StatField title = {categories[category][stat]['title']}
            category = {categories[category][stat]['category']} 
            stat = {categories[category][stat]['stat']} 
            player = {props.player} 
            address = {props.address}
            key = {stat}
            advanced = {false}
            maps = {true}/>
            )
        }
    }
    else{

        for (let stat in categories[category]){
            arr.push(<StatField title = {categories[category][stat]['title']}
            category = {categories[category][stat]['category']} 
            stat = {categories[category][stat]['stat']} 
            player = {props.player} 
            address = {props.address}
            key = {stat}
            advanced = {true}
            maps = {false}/>
            )
        }
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
                    {category.replace("_"," ").toUpperCase()}
                </caption>
                <tbody>

                    {arr}
                      
                </tbody>
            </table>
        </div>
    )

}

export {StatTable}