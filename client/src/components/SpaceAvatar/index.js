import React, { useState } from "react";
import {
  Avatar,
  // Badge
} from "@douyinfe/semi-ui";
import { Popover, Text } from "@mantine/core";
import "./index.css";

export default function SpaceAvatar({ onClick, image, title, active }) {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="right"
      placement="center"
      trapFocus
      closeOnEscape
      transition="pop-top-left"
      width={260}
      gutter={0}
      radius="md"
      styles={{ body: { pointerEvents: "none" } }}
      target={
        <div
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
          // className={`${active ? "space-active" : ""} relative`}
          className={`relative flex justify-center items-center select-none ${
            active ? "space-active" : ""
          }`}
          style={{ height: "58px" }}
        >
          {/* <pre></pre>
        <pre></pre> */}
          {/* <Badge
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
              className="space-avatar"
              size="medium"
              onClick={() => {
                setActive(!active);
                typeof onClick === "function" && onClick();
              }}
            ></Avatar>
          </Badge> */}
          <Avatar
            className="space-avatar"
            radius="xl"
            // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            onClick={() => {
              typeof onClick === "function" && onClick();
            }}
          >
            {title[0].toUpperCase()}
          </Avatar>
        </div>
      }
    >
      <Text size="sm" weight={600}>
        Thanks for stopping by and checking
      </Text>
    </Popover>
  );
}
