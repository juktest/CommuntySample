import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const SLink = styled(Link)`
  margin-right: 20px;
  font-size: 50px;
`;

export default () => {
  return (
    <Container>
      <SLink to="/">Home</SLink>
      <SLink to="/detail/1/1">detail</SLink>
      <SLink to="/community/1">community</SLink>
    </Container>
  );
};
