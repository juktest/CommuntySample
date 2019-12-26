import React from "react";
import Header from "../../Components/Header";
import { getRoomList } from "../../Components/Api";

class RoomList extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { univid }
      }
    } = this.props;
    getRoomList(univid);
  }
  render() {
    return (
      <div>
        <Header />방 리스트 페이지
      </div>
    );
  }
}

export default RoomList;
