import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { GlobalUnivContext } from "Components/Context";
import { redirectUniv } from "Components/Router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainQuestion = styled.span`
  margin-bottom: 50px;
  margin-top: 50px;
`;
const SelectUniv = styled.select``;

const OptionUniv = styled.option``;

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
      <MainQuestion>어떤 대학교를 선택하시겠습니까?</MainQuestion>
      <SelectUniv onChange={handleChangeUniv}>
        <OptionUniv>제발 옵션좀 선택해주세요</OptionUniv>
        <OptionUniv>숭실대</OptionUniv>
      </SelectUniv>
    </Container>
  );
};
