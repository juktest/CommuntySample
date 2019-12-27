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
import { postCommunityPost } from "Components/Api";
import { queries } from "@testing-library/react";
import qs from "qs";
import { Container, Board } from "Components/Style";
import { BoardInformation } from "../CommunityDetail/style";
import { Button, Color } from "../../Components/Style";

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
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      TitleInputState: ""
    };
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

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

  handleSubmitForm = e => {
    e.preventDefault();
    console.log("form");
  };

  handleSubmitButton = e => {
    e.preventDefault();

    const title = this.state.TitleInputState;
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    const {
      blocks: [{ text }]
    } = content;

    /*제목이나 바디부분이 비어있는지 확인 */
    if (text && title) {
      const body = JSON.stringify(content);
      postCommunityPost(title, body);
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

  render() {
    const styleMap = {
      HIGHLIGHT: {
        backgroundColor: "red"
      }
    };
    const currentStyle = this.state.editorState.getCurrentInlineStyle();

    return (
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
          </BoardInformation>
        </Board>
      </Container>
    );
  }
}
