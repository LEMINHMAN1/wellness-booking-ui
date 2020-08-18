import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {isEmpty} from 'lodash';
import HomeLayout from '../modules/Layout/HomeLayout';
import UserPage from '../modules/UserPage/HomePageComponent';
import AdminPage from '../modules/AdminPage/HomePageComponent';
import { RouteContext } from './routes';
import { isLoggedIn } from '../utils/AuthUtils';

export default ({ loggedIn, component: Component, ...rest }) => {
    const [user, setUser] = useContext(RouteContext);
    setUser(loggedIn);

    let Comp = UserPage;
    if(loggedIn.role === 'ADMIN') Comp = AdminPage;

    console.log(AdminPage)

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn(loggedIn)? // is authenticated
                    <HomeLayout user={loggedIn}>
                        <Comp {...props} />
                    </HomeLayout>
                    :
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        />
    )
}
