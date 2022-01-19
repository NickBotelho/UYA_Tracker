import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import {HomePage} from "./components/homepage.js";
import {PlayerProfile} from "./components/PlayerProfile.js";
import {Leaderboards} from "./components/Leaderboards";
import {GameHistory} from './components/GameHistory';
import {DetailedGame} from './components/DetailedGame';
import {AnalyticsPage} from './components/AnalyticsPage';

function Routing(props) {
    const navRoutes={
        homepage:"/home",
        player_profile:"/players",
        leaderboards:"/leaderboards",
        gamehistory:'/gamehistory',
        detailedgame:'/detailedgame',
        analytics:'/analytics',
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


                        <Route component={HomePage} />              
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export { Routing };