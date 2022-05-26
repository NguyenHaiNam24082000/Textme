import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Group, Text } from "@mantine/core";
import React from "react";

export default function AddFriendItem({user}) {
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
          <FontAwesomeIcon icon="fa-solid fa-user-plus" />
        </ActionIcon>
      </Group>
    </Group>
  );
}
