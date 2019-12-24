import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "img/titleIcon.png";

const Logo = styled(Link)`
  width: 100px;
  height: 50px;

  background-image: url(${logo});
  background-size: contain;

  margin-top : 3px;

  ${({ src }) =>
    src &&
    css`
      background-image: url(${src});
    `}

  background-repeat: no-repeat;
`;

const NavItem = styled(Link)`
  font-size : 1.2rem;
  text-decoration: none;
  min-width: fit-content;
  color: #4de0c2;

  padding: 14px;
  
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

const LeftNav = styled.div`
  padding-left: 20px;
  display: flex;
  justify-content: flex-start;
  width: 50%;
`;

const RightNav = styled.div`
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;
  width: 50%;
  margin-left: 10px;
`;

const NavigationBar= styled.nav`
  z-index: 99;
  width: 100%;
  
  display: flex;
  
  line-height: 1.8rem;
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.5);
  
  background-color: white;
  font-weight: bold;

  ${NavItem}:hover {
    color: #185fb7;
    border-bottom: 1px solid #00f500;
  } 
`;



export default () => {
  const Univ = localStorage.getItem("Univ");
  
  return (
    <NavigationBar>
      <LeftNav>
        <Logo to="/"/>
      </LeftNav>
      <RightNav>
        <NavItem to={`/room/${Univ}`}>방 리스트</NavItem>
        <NavItem to={`/community/${Univ}`}>커뮤니티</NavItem>
        <NavItem to={"/seller"}>방 판매자 페이지</NavItem>
      </RightNav>
      
    </NavigationBar>
  );
};
