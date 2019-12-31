import React from "react";
import Header from "../../Components/Header";
import { Container, Board } from "Components/Style";
import styled from "styled-components";

const InputId = styled.input`
  display: block;
`;

const InputPassword = styled.input`
  display: block;
`;

const SubmitButton = styled.button`
  width: 30px;
  height: 30px;
`;
const SubmitForm = styled.form``;
const LogOutButton = styled.button`
  width: 30px;
  height: 30px;
`;

const handleIdSubmit = e => {
  e.preventDefault();
  localStorage.setItem("userId", e.target.children[0].value);
  localStorage.setItem("LoggedIn", true);
  window.location.reload();
  // console.dir(e.target.children[1].value);
};

const handleLogOutSubmit = e => {
  localStorage.setItem("LoggedIn", false);
  window.location.reload();
};

const Login = () => {
  return (
    <Container>
      <Header />
      <Board width="50%">
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
      </Board>
    </Container>
  );
};

export default Login;
