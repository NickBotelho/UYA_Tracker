import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import {HomePage} from "./components/homepage.js";
import {PlayerProfile} from "./components/PlayerProfile.js";
import {Leaderboards} from "./components/Leaderboards";
import {GameHistory} from './components/GameHistory';
import {DetailedGame} from './components/DetailedGame';
import {AnalyticsPage} from './components/AnalyticsPage';
import {Live} from './components/Live'
import {LiveGame} from './components/LiveGame'
import {Streams} from './components/Streams'
import {Medals} from './components/Medals'
import {Information} from './components/Information'
import {LiveAutoPlayer} from './components/LiveAutoPlayer'
import {Clans} from './components/Clans'
function Routing(props) {
    const navRoutes={
        homepage:"/home",
        player_profile:"/players",
        leaderboards:"/leaderboards",
        gamehistory:'/gamehistory',
        detailedgame:'/detailedgame',
        analytics:'/analytics',
        live:'/live',
        game:'/game',
        stream:'/streams',
        medals:'/medals',
        information:'/info',
        autoplayer:'/autoplayer',
        clans:'/clans'
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "80px",
            }}
        >
            <Router>
                <div style={{ width: "100%" }}>
                    <Switch>
                        
                        <Route exact path={navRoutes.player_profile} component={PlayerProfile}/>
                        <Route exact path={navRoutes.leaderboards} component={ Leaderboards }/>    
                        <Route exact path={navRoutes.gamehistory} component={ GameHistory }/> 
                        <Route exact path={navRoutes.detailedgame} component={ DetailedGame }/>    
                        <Route exact path={navRoutes.analytics} component={ AnalyticsPage }/>    
                        <Route exact path={navRoutes.live} component={ Live }/>    
                        <Route exact path={navRoutes.game} component={ LiveGame }/>
                        <Route exact path={navRoutes.medals} component={ Medals }/>
                        <Route exact path={navRoutes.stream} component = {Streams}/>
                        <Route exact path={navRoutes.information} component = {Information}/>
                        <Route exact path={navRoutes.autoplayer} component = {LiveAutoPlayer}/>
                        <Route exact path={navRoutes.clans} component = {Clans}/>


                        <Route component={HomePage} />              
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export { Routing };