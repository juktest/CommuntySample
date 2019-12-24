import React from "react";
import { getPostsList } from "Components/Api";
import styled from "styled-components";
import Header from "Components/Header";

const Container = styled.div``;
const Head = styled.div``;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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
    let stateNull = true;
    let List;
    if (this.state.title !== "") {
      stateNull = false;
      List = this.state.List;
      console.log(this.state);
    }

    return (
      <Container>
        <Header />
        <Head>detail</Head>
        <ListContainer>
          {this.state.title} {this.state.writer} {this.state.body}{" "}
          {this.state.modifiedDate}
        </ListContainer>
      </Container>
    );
  }
}

export default CommunityDetail;
