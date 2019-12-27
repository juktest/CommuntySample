import React from "react";
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

class CommunityDetail extends React.Component {
  state = {
    title: "",
    writer: "",
    body: "",
    modifiedDate: ""
  };

  constructor(props) {
    super(props);
    this.state = { ...this.state, editorState: EditorState.createEmpty() };
    this.onChange = () => {};
  }

  componentDidMount() {
    const loaddata = async () => {
      const {
        match: { params }
      } = this.props;
      const serverPostList = await getPostsList(params.univid, params.postid);
      const {
        data: { title, writer, body, modifiedDate }
      } = serverPostList;
      this.setState({
        ...this.state,
        title: title,
        writer: writer,
        body: body,
        modifiedDate: modifiedDate
      });
      if (this.state.body !== "") {
        const parseBody = JSON.parse(this.state.body);
        const RawParseBody = convertFromRaw(parseBody);
        const StateParseBody = EditorState.createWithContent(RawParseBody);
        console.log(convertFromRaw(parseBody));
        this.setState({
          ...this.state,
          editorState: StateParseBody
        });
      }
    };

    loaddata();
  }

  render() {
    let stateNull = true;
    let List;

    if (this.state.title !== "") {
      stateNull = false;
      List = this.state.List;
      console.log(this.state);
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
              <b>{this.state.title} </b>
              {/* {this.state.writer === localStorage.writer &} */}
              <FlexComponent>
                <Button radius="radius">수정</Button>
                <Button radius="radius">삭제</Button>
              </FlexComponent>
            </FlexComponent>
            <hr></hr>

            <FlexComponent>
              <div class="id">{this.state.writer}</div>
              <div class="day">{this.state.modifiedDate}</div>
            </FlexComponent>

            <BoardContent>
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                customStyleMap={styleMap}
              />
            </BoardContent>
          </BoardInformation>

          <Comment>
            <CommentBox>
              <FlexComponent>
                <div>{this.state.writer}</div>
                {/* {this.state.writer === localStorage.writer &} */}
                <FlexComponent>
                  <SmallButton>수정</SmallButton>
                  <SmallButton>삭제</SmallButton>
                </FlexComponent>
              </FlexComponent>
              <div>우앙 멋져요1!!!!</div>
              <div>{this.state.modifiedDate}</div>
            </CommentBox>

            <CommentBox>
              <div>{this.state.writer}</div>
              <div>;;저도 안녕하세욬ㅋㅋㅋㅋ</div>
              <div>{this.state.modifiedDate}</div>
            </CommentBox>
            <CommentBox>
              <div>{this.state.writer}</div>
              <div>허러러러러러러</div>
              <div>{this.state.modifiedDate}</div>
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
  }
}

export default CommunityDetail;
