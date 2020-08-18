import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePageComponent from '../modules/UserPage/HomePageComponent';
import Login from '../modules/Login/Login';
import LoginRoute from './LoginRoute';
import PrivateRoute from './PrivateRoute';

const initState = {};

export const RouteContext = React.createContext([{}, () => { }]);

export default ({ loggedIn }) => {
  const [user, setUser] = useState(initState);

  return (
    <RouteContext.Provider value={[user, setUser]}>
      <Router>
        <Switch>
          <LoginRoute loggedIn={loggedIn} exact path="/login" component={Login} />
          <PrivateRoute loggedIn={loggedIn} exact path='/' />
        </Switch>
      </Router>
    </RouteContext.Provider>
  );
}