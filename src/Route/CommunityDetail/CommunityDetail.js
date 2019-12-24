import React from "react";
import { getPostsList } from "Components/Api";
import styled from "styled-components";
import Header from "Components/Header";

const Container = styled.div``;
const Head = styled.div``;

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
    loaddata();
  }

  render() {
    return (
      <Container>
        <Header />
        <Head>detail</Head>
      </Container>
    );
  }
}

export default CommunityDetail;
