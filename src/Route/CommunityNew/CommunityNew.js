import React from "react";
import styled from "styled-components";
import Header from "Components/Header";
import {
  Editor,
  EditorState,
  RichUtils,
  KeyBindingUtil,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
  stateToHTML
} from "draft-js";
import Draggable from "react-draggable";
import { postCommunityPost } from "Components/Api";
import { queries } from "@testing-library/react";
import qs from "qs";
import { Container, Board } from "Components/Style";
import { BoardInformation } from "../CommunityDetail/style";
import { Button, Color } from "../../Components/Style";
import FileDrop from "react-file-drop";
import createImagePlugin from "draft-js-image-plugin";

//styled-component
const ContainerEditer = styled.div`
  margin-top: 30px;
`;

const TitleInput = styled.input`
  width: 70%;
`;

const styles = {
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

export default class extends React.Component {
  //constructor
  constructor(props) {
    const imagePlugin = createImagePlugin();
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      TitleInputState: "",
      ImageFile: "",
      imagePlugin: ""
    };
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.setState({ ...this.state, imagePlugin: imagePlugin });
    this.state = {
      ...this.state,
      imagePlugin: imagePlugin
    };
  }

  //draft-js 스타일 키설정
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    if (!editorState && command === "highlight") {
      editorState = RichUtils.toggleInlineStyle(
        this.state.editorState,
        "HIGHLIGHT"
      );
    }

    return "not-handled";
  }

  keyBindingFn = event => {
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 75) {
      return "bbbold";
    }
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "h"
    ) {
      return "highlight";
    }
    return getDefaultKeyBinding(event);
  };

  //draft-js 스타일 버튼
  _onBoldClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  _onItalicClick(e) {
    e.preventDefault();
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  }

  _onUnderLineClick(e) {
    e.preventDefault();
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  }

  _onHighlightClick(e) {
    e.preventDefault();
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT")
    );
  }

  //event 핸들러
  //submit가 됬을 때
  handleSubmitForm = e => {
    e.preventDefault();
    console.log("form");
  };

  //submit 버튼을 눌렀을 때
  handleSubmitButton = async e => {
    e.preventDefault();

    const title = this.state.TitleInputState;
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    const {
      blocks: [{ text }]
    } = content;
    const image = this.state.ImageFile;

    /*제목이나 바디부분이 비어있는지 확인 */
    if (text && title) {
      const body = JSON.stringify(content);
      await postCommunityPost(title, body, image);
      await this.props.history.push(`/community/1`);
    } else if (title === "") {
      alert("제목을 작성해주세요");
      this.title.focus();
    } else {
      alert("본문을 작성해주세요");
      this.body.focus();
    }
  };

  TitleInputChange = e => {
    this.setState({ TitleInputState: e.target.value });
  };

  handleSubmitImage = e => {
    this.state = {
      ImageFile: e.target.files[0]
    };
    this.setState({
      ImageFile: e.target.files[0]
    });

    console.log(this.state);
  };

  handleDrop = (files, event) => {
    console.log(files);
    console.log(event);
  };

  //render
  render() {
    const styleMap = {
      HIGHLIGHT: {
        backgroundColor: "red"
      }
    };
    const currentStyle = this.state.editorState.getCurrentInlineStyle();

    return (
      <>
        <Container>
          <Header />
          <Board mt="5rem">
            <BoardInformation>
              <TitleInput
                ref={ref => (this.title = ref)}
                placeholder="제목을 입력하세요"
                value={this.state.TitleInputState}
                onChange={this.TitleInputChange}
              ></TitleInput>
              <input type="file" onChange={this.handleSubmitImage} />
              <ContainerEditer onSubmit={this.handleSubmitForm}>
                <Button
                  color={currentStyle.has("BOLD") ? "red" : "pink"}
                  onMouseDown={this._onBoldClick.bind(this)}
                >
                  Bold
                </Button>
                <Button
                  color={currentStyle.has("ITALIC") ? "red" : "pink"}
                  onMouseDown={this._onItalicClick.bind(this)}
                >
                  Italic
                </Button>
                <Button
                  color={currentStyle.has("UNDERLINE") ? "red" : "pink"}
                  onMouseDown={this._onUnderLineClick.bind(this)}
                >
                  Under Line
                </Button>
                <Button
                  color={currentStyle.has("HIGHLIGHT") ? "red" : "pink"}
                  onMouseDown={this._onHighlightClick.bind(this)}
                >
                  highlight
                </Button>
                <div style={styles.editor}>
                  <Editor
                    ref={ref => (this.body = ref)}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
                    keyBindingFn={this.keyBindingFn}
                    placeholder="본문을 입력하세요"
                    customStyleMap={styleMap}
                    plugins={[this.imagePlugin]}
                  />
                </div>

                <Button
                  color={Color.deepPink}
                  as="button"
                  type="submit"
                  onClick={this.handleSubmitButton}
                >
                  Submit
                </Button>
              </ContainerEditer>
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "pink"
                }}
              >
                <FileDrop onDrop={this.handleDrop}>파일을 드롭하세요</FileDrop>
              </div>
            </BoardInformation>
          </Board>
        </Container>
      </>
    );
  }
}
