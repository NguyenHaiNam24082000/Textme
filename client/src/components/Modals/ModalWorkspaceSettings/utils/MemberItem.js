import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  ActionIcon,
  Group,
  Menu,
  Text,
  Indicator,
} from "@mantine/core";
import React, { useState } from "react";
// import { useQueryClient } from "react-query";
// import { useNavigate } from "react-router";
// import { getOrCreateDMChannel } from "../../../apis/channel";
// import {
//   blockFriendRequestApi,
//   cancelPendingRequestApi,
// } from "../../../apis/friend";
// import getSocket from "../../../apis/socket";
// import friendObject, {
//   pendingDiscriminator,
//   pendingStatus,
//   pendingUsername,
// } from "../../../commons/friendObject";
// import {
//   ALL_FRIENDS_KEY,
//   BLOCKED_FRIENDS_KEY,
//   OPEN_CHANNEL,
// } from "../../../configs/queryKeys";
// import { ME_SOCKET } from "../../../configs/socketRoute";
// import { GetMe } from "../../../../store/userSlice";
// import ModalUserProfile from "../../Modals/ModalUserProfile";

export default function MemberItem({ member }) {
  // const me = GetMe();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [openedModalUserProfile, setOpenedModalUserProfile] = useState(false);

  return (
    <>
      <Group
        position="apart"
        className="w-full p-2 rounded-md cursor-pointer hover:bg-slate-300 group"
        onClick={() => setOpenedModalUserProfile(true)}
      >
        <Group spacing="sm">
          <Indicator
            sx={{
              indicator: {
                zIndex: "5",
              },
            }}
            inline
            size={16}
            offset={7}
            position="bottom-end"
            color={member?.status?.online ? "green" : "gray"}
            withBorder
          >
            <Avatar
              src={member.avatar_url}
              radius="xl"
              size="lg"
              styles={{
                placeholder: {
                  color: "#fff",
                  backgroundColor: `#${Math.floor(member.accent_color).toString(
                    16
                  )}`,
                },
              }}
            >
              {member.username[0].toUpperCase()}
            </Avatar>
          </Indicator>
          <div>
            <div className="flex items-center">
              <Text size="lg" weight={500}>
                {member.username}
              </Text>
              <Text
                color="dimmed"
                size="sm"
                className="group-hover:opacity-100 opacity-0"
              >{`#${member.discriminator}`}</Text>
            </div>
            <Text color="dimmed" size="xs">
              {/* {friend.sender.id === me.id
                ? friend.receiver?.status?.online
                : friend.sender.status?.online
                ? "Online"
                : "Offline"} */}
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
            // onClick={openDM}
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
            {/* <Menu.Item onClick={blockedHandler}>Blocked Friend</Menu.Item> */}
            {/* <Menu.Item onClick={cancelPending}>Remove Friend</Menu.Item> */}
          </Menu>
        </Group>
      </Group>
      {/* <ModalUserProfile
        opened={openedModalUserProfile}
        onClose={() => {
          setOpenedModalUserProfile(false);
        }}
        me={me.user}
        friend={friend}
      /> */}
    </>
  );
}
