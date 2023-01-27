import React from 'react';
import { Redirect, Switch, Route, Router } from 'react-router-dom';

import { history } from "history";

function Routes() {
    return (
        <Router history={history}>
            <Switch>
            </Switch>
        </Router>
        );
}

export default Routes