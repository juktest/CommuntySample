//Reactjs Library
import React from "react";
//ThirdParty Library
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
//style
import logo from "img/titleIcon.png";
import { Color } from "./Style";

//style components
export const Logo = styled(Link)`
  width: 10rem;
  height: 4rem;

  background-image: url(${logo});
  background-size: contain;

  margin-top: 0.4rem;

  ${({ src }) =>
    src &&
    css`
      background-image: url(${src});
    `}

  background-repeat: no-repeat;
`;

export const NavItem = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  min-width: fit-content;
  color: ${Color.mint};

  padding: 1.2rem;

  ${({ color }) =>
    css`
      color: ${color};
    `}
  & + & {
    margin-left: 10px;
  }

  &:active {
    transform: translate(5px, 5px);
    transition: 1s;
  }
`;

export const LeftNav = styled.div`
  padding-left: 1rem;
  display: flex;
  justify-content: flex-start;
  width: 50%;
`;

export const RightNav = styled.div`
  padding-right: 0.8rem;
  display: flex;
  justify-content: flex-end;
  width: 50%;
  margin-left: 0.8rem;
`;

const NavigationBar = styled.nav`
  z-index: 50;
  width: 100%;
  height: 4.3rem;
  display: flex;
  position: fixed;

  line-height: 1.8rem;
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.5);

  background-color: white;
  font-weight: bold;

  ${NavItem}:hover {
    color: #185fb7;
    border-bottom: 1px solid #00f500;
  }
`;

export const NavBlank = styled.div`
  height: 4.3rem;
  content: " ";
`;

//메인 함수
export default () => {
  const Univ = localStorage.getItem("Univ");

  return (
    <>
      <NavigationBar>
        <LeftNav>
          <Logo to="/" />
        </LeftNav>
        <RightNav>
          <NavItem to={`/room/${Univ}`}>방 리스트</NavItem>
          <NavItem to={`/community/${Univ}`}>커뮤니티</NavItem>
          <NavItem to={"/seller"}>방 판매자 페이지</NavItem>
          <NavItem to={`/room/${Univ}`}>마이 페이지</NavItem>
          {localStorage.getItem("LoggedIn") == "true" ? (
            <NavItem to={"/logout"}> 로그아웃 </NavItem>
          ) : (
            <NavItem to={"/login"}>로그인</NavItem>
          )}
        </RightNav>
      </NavigationBar>
      <NavBlank></NavBlank>
    </>
  );
};
