import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { Button } from "Components/Style";

import CustomSlider from "./CustomSlider";
import { CFlexContainer, FlexContainer } from "../../Components/Style";
export const FilterComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  user-select: none;
`;

export const FilterContainer = styled.div`
  margin-top: 1.5rem;
  padding-left: 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
`;

export const FilterItem = styled.div`
  font-weight: 800;
  margin-bottom: 0.7rem;
`;

export const FilterSelectItem = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FilterOptionItem = styled.div`
  border-radius: 20px;
  border: 1px solid pink;
  background-color: white;
  min-width: fit-content;
  padding-top: 3px;
  padding: 4px 8px;
  cursor: pointer;
  & + & {
    margin-left: 0.5rem;
  }
  :hover {
    background-color: pink;
    color: white;
  }
`;

export const SelectComponent = styled.select`
  border: 1px solid pink;
  width: 100px;
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
  height: 26px;
`;

const CheckBox = styled.input`
  display: none;

  + label {
    display: inline-block;
    width: max-content;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 1.3rem;
  }

  + label:before {
    display: inline-block;
    content: "";
    width: 1.3rem;
    height: 1.3rem;
    background-color: pink;
    border-radius: 2px;
    margin-right: 5px;
  }

  &:checked {
    + label:before {
      content: "\u2713";
      color: white;
      text-align: center;
    }
  }
`;

function MyFilter({ onFilter }) {
  const value = {
    min: 0,
    max: 100,
    value: 50
  };
  return (
    <FilterComponent>
      <FilterContainer>
        <FilterItem>유형</FilterItem>
        <FilterSelectItem>
          <FilterOptionItem>전세</FilterOptionItem>
          <FilterOptionItem>월세</FilterOptionItem>
        </FilterSelectItem>
      </FilterContainer>
      <FilterContainer>
        <FilterItem>보증금</FilterItem>
        <FilterSelectItem>
          <SelectComponent>
            <option>전체</option>
            <option>0원</option>
            <option>10만원</option>
            <option>20만원</option>
            <option>30만원</option>
            <option>50만원</option>
            <option>100만원</option>
            <option>200만원</option>
          </SelectComponent>
          ~
          <SelectComponent>
            <option>전체</option>
            <option>10만원</option>
            <option>50만원</option>
            <option>70만원</option>
            <option>100만원</option>
            <option>150만원</option>
            <option>180만원</option>
            <option>200만원</option>
            <option>250만원 ~</option>
          </SelectComponent>
        </FilterSelectItem>
      </FilterContainer>
      <FilterContainer>
        <FilterItem>월세</FilterItem>
        <FilterSelectItem>
          <SelectComponent>
            <option>전체</option>
            <option>0원</option>
            <option>50만원</option>
            <option>100만원</option>
            <option>200만원</option>
            <option>500만원</option>
            <option>1000만원</option>
            <option>2000만원</option>
            <option>2000만원 ~</option>
          </SelectComponent>
          ~
          <SelectComponent>
            <option>전체</option>
            <option>0원</option>
            <option>50만원</option>
            <option>100만원</option>
            <option>200만원</option>
            <option>500만원</option>
            <option>1000만원</option>
            <option>2000만원</option>
            <option>2000만원 ~</option>
          </SelectComponent>
        </FilterSelectItem>
      </FilterContainer>
      <FilterContainer>
        <FilterItem>최소평점</FilterItem>
        <CustomSlider min={0} max={5} step={0.5} value={3}></CustomSlider>
      </FilterContainer>
      <FilterContainer>
        <FilterItem>구조</FilterItem>
        <FilterSelectItem>
          <FilterOptionItem>오픈형</FilterOptionItem>
          <FilterOptionItem>분리형</FilterOptionItem>
          <FilterOptionItem>복층형</FilterOptionItem>
        </FilterSelectItem>
      </FilterContainer>
      <FilterContainer>
        <FilterItem>평수</FilterItem>
        <FilterSelectItem>
          <FilterOptionItem>5평이하</FilterOptionItem>
          <FilterOptionItem>6~10평</FilterOptionItem>
          <FilterOptionItem>11평이상</FilterOptionItem>
        </FilterSelectItem>
      </FilterContainer>
      <FilterContainer>
        <FilterItem>층수</FilterItem>
        <FilterSelectItem>
          <FilterOptionItem>1층이상</FilterOptionItem>
          <FilterOptionItem>반지하</FilterOptionItem>
          <FilterOptionItem>복층</FilterOptionItem>
          <FilterOptionItem>옥탑</FilterOptionItem>
        </FilterSelectItem>
      </FilterContainer>

      <FilterContainer>
        <FilterItem>옵션</FilterItem>
        <FlexContainer mb="20px">
          <CFlexContainer>
            <CheckBox
              style={{ display: "none" }}
              id="elevator"
              type="checkbox"
            />
            <label for="elevator">엘리베이터</label>
            <CheckBox id="park" type="checkbox" />
            <label for="park">공원</label>
            <CheckBox id="cctv" type="checkbox" />
            <label for="cctv">CCTV</label>
            <CheckBox id="autoDoor" type="checkbox" />
            <label for="autoDoor">자동문</label>
          </CFlexContainer>
          <CFlexContainer>
            <CheckBox id="washingMachine" type="checkbox" />
            <label for="washingMachine">식기세척기</label>
            <CheckBox id="gasrange" type="checkbox" />
            <label for="gasrange">가스레인지</label>
            <CheckBox id="refrigerator" type="checkbox" />
            <label for="refrigerator">냉장고</label>
            <CheckBox id="airconditioner" type="checkbox" />
            <label for="airconditioner">에어컨</label>
          </CFlexContainer>
        </FlexContainer>
      </FilterContainer>
      <Button mb="5px" onClick={onFilter}>
        등록
      </Button>
    </FilterComponent>
  );
}

export default MyFilter;
