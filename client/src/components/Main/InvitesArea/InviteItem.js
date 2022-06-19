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

export default function InviteItem({ invite }) {
  const me = GetMe();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [openedModalUserProfile, setOpenedModalUserProfile] = useState(false);

  const cache = useQueryClient();
  const socket = getSocket(me?.tokens?.access?.token);
  const history = useNavigate();

  return (
    <>
      <Group
        position="apart"
        className="w-full p-2 rounded-md cursor-pointer hover:bg-slate-300 group"
        onClick={() => setOpenedModalUserProfile(true)}
      >
        <Group spacing="sm">
          <Avatar
            styles={{
              placeholder: {
                color: "white",
                backgroundColor: "#7289da",
              },
            }}
            size="lg"
            radius="xl"
            src={invite.workspace.avatar}
          >
            {invite.workspace.name[0].toUpperCase()}
          </Avatar>
          <div>
            <div className="flex items-center">
              <Text size="lg" weight={500}>
                {invite.workspace.name}
              </Text>
              <Text
                color="dimmed"
                size="sm"
                className="group-hover:opacity-100 opacity-0"
              >
                {/* {`#${pendingDiscriminator(user, friend)}`} */}
              </Text>
            </div>
            <Text color="dimmed" size="xs">
              {/* {pendingStatus(user, friend)} */}
            </Text>
          </div>
        </Group>
        <Group spacing="xs">
          {invite.status === "INVITED" && (
            <ActionIcon
              loading={isLoading}
              size="xl"
              radius="xl"
              variant="light"
            >
              <FontAwesomeIcon icon="fa-solid fa-check" />
            </ActionIcon>
          )}
          <ActionIcon
            loading={isLoading}
            // onClick={openDM}
            size="xl"
            radius="xl"
            variant="light"
          >
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </ActionIcon>
        </Group>
      </Group>
    </>
  );
}
