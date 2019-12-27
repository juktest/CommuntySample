import React, { useContext, useState } from "react";
import { GlobalUnivContext } from "Components/Context";
import {
  MainLogo,
  Container,
  MainQuestion,
  SelectUniv,
  OptionUniv
} from "./style";

export default () => {
  const LocalUniv = useContext(GlobalUnivContext);
  const handleChangeUniv = e => {
    if (e.target.value === "숭실대") {
      LocalUniv.setUniv("숭실대");
      localStorage.setItem("Univ", "1");
      document.location.href = "/room/1";
    }
  };

  return (
    <Container>
      <div class="container">
        <MainLogo></MainLogo>
        <MainQuestion>
          당신의 <b style={{ color: "#54dea6" }}>학교이름</b>은 무엇입니까?
        </MainQuestion>
        <SelectUniv onChange={handleChangeUniv}>
          <OptionUniv>-</OptionUniv>
          <OptionUniv>숭실대</OptionUniv>
        </SelectUniv>
      </div>
    </Container>
  );
};
