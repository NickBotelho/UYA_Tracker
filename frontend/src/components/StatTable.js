import React, { createRef, useState, useCallback } from "react";
import {StatField} from "./StatField.js";
import { categories } from "./extras.js";
//fields: player json, broad type of stats (general, CTF...)
function StatTable(props){
    const category = props.category
    let arr = []

    if (props.advanced == false && props.maps == false && props.maps == false && props.medals == false){

        for (let stat in categories[category]){
            arr.push(<StatField title = {categories[category][stat]['title']}
            category = {categories[category][stat]['category']} 
            stat = {categories[category][stat]['stat']} 
            player = {props.player} 
            address = {props.address}
            key = {stat}
            medals = {false}
            streaks = {false}
            advanced = {false}
            maps = {false}/>)
        }
    }else if (props.maps != null && props.maps == true){

        for (let stat in categories[category]){
            arr.push(<StatField title = {categories[category][stat]['title']}
            category = {categories[category][stat]['category']} 
            stat = {categories[category][stat]['stat']} 
            player = {props.player} 
            address = {props.address}
            key = {stat}
            medals = {false}
            advanced = {false}
            streaks = {false}
            maps = {true}/>
            )
        }
    }
    else if (props.streaks != null && props.streaks == true){

        for (let stat in categories[category]){
            arr.push(<StatField title = {categories[category][stat]['title']}
            category = {categories[category][stat]['category']} 
            stat = {categories[category][stat]['stat']} 
            player = {props.player} 
            address = {props.address}
            key = {stat}
            advanced = {false}
            maps = {false}
            streaks = {true}
            medals = {false}
            />
            )
        }
    }
    else if (props.medals != null && props.medals == true){
        for (let stat in categories[category]){
            arr.push(<StatField title = {categories[category][stat]['title']}
            category = {categories[category][stat]['category']} 
            stat = {categories[category][stat]['stat']} 
            player = {props.player} 
            address = {props.address}
            key = {stat}
            advanced = {false}
            maps = {false}
            streaks = {false}
            medals = {true}/>
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
    console.log(arr.length > 15 ? '400px' : 'auto')
    return (
        <div style = {{
            // border : "3px solid rgb(165,154,46)",
            
            display:"inline-block",
            border : "4px solid rgb(141,113,24)",

                    }}>
            <table style = {{
                fontSize:'20pt',
                color: 'rgb(141,113,24)',
                width:arr.length > 15 ? "auto" : '300px',
                height: arr.length > 15 ? '400px' : 'auto',
                letterSpacing:"-1.5px",
                borderCollapse:"collapse",
                fontWeight:"bolder",
                textShadow:"1px 1px 1px black",
                display: arr.length > 15 ? "block" : 'inline',
                scrollBehavior:"smooth",
                scrollbarWidth:"5px",
                overflowX:"hidden",
                overflowY:"scroll",
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