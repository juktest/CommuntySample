import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { Logo, NavItem, LeftNav, RightNav } from "Components/Header";
import basket from "img/basket.png";
import { NavBlank } from "../../Components/Header";

export const SubNavigationComponent = styled.nav`
  width: 50%;
  height: 4.3rem;
  display: flex;
  position: fixed;
  right: 0px;
  line-height: 1.8rem;

  background-color: rgba(2, 3, 2, 0.6);

  font-weight: bold;
  ${NavItem}:hover {
    color: pink;
    border-bottom: 1px solid pink;
  }
`;

export default function Navigation({ onFilter, nav }) {
  return (
    <>
      <SubNavigationComponent ref={nav}>
        <LeftNav>
          <Logo to="/" src={basket} shrink="shrink"></Logo>
        </LeftNav>
        <RightNav>
          <NavItem onClick={onFilter} color="white">
            마이필터
          </NavItem>
          <NavItem color="white">추천필터</NavItem>
        </RightNav>
      </SubNavigationComponent>
      <NavBlank> </NavBlank>
    </>
  );
}
