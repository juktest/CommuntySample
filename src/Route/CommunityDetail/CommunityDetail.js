import React, { useState, useEffect } from "react";
import { getPostsList } from "Components/Api";
import { convertFromRaw, EditorState, Editor } from "draft-js";
import Header from "Components/Header";
import {
  Comment,
  FlexComponent,
  BoardInformation,
  BoardContent,
  CommentBox
} from "./style";

import { Color, SmallButton, Container, Board, Button } from "Components/Style";
import { withRouter } from "react-router-dom";

const CommunityDetail = ({
  match: {
    params: { univid, postid }
  }
}) => {
  let [{ title, writer, body, modifiedDate }, SetState] = useState({
    title: "",
    writer: "",
    body: "",
    modifiedDate: ""
  });
  let [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const loaddata = async () => {
    let serverPostList = await getPostsList(univid, postid);
    serverPostList = serverPostList.data;
    SetState({
      title: serverPostList.title,
      writer: serverPostList.writer,
      body: serverPostList.body,
      modifiedDate: serverPostList.modifiedDate
    });
    title = serverPostList.title;
    writer = serverPostList.writer;
    body = serverPostList.body;
    modifiedDate = serverPostList.modifiedDate;

    if (body !== "") {
      const parseBody = JSON.parse(body);
      const RawParseBody = convertFromRaw(parseBody);
      const StateParseBody = EditorState.createWithContent(RawParseBody);
      console.log(StateParseBody);
      setEditorState(StateParseBody);
      editorState = StateParseBody;
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  let stateNull = true;
  if (title !== "") {
    stateNull = false;
  }

  const styleMap = {
    HIGHLIGHT: {
      backgroundColor: "red"
    }
  };

  return (
    <Container>
      <Header />
      <Board>
        <FlexComponent>
          <Button>리스트로</Button>
          <FlexComponent direction="end">
            <Button style={{ top: 0 }}>이전글</Button>
            <Button style={{ top: 0 }} color={Color.deepPink}>
              다음글
            </Button>
          </FlexComponent>
        </FlexComponent>

        <BoardInformation>
          <FlexComponent>
            <b>{title} </b>
            {/* {this.state.writer === localStorage.writer &} */}
            <FlexComponent>
              <Button radius="radius">수정</Button>
              <Button radius="radius">삭제</Button>
            </FlexComponent>
          </FlexComponent>
          <hr></hr>

          <FlexComponent>
            <div class="id">{writer}</div>
            <div class="day">{modifiedDate}</div>
          </FlexComponent>

          <BoardContent>
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              customStyleMap={styleMap}
            />
          </BoardContent>
        </BoardInformation>

        <Comment>
          <CommentBox>
            <FlexComponent>
              <div>{writer}</div>
              {/* {this.state.writer === localStorage.writer &} */}
              <FlexComponent>
                <SmallButton>수정</SmallButton>
                <SmallButton>삭제</SmallButton>
              </FlexComponent>
            </FlexComponent>
            <div>우앙 멋져요1!!!!</div>
            <div>{modifiedDate}</div>
          </CommentBox>

          <CommentBox>
            <div>{writer}</div>
            <div>;;저도 안녕하세욬ㅋㅋㅋㅋ</div>
            <div>{modifiedDate}</div>
          </CommentBox>
          <CommentBox>
            <div>{writer}</div>
            <div>허러러러러러러</div>
            <div>{modifiedDate}</div>
          </CommentBox>

          <CommentBox style={{ flexDirection: "row" }}>
            <textarea id="comment_text" title="댓글입력" rows="3"></textarea>
            <Button style={{ position: "relative", top: "-8px" }}>
              댓글입력
            </Button>
          </CommentBox>
        </Comment>
      </Board>
    </Container>
  );
};
export default withRouter(CommunityDetail);
