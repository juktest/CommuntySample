import React from "react";
import styled, { keyframes } from "styled-components";

const MessageAnimation = keyframes`
  0%{
    opacity : 0;
  } 50%{
    opacity : 1;
  } 100%{
    opacity : 0;
  }
`;
const MessageContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 40%;
  background-color: ${prop => {
    if (prop.error) {
      return "red";
    } else {
      return "green";
    }
  }};
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${MessageAnimation} 5s linear forwards;
  flex-direction: column;
`;

const Message = ({ error, message, univid }) => {
  if (error === true) {
    return (
      <MessageContainer error={true} style={{ zIndex: 51 }}>
        {message}
        <div>학교 이름 : {univid}</div>
      </MessageContainer>
    );
  } else if (error === false) {
    return (
      <MessageContainer error={false} style={{ zIndex: 51 }}>
        {message}
        <div>학교 이름 : {univid}</div>
      </MessageContainer>
    );
  }
};

export default Message;
