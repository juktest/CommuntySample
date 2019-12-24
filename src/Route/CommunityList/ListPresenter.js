import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../../Components/Header";

const ListPresenter = ({ location: { pathname } }) => {
  return (
    <div>
      <Header />
      {pathname}
    </div>
  );
};

export default withRouter(ListPresenter);
