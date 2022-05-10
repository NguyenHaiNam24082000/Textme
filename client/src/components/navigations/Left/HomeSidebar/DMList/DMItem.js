import {
  Avatar, Group,
  Text,
  UnstyledButton
} from "@mantine/core";
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
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=250&amp;q=80"
                  radius="xl"
                  style={{
                    height: "calc(100% * (2/3))",
                    border: "2px solid #fff",
                  }}
                  className="absolute left-0 bottom-0 z-[1]"
                />
                <Avatar
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=250&amp;q=80"
                  radius="xl"
                  style={{ height: "calc(100% * (2/3))" }}
                  className="absolute right-0 top-0 z-0"
                />
              </>
            ) : (
              <Avatar
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
                radius="xl"
                size="lg"
              />
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
                  {channel.lastMessage.content}
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
