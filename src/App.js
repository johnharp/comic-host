import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Chapters from "./chapter/pages/Chapters";
import NewChapter from "./chapter/pages/NewChapter";
import UpdateChapter from "./chapter/pages/UpdateChapter";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import ChapterStrips from "./strips/pages/ChapterStrips";
import Strip from "./strips/pages/Strip";

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
          <Route path="/chapter/new" exact>
            <NewChapter />
          </Route>
          <Route path="/chapter/:chapterId/Edit">
            <UpdateChapter />
          </Route>
          <Route path="/:chapterId/strips" exact>
            <ChapterStrips />
          </Route>
          <Route path="/strip/:stripId" exact>
            <Strip />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
