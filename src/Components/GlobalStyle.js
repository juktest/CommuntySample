import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
div.DraftEditor-root {
  background-color: #fffef7;
  width:80%;
  box-shadow: 0px 0px 6px 1px rgba(0,0,0,0.5);
  height:300px;
  overflow-y: scroll;
  padding:20px;
  font-size: 18px;
  font-family: 'calibri', sans-serif;
  }
`;

export default GlobalStyles;
