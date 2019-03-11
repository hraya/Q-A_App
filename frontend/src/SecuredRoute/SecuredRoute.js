import React from 'react';
import { Route } from 'react-router-dom';
// import auth0Client from '../components/Auth.js';

const SecuredRoute = props => {
  const { component: Component, path, checkingSession } = props;
  return (
    <Route
      path={path}
      render={() => {
        if (checkingSession) {
         return <h3 className="text-center">Validating session...</h3>
        }
        return <Component />;
      }}
    />
  );
};

export default SecuredRoute;
