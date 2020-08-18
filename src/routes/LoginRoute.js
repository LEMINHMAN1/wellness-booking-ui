import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoggedIn } from '../utils/AuthUtils';

export default ({ loggedIn, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                !isLoggedIn(loggedIn) ?  // is not authenticated
                    <Component {...props} />
                    :
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
        />
    )
}
