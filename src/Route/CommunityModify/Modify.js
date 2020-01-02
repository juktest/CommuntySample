//기본 react library
import React, { useEffect, useState } from "react";
//Third party library
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import {
  Editor,
  EditorState,
  convertFromRaw,
  RichUtils,
  convertToRaw
} from "draft-js";
//Components
import Header from "Components/Header";
import { getPostsList, postCommunityPut } from "Components/Api";
//Style
import { Board } from "Components/Style";
import { BoardInformation } from "../CommunityDetail/style";
import { Button, Color } from "Components/Style";

//styled-components
//전체 컨테이너
const Container = styled.div``;
//타이틀 입력 공간
const TitleInput = styled.input`
  width: 70%;
`;
//에디터 컨테이너
const ContainerEditer = styled.div`
  margin-top: 30px;
`;
//form 받기
const PostForm = styled.form``;

//css style
const styles = {
  //에디터 스타일
  editor: {
    backgroundColor: "#fffef7",
    border: "2px dashed pink",
    height: "300px",
    overflowY: "scroll",
    padding: "1.1rem",
    fontSize: "1.1rem",
    fontFamily: "'calibri', sans-serif",
    margintop: "2rem",
    marginBottom: "1rem"
  }
};

//메인 함수
const Modify = ({
  //url으로 부터 불러올 univid, postid
  match: {
    params: { univid, postid }
  },
  history
}) => {
  //메인 state 초기화
  // id : 글 고유번호, title : 제목, writer : 작성한 사람, body:본문
  let [State, SetState] = useState({
    id: "",
    title: "",
    writer: "",
    body: ""
  });
  //draft-js state 초기화
  let [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  //draft-js
  //버튼 style
  const currentStyle = editorState.getCurrentInlineStyle();

  //draft-js style
  //글씨체 : Bold
  const _onBoldClick = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  //글씨체 : ITALIC
  const _onItalicClick = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  //글씨체 : UNDERLINE
  const _onUnderLineClick = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  //글씨체 : HIGHLIGHT
  const _onHighlightClick = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
  };

  //콘텐츠 로딩함수
  //api파일로부터 post내용을 받아 state에 저장하는 함수
  const getCommunityPost = async (univid, postid) => {
    //api로 부터 내용 불러오기
    const post = await getPostsList(univid, postid);

    //state 초기값 설정
    SetState({
      id: post.data.id,
      title: post.data.title,
      writer: post.data.writer,
      body: post.data.body
    });
    State = {
      id: post.data.id,
      title: post.data.title,
      writer: post.data.writer,
      body: post.data.body
    };

    //draft.js를 object에 맞게 인코딩하고 state에 저장
    if (State.body !== "") {
      const parseBody = JSON.parse(State.body);
      const RawParseBody = convertFromRaw(parseBody);
      const StateParseBody = EditorState.createWithContent(RawParseBody);
      setEditorState(StateParseBody);
    }
  };

  //draft.js 커스텀 스타일
  const styleMap = {
    //highlight
    HIGHLIGHT: {
      backgroundColor: "red"
    }
  };

  //이벤트 handler
  //Submit햇을 때
  const handleSubmitPut = async e => {
    e.preventDefault();

    const title = State.title;
    let body = convertToRaw(editorState.getCurrentContent());

    /*제목이나 바디부분이 비어있는지 확인 */
    if (title && body) {
      body = JSON.stringify(body);
      await postCommunityPut(univid, postid, title, body);
      await history.push(`/community/1`);
    } else if (title === "") {
      alert("제목을 작성해주세요");
    } else {
      alert("본문을 작성해주세요");
    }
  };

  //title Input이 바뀔 때 handle
  const hanldeTitleInputChange = e => {
    SetState({ ...State, title: e.target.value });
  };

  //처음 render할 때 콘텐츠 로딩
  useEffect(() => {
    getCommunityPost(univid, postid);
  }, []);

  //리턴값
  return (
    <Container>
      <Header />
      <Board mt="5rem">
        <BoardInformation>
          <PostForm onSubmit={handleSubmitPut}>
            {State.title == undefined ? (
              ""
            ) : (
              <TitleInput
                placeholder="제목을 입력하세요"
                value={State.title}
                onChange={hanldeTitleInputChange}
              ></TitleInput>
            )}

            <ContainerEditer>
              <Button
                color={currentStyle.has("BOLD") ? "red" : "pink"}
                onMouseDown={_onBoldClick.bind(editorState)}
              >
                Bold
              </Button>
              <Button
                color={currentStyle.has("ITALIC") ? "red" : "pink"}
                onMouseDown={_onItalicClick.bind(editorState)}
              >
                Italic
              </Button>
              <Button
                color={currentStyle.has("UNDERLINE") ? "red" : "pink"}
                onMouseDown={_onUnderLineClick.bind(editorState)}
              >
                Under Line
              </Button>
              <Button
                color={currentStyle.has("HIGHLIGHT") ? "red" : "pink"}
                onMouseDown={_onHighlightClick.bind(editorState)}
              >
                highlight
              </Button>
              <div style={styles.editor}>
                <Editor
                  editorState={editorState}
                  onChange={setEditorState}
                  placeholder="본문을 입력하세요"
                  customStyleMap={styleMap}
                />
              </div>
              <Button color={Color.deepPink} as="button" type="submit">
                Submit
              </Button>
            </ContainerEditer>
          </PostForm>
        </BoardInformation>
      </Board>
    </Container>
  );
};

export default withRouter(Modify);
