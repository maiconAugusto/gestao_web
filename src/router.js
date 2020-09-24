import React from 'react';
import {BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';
import Login from './pages/Login/Login.js';
import Home from './pages/home/index';
import Add from './pages/add/index';
import Remove from './pages/remove/index';
import Search from './pages/search/index';
import Setup from './pages/setup/index';

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" component={Home} isPrivate />
                <Route path="/add" component={Add} isPrivate />
                <Route path="/remove" component={Remove} isPrivate />
                <Route path="/search" component={Search} isPrivate />
                <Route path="/setup" component={Setup} isPrivate />
            </Switch>
        </BrowserRouter>
    );
}