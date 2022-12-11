import React, { createRef, useState, useCallback } from "react";

function StatRow({ stat, value, isDesktop }) {
    return (
            <div style={{
                display: "flex",
                flexDirection: 'row',
                width:isDesktop ? '300px' : "150px"
                }}>

                <div style={{
                    textAlign: "left",
                    backgroundColor: "rgb(190, 177, 54)",
                    opacity: "0.8",
                    whiteSpace: "nowrap",
                    border : "3px solid rgb(141,113,24)",
                    borderBottom: "1.5px solid rgb(141,113,24)",
                    borderRight:"none",
                    cursor: 'pointer',
                    paddingLeft: "10px",
                    width:"50%"
                }} >
                    <p className ={isDesktop ? "text" : "text-mobile"}>{stat.toUpperCase()}</p>
                </div>
                <div style={{
                    textAlign: "right",
                    backgroundColor: "rgb(190, 177, 54)",
                    opacity: "0.8",
                    whiteSpace: "nowrap",
                    border : "3px solid rgb(141,113,24)",
                    borderBottom: "1.5px solid rgb(141,113,24)",
                    borderLeft:"none",
                    paddingRight: "10px",
                    cursor: 'pointer',
                    width:"50%"
                }} >
                    <p className = {isDesktop ? "text" : "text-mobile"}>{value != undefined ? value.toString().toUpperCase() : "0" }</p>
                </div>
            </div>
    )
}

export { StatRow }