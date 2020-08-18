import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import RoutesComponent from './routes/routes';
import { loggedHandler } from './utils/AuthUtils';

const routerHandler = async (loggedIn) => {
  ReactDOM.render(
    <RoutesComponent loggedIn={loggedIn} />
    ,
    document.getElementById('root')
  )
}

loggedHandler(

  // Logged in
  (user) => routerHandler(user),

  // Not logged in
  () => routerHandler(false),

)


registerServiceWorker();

