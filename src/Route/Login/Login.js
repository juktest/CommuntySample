import React from "react";
import Header from "../../Components/Header";
import { Container } from "../../Components/Style";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const InputId = styled.input``;
const InputPassword = styled.input``;
const SubmitButton = styled.button`
  width: 30px;
  height: 30px;
`;
const SubmitForm = styled.form``;
const LogOutButton = styled.button`
  width: 30px;
  height: 30px;
`;

const handleLogOutSubmit = e => {
  localStorage.setItem("LoggedIn", false);
  window.location.reload();
};

const Login = props => {
  const handleIdSubmit = e => {
    e.preventDefault();
    localStorage.setItem("userId", e.target.children[0].value);
    localStorage.setItem("LoggedIn", true);
    // window.location.reload();
    props.history.goBack();
    // console.dir(e.target.children[1].value);
  };
  return (
    <>
      <Header />
      <Container>
        <div>Login</div>
        {localStorage.getItem("LoggedIn") == "true" ? (
          <SubmitForm onSubmit={handleLogOutSubmit}>
            <LogOutButton type="submit">Log Out</LogOutButton>
          </SubmitForm>
        ) : (
          <SubmitForm onSubmit={handleIdSubmit}>
            <InputId />
            <InputPassword type="password" />
            <SubmitButton type="submit" />
          </SubmitForm>
        )}
      </Container>
    </>
  );
};

export default withRouter(Login);
