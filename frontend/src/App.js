import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Auth from "./user/pages/Auth";
import Chapters from "./chapter/pages/Chapters";
import NewChapter from "./chapter/pages/NewChapter";
import UpdateChapter from "./chapter/pages/UpdateChapter";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import ChapterStrips from "./strips/pages/ChapterStrips";
import ChapterNewStrip from "./chapter/pages/ChapterNewStrip";
import Strip from "./strips/pages/Strip";
import UpdateStrip from "./strips/pages/UpdateStrip";

import { AuthContext } from "./shared/context/auth-context";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Chapters />
        </Route>
        <Route path="/chapter/:chapterId/strips" exact>
          <ChapterStrips />
        </Route>
        <Route path="/chapter/:chapterId/newstrip" exact>
          <ChapterNewStrip />
        </Route>
        <Route path="/strip/:stripId/edit">
          <UpdateStrip />
        </Route>
        <Route path="/strip/:stripId" exact>
          <Strip />
        </Route>
        <Route path="/chapter/new" exact>
          <NewChapter />
        </Route>
        <Route path="/chapter/:chapterId/edit">
          <UpdateChapter />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Chapters />
        </Route>
        <Route path="/chapter/:chapterId/strips" exact>
          <ChapterStrips />
        </Route>
        <Route path="/strip/:stripId" exact>
          <Strip />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation siteName="Silverstar" />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
