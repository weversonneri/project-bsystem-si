import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CustomRoute = ({ scope, ...rest }) => {
  const { loading, authenticated, permission } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log('autenticado', authenticated);
  console.log('autenticado', permission);

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};

export default CustomRoute;
