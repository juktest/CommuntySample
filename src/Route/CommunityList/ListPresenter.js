import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Header from "Components/Header";
import { getCommunityList } from "../../Components/Api";

import { BoardList, BoardTitle, GotoDetail } from "./Style";
import { Button, Board, Color } from "Components/Style";
import { GlobalUnivContext } from "../../Components/Context";
import Message from "../../Components/Message";

const ListPresenter = ({
  match: {
    params: { univid }
  },
  history
}) => {
  const [List, setList] = useState({
    List: ""
  });

  const UnivContext = useContext(GlobalUnivContext);

  const getList = async () => {
    const postsList = await getCommunityList(univid, UnivContext.setError);
    const { data } = postsList;
    setList({ List: data });
    List.List = data;
  };

  useEffect(() => {
    getList();
  }, []);

  let stateNull = true;
  if (List.List !== "") {
    stateNull = false;
  }

  return (
    <div>
      <Header />
      {UnivContext.error ? (
        <Message
          error={true}
          message={`커뮤니티 페이지 불러오기 실패`}
          univid={univid}
        />
      ) : (
        <Message
          error={false}
          message={`커뮤니티 페이지 불러오기 성공`}
          univid={univid}
        />
      )}
      <Board>
        {localStorage.getItem("LoggedIn") == "true" ? (
          <Button color={Color.mint} href={`/community/${univid}/new`}>
            글쓰기
          </Button>
        ) : (
          ""
        )}

        <BoardList>
          <BoardTitle>제목</BoardTitle>
          <BoardTitle>작성자</BoardTitle>
          <BoardTitle>작성일</BoardTitle>
          <BoardTitle>조회수</BoardTitle>

          {stateNull
            ? ""
            : List.List.map((list, index) => (
                <>
                  <GotoDetail href={`/detail/${list.univid}/${list.id}`}>
                    {list.title}
                  </GotoDetail>
                  <div>{list.writer}</div>
                  <div>{list.modifiedDate.slice(0, 10)}</div>
                  <div>{list.views}</div>
                </>
              ))}
        </BoardList>
      </Board>
    </div>
  );
};

export default withRouter(ListPresenter);
