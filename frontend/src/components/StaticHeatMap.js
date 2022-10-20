import React, { createRef, useState, useCallback, useEffect } from "react";
import radarKisi from '../../static/images/radars/kisi.png'
import radarHoven from '../../static/images/radars/hoven.png'
import radarX12 from '../../static/images/radars/x12.png'
import radarKorgon from '../../static/images/radars/korgon.png'
import radarMetro from '../../static/images/radars/metro.png'
import radarBwc from '../../static/images/radars/bwc.png'
import radarCommand from '../../static/images/radars/command.png'
import radarSewers from '../../static/images/radars/sewers.png'
import radarDox from '../../static/images/radars/dox.png'
import radarMarc from '../../static/images/radars/marcadia.png'

//props need map, kills as kill heat map, deaths as death heatmap, isDesktop
function StaticHeatMap(props) {
    const radars = {
        'Bakisi_Isle': radarKisi,
        'Aquatos_Sewers': radarSewers,
        "Hoven_Gorge": radarHoven,
        "Outpost_x12": radarX12,
        "Korgon_Outpost": radarKorgon,
        "Metropolis": radarMetro,
        "Blackwater_City": radarBwc,
        "Command_Center": radarCommand,
        "Blackwater_Dox": radarDox,
        "Marcadia_Palace": radarMarc,
    }
    const mapBounds = {
        //name: [left, right, bottom, top]
        'Bakisi_Isle': [9650, 40500, 11000, 40000],
        'Aquatos_Sewers': [21685, 28487, 17589, 24391],
        "Hoven_Gorge": [7900, 24300, 7200, 25500],
        "Outpost_x12": [5000, 50000, 7200, 23200],
        "Korgon_Outpost": [10300, 30500, 12172, 31500],
        "Metropolis": [40000, 57500, 12656, 30759],
        "Blackwater_City": [8700, 19000, 7500, 26300],
        "Command_Center": [19200, 23050, 21500, 25200],
        "Blackwater_Dox": [10000, 19600, 10500, 19100],
        "Marcadia_Palace": [25700, 35700, 50500, 60500],
    }
    const radarBounds = {
        //[[desktop], [mobile]]
        //[xMax, yMax]
        'Bakisi_Isle':[[700,700],[250,250]],
        'Aquatos_Sewers':[[700,700],[250,250]],
        "Hoven_Gorge":[[700,700],[250,250]],
        "Outpost_x12":[[700,700],[250,250]],
        "Korgon_Outpost":[[700,700],[250,250]],
        "Metropolis":[[700,700],[250,250]],
        "Blackwater_City":[[700,700],[250,250]],
        "Command_Center":[[700,700],[250,250]],
        "Blackwater_Dox":[[700,700],[250,250]],
        "Marcadia_Palace":[[700,700],[250,250]],

    }
    function convert(coords, map) {
        /**
         * coords = [x,y]
         */
        const bias = 10
        var edges = mapBounds[map]
        var xDist = edges[1] - edges[0]
        var xPercent = (coords[0] - edges[0]) / xDist
        var radrBounds = props.isDesktop ? radarBounds[map][0][0] : radarBounds[map][1][0]
        var xPlot = Math.floor(radrBounds * xPercent)
        edges = mapBounds[map]
        var yDist = edges[3] - edges[2]
        var yPercent = (coords[1] - edges[2]) / yDist
        radrBounds = props.isDesktop ? radarBounds[map][0][1] : radarBounds[map][1][1]
        var yPlot = Math.floor(radrBounds * yPercent + bias)

        return [xPlot, radrBounds - yPlot]
    }
    const colors = {
        'kill':'invert(66%) sepia(61%) saturate(5702%) hue-rotate(86deg) brightness(122%) contrast(121%)',
        'death':'invert(20%) sepia(94%) saturate(7375%) hue-rotate(7deg) brightness(110%) contrast(125%)'
    }
    function plot(coords, kill) {
        let res = []
        for (let i = 0; i < coords.length; i++) {
            let radarPoints = convert(coords[i], props.map)
            res.push(<div key={i}>
                <img src= {kill == true ? '../../static/images/ryno.png' : '../../static/images/skull.png'}
                    height={props.isDesktop?"25":"10"} width={props.isDesktop?"25":"10"}
                    style={{
                        userSelect: "none",
                        marginLeft: `${radarPoints[0]}px`,
                        marginTop: `${radarPoints[1]}px`,
                        filter: `${kill == true? colors['kill'] : colors['death'] }`,
                        position: 'absolute',
                    }} />
            </div>)
        }
        return res
    }
    let killPoints = plot(props.kills, true)
    let deathPoints = plot(props.deaths, false)
    return (
        <div style={{
            zIndex: "10",
            position:'absolute',
            top:"10%",
            left:props.isDesktop ? "2%" : "15%",

        }}>
            <img src={radars[props.map]}
                height={props.isDesktop ? '700px' : '250px'} width={props.isDesktop ? '700px' : '250px'}
                style={{
                    border: '2px solid  rgb(229, 197, 102)',

                    position:'absolute'
                }} />
                {killPoints}
                {deathPoints}
        </div>
    )

}

export { StaticHeatMap }