import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "Components/Header";
import { getCommunityList } from "../../Components/Api";
import styled from "styled-components";

import { BoardList, BoardTitle, GotoDetail } from "./Style";
import { Button } from "Components/Style";
import { Board } from "../CommunityDetail/style";
import { Color } from "../../Components/Style";

class ListPresenter extends React.Component {
  state = {
    List: ""
  };

  componentDidMount() {
    const getList = async () => {
      const {
        match: { params }
      } = this.props;
      const postsList = await getCommunityList(params);
      const { data } = postsList;
      this.setState({
        List: data
      });
    };
    getList();
  }

  render() {
    let stateNull = true;
    let List;
    if (this.state.List !== "") {
      stateNull = false;
      List = this.state.List;
    }

    const {
      match: { params }
    } = this.props;

    return (
      <div>
        <Header />
        <Board>
          <Button color={Color.mint} href={`/community/${params.univid}/new`}>
            글쓰기
          </Button>

          <BoardList>
            <BoardTitle>제목</BoardTitle>
            <BoardTitle>작성자</BoardTitle>
            <BoardTitle>작성일</BoardTitle>
            <BoardTitle>조회수</BoardTitle>

            {stateNull
              ? ""
              : List.map((list, index) => (
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
  }
}

export default ListPresenter;
