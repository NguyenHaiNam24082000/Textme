import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Avatar, AvatarsGroup, Group, Text } from "@mantine/core";
import React from "react";

export default function AddFriendItem({ user }) {
  return (
    <Group
      position="apart"
      className="w-full p-2 rounded-md cursor-pointer hover:bg-slate-300 group"
    >
      <Group spacing="sm">
        <Avatar
          src={user.avatar_url}
          radius="xl"
          size="lg"
          styles={{
            placeholder: {
              color: "#fff",
              backgroundColor: `#${Math.floor(user.accent_color).toString(16)}`,
            },
          }}
        >
          {user.username[0].toUpperCase()}
        </Avatar>
        <div>
          <div className="flex items-center">
            <Text size="sm" weight={500}>
              {user.username}
            </Text>
            <Text
              color="dimmed"
              className="group-hover:opacity-100 opacity-0"
            >{`#${user.discriminator}`}</Text>
          </div>
          {user.mutualFriends.length > 0 ? (
            <AvatarsGroup
              size={18}
              radius="lg"
              limit={2}
              total={user.mutualFriends.length}
            >
              {user.mutualFriends.map((friend) => (
                <Avatar
                  src={friend.avatar_url}
                  styles={{
                    placeholder: {
                      color: "#fff",
                      backgroundColor: `#${Math.floor(
                        friend.accent_color
                      ).toString(16)}`,
                    },
                  }}
                >
                  {friend.username[0].toUpperCase()}
                </Avatar>
              ))}
            </AvatarsGroup>
          ) : (
            <Text color="dimmed" size="xs">
              No mutual friends
            </Text>
          )}
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
