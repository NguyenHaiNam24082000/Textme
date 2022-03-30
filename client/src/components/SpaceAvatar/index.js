import React, { useState } from "react";
import { Avatar, Badge } from "@douyinfe/semi-ui";
import { Popover, Text } from "@mantine/core";
import "./index.css";

export default function SpaceAvatar({ onClick, image, title }) {
  const [active, setActive] = useState(false);
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
          className="relative flex justify-center items-center select-none"
          style={{ height: "58px" }}
        >
          {/* <pre></pre>
        <pre></pre> */}
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
              className="space-avatar"
              size="medium"
              onClick={() => {
                setActive(!active);
              }}
            ></Avatar>
          </Badge>
        </div>
      }
    >
      <Text size="sm" weight={600}>Thanks for stopping by and checking</Text>
    </Popover>
  );
}
