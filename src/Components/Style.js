import styled, { css } from "styled-components";

const RecCss = css`
    padding : 5px;
    font-size : 1.2rem;
    height : max-content;
    cursor: pointer;
`

const RadiusButtonCss = css`
    ${RecCss};
    padding : 5px 8px;
    border-radius : 10px;
`

export const Color = {
    deepPink : "#fd9bbb"
};

const Buttoncss = css`
    ${RecCss};
    ${({radius})=>(radius==="radius"&&RadiusButtonCss)}
    
    color : white;
    background-color : pink;
    
    border: 2px solid pink;
    
    &:hover{
        color : pink;
        background-color : white;   
    }    
    
    ${({color})=>css`
         background-color : ${color};  
         border: 2px solid ${color}; 

        &:hover{
        color : ${color};
        background-color : white;   
    }   
    `}

`

export const Button = styled.a`
    ${Buttoncss}
`

export const SmallButton = styled.a`
    ${Buttoncss}
    font-size : 0.8rem;
    padding : 0px 5px;
`

export const boxShadow = css`
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.12),
    0 18px 36px -18px rgba(0, 0, 0, 0.1);
`