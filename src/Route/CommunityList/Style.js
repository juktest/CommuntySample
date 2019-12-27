import styled from "styled-components";

export const GotoDetail = styled.a`
    text-decoration : none;
`

/*게시글 title*/
export const BoardTitle = styled.div`
     font-weight : bold;
     font-size : 1.1rem;

     min-width : fit-content;
     background-color : rgba(0,0,0,0.1);
     &:nth-child(1){
        text-align : center;
     }
`

/*게시물 리스트 담는 컴포넌트*/
export const BoardList = styled.div`
    display: grid;
    grid-template-columns: 5fr 1.3fr 1fr 0.7fr;
    grid-template-rows : repeat(10,2fr);
    line-height: 2.5rem;
     
    a, div:not(${BoardTitle}) {
        border-bottom: 1px solid pink; 
        font-size: 0.9rem;
    }
     a{
        padding-left : 1rem;
        :hover{
          text-decoration : underline;
       }
    }
    div:nth-child(4n){
        text-align : center;
        padding-right : 1rem;
    }
    
`


