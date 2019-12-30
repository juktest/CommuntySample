import React, { useContext, useEffect } from "react";
import Header, { Logo } from "../../Components/Header";
import { getRoomList } from "../../Components/Api";
import { GlobalUnivContext } from "../../Components/Context";
import { withRouter } from "react-router-dom";
import Message from "Components/Message";
import { Container, Board, FlexContainer } from "Components/Style";
import ControlBox from "./ControlBox";

const RoomList = ({
  match: {
    params: { univid }
  }
}) => {
  const UnivContext = useContext(GlobalUnivContext);

  useEffect(() => {
    const checkError = async () => {
      await getRoomList(univid, UnivContext.setError);
    };
    checkError();
  }, []);

  return (
    <Container style ={{height : "100vh", overflowY:"hidden"}}>
      <Header />
      {UnivContext.error ? (
        <Message
          error={true}
          message={`룸 리스트 불러오기 실패`}
          univid={univid}
        />
      ) : (
        <Message
          error={false}
          message={`페이지 불러오기 성공`}
          univid={univid}
        />
      )}
      <FlexContainer>
       <Board width = "50%" p = "0px"></Board>
       <Board width = "50%" p = "0px"><ControlBox></ControlBox></Board>
      </FlexContainer>
    </Container>
  );
};

export default withRouter(RoomList);
