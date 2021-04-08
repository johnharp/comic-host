import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Strips from './strips/pages/Strips';
import NewStrip from './strips/pages/NewStrip';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Strips />
        </Route>
        <Route path="/strips/new" exact>
          <NewStrip />
        </Route>
      </Switch>
    </Router>
  ); 
}

export default App;
