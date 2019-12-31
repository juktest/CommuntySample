import styled, { css } from "styled-components";

export const Color = {
  deepPink: "#fd9bbb",
  mint: "#4de0c2",
  green: "rgba(198, 248, 198, 0.692)"
};

export const boxShadow = css`
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.12),
    0 18px 36px -18px rgba(0, 0, 0, 0.1);
`;

const margin = css`

    ${({ m }) =>
      css`
        margin: ${m};
      `}
    ${({ ml }) =>
      css`
        margin-left: ${ml};
      `}
    ${({ mr }) =>
      css`
        margin-right: ${mr};
      `}
    ${({ mt }) =>
      css`
        margin-top: ${mt};
      `}
    ${({ mb }) =>
      css`
        margin-bottom: ${mb};
      `}
`;

const padding = css`

    ${({ p }) =>
      css`
        padding: ${p};
      `}
    ${({ pl }) =>
      css`
        padding-left: ${pl};
      `}
    ${({ pr }) =>
      css`
        padding-right: ${pr};
      `}
    ${({ pt }) =>
      css`
        padding-top: ${pt};
      `}
    ${({ pb }) =>
      css`
        padding-bottom: ${pb};
      `}
   
`;

const width = css`
  ${({ width }) =>
    css`
      width: ${width};
    `}
`;

const container = css`
  width: 100%;
  ${margin};
  ${padding};
`
export const Container = styled.div`
  ${container}
`;

export const FlexContainer = styled.div`
  ${container}
  display : flex;
`;
export const CFlexContainer = styled.div`
  ${container}
  display : flex;
  flex-direction : column;
`;



export const Board = styled.div`
  width: 70%;
  padding: 25px;
  margin: 0 auto;
  font-size: 1rem;

  ${width};
  ${margin};
  ${padding};
`;

const RecCss = css`
  text-decoration: none;
  min-width: fit-content;
  padding: 5px;
  font-size: 1.2rem;
  height: max-content;
  cursor: pointer;
  position: relative;
  top: -0.5rem;
  ${margin};
`;

const RadiusButtonCss = css`
  ${RecCss};
  padding: 5px 8px;
  border-radius: 10px;
`;

export const Buttoncss = css`

  color : white;
  background-color: pink;
  border: 2px solid;
  :hover {
    color: pink;
    background-color: white;
    border: 2px solid pink;
  }
  ${RecCss};
  ${({ radius }) => radius === "radius" && RadiusButtonCss}
  ${({ color }) => css`
    background-color: ${color};

    &:hover {
      color: ${color};
      background-color: white;
      border: 2px solid ${color};
    }
  `}
`;

export const Button = styled.button`
  ${Buttoncss}
`;

export const SmallButton = styled.a`
  ${Buttoncss}
  font-size : 0.8rem;
  padding: 0px 5px;
`;
