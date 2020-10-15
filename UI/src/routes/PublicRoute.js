import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => authed === false 
      ? <Component {...props} />
      : <Redirect to='/store' />}
    />
  );
}