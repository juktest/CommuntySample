import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

import MyFilter from "./MyFilter";
import { Container } from "../../Components/Style";
import Navigation from "./Navigation";
import Room from "./Room";

const RoomListComponent = styled.div`
  ${({ height }) =>
    css`
      height: calc(${height}px - 8.6rem)};
    `}
  overflow-y: scroll;
  background-color: pink;
`;

export default function ControlBox() {
  const [filter, setFilter] = useState(false);
  const onFilter = () => {
    setFilter(!filter);
  };

  const nav = useRef();
  const roomlist = useRef();

  useEffect(() => {
    const onResize = () => {
      const a = roomlist.current;
      const b = nav.current.offsetHeight;

      a.style.height = window.innerHeight - 2 * b + "px";
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Container>
      <Navigation onFilter={onFilter} nav={nav}></Navigation>
      <RoomListComponent ref={roomlist} height={window.innerHeight}>
        {!filter && <Room></Room>}
        {filter && <MyFilter onFilter={onFilter}></MyFilter>}
      </RoomListComponent>
    </Container>
  );
}
