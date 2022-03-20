import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Group, Menu, Text } from "@mantine/core";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import {
  pendingDiscriminator,
  pendingStatus,
  pendingUsername,
} from "../../../commons/friendObject";
import ModalUserProfile from "../../Modals/ModalUserProfile";

export default function FriendItem({ user, friend }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [openedModalUserProfile, setOpenedModalUserProfile] = useState(false);

  const cache = useQueryClient();
  const history = useNavigate();

  const openDM = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      
    } catch (err) {
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
          {/* <Avatar size={40} src={item.avatar} radius={40} /> */}
          <div>
            <div className="flex items-center">
              <Text size="sm" weight={500}>
                {pendingUsername(user, friend)}
              </Text>
              <Text
                color="dimmed"
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
            //   loading={isLoading}
            //   onClick={cancelPending}
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
                //   loading={isLoading}
                //   onClick={cancelPending}
                size="xl"
                radius="xl"
                variant="light"
              >
                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
              </ActionIcon>
            }
          >
            <Menu.Item>Blocked Friend</Menu.Item>
            <Menu.Item>Remove Friend</Menu.Item>
          </Menu>
        </Group>
      </Group>
      <ModalUserProfile
        opened={openedModalUserProfile}
        onClose={() => {
          setOpenedModalUserProfile(false);
        }}
        user={user}
        pending={friend}
      />
    </>
  );
}
