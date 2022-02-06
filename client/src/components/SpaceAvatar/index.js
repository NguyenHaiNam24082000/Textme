import React from "react";
import { Avatar, Badge } from "@douyinfe/semi-ui";

export default function SpaceAvatar({ onClick,image,title }) {
  return (
    <Badge
      count={"999"}
      position="rightBottom"
      style={{
        bottom: 12,
        right: 15,
        border: "2px solid var(--background-white-primary)",
      }}
    >
      <Avatar
        src={image}
        alt={title}
        className="avatar"
        size="medium"
        // onClick={() => {
        //   setActive(!active);
        // }}
      ></Avatar>
    </Badge>
  );
}
