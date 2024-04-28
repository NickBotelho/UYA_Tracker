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


function LiveHeatMap(props) {
    const radars = {
        'BakisiIsle': radarKisi,
        'AquatosSewers': radarSewers,
        "HovenGorge": radarHoven,
        "OutpostX12": radarX12,
        "KorgonOutpost": radarKorgon,
        "Metropolis": radarMetro,
        "BlackwaterCity": radarBwc,
        "CommandCenter": radarCommand,
        "BlackwaterDox": radarDox,
        "MarcadiaPalace": radarMarc,
    }
    const mapBounds = {
        //name: [left, right, bottom, top]
        'BakisiIsle': [9650, 40500, 11000, 40000],
        'AquatosSewers': [21685, 28487, 17589, 24391],
        "HovenGorge": [7900, 24300, 7200, 25500],
        "OutpostX12": [5000, 50000, 7200, 23200],
        "KorgonOutpost": [10300, 30500, 12172, 31500],
        "Metropolis": [40000, 57500, 12656, 30759],
        "BlackwaterCity": [8700, 19000, 7500, 26300],
        "CommandCenter": [19200, 23050, 21500, 25200],
        "BlackwaterDox": [10000, 19600, 10500, 19100],
        "MarcadiaPalace": [25700, 35700, 50500, 60500],
    }
    const radarBounds = {
        //[[desktop], [mobile]]
        //[xMax, yMax]
        'BakisiIsle':[[300,300],[200,200]],
        'AquatosSewers':[[300,300],[200,200]],
        "HovenGorge":[[300,300],[200,200]],
        "OutpostX12":[[300,300],[200,200]],
        "KorgonOutpost":[[300,300],[200,200]],
        "Metropolis":[[300,300],[200,200]],
        "BlackwaterCity":[[300,300],[200,200]],
        "CommandCenter":[[300,300],[200,200]],
        "BlackwaterDox":[[300,300],[200,200]],
        "MarcadiaPalace":[[300,300],[200,200]],

    }
    function convert(coords, map) {
        /**
         * coords = [x,y]
         */
        const bias = 10
        var edges = mapBounds[map]
        var xDist = edges[1] - edges[0]
        var xPercent = (coords.X - edges[0]) / xDist
        var radrBounds = props.isDesktop ? radarBounds[map][0][0] : radarBounds[map][1][0]
        var xPlot = Math.floor(radrBounds * xPercent)
        edges = mapBounds[map]
        var yDist = edges[3] - edges[2]
        var yPercent = (coords.Y - edges[2]) / yDist
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
                <img src= {kill == true ? "../../server/build//ryno.png" : "../../server/build//skull.png" }
                    height={props.isDesktop?"10":"5"} width={props.isDesktop?"10":"5"}
                    style={{
                        userSelect: "none",
                        marginLeft: `${radarPoints[0]}px`,
                        marginTop: `${radarPoints[1]}px`,
                        filter: `${kill == true? colors['kill'] : colors['death'] }`,
                        top:"10%",
                        left:"8%",
                        position: 'absolute',
                    }} />
            </div>)
        }
        return res
    }
    let killPoints = null
    let deathPoints = null
    if (props.kills != null){
        let killPoints = plot(props.kills, true)
    }

    if (props.deaths != null){
        let deathPoints = plot(props.deaths, false)
    }
    return (
        <div style={{
            zIndex: "1",
        }}>
            <img src={radars[props.map]}
                height={props.isDesktop ? '300px' : '200px'} width={props.isDesktop ? '300px' : '200px'}
                style={{
                    top:"10%",
                    left:"8%",
                    position:'absolute'
                }} />
                {killPoints }
                {deathPoints}
        </div>
    )

}

export { LiveHeatMap }