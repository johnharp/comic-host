import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Auth from "./user/pages/Auth";
import Chapters from "./chapter/pages/Chapters";
import NewChapter from "./chapter/pages/NewChapter";
import UpdateChapter from "./chapter/pages/UpdateChapter";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import ChapterStrips from "./strips/pages/ChapterStrips";
import Strip from "./strips/pages/Strip";
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

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation siteName="Silverstar" />
        <main>
          <Switch>
            <Route path="/" exact>
              <Chapters />
            </Route>
            <Route path="/auth" exact>
              <Auth />
            </Route>
            <Route path="/chapter/new" exact>
              <NewChapter />
            </Route>
            <Route path="/chapter/:chapterId/edit">
              <UpdateChapter />
            </Route>
            <Route path="/chapter/:chapterId/strips" exact>
              <ChapterStrips />
            </Route>
            <Route path="/strip/:stripId" exact>
              <Strip />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
