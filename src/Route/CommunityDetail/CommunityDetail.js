import React from "react";
import { getPostsList } from "Components/Api";
import styled from "styled-components";

const Container = styled.div``;
const Header = styled.div``;

class CommunityDetail extends React.Component {
  state = {
    title: "",
    writer: "",
    body: "",
    modifiedDate: ""
  };

  componentDidMount() {
    const loaddata = async () => {
      const {
        match: { params }
      } = this.props;
      const serverPostList = await getPostsList(params.univid, params.postid);
      const {
        data: { title, writer, body, modifiedDate }
      } = serverPostList;
      console.log(title, writer, body, modifiedDate);
      this.setState({
        title: title,
        writer: writer,
        body: body,
        modifiedDate: modifiedDate
      });
    };
  }

  render() {
    return (
      <Container>
        <Header>detail</Header>
      </Container>
    );
  }
}

export default CommunityDetail;
