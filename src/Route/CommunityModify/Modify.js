//기본 react library
import React, { useEffect, useState } from "react";
//Third party library
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { EditorState, convertFromRaw, RichUtils } from "draft-js";
//Components
import Header from "Components/Header";
import { getPostsList } from "Components/Api";
//Style
import { Board } from "Components/Style";
import { BoardInformation } from "../CommunityDetail/style";
import { Button, Color } from "Components/Style";

//styled-components
const Container = styled.div``;
const TitleInput = styled.input`
  width: 70%;
`;
const ContainerEditer = styled.div`
  margin-top: 30px;
`;

//메인 함수
const Modify = ({
  //url으로 부터 불러올 univid, postid
  match: {
    params: { univid, postid }
  }
}) => {
  //첫 state 초기화
  let [State, SetState] = useState({
    id: "",
    title: "",
    writer: "",
    body: ""
  });

  //api파일로부터 post내용을 받아 state에 저장하는 함수
  const getCommunityPost = async (univid, postid) => {
    //api로 부터 내용 불러오기
    const post = await getPostsList(univid, postid);

    //setstate
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

    //draft.js를 object에 맞게 인코딩
    if (State.body !== "") {
      const parseBody = JSON.parse(State.body);
      const RawParseBody = convertFromRaw(parseBody);
      const StateParseBody = EditorState.createWithContent(RawParseBody);
      SetState({ ...State, body: StateParseBody });
    }
  };

  //draft-js
  //draft-js 초기화
  let [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  //버튼 style
  const currentStyle = editorState.getCurrentInlineStyle();

  //draft-js style
  const _onBoldClick = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const _onItalicClick = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const _onUnderLineClick = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const _onHighlightClick = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
  };

  //처음 render할 때 콘텐츠 로딩
  useEffect(() => {
    getCommunityPost(univid, postid);
  }, []);

  console.log(State.body);

  //리턴값
  return (
    <Container>
      <Header />
      <Board mt="5rem">
        <BoardInformation>
          {State.title == undefined ? (
            ""
          ) : (
            <TitleInput
              placeholder="제목을 입력하세요"
              value={State.title}
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
            {/* <div style={styles.editor}>
              <Editor
                ref={ref => (this.body = ref)}
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.keyBindingFn}
                placeholder="본문을 입력하세요"
                customStyleMap={styleMap}
              />
            </div> */}
            <Button color={Color.deepPink} as="button" type="submit">
              Submit
            </Button>
          </ContainerEditer>
        </BoardInformation>
      </Board>
    </Container>
  );
};

export default withRouter(Modify);
