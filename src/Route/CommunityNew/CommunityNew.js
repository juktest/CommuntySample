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

const Container = styled.div`
  margin-top: 80px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
`;

const ContainerEditer = styled.div`
  margin-top: 20px;
`;

const TitleInput = styled.input`
  width: 70%;
`;

const SubmitButton = styled.button``;

const SubmitForm = styled.form``;
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
    const body = JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    postCommunityPost(title, body);
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

    return (
      <>
        <Header />
        <Container>
          <TitleInput
            placeholder="제목을 입력하세요"
            value={this.state.TitleInputState}
            onChange={this.TitleInputChange}
          ></TitleInput>
          <ContainerEditer onSubmit={this.handleSubmitForm}>
            <button onMouseDown={this._onBoldClick.bind(this)}>Bold</button>
            <button onMouseDown={this._onItalicClick.bind(this)}>Italic</button>
            <button onMouseDown={this._onUnderLineClick.bind(this)}>
              Under Line
            </button>
            <button onMouseDown={this._onHighlightClick.bind(this)}>
              highlight
            </button>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.keyBindingFn}
              placeholder="본문을 입력하세요"
              customStyleMap={styleMap}
            />
            <SubmitButton type="submit" onClick={this.handleSubmitButton}>
              Submit
            </SubmitButton>
          </ContainerEditer>
        </Container>
      </>
    );
  }
}
