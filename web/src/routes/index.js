import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/dashboard';
import CustomRoute from './CustomRoute';
import { ResetForgotPassword } from '../pages/ResetForgotPassword';

function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/" component={Login} />
      <CustomRoute exact path="/register" component={Register} />
      <CustomRoute exact path="/reset-forgot-password" component={ResetForgotPassword} />
      <CustomRoute
        isPrivate
        path="/dashboard"
        component={Dashboard}
      />

    </Switch>
  );
}

export default Routes;
