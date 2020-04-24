import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Dashboard } from './Views/Dashboard';
import { Register } from './components/Register';
import { Login } from './components/Login';

export const App = () => {
  return (
    <Router>
      <div style={{ height: '100vh' }}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
     </div>
    </Router>
  );
};
