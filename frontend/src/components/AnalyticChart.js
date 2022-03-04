import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { graph_keys } from "./extras";

import {Bar} from "react-chartjs-2"

function AnalyticChart(props){
    let [information, setData] = useState(null);

    if (information !=  null && information.category == props.category && information.graph_key != graph_keys[props.stat]){
        setData(null)
    }
    else if(information != null && information.category != props.category){
        setData(null)
    }
    async function getGraphData(){
        const request = await fetch(`${props.address}/api/graphs/${props.graph_key}/${props.category}`,{
            method: "GET",
                headers:  {
                    'Content-Type': "application/json; charset=utf-8",
                    Accept: "application/json",
                    "Cache-Control": "no-cache",

                },
                credentials: "include",
        })
        const data = await request.json()
        setData({
            data:data,
            category:props.category,
            graph_key:props.graph_key
            }
        )
    }
    if (information == null){
        getGraphData()
    }
 
    if (information==null){
        
        return <div style = {{
            position:'fixed',
            top:"50%",
            left:"50%",
            transform :"translate(-50%, -50%)",
            border: "8pt solid rgb(92, 73, 0)",
            maxHeight:'250px',
            minHeight:'250px',
        }}>
            <img src = "../../static/images/loading_circle.gif"
            height = '253' width = '255'></img>
        </div>
    }
    return(
        <div>
            <Bar data = {{
                labels:information.data["x"],
                datasets:[
                    {
                        label:information.data['title'],
                        data:information.data["y"],
                        backgroundColor:'rgba(190, 177, 54, 0.85)',
                        borderColor:'rgb(141,113,24)',
                        borderWidth:3
                    }
                ],
            }}
                height={props.isDesktop? 700: 390}
                width = {props.isDesktop? 1200: 350}
                options={{
                    maintainAspectRatio: false,
                    scales:{
                        x:{
                            ticks:{
                                color:'rgb(229, 197, 102)',
                                font:{
                                    size: props.isDesktop? 20: 12
                                }
                            },
                            // title:{
                            //     display: true,
                            //     text:information.data['xlabel'],
                            //     color:'white',
                            //     font:{
                            //         size:35
                            //     }
                            // },
                            grid: {
                                display: false,
                                
                            }
                        },
                        y:{
                            ticks:{
                                color:'rgb(229, 197, 102)',
                                display: props.isDesktop? true: false,

                                font:{
                                    size: props.isDesktop? 18: 10
                                }
                            },
                            title:{
                                display: props.isDesktop? true: true,
                                text:information.data['ylabel'],
                                color:'rgb(229, 197, 102)',
                                font:{
                                    size: props.isDesktop? 35: 15
                                }

                            },
                            grid: {
                                display: true,
                                color:'rgb(141,113,24)'
                                
                            }
                        },
                        
                    },
                    plugins: {
                        legend: {
                          labels: {
                            color:'rgb(229, 197, 102)',
                            font:{
                                size: props.isDesktop? 18: 12
                            }
                          },
                          

                        },
                        title: {
                            display: true,
                            text: `${props.category.toUpperCase()} ${props.stat.toUpperCase()}`,
                            color:'rgb(229, 197, 102)',
                            font:{
                                size: props.isDesktop? 18: 12
                            }
                          }
                      }
                }}
            />
        </div>
    )
}
export {AnalyticChart}