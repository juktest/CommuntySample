import React from "react";
import { Redirect, withRouter } from "react-router-dom";

const LogOut = props => {
  localStorage.setItem("LoggedIn", false);
  props.history.goBack();
  return <div>asdf</div>;
};

export default withRouter(LogOut);
