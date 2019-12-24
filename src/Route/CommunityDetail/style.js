import styled, {css} from "styled-components";
import { boxShadow, Color, Button } from "../../Components/Style";

export const Container= styled.div`
    width : 100%;
    background-color : white;
`

export const FlexComponent = styled.div`
    display : flex;
    justify-content : space-between;
    ${
        ({direction})=>(direction==="end" &&  css`justify-content : flex-end`)
    };
    
    .id{
        font-size : 1rem;
        color : green;
        background : rgba(198, 248, 198, 0.692);
        max-width : fit-content;
        border-radius : 10%;
        padding : 2px 5px;
    }

    .day{
        font-size : 1rem;    
        color : rgba(0,0,0,0.35);  
    }
`

/*버튼과 게시물 담는 컴포넌트*/
export const Board = styled.div`
    width:  70%;
    padding : 25px;
    font-size : 1rem;
    margin : 0 auto;
`

/*게시글 컴포넌트*/
export const BoardInformation = styled.div`
    display : flex;  
    flex-direction : column;
    margin : 0 auto;
    padding : 15px 17px;
    border-top : 2px solid pink;

    font-size : 1.2rem;  
    ${boxShadow};
 
    hr{
        border : none;
        width : 100%;
        margin : 0;
        margin-bottom : 10px;
        border-bottom : 2px dashed pink;
    }

`
export const Comment = styled.div`
    border-radius : 10px;
    background-color : white;
    box-sizing : border-box;
    width : 100%;
    padding : 5px;
    border : 2px solid ${Color.deepPink};
    margin-top : 20px;
   
    div:last-child{
        border-bottom : 0px;
    }
`

export const CommentBox = styled.div`
 
    padding :15px;
    border-bottom : 1px solid pink;

    textarea{
        width : 85%;
        height : 100px;
        font-size : 1rem;
    }
    ${Button}{
        margin-left : 20px;
    }
    div{
        line-height : 1.5rem;
    }
    div:nth-child(1){
        font-weight : 700;
    }
    div:nth-child(2){
        padding : 7px;
    }
    div:nth-child(3){
        margin-top : 5px;
        color : rgba(0,0,0,0.4);
        font-size : 0.8rem;
    }   

`

/*게시글 content*/
export const BoardContent = styled.p`
    padding : 4px 10px;
    font-weight : 300;
`
/*게시글 title*/
export const BoardTitle = styled.div`
     font-weight : bold;
     font-size : 1.2rem;

     min-width : fit-content;
     &:nth-child(1){
        text-align : center;
     }
`