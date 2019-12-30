import React, { useState, useEffect, useContext } from "react";
import { getPostsList, deleteCommunityPost } from "Components/Api";
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
import { withRouter, Redirect, Link } from "react-router-dom";
import { GlobalUnivContext } from "../../Components/Context";
import {
  getCommunityComments,
  postCommunityComments
} from "../../Components/Api";
import styled from "styled-components";

const CommunityDetail = ({
  history,
  match: {
    params: { univid, postid }
  },
  location
}) => {
  const UnivContext = useContext(GlobalUnivContext);

  const handleButtonGoToLists = e => {
    document.location.href = `/community/${univid}`;
  };
  const handleClickForwardPost = e => {
    document.location.href = `/detail/${univid}/${postid - 1}`;
  };
  const handleClickNextPost = e => {
    document.location.href = `/detail/${univid}/${parseInt(postid) + 1}`;
  };

  const handleRemovePost = async e => {
    await deleteCommunityPost(univid, postid);
    await history.push(`/community/${univid}`);
  };

  let [Post, SetState] = useState({
    title: "",
    writer: "",
    body: "",
    modifiedDate: "",
    comments: []
  });

  let [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const handlePostComment = async e => {
    e.preventDefault();
    await postCommunityComments(e.target.elements[0].value, univid, postid);
    await window.location.reload();
  };

  const handleClickCommentRemove = e => {
    console.dir(e.target.id);
  };

  const PostCommentForm = styled.form``;

  const loaddata = async () => {
    let serverPostList = await getPostsList(
      univid,
      postid,
      UnivContext.setError
    );

    let serverCommentList = await getCommunityComments(univid, postid);

    //접근할 수 없는 post번호에 접근했을경우
    if (serverPostList === undefined) {
      history.go(-1);
    }

    serverPostList = serverPostList.data;
    SetState({
      title: serverPostList.title,
      writer: serverPostList.writer,
      body: serverPostList.body,
      modifiedDate: serverPostList.modifiedDate
    });
    Post.title = serverPostList.title;
    Post.writer = serverPostList.writer;
    Post.body = serverPostList.body;
    Post.modifiedDate = serverPostList.modifiedDate;

    if (Post.body !== "") {
      const parseBody = JSON.parse(Post.body);
      const RawParseBody = convertFromRaw(parseBody);
      const StateParseBody = EditorState.createWithContent(RawParseBody);
      setEditorState(StateParseBody);
      editorState = StateParseBody;
    }

    SetState({ ...Post, comments: serverCommentList.data });
  };

  const deletedata = async () => {
    await deleteCommunityPost(univid, postid);
    document.location.href = `/community/${univid}`;
  };

  const modifydata = () => {};

  useEffect(() => {
    loaddata();
  }, []);

  let stateNull = true;
  if (Post.title !== "") {
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
          <Button onClick={handleButtonGoToLists}>리스트로</Button>
          <FlexComponent direction="end">
            {postid === "1" ? (
              ""
            ) : (
              <Button style={{ top: 0 }} onClick={handleClickForwardPost}>
                이전글
              </Button>
            )}
            {localStorage.getItem("LastList") == postid ? (
              ""
            ) : (
              <Button
                style={{ top: 0 }}
                color={Color.deepPink}
                onClick={handleClickNextPost}
              >
                다음글
              </Button>
            )}
          </FlexComponent>
        </FlexComponent>

        <BoardInformation>
          <FlexComponent>
            <b>{Post.title} </b>
            {/* {this.state.writer === localStorage.writer &} */}
            <FlexComponent>
              {localStorage.getItem("LoggedIn") == "true" &&
              Post.writer == localStorage.getItem("userId") ? (
                <>
                  <Link to={`/community/modify/${univid}/${postid}`}>수정</Link>
                  <Button radius="radius" onClick={deletedata}>
                    삭제
                  </Button>
                </>
              ) : (
                ""
              )}
            </FlexComponent>
          </FlexComponent>
          <hr></hr>

          <FlexComponent>
            <div className="id">{Post.writer}</div>
            <div className="day">{Post.modifiedDate}</div>
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
          {console.log(Post.comments)}
          {Post.comments ? (
            Post.comments.map(({ id, writer, body, modifiedDate }) => (
              <CommentBox>
                <FlexComponent>
                  <div>{writer}</div>
                  <FlexComponent>
                    <SmallButton>수정</SmallButton>
                    <SmallButton onClick={handleClickCommentRemove} id={id}>
                      삭제
                    </SmallButton>
                  </FlexComponent>
                </FlexComponent>
                <div>{body}</div>
                <div>{modifiedDate}</div>
              </CommentBox>
            ))
          ) : (
            <CommentBox>Error</CommentBox>
          )}

          <CommentBox style={{ flexDirection: "row" }}>
            <PostCommentForm onSubmit={handlePostComment}>
              <textarea id="comment_text" title="댓글입력" rows="3"></textarea>
              <Button
                style={{ position: "relative", top: "-8px" }}
                type="submit"
              >
                댓글입력
              </Button>
            </PostCommentForm>
          </CommentBox>
        </Comment>
      </Board>
    </Container>
  );
};
export default withRouter(CommunityDetail);
