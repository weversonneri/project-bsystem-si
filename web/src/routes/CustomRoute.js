import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// eslint-disable-next-line camelcase
const CustomRoute = ({ scope_id, ...rest }) => {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log('autenticado', authenticated);

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};

export default CustomRoute;
