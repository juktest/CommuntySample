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
  background : rgba(198, 248, 198, 0.692);
  width: 100%;
  height : 100vh;
  
  .container{
    display: flex;
    flex-direction: column;
    padding : 8rem 0;
    align-items: center;

    animation-duration: 1.5s;
    animation-name: ${moveIcon};
  }
`;

export const MainQuestion = styled.span`
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

export const SelectUniv = styled.select`
  width: 10rem;
  height : 2rem;
  background-color : white;
  margin-right : 1.3rem;

`;

export const OptionUniv = styled.option``;


export const MainLogo = styled.div`
 
  width: 40%;
  height: 18rem;
  @media(max-height : 700px){
      height : 6rem;
  }
  background-position: 50%;
  background-image: url(${logo});
  min-width: 30rem;
  background-size: 40rem;

  background-repeat: no-repeat;
  &:hover {
    background-size: 44rem;
  }
`;

