import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function RouterWrapp({
    component: Component,
    isPrivate,
    ...rest
}) {
    let logged = useSelector(state => state.LOGIN.logged)
    const signed = logged;

    if(!signed && isPrivate){
        return <Redirect to="/" />
    }
    return <Route {...rest} component={Component} />
}