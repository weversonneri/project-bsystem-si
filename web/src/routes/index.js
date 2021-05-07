import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import CustomRoute from './CustomRoute';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <CustomRoute scope path="/dashboard" component={Dashboard} />

    </Switch>
  );
}

export default Routes;
