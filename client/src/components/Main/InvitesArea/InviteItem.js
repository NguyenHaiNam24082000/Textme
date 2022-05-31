import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, ActionIcon, Group, Menu, Text } from "@mantine/core";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { getOrCreateDMChannel } from "../../../apis/channel";
import {
  blockFriendRequestApi,
  cancelPendingRequestApi,
} from "../../../apis/friend";
import getSocket from "../../../apis/socket";
import friendObject, {
  pendingDiscriminator,
  pendingStatus,
  pendingUsername,
} from "../../../commons/friendObject";
import {
  ALL_FRIENDS_KEY,
  BLOCKED_FRIENDS_KEY,
  OPEN_CHANNEL,
} from "../../../configs/queryKeys";
import { ME_SOCKET } from "../../../configs/socketRoute";
import { GetMe } from "../../../store/userSlice";
import ModalUserProfile from "../../Modals/ModalUserProfile";

export default function InviteItem({ user, friend }) {
  const me = GetMe();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [openedModalUserProfile, setOpenedModalUserProfile] = useState(false);

  const cache = useQueryClient();
  const socket = getSocket(me?.tokens?.access?.token);
  const history = useNavigate();

  const openDM = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const { data } = await getOrCreateDMChannel(
        friendObject(user, friend).id
      );
      if (data) {
        cache.invalidateQueries(OPEN_CHANNEL);
        history(`/channel/@me/${data._id}`);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      // const result = apiErrorHandler(err);
      setIsLoading(false);
    }
  };

  const cancelPending = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await cancelPendingRequestApi(friend.id);
      cache.invalidateQueries(ALL_FRIENDS_KEY);
      const receiverId =
        friend.sender.id === me.id ? friend.receiver.id : friend.sender.id;
      console.log(receiverId, "receiverId");
      socket.emit(ME_SOCKET.SEND_CANCEL_FRIEND_REQUEST, {
        receiverId: receiverId,
      });
      setIsLoading(false);
    } catch (err) {
      // const result = apiErrorHandler(err);
      setIsLoading(false);
    }
  };

  const blockedHandler = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await blockFriendRequestApi(friend.id);
      cache.invalidateQueries(ALL_FRIENDS_KEY);
      cache.invalidateQueries(BLOCKED_FRIENDS_KEY);
      const receiverId =
        friend.sender.id === me.id ? friend.receiver.id : friend.sender.id;
      socket.emit(ME_SOCKET.SEND_BLOCK_FRIEND_REQUEST, {
        receiverId: receiverId,
      });
      setIsLoading(false);
    } catch (err) {
      // const result = apiErrorHandler(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Group
        position="apart"
        className="w-full p-2 rounded-md cursor-pointer hover:bg-slate-300 group"
        onClick={() => setOpenedModalUserProfile(true)}
      >
        <Group spacing="sm">
          <Avatar
            color={`#${Math.floor(
              friendObject(user, friend).accent_color
            ).toString(16)}`}
            size="lg"
            radius="xl"
            src={friendObject(user, friend).avatar_url}
          >
            {!friendObject(user, friend).avatar_url &&
              pendingUsername(user, friend)[0]}
          </Avatar>
          <div>
            <div className="flex items-center">
              <Text size="lg" weight={500}>
                {pendingUsername(user, friend)}
              </Text>
              <Text
                color="dimmed"
                size="sm"
                className="group-hover:opacity-100 opacity-0"
              >{`#${pendingDiscriminator(user, friend)}`}</Text>
            </div>
            <Text color="dimmed" size="xs">
              {pendingStatus(user, friend)}
            </Text>
          </div>
        </Group>
        <Group spacing="xs">
          {/* {isIncoming(user, friend) && (
          <ActionIcon
            loading={isLoading}
            onClick={acceptPending}
            size="xl"
            radius="xl"
            variant="light"
          >
            <FontAwesomeIcon icon="fa-solid fa-check" />
          </ActionIcon>
        )} */}
          <ActionIcon
            loading={isLoading}
            onClick={openDM}
            size="xl"
            radius="xl"
            variant="light"
          >
            <FontAwesomeIcon icon="fa-solid fa-inbox" />
          </ActionIcon>
          <Menu
            radius="md"
            control={
              <ActionIcon
                onClick={(e) => {
                  e.stopPropagation();
                }}
                size="xl"
                radius="xl"
                variant="light"
              >
                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
              </ActionIcon>
            }
          >
            <Menu.Item onClick={blockedHandler}>Blocked Friend</Menu.Item>
            <Menu.Item onClick={cancelPending}>Remove Friend</Menu.Item>
          </Menu>
        </Group>
      </Group>
      <ModalUserProfile
        opened={openedModalUserProfile}
        onClose={() => {
          setOpenedModalUserProfile(false);
        }}
        user={me.user}
        pending={friend}
      />
    </>
  );
}
