import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './../context/userContext';
import LoadingScreen from './commons/LoadingScreen/LoadingScreen';

const PrivateRoute = ({ children, ...rest }) => {
  const { state } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() =>
        state.loading ? (
          <LoadingScreen />
        ) : state.isLogin ? (
          children
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
