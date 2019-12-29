import React, { useContext, useEffect } from "react";
import Header from "../../Components/Header";
import { getRoomList } from "../../Components/Api";
import { GlobalUnivContext } from "../../Components/Context";
import { withRouter } from "react-router-dom";
import Message from "Components/Message";

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
    <div>
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
      방 리스트 페이지
    </div>
  );
};

export default withRouter(RoomList);
