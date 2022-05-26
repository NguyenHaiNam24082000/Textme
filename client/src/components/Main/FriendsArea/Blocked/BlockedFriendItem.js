import React, { useState } from "react";
import { ActionIcon, Group, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getSocket from "../../../../apis/socket";
import { useQueryClient } from "react-query";
import {
  ALL_FRIENDS_KEY,
  BLOCKED_FRIENDS_KEY,
  OPEN_CHANNEL,
} from "../../../../configs/queryKeys";
import { ME_SOCKET } from "../../../../configs/socketRoute";
import { unblockFriendRequestApi } from "../../../../apis/friend";

function BlockedFriendItem({ user, friend }) {
  const [isLoading, setIsLoading] = useState(false);
  const socket = getSocket(user?.tokens?.access?.token);
  const cache = useQueryClient();

  const unblockFriend = async (e) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      console.log(friend.id);
      const { data } = await unblockFriendRequestApi(friend.id);
      cache.invalidateQueries(BLOCKED_FRIENDS_KEY);
      cache.invalidateQueries(ALL_FRIENDS_KEY);
      cache.invalidateQueries(OPEN_CHANNEL);

      socket.emit(ME_SOCKET.SEND_UNBLOCKED_FRIENDS_KEY, {
        receiverId: data?.sender,
      });
      console.log(data?.sender, "datasender");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  return (
    <Group
      position="apart"
      className="w-full p-2 rounded-md cursor-pointer hover:bg-slate-300 group"
    >
      <Group spacing="sm">
        {/* <Avatar size={40} src={item.avatar} radius={40} /> */}
        <div>
          <div className="flex items-center">
            {/* <Text size="sm" weight={500}>
                  {pendingUsername(user, friend)}
                </Text>
                <Text
                  color="dimmed"
                  className="group-hover:opacity-100 opacity-0"
                >{`#${pendingDiscriminator(user, friend)}`}</Text> */}
          </div>
          <Text color="dimmed" size="xs">
            {/* {pendingStatus(user, friend)} */}
          </Text>
        </div>
      </Group>
      <Group spacing="xs">
        <ActionIcon
          loading={isLoading}
          onClick={unblockFriend}
          size="xl"
          radius="xl"
          variant="light"
        >
          <FontAwesomeIcon icon="fa-solid fa-user-xmark" />
        </ActionIcon>
      </Group>
    </Group>
  );
}

export default BlockedFriendItem;
