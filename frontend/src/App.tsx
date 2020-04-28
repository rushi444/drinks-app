import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Dashboard } from './Views/Dashboard';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import { CreateRecipe } from './components/CreateRecipe';

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div style={{ height: '100vh' }}>
        <Navbar loggedIn={loggedIn} />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/register' component={Register} />
          <Route
            exact
            path='/login'
            render={(props) => <Login {...props} setLoggedIn={setLoggedIn} />}
          />
         <Route exact path='/createrecipe' component={CreateRecipe} />
        </Switch>
      </div>
    </Router>
  );
};
