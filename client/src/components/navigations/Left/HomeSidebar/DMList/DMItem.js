import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";

export default function DMItem({ user, channel, match }) {
  const history = useNavigate();
  const openDM = () => {
    history(`/channel/@me/${channel._id}`);
  };
  return (
    <div className="flex w-full px-2">
      <UnstyledButton
        className={`rounded-md p-2 hover:bg-slate-200 w-full ${
          match?.params?.channelId === channel._id ? "bg-slate-200" : ""
        }`}
        onClick={openDM}
      >
        <Group spacing="sm" className="h-14">
          <div className="h-full w-14 relative">
            {channel.type === "GROUP" ? (
              <>
                <Avatar
                  src={channel.owner.avatar_url}
                  radius="xl"
                  style={{
                    height: "calc(100% * (2/3))",
                    border: "2px solid #fff",
                  }}
                  className="absolute left-0 bottom-0 z-[1]"
                  color={`#${Math.floor(channel.owner.accent_color).toString(16)}`}
                >
                  {channel.owner.username[0]}
                </Avatar>
                <Avatar
                  src={channel.members[0].avatar_url}
                  radius="xl"
                  style={{ height: "calc(100% * (2/3))" }}
                  className="absolute right-0 top-0 z-0"
                  color={`#${Math.floor(channel.members[0].accent_color).toString(16)}`}
                >
                  {channel.members[0].username[0]}
                </Avatar>
              </>
            ) : (
              <Avatar
                src={
                  channel.members[0]._id !== user._id
                    ? channel.members[0].avatar_url
                    : channel.members[1].avatar_url
                }
                radius="xl"
                size="lg"
                color={`#${
                  channel.members[0]._id !== user._id
                    ? Math.floor(channel.members[0].accent_color).toString(16)
                    : Math.floor(channel.members[1].accent_color).toString(16)
                }`}
              >
                {channel.members[0]._id !== user._id
                  ? channel.members[0].username[0]
                  : channel.members[1].username[0]}
              </Avatar>
            )}
          </div>

          <div style={{ flex: 1 }} className="overflow-ellipsis truncate">
            <Text size={15} weight={500} className="overflow-ellipsis truncate">
              {channel.type === "GROUP"
                ? channel.name === null
                  ? channel.members.map((member) => member.username).join(", ")
                  : channel.name
                : channel.members[0]._id !== user._id
                ? channel.members[0].username
                : channel.members[1].username}
            </Text>
            {channel.lastMessage ? (
              <div className="flex">
                <Text
                  className="overflow-ellipsis truncate"
                  color="#1876f2"
                  size="xs"
                  weight={500}
                >
                  {channel.lastMessage.systemMessage
                    ? "Ban co tin nhan he thong"
                    : channel.lastMessage.content}
                </Text>
                <Text color="dimmed" size="xs">
                  · {moment(channel.lastMessage.createdAt).fromNow()}
                </Text>
              </div>
            ) : channel.type === "GROUP" ? (
              <div className="flex">
                <Text
                  className="overflow-ellipsis truncate"
                  color="#1876f2"
                  size="xs"
                  weight={500}
                >
                  {channel.members.length + 1} members
                </Text>
              </div>
            ) : null}
          </div>
          {/* <ActionIcon size="lg" radius="xl" variant="light">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </ActionIcon> */}
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>

          {/* {icon || <ChevronRight size={14} />} */}
        </Group>
      </UnstyledButton>
    </div>
  );
}
