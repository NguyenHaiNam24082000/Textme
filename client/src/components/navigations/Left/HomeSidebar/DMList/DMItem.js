import { Avatar } from "@douyinfe/semi-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Badge, Group, Text, UnstyledButton } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router";

export default function DMItem({ user, channel, match }) {
  const history = useNavigate();
  const openDM = () => {
    history(`/channel/@me/${channel._id}`);
  };
  console.log(channel,"match");
  return (
    <div className="flex w-full px-2">
      <UnstyledButton
        className={`rounded-md p-2 hover:bg-slate-200 w-full ${
          match?.params?.channelId === channel._id ? "bg-red-200" : ""
        }`}
        onClick={openDM}
      >
        <Group spacing="xs">
          <Avatar
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
            radius="xl"
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {channel.type === "GROUP" ? channel.name : channel.members[0]._id!==user._id? channel.members[0].username:channel.members[1].username}
            </Text>

            <Text color="dimmed" size="xs">
              {channel.lastMessage.content} · 1h
            </Text>
          </div>
          {/* <ActionIcon size="lg" radius="xl" variant="light">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </ActionIcon> */}
          <Badge>+50</Badge>

          {/* {icon || <ChevronRight size={14} />} */}
        </Group>
      </UnstyledButton>
    </div>
  );
}
