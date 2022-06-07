import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Question from "../containers/System/Question";
import history from "../history";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                     
                </Switch>
            </Router>
        )
    }
}