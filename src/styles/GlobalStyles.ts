import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import ColorSystem from "./colorSystem";
import FontSystem from "./FontSystem";

export const GlobalStyle = createGlobalStyle`
  ${normalize};
  ${ColorSystem};
  ${FontSystem};

  html,
  body {
    font-family: 'Pretendard', 'sans-serif';
    font-size: 10px;
    letter-spacing: -0.1em;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  * {
    box-sizing: border-box;
    font-family: 'Pretendard', 'sans-serif';
  }
`;
