import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chapters from './chapter/pages/Chapters';
import NewStrip from './strips/pages/NewStrip';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Chapters />
        </Route>
      </Switch>
    </Router>
  ); 
}

export default App;
