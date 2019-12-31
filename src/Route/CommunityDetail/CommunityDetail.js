//Reactjs Library
import React, { useState, useEffect, useContext } from "react";
//ThirdParty Library
import { convertFromRaw, EditorState, Editor } from "draft-js";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
//Components
import Header from "Components/Header";
import { GlobalUnivContext } from "Components/Context";
import {
  getCommunityComments,
  postCommunityComments,
  deleteCommunityComments,
  getPostsList,
  deleteCommunityPost,
  putCommunityComments
} from "Components/Api";
//Style
import {
  Comment,
  FlexComponent,
  BoardInformation,
  BoardContent,
  CommentBox
} from "./style";
import { Color, SmallButton, Container, Board, Button,Buttoncss } from "Components/Style";

//styled-components
const PostCommentForm = styled.form``;

//메인함수
const CommunityDetail = ({
  history,
  match: {
    params: { univid, postid }
  }
}) => {
  //state초기화
  //메인 state 초기화
  let [Post, SetState] = useState({
    title: "",
    writer: "",
    body: "",
    modifiedDate: "",
    previd: "",
    nextid: "",
    comments: []
  });
  //draft.js state초기화
  let [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  //context사용
  const UnivContext = useContext(GlobalUnivContext);

  //draft.js
  //draft.js custom style
  const styleMap = {
    HIGHLIGHT: {
      backgroundColor: "red"
    }
  };

  //Event handler
  //리스트로 이동 버튼 클릭
  const handleButtonGoToLists = e => {
    document.location.href = `/community/${univid}`;
  };
  //이전글 클릭
  const handleClickForwardPost = e => {
    document.location.href = `/detail/${univid}/${Post.previd}`;
  };
  //다음글 클릭
  const handleClickNextPost = e => {
    document.location.href = `/detail/${univid}/${Post.nextid}`;
  };
  //삭제 클릭
  const handledeletedata = async () => {
    await deleteCommunityPost(univid, postid);
    document.location.href = `/community/${univid}`;
  };
  //댓글입력 클릭
  const handlePostComment = async e => {
    e.preventDefault();
    await postCommunityComments(e.target.elements[0].value, univid, postid);
    await window.location.reload();
  };
  //댓글삭제 클릭
  const handleClickCommentRemove = async e => {
    await deleteCommunityComments(univid, postid, e.target.id);
    await window.location.reload();
  };
  //댓글수정 클릭
  const handleClickCommentModify = async e => {
    const Input = document.createElement("textarea");
    const InputButton = document.createElement("button");
    const Id = e.target.id;
    const body = document.getElementById("body");
    body.innerHTML = "";
   
    Input.value = e.target.dataset.body;
    InputButton.style = Buttoncss;
    InputButton.style.marginTop = "3px";
    InputButton.innerText = "수정하기";
    e.target.parentElement.parentElement.parentElement.children[1].appendChild(
      Input
    );
    e.target.parentElement.parentElement.parentElement.children[1].appendChild(
      InputButton
    );
    InputButton.addEventListener("click", async () => {
      await putCommunityComments(univid, postid, Id, Input.value);
      await window.location.reload();
    });
  };
  //본문 정보 수정 방지용 가짜 핸들러
  const handleFakeEditorChange = () => {};

  //처음 로드할때 사용되는 함수
  const loaddata = async () => {
    //api로 부터 글 정보 불러오기
    let serverPostList = await getPostsList(
      univid,
      postid,
      UnivContext.setError
    );

    //api로부터 댓글 정보 불러오기
    let serverCommentList = await getCommunityComments(univid, postid);

    //접근할 수 없는 post번호에 접근했을경우
    if (serverPostList === undefined) {
      history.go(-1);
    }

    //정보를 state로 초기화
    serverPostList = serverPostList.data;
    SetState({
      title: serverPostList.title,
      writer: serverPostList.writer,
      body: serverPostList.body,
      modifiedDate: serverPostList.modifiedDate,
      previd: serverPostList.previd,
      nextid: serverPostList.nextid
    });
    Post.title = serverPostList.title;
    Post.writer = serverPostList.writer;
    Post.body = serverPostList.body;
    Post.modifiedDate = serverPostList.modifiedDate;
    Post.previd = serverPostList.previd;
    Post.nextid = serverPostList.nextid;

    //draft.js인코딩
    if (Post.body !== "") {
      const parseBody = JSON.parse(Post.body);
      const RawParseBody = convertFromRaw(parseBody);
      const StateParseBody = EditorState.createWithContent(RawParseBody);
      setEditorState(StateParseBody);
      editorState = StateParseBody;
    }
    SetState({ ...Post, comments: serverCommentList.data });
  };

  //처음 로드했을 때 loaddata실행
  useEffect(() => {
    loaddata();
  }, []);

  //리턴값
  return (
    <Container>
      <Header />
      <Board>
        <FlexComponent>
          <Button onClick={handleButtonGoToLists}>리스트로</Button>
          <FlexComponent direction="end">
            {Post.previd == "0" ? (
              ""
            ) : (
              <Button style={{ top: 0 }} onClick={handleClickForwardPost}>
                이전글
              </Button>
            )}
            {Post.nextid == "0" ? (
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
                  <Button radius="radius" onClick={handledeletedata}>
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
              onChange={handleFakeEditorChange}
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
                  {console.log(body)}
                  {localStorage.getItem("LoggedIn") == "true" &&
                    localStorage.getItem("userId") == writer && (
                      <FlexComponent>
                        <SmallButton onClick={handleClickCommentModify} id={id} data-body = {body}>
                          수정
                        </SmallButton>
                        <SmallButton onClick={handleClickCommentRemove} id={id}>
                          삭제
                        </SmallButton>
                      </FlexComponent>
                    )}
                </FlexComponent>
                <div id = "body">{body}</div>
                <div>{modifiedDate}</div>
              </CommentBox>
            ))
          ) : (
            <CommentBox>Error</CommentBox>
          )}
          {localStorage.getItem("LoggedIn") == "true" ? (
            <CommentBox style={{ flexDirection: "row" }}>
              <PostCommentForm onSubmit={handlePostComment}>
                <textarea
                  id="comment_text"
                  title="댓글입력"
                  rows="3"
                ></textarea>
                <Button
                  style={{ position: "relative", top: "-8px" }}
                  type="submit"
                >
                  댓글입력
                </Button>
              </PostCommentForm>
            </CommentBox>
          ) : (
            <CommentBox style={{ flexDirection: "row" }}>
              로그인을 하셔야 댓글을 작성할 수 있습니다.
            </CommentBox>
          )}
        </Comment>
      </Board>
    </Container>
  );
};
export default withRouter(CommunityDetail);
