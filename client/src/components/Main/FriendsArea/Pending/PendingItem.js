import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { GetMe } from "../../../../store/userSlice";
import getSocket from "../../../../apis/socket";
import { ActionIcon, Group, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  isIncoming,
  pendingDiscriminator,
  pendingStatus,
  pendingUsername,
} from "../../../../commons/friendObject";
import {
  acceptPendingRequestApi,
  cancelPendingRequestApi,
} from "../../../../apis/friend";
import {
  ALL_FRIENDS_KEY,
  OUT_GOING_REQUESTS_KEY,
  PENDING_REQUESTS_KEY,
} from "../../../../configs/queryKeys";
import { ME_SOCKET } from "../../../../configs/socketRoute";

export default function PendingItem({ user, pending }) {
  const me = GetMe();
  const cache = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const socket = getSocket(me?.tokens?.access?.token);

  const cancelPending = async (e) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      await cancelPendingRequestApi(pending.id);
      if (isIncoming(user, pending)) {
        cache.invalidateQueries(PENDING_REQUESTS_KEY);
      } else {
        cache.invalidateQueries(OUT_GOING_REQUESTS_KEY);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const acceptPending = async (e) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      const result = await acceptPendingRequestApi(pending.id);
      cache.invalidateQueries(PENDING_REQUESTS_KEY);
      cache.invalidateQueries(ALL_FRIENDS_KEY);

      socket.emit(ME_SOCKET.SEND_ACCEPT_FRIEND_REQUEST, {
        receiverId: result?.data?.receiver?.id,
      });
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
            <Text size="sm" weight={500}>
              {pendingUsername(user, pending)}
            </Text>
            <Text
              color="dimmed"
              className="group-hover:opacity-100 opacity-0"
            >{`#${pendingDiscriminator(user, pending)}`}</Text>
          </div>
          <Text color="dimmed" size="xs">
            {pendingStatus(user, pending)}
          </Text>
        </div>
      </Group>
      <Group spacing="xs">
        {isIncoming(user, pending) && (
          <ActionIcon loading={isLoading} onClick={acceptPending} size="xl" radius="xl" variant="light">
            <FontAwesomeIcon icon="fa-solid fa-check" />
          </ActionIcon>
        )}
        <ActionIcon loading={isLoading} onClick={cancelPending} size="xl" radius="xl" variant="light">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </ActionIcon>
      </Group>
    </Group>
  );
}
