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
  const Univ = localStorage.getItem("Univ");
  return (
    <Container>
      <SLink to="/">학교 선택하기</SLink>
      <SLink to={`/room/${Univ}`}>방 리스트</SLink>
      <SLink to={`/community/${Univ}`}>커뮤니티</SLink>
      <SLink to={"/seller"}>방 판매자 페이지</SLink>
    </Container>
  );
};
