import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/dashboard';
import CustomRoute from './CustomRoute';

function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/" component={Login} />
      <CustomRoute exact path="/register" component={Register} />
      <CustomRoute
        isPrivate
        path="/dashboard"
        component={Dashboard}
      />

    </Switch>
  );
}

export default Routes;
