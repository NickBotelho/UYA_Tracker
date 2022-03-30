import React, { createRef, useState, useCallback } from "react";
import { Redirect } from "react-router";
import { Chart as ChartJS} from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { graph_keys } from "./extras";

import {Scatter} from "react-chartjs-2"
import {hRadar} from "./extras.js";
import m from '../../static/images/hovenRadar.png'
function LiveMap2(props){
    
    const data = {
        labels: 'hi',
        datasets: [{
          data: [{
                x: 10,
                y: 20
            }, {
                x: 15,
                y: 10
            }],
          backgroundColor: [
            'rgba(10,10,10, 0.2)'
          ],
          borderColor: [

            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };
    const options = {
        scales: {
            y: {
            beginAtZero: true,
            },
            
        },
        plugins: {
            backgroundColor: "#F5DEB3",

            xAxes: {
                display: false
              },
            legend: {
              display: false
            },
            title: {
                display: false,
              },

          }
        };
    return (
        <div style = {{

            // backgroundImage : `url(${m})`,
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: '300px 300px',
            height:"300px",
            width:"300px",
        }}>
            <Scatter data = {
                data
            }
            height={props.isDesktop? 500: 390}
            width = {props.isDesktop? 500: 350}
            options = {options}
            />
        </div>
    )
}
export {LiveMap2}