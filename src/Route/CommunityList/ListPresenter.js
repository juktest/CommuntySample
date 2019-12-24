import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "Components/Header";
import { getCommunityList } from "../../Components/Api";
import styled from "styled-components";

class ListPresenter extends React.Component {
  state = {
    List: ""
  };

  componentDidMount() {
    const getList = async () => {
      const {
        match: { params }
      } = this.props;
      const postsList = await getCommunityList(params);
      const { data } = postsList;
      this.setState({
        List: data
      });
    };
    getList();
  }

  render() {
    const GoToDetail = styled.a``;
    const ListContainer = styled.div`
      display: flex;
      flex-direction: column;
    `;
    let stateNull = true;
    let List;
    if (this.state.List !== "") {
      stateNull = false;
      List = this.state.List;
    }

    const {
      match: { params }
    } = this.props;
  
    return (
      <div>
        <Header />
        <ListContainer>
          <a href={`/community/${params.univid}/new`}>글쓰기</a>
          {stateNull
            ? ""
            : List.map(list => (
                <GoToDetail href={`/detail/${list.univid}/${list.id}`}>
                  {list.id} {list.title} {list.writer} 
                </GoToDetail>
              ))}
        </ListContainer>
      </div>
    );
  }
}

export default ListPresenter;
