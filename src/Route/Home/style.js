import logo from "img/mainPageLogo.png";
import styled, { keyframes, css } from "styled-components";

const moveIcon = keyframes`
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  position : absolute;
 
  width: 100%;
  height : 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  font-size : 20px;
  background-color : rgba(198, 248, 198, 0.692);

  animation-duration: 1.5s;
  animation-name: ${moveIcon};
`;

export const MainQuestion = styled.span`
  margin-bottom: 50px;
  margin-top: 20px;

`;

export const SelectUniv = styled.select`
  width: 130px;

  background-color : white;
  display: inline-block;
  margin-right : 20px;

  height: 26px;
`;

export const OptionUniv = styled.option``;


export const MainLogo = styled.div`
  width: 40%;
  height: 300px;
  background-position: 50%;
  background-image: url(${logo});
  min-width: 300px;
  background-size: 600px;

  background-repeat: no-repeat;
  &:hover {
    background-size: 700px;
  }
`;

