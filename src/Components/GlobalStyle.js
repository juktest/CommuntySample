import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;

    font-family: "나눔고딕", "Helvetica Neue", sans-serif;
  }

  html {
   font-size: 13px; 
}


@media (max-width: 800px) {
  html {
    font-size: 10px;
  }
}

div.DraftEditor-root {
    width: 100%;
    font-family: 'calibri', sans-serif;
  }
`;

export default GlobalStyles;
