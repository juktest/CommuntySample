import React, { useContext, useRef, useEffect } from "react";
import { Container, Color } from "../../Components/Style";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import heart from "img/heart.png";

const RoomList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: pink;
`;

export const RoomDistanceComponent = styled.h3`
  margin-top: 0.8rem;
  margin-bottom: 0.6rem;
  color: #669699;

  font-weight: 800;
  font-size: 1.2rem;

  ::before {
    font-size: 1rem;
    content: "숭실대까지 ";
    color: #2c2c2c;
  }
`;

export const BoxComponent = styled.h5`
  font-weight: 900;
  color: black;
  padding: 0.2rem;
  border-radius: 30%;
  background: ${Color.mint};
  background-size: auto;
  display: inline;
  & + & {
    margin-left: 0.3rem;
  }
`;

export const RoomMoneyComponent = styled.ul`
  list-style: none;
  font-weight: 700;
  font-size: 1.3rem;

  padding: 0;

  display: flex;
  margin: 6px 0px;
  margin-right: 10px;

  li {
    color: rosybrown;
    &:hover {
      color: white;
    }
  }

  li:nth-child(3n + 1) {
    color: black;
  }
`;

export const RoomAreaComponent = styled.p`
  font-size: 0.9rem;
  color: gray;
  font-weight: 700;
  @media (max-width: 800px) {
    display: none;
  }
`;

export const RoomItemComponent = styled(Link)`
  margin: 10px;
  text-decoration: none;
  background-color: white;
  display: inline-block;
  font-weight: 300;
  padding: 0.5rem;
  height: fit-content;

  border-radius: 5px;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);

  &:hover {
    background: rgb(150, 135, 135);
    ${RoomMoneyComponent} li {
      color: white;
    }
    ${RoomDistanceComponent} {
      color: #1ddb16;
    }
  }

  img:first-child {
    width: 100%;
  }

  img:last-child {
    width: 2rem;
    position: relative;
    left: 75%;
  }
`;

function RoomItem({
  id,
  thumbnail,
  structure,
  price,
  floor,
  scale,
  grade,
  distance
}) {
  const changePrice = price => {
    let hmillion = price / 10000;
    let tthousand = price % 10000;
    hmillion = Math.floor(hmillion);
    if (hmillion > 0) {
      return hmillion + "억" + tthousand;
    }
    return tthousand;
  };

  price.deposit = changePrice(price.deposit);
  console.log(window.innerHeight);
  return (
    <RoomItemComponent
      className="room"
      to={{
        pathname: `/room/${id}`,
        state: {}
      }}
    >
      <img src={thumbnail} alt="thumbnailimage" />
      <RoomMoneyComponent>
        <li>월세</li>
        <li>
          {price.deposit}/{price.month}
        </li>
      </RoomMoneyComponent>
      <BoxComponent>{structure}</BoxComponent>
      <BoxComponent>*{grade}</BoxComponent>
      <RoomDistanceComponent>{distance}</RoomDistanceComponent>
      <RoomAreaComponent>
        {scale}m<sup>2</sup>/{floor}층
      </RoomAreaComponent>
      <img src={heart} alt="heart"></img>
    </RoomItemComponent>
  );
}

function Room() {
  const roomData = [
    {
      roomid: 1,
      thumbnail:
        "https://ic.zigbang.com/ic/items/19317951/1.jpg?w=800&h=600&q=70&a=1",
      structure: "원룸",
      price: {
        type: "월세",
        deposit: 100,
        month: 50,
        adminExpnse: 5
      },
      floor: 1,
      scale: "38",
      grade: 3,
      distance: "120m"
    }
  ];

  return (
    <RoomList>
      {roomData.map((room, index) => (
        <RoomItem
          key={room.id}
          id={room.id}
          thumbnail={room.thumbnail}
          structure={room.structure}
          price={room.price}
          floor={room.floor}
          scale={room.scale}
          grade={room.grade}
          distance={room.distance}
        ></RoomItem>
      ))}
    </RoomList>
  );
}

export default Room;
