import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "./Header";
import CommunityDetail from "Route/CommunityDetail";
import Home from "Route/Home";
import CommunityList from "Route/CommunityList";
import Context, { GlobalUnivContext } from "./Context";

export default () => {
  return (
    <Router>
      <Switch>
        <Context>
          <Route path="/" exact component={Home} />
          <Route
            path="/detail/:univid/:postid/"
            exact
            component={CommunityDetail}
          />
          <Route path="/community/:univid" exact component={CommunityList} />
        </Context>
      </Switch>
    </Router>
  );
};
