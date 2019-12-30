//Reactjs Library
import React, { useContext } from "react";
//ThirdParty Library
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
//Components
import Header from "./Header";
import CommunityDetail from "Route/CommunityDetail";
import Home from "Route/Home";
import CommunityList from "Route/CommunityList";
import RoomList from "Route/RoomList";
import Seller from "Route/Seller";
import CommunityNew from "Route/CommunityNew";
import Login from "Route/Login";
import CommunityModify from "Route/CommunityModify";
import LogOut from "Route/LogOut";
//context
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
          <Route path="/community/:univid/new" exact component={CommunityNew} />
          <Route
            path="/community/modify/:univid/:postid/"
            exact
            component={CommunityModify}
          />
          <Route path="/room/:univid" exact component={RoomList} />
          <Route path="/seller" exact component={Seller} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={LogOut} />
        </Context>
      </Switch>
    </Router>
  );
};
