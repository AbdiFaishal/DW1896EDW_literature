import React, { useEffect, useContext } from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { API, setAuthToken } from './config/api';
import Landing from './pages/Landing/Landing';
import { UserContext } from './context/userContext';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import Profile from './pages/Profile/Profile';
import MyCollection from './pages/MyCollection/MyCollection';
import AddLiterature from './pages/AddLiterature/AddLiterature';
import Detail from './pages/Detail/Detail';
import Admin from './pages/Admin/Admin';
import NotFound from './pages/NotFound/NotFound';

// if token available in localstorage then set default header for auth
if (localStorage.token) setAuthToken(localStorage.token);

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <PrivateRoute exact path="/home">
        <Home />
      </PrivateRoute>
      <PrivateRoute exact path="/search">
        <Search />
      </PrivateRoute>
      <PrivateRoute exact path="/profile">
        <Profile />
      </PrivateRoute>
      <PrivateRoute exact path="/my-collection">
        <MyCollection />
      </PrivateRoute>
      <PrivateRoute exact path="/add-literature">
        <AddLiterature />
      </PrivateRoute>
      <PrivateRoute exact path="/detail/:id">
        <Detail />
      </PrivateRoute>
      <PrivateRouteAdmin exact path="/admin">
        <Admin />
      </PrivateRouteAdmin>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};
function App() {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get('/auth');
        // console.log('res: ', res);
        dispatch({
          type: 'USER_LOADED',
          payload: res.data.data.user,
        });
      } catch (err) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    };
    loadUser();
  }, []);
  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
