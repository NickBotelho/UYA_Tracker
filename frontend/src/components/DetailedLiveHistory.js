import React, { createRef, useState, useCallback, useEffect } from "react";
import { StaticHeatMap } from './StaticHeatMap'
import { WeaponBreakdown } from './WeaponBreakdown'
function DetailedLiveHistory(props) {
    const hide = (e) => {
        ref.current.style.visibility = "hidden"
    }
    let [gunDetails, updateGun] = useState("PICK A WEAPON")
    const filters = {
        'v1': "invert(100%) sepia(100%) saturate(0%) hue-rotate(215deg) brightness(109%) contrast(102%)",
        'v2': 'invert(10%) sepia(100%) saturate(6489%) hue-rotate(243deg) brightness(94%) contrast(141%)'
    }
    const displayNames = (names) => {
        let res = []
        for (let name in names) {
            if (names[name] > 0) {
                res.push(<h5 key={name}>{name}: {names[name]}</h5>)

            }
        }
        return res
    }
    let imageRef = createRef()
    const toggleOn = () => {
        imageRef.current.style.filter = filters['v2']
    }
    const toggleOff = () => {
        imageRef.current.style.filter = filters['v1']
    }
    const weapons = ["Flux", "Blitz", "GravityBomb", "MorphORay", "Mines", "Rockets", "LavaGun", "N60"]
    const weaponInfo = () => {
        let res = []
        for (let key in props.info["weapons"]) {
            if (weapons.includes(key)) {
                res.push(
                    <WeaponBreakdown info={props.info["weapons"][key]} weapon={key} updateGun={updateGun} isDesktop={props.isDesktop} key={key}/>
                )
            }

        }
        return res
    }
    let infoRef = createRef()
    const showInfo = () => {
        infoRef.current.style.visibility = "visible"
    }
    const hideInfo = () => {
        infoRef.current.style.visibility = "hidden"
    }
    let medalRef = createRef()
    const showMedals = () => {
        medalRef.current.style.visibility = "visible"
    }
    const hideMedals = () => {
        medalRef.current.style.visibility = "hidden"
    }
    let weaponRes = props.info != null ? weaponInfo() : null
    let ref = createRef()
    if (props.info == null) {
        return (
            <div ref={ref} style={{
                marginTop: '10px',
                height: props.isDesktop ? '800px' : '600px',
                // width: props.isDesktop ? '1000px' : '125px',
                width: "90%",
                borderColor: "black",
                border: '2px solid  rgb(229, 197, 102)',

                textAlign: "right",
                background: `rgb(118,83,25)`,
                color: "rgb(225,218,113)",
                textShadow: '2px 2px 2px black',
                fontSize: props.isDesktop ? "18pt" : '12pt',
                visibility: "hidden",
                zIndex: "10",
                position: "absolute",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "center",
                left: '5%',
                top: '20%',

            }}>
                <div>
                    <img src= "../../server/build//x.png" height={props.isDesktop ? '80px' : '80px'}
                        width={props.isDesktop ? '80px' : '80px'} onMouseDown={hide}
                        style={{
                            left: "0%",
                            top: "0%",
                            position: "absolute"
                        }}></img>
                </div>

                <div>

                    <div style={{
                        fontSize: props.isDesktop ? "30pt" : "15pt",
                        textAlign: "center",
                        color: 'rgb(229, 197, 102)',
                        textShadow: '6px 4px 4px black',
                        position: 'absolute',
                        top: "40%",
                        left: props.isDesktop ? "20%" : "10%"
                    }}>
                        <h2>LEGACY GAME
                            LIVE STATS NOT AVAILABLE
                        </h2>
                    </div>

                </div>
            </div>
        )
    }
    return (
        <div ref={ref} style={{
            marginTop: '10px',
            height: props.isDesktop ? '825px' : '800px',
            // width: props.isDesktop ? '1000px' : '125px',
            width: props.isDesktop ? '1300px' : '350px',
            border: '2px solid  rgb(229, 197, 102)',
            textAlign: "right",
            background: `rgb(118,83,25)`,
            color: "rgb(225,218,113)",
            textShadow: '2px 2px 2px black',
            fontSize: props.isDesktop ? "18pt" : '12pt',
            visibility: "hidden",
            zIndex: "10",
            position: "absolute",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "center",
            left: props.isDesktop ? '50%' : '50%',
            top: props.isDesktop ? '50%' : "50%",
            transform: "translate(-50%, -50%)"


        }}>
            <div>
                <img ref={imageRef} src="../../server/build//x.png" height={props.isDesktop ? '80px' : '60px'}
                    width={props.isDesktop ? '80px' : '60px'} onMouseDown={hide} onMouseOver={toggleOn} onMouseLeave={toggleOff}
                    style={{
                        left: "0%",
                        top: "0%",
                        position: "absolute",
                        filter: `${filters['v1']}`
                    }}></img>
            </div>
            <div>
                <div height={props.isDesktop ? '80px' : '80px'}
                    width={props.isDesktop ? '80px' : '80px'} onMouseDown={showMedals}
                    style={{
                        right: props.isDesktop ? "17%" : '0%',
                        top: props.isDesktop ? "0%" : "5%",
                        position: "absolute",
                        border: '3px solid  rgb(200, 190, 95)',
                        fontSize: props.isDesktop ? "30pt" : "13pt",
                    }}>
                    MEDALS
                </div>
                <div ref={medalRef} style={{
                    marginTop: '10px',
                    height: props.isDesktop ? '825px' : '600px',
                    width: props.isDesktop ? "315px" : "85%",
                    borderColor: "black",
                    border: '2px solid  rgb(229, 197, 102)',
                    textAlign: "center",
                    background: `rgb(100,83,25)`,
                    color: "rgb(225,218,113)",
                    textShadow: '2px 2px 2px black',
                    fontSize: props.isDesktop ? "22pt" : '14pt',
                    visibility: "hidden",
                    zIndex: "15",
                    position: "absolute",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    left: props.isDesktop ? '50%' : "50%",
                    top: props.isDesktop ? '50%' : "50%",
                    transform: "translate(-50%, -50%)"

                }}>
                    <img ref={imageRef} src="../../server/build//x.png" height={props.isDesktop ? '60px' : '30px'}
                    width={props.isDesktop ? '60px' : '30px'} onMouseDown={hideMedals}
                    style={{
                        right: "0%",
                        top: "0%",
                        position: "absolute",
                        filter: `${filters['v1']}`
                    }}></img>
                    <h2>MEDALS:</h2>
                    <p>Nuke: {props.info['medals']['nuke']}</p>
                    <p>Brutal: {props.info['medals']['brutal']}</p>
                    <p>Relentless: {props.info['medals']['relentless']}</p>
                    <p>Undying: {props.info['medals']['undying']}</p>
                    <p>Merciless: {props.info['medals']['merciless']}</p>
                    <p>Bloodthirsty: {props.info['medals']['bloodthirsty']}</p>

                    <p>Distributor: {props.info['medals']['distributor']}</p>
                    <p>Brutalized: {props.info['medals']['brutalized']}</p>
                    <p>Thickskulled: {props.info['medals']['thickskulled']}</p>
                    <p>Bloodfilled: {props.info['medals']['bloodfilled']}</p>

                    <p>Radioactive: {props.info['medals']['radioactive']}</p>
                    <p>Shifty: {props.info['medals']['shifty']}</p>
                    <p>LockOn: {props.info['medals']['lockon']}</p>
                    <p>Olympiad: {props.info['medals']['olympiad']}</p>
                    <p>Dropper: {props.info['medals']['dropper']}</p>
                    <p>RatFuck: {props.info['medals']['ratfuck']}</p>
                    <p>HealthRunner: {props.info['medals']['healthrunner']}</p>
                    <p>Untouchable: {props.info['medals']['untouchable']}</p>
                    <p>MachineGun: {props.info['medals']['machinehgun']}</p>
                    <p>HeatingUp: {props.info['medals']['heatingup']}</p>

                </div>
                <div height={props.isDesktop ? '80px' : '80px'}
                    width={props.isDesktop ? '80px' : '80px'} onMouseDown={showInfo}
                    style={{
                        right: "0%",
                        top: "0%",
                        position: "absolute",
                        border: '3px solid  rgb(200, 190, 95)',
                        fontSize: props.isDesktop ? "30pt" : "13pt",
                    }}>
                    MORE INFO
                </div>
                <div ref={infoRef} style={{
                    marginTop: '10px',
                    height: props.isDesktop ? '825px' : '1000px',
                    width: props.isDesktop ? "75%" : "95%",
                    borderColor: "black",
                    border: '2px solid  rgb(229, 197, 102)',
                    textAlign: "left",
                    background: `rgb(100,83,25)`,
                    color: "rgb(225,218,113)",
                    textShadow: '2px 2px 2px black',
                    fontSize: props.isDesktop ? "16pt" : '12pt',
                    visibility: "hidden",
                    zIndex: "15",
                    position: "absolute",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    left: props.isDesktop ? '50%' : '50%',
                    top: props.isDesktop ? '50%' : "50%",
                    transform: "translate(-50%, -50%)"

                }}>
                    <img ref={imageRef} src="../../server/build//x.png" height={props.isDesktop ? '60px' : '30px'}
                    width={props.isDesktop ? '60px' : '30px'} onMouseDown={hideInfo}
                    style={{
                        right: "0%",
                        top: "0%",
                        position: "absolute",
                        filter: `${filters['v1']}`
                    }}></img>
                    <h2>General Information</h2>
                    <ul>
                        <li>1 distance unit is an "X12". 1 X12 is defined as going from the red base pad to the blue base pad on Outpost x12</li>
                        <li>A Nik is defined as a flux shot that deals less than the full amount of damage, unless it is a killing shot. Shots that hit the floot and do splash damage are not tracked as a Nik.</li>
                        <li>Kill chart shows the distribution of who the player killed during the game</li>
                        <li>Death chart shows the distribution of who killed the player during the game</li>
                        <li>Icons on the map are defined as follows: green ryno is where the player killed someone. The red skull indicates where the player was killed by another player. The blue skull indicates where the player died to a non player (suicides, troopers, etc.)</li>
                    </ul>

                    <h2>Medal Definitions</h2>
                    <ul>
                        <li>Nuke = 35 Kill streak</li>
                        <li>Brtual = 25 Kill streak</li>
                        <li>Relentless = 20 Kill streak</li>
                        <li>Undying = 15 Kill streak</li>
                        <li>Merciless = 10 Kill streak</li>
                        <li>Bloodthirsty = 5 Kill streak</li>
                        <li>Distributor = 35 Death streak</li>
                        <li>Brutalized = 25 Death streak</li>
                        <li>Thickskull = 15 Death streak</li>
                        <li>Bloodfilled = 5 Death streak</li>
                        <li>Radioactive = A single kill after dropping a nuke on the same life</li>
                        <li>Shify = Getting back to back caps without dying</li>
                        <li>LockOn = Hitting 5 consecutive flux shots on players without missing</li>
                        <li>Juggernaut = Make a jug from scratch in a single life</li>
                        <li>Dropper = Drop the flag and kill a player within 10 seconds</li>
                        <li>RatFuck = Consume 5 packs that contain a v2 in the same life</li>
                        <li>Healthrunner = Consume 5 HP boxes in a single life</li>
                        <li>HeatingUp = Hit 3 flux shots in a row without missing</li>
                        <li>Untouchable = Cap a flag without taking any damage</li>
                        <li>MachineGun = Kill 4 enemies in 15 seconds</li>
                    </ul>
                </div>
            </div>

            <StaticHeatMap map={props.map} kills={props.info['killHeatMap']} deaths={props.info['deathHeatMap']}
                isDesktop={props.isDesktop} />

            <div>

                <div style={{
                    fontSize: props.isDesktop ? "30pt" : "12pt",
                    textAlign: "center",
                    color: 'rgb(229, 197, 102)',
                    textShadow: '6px 4px 4px black',
                    position: 'absolute',
                    top: "0%",
                    left: props.isDesktop ? "35%" : "25%"
                }}>
                    <h2>{props.name}</h2>
                </div>

            </div>

            <div style={{
                fontSize: props.isDesktop ? "19pt" : "11pt",
                textAlign: "center",
                color: 'rgb(229, 197, 102)',
                textShadow: '6px 4px 4px black',
                position: 'absolute',
                top: "1%",
                left: props.isDesktop ? "60%" : "10%",
                top: props.isDesktop ? "0%" : "30%",
                marginTop: "60px"
            }}>
                <p>KILLS: {props.info['kills']} ({props.info["kill_info"]["best_killstreak"]} STREAK)</p>
                <p style={{ marginBottom: "20px" }}>DEATHS: {props.info['deaths']} ({props.info["death_info"]["best_deathstreak"]} STREAK)</p>
                <p>DISTANCE TRAVELLED WITH FLAG:{props.info["flag_distance"]}</p>
                <p>DISTANCE TRAVELLED WITHOUT FLAG: {props.info["noFlag_distance"]}</p>
                <p>FLAG PICKSUP: {props.info["flag_pickups"]}</p>
                <p>FLAG CAPS: {props.info['caps']}</p>
                <p>FLAG DROPS: {props.info["flag_drops"]}</p>
                <p>HEALTH BOXES GRABBED: {props.info['health_boxes']}</p>

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    marginTop: "30px",
                    marginBottom: '30px'
                }}>
                    {weaponRes}

                </div>
                <div style={{
                    fontSize: props.isDesktop ? "19pt" : "11pt",
                    marginTop: "30px",
                    marginBottom: "30px"
                }}>
                    {gunDetails}
                </div>
                <p>TOTAL NIKS GIVEN {props.info['nicks_given']}</p>
                <p>TOTAL NIKS RECEIVED {props.info['nicks_received']}</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-evenly",
                    marginTop: "25px"
                }}>
                    <div>
                        <h3>KILL CHART</h3>
                        {displayNames(props.info['kill_info']['player_kill_map'])}
                    </div>
                    <div>
                        <h3>DEATH CHART</h3>
                        {displayNames(props.info['death_info']['player_death_map'])}
                    </div>
                </div>
            </div>

        </div>
    )

}

export { DetailedLiveHistory }