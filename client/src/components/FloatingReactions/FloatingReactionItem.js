import React from "react";
import "./FloatingReactionItem.css";
import love from "../../assets/images/reaction/Scared.png";
import avatar from "../../assets/images/avatar_test.jpg";
import { Image, Avatar } from "@mantine/core";
const LEFT_POSITION = 1;
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export default function FloatingReactionItem() {
  // randomizing xPos
  const xPos = React.useMemo(() => getRandomInt(70), []);
  const emojiPos = React.useMemo(() => getRandomInt(2), []);
  return (
    <div className="floating-reaction-item" style={{ left: xPos }}>
      <Avatar color="cyan" radius="xl" size={40} src={avatar}>
      </Avatar>
      <Image
        width={40}
        height={40}
        src={love}
        alt="With default placeholder"
        className={`absolute -bottom-5 ${emojiPos===LEFT_POSITION?"-left-5":"-right-5"}`}
        withPlaceholder
      />
    </div>
  );
}
