import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Avatar,
  AvatarsGroup,
  Divider,
  Group,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { addFriendRequestApi } from "../../../../apis/friend";
import {
  OUT_GOING_REQUESTS_KEY,
  PENDING_REQUESTS_KEY,
} from "../../../../configs/queryKeys";

export default function AddFriendItem({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const cache = useQueryClient();
  const addFriendHandler = async () => {
    setIsLoading(true);
    try {
      const { data } = await addFriendRequestApi({
        username: user.username,
        discriminator: user.discriminator,
      });
      if (data) {
        cache.invalidateQueries(PENDING_REQUESTS_KEY);
        cache.invalidateQueries(OUT_GOING_REQUESTS_KEY);
        setIsAdded(true);
      }
    } catch (err) {
      // const result = apiErrorHandler(err);
      setIsLoading(false);
    }
  };
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
            <Group spacing="xs">
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
              <Divider
                sx={{ height: "18px" }}
                size="sm"
                orientation="vertical"
              />
              <Text color="dimmed" size="xs">
                Có {user.mutualFriends.length} bạn chung
              </Text>
            </Group>
          ) : (
            <Text color="dimmed" size="xs">
              No mutual friends
            </Text>
          )}
        </div>
      </Group>
      <Group spacing="xs">
        {user.status === "FRIEND" && (
          <ActionIcon
            // loading={isLoading}
            // onClick={acceptPending}
            size="xl"
            radius="xl"
            variant="light"
          >
            <FontAwesomeIcon icon="fa-solid fa-inbox" />
          </ActionIcon>
        )}
        {(user.status === "PENDING" || isAdded) && (
          <ActionIcon size="xl" radius="xl" variant="light">
            <FontAwesomeIcon icon="fa-solid fa-user-clock" />
          </ActionIcon>
        )}
        {!user.status && !isAdded && (
          <ActionIcon
            loading={isLoading}
            onClick={addFriendHandler}
            size="xl"
            radius="xl"
            variant="light"
          >
            <FontAwesomeIcon icon="fa-solid fa-user-plus" />
          </ActionIcon>
        )}
      </Group>
    </Group>
  );
}
