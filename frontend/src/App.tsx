import React from 'react';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Dashboard } from './Views/Dashboard';

export const App = () => {
  return (
    <Router>
      <div style={{height: '100vh'}}>
      <Navbar />
      <Dashboard /></div>
    </Router>
  );
};
