import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import CommunityDetail from "Route/CommunityDetail";

const AllRouter = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/detail/:univid/:postid"
          exact
          component={CommunityDetail}
        />
      </Switch>
    </Router>
  );
};

export default AllRouter;
