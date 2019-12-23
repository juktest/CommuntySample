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
      const { data } = serverPostList;
      this.setState({
        title: data.title,
        writer: data.writer,
        body: data.body,
        modifiedDate: data.modifiedDate
      });
      console.log(data);
    };

    loaddata();
    console.log(this.state);
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
