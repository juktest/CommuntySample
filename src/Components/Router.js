import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import CommunityDetail from "Route/CommunityDetail";
import Home from "Route/Home";
import Header from "./Header";

export default () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/detail/:univid/:postid"
          exact
          component={CommunityDetail}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};
