import React from "react";
import styled, { css } from "styled-components";
import { Button } from "Components/Style";

export const FilterComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

export const FilterContainer = styled.div`
  margin-top: 1.5rem;
  padding-left: 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
`;

export const FilterItem = styled.div`
  font-weight: border;
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

function MyFilter({ onFilter }) {
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
        <FilterItem>보증금/전세</FilterItem>
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
     

      <Button onClick={onFilter}>등록</Button>
    </FilterComponent>
  );
}

export default MyFilter;
