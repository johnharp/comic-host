import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Chapters from "./chapter/pages/Chapters";
import NewStrip from "./strips/pages/NewStrip";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import "./App.css";

const App = () => {
  return (
    <Router>
      <MainNavigation siteName="Silverstar" />
      <main>
        <Switch>
          <Route path="/" exact>
            <Chapters />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
