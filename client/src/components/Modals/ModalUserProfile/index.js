import { Empty } from "@douyinfe/semi-ui";
import { IllustrationConstruction } from "@douyinfe/semi-illustrations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Avatar,
  BackgroundImage,
  Button,
  Group,
  Indicator,
  Tabs,
  Text,
  // Text,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import "./index.css";
import { cancelPendingRequestApi } from "../../../apis/friend";
import {
  OUT_GOING_REQUESTS_KEY,
  PENDING_REQUESTS_KEY,
} from "../../../configs/queryKeys";
import {
  isIncoming,
  pendingDiscriminator,
  pendingUsername,
} from "../../../commons/friendObject";
import { useQueryClient } from "react-query";
import { getMutualIds } from "../../../apis/account";

export default function ModalUserProfile({ opened, onClose, me, friend }) {
  const cache = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const cancelPending = async () => {
    setIsLoading(true);
    try {
      await cancelPendingRequestApi(friend.id);
      if (isIncoming(me, friend)) {
        cache.invalidateQueries(PENDING_REQUESTS_KEY);
      } else {
        cache.invalidateQueries(OUT_GOING_REQUESTS_KEY);
      }
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (opened) {
        const { data } = await getMutualIds(
          friend.sender.id === me.id ? friend.receiver.id : friend.sender.id
        );
        setProfile(data);
      }
    };
    fetchProfile();
  }, [friend.receiver.id, friend.sender.id, me.id, opened]);

  return (
    <Modal
      title={null}
      hideCloseButton={false}
      opened={opened}
      onClose={onClose}
      zIndex={500}
      padding={0}
      classNames={{ modal: "overflow-hidden", body: "overflow-hidden" }}
    >
      <BackgroundImage
        sx={{
          background: `#${Math.floor(
            friend.sender.id === me.id
              ? friend.receiver.accent_color
              : friend.sender.accent_color
          ).toString(16)}`,
        }}
        src={
          friend.sender.id === me.id
            ? friend.receiver.banner
            : friend.sender.banner
        }
        radius="xs"
        className="h-40"
      />
      <div className="relative">
        <div className="flex w-full gap-3 p-5 justify-between items-center absolute -top-[84px]">
          <div className="flex items-center relative">
            <Avatar
              size={128}
              radius="50%"
              style={{ border: "8px solid #fff" }}
              styles={{
                placeholder: {
                  color: "#fff",
                  backgroundColor: `#${Math.floor(
                    friend.sender.id === me.id
                      ? friend.receiver.accent_color
                      : friend.sender.accent_color
                  ).toString(16)}`,
                },
              }}
              src={
                friend.sender.id === me.id
                  ? friend.receiver.avatar_url
                  : friend.sender.avatar_url
              }
            >
              {friend.sender.id === me.id
                ? friend.receiver.username[0]
                : friend.sender.username[0]}
            </Avatar>
            <div
              className="rounded-full w-8 h-8 justify-center items-center flex absolute bottom-3 right-3"
              style={{ border: "8px solid #fff" }}
            >
              😀
            </div>
          </div>
          <Group
            grow
            direction="column"
            className="flex-auto h-32 items-start py-3"
          >
            <div className="flex items-end w-full">
              <span className="text-white text-2xl font-bold">
                @{me && friend && pendingUsername(me, friend)}
              </span>
              <span className="text-slate-300 text-2xl font-medium">
                #{me && friend && pendingDiscriminator(me, friend)}
              </span>
            </div>
            <div className="flex w-full text-black text-sm font-medium items-center">
              <div className="desc">
                <span className="desc">
                  💜When you're screaming💜 💜When you're screaming💜 💜When
                  you're screaming💜 💜When you're screaming💜 💜When you're
                  screaming💜💜When you're screaming💜 💜When you're screaming💜
                </span>
              </div>
            </div>
          </Group>
          <div className="flex flex-col justify-end h-32 py-5">
            <div className="flex items-center gap-2">
              {me && friend && isIncoming(me, friend) ? (
                <Button
                  className="bg-green-600"
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-me-plus" />}
                >
                  Send Friend Request
                </Button>
              ) : (
                <Button
                  onClick={cancelPending}
                  className="bg-red-600"
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-me-minus" />}
                >
                  {me && friend && isIncoming(me, friend)
                    ? "Cancel Friend Request"
                    : "Unfriend"}
                </Button>
              )}

              <ActionIcon size="lg">
                <FontAwesomeIcon
                  icon="fa-solid fa-ellipsis-vertical"
                  className="text-xl"
                />
              </ActionIcon>
            </div>
          </div>
        </div>
      </div>
      <div className="h-72 relative flex-col flex-1 mt-16">
        <Tabs
          grow
          className="card-buttons"
          classNames={{ body: "p-5 overflow-y-auto" }}
        >
          <Tabs.Tab label="Profile">
            {/* <Empty
              image={
                <IllustrationConstruction style={{ width: 150, height: 150 }} />
              }
              description={"under construction"}
            /> */}
          </Tabs.Tab>
          <Tabs.Tab label="Mutual Friends">
            {profile && profile.user.length > 0 ? (
              profile.user.map((user) => (
                <Group
                  key={user.id}
                  position="apart"
                  className="w-full p-2 rounded-md cursor-pointer hover:bg-slate-300 group"
                  // onClick={() => setOpenedModalUserProfile(true)}
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
                      color={user?.status?.online ? "green" : "gray"}
                      withBorder
                    >
                      <Avatar
                        src={user.avatar_url}
                        radius="xl"
                        size="lg"
                        styles={{
                          placeholder: {
                            color: "#fff",
                            backgroundColor: `#${Math.floor(
                              user.accent_color
                            ).toString(16)}`,
                          },
                        }}
                      >
                        {user.username[0].toUpperCase()}
                      </Avatar>
                    </Indicator>
                    <div>
                      <div className="flex items-center">
                        <Text size="lg" weight={500}>
                          {user.username}
                        </Text>
                        <Text
                          color="dimmed"
                          size="sm"
                          className="group-hover:opacity-100 opacity-0"
                        >{`#${user.discriminator}`}</Text>
                      </div>
                      <Text color="dimmed" size="xs">
                        {user?.status?.online ? "Online" : "Offline"}
                      </Text>
                    </div>
                  </Group>
                </Group>
              ))
            ) : (
              <Empty
                image={
                  <IllustrationConstruction
                    style={{ width: 150, height: 150 }}
                  />
                }
                description={"No mutual friends"}
              />
            )}
          </Tabs.Tab>
          <Tabs.Tab label="Mutual Groups">
            {profile && profile.channel.length > 0 ? (
              profile.channel.map((channel) => (
                <Group
                  key={channel.id}
                  position="apart"
                  className="w-full p-2 rounded-md cursor-pointer hover:bg-slate-300 group"
                  // onClick={() => setOpenedModalUserProfile(true)}
                >
                  <Group spacing="sm">
                    {channel.type === "GROUP" ? (
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
                        color={
                          channel.owner?.status?.online
                            ? "green"
                            : channel.members.some(
                                (member) => member?.status?.online
                              )
                            ? "green"
                            : "gray"
                        }
                        withBorder
                        sx={{
                          width: "100%",
                          height: "100%",
                          position: "relative",
                        }}
                      >
                        <Avatar
                          src={channel.owner.avatar_url}
                          radius="xl"
                          style={{
                            height: "calc(100% * (2/3))",
                            border: "2px solid #fff",
                          }}
                          className="absolute left-0 bottom-0 z-[1]"
                          styles={{
                            placeholder: {
                              color: "#fff",
                              backgroundColor: `#${Math.floor(
                                channel.owner.accent_color
                              ).toString(16)}`,
                            },
                          }}
                        >
                          {channel.owner.username[0].toUpperCase()}
                        </Avatar>
                        <Avatar
                          src={channel.members[0].avatar_url}
                          radius="xl"
                          style={{ height: "calc(100% * (2/3))" }}
                          className="absolute right-0 top-0 z-0"
                          styles={{
                            placeholder: {
                              color: "#fff",
                              backgroundColor: `#${Math.floor(
                                channel.members[0].accent_color
                              ).toString(16)}`,
                            },
                          }}
                        >
                          {channel.members[0].username[0].toUpperCase()}
                        </Avatar>
                      </Indicator>
                    ) : (
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
                        color={
                          channel.members[0]._id !== me._id
                            ? channel.members[0]?.status?.online
                              ? "green"
                              : "gray"
                            : channel.members[1]?.status?.online
                            ? "green"
                            : "gray"
                        }
                        withBorder
                      >
                        <Avatar
                          src={
                            channel.members[0]._id !== me._id
                              ? channel.members[0].avatar_url
                              : channel.members[1].avatar_url
                          }
                          radius="xl"
                          size="lg"
                          styles={{
                            placeholder: {
                              color: "#fff",
                              backgroundColor: `#${
                                channel.members[0]._id !== me._id
                                  ? Math.floor(
                                      channel.members[0].accent_color
                                    ).toString(16)
                                  : Math.floor(
                                      channel.members[1].accent_color
                                    ).toString(16)
                              }`,
                            },
                          }}
                        >
                          {channel.members[0]._id !== me._id
                            ? channel.members[0].username[0].toUpperCase()
                            : channel.members[1].username[0].toUpperCase()}
                        </Avatar>
                      </Indicator>
                    )}
                    <div>
                      <div className="flex items-center">
                        <Text size="lg" weight={500}>
                          {channel.type === "GROUP"
                            ? channel.name === null
                              ? channel.members
                                  .map((member) => member.username)
                                  .join(", ")
                              : channel.name
                            : channel.members[0]._id !== me._id
                            ? channel.members[0].username
                            : channel.members[1].username}
                        </Text>
                      </div>
                      <Text color="dimmed" size="xs">
                        {channel?.type === "GROUP"
                          ? channel.owner?.status?.online
                            ? "Online"
                            : channel.members.some(
                                (member) => member?.status?.online
                              )
                            ? "Online"
                            : "Offline"
                          : channel?.members[0]._id !== me._id
                          ? channel?.members[0].status?.online
                          : channel?.members[1].status?.online
                          ? "Online"
                          : "Offline"}
                      </Text>
                    </div>
                  </Group>
                </Group>
              ))
            ) : (
              <Empty
                image={
                  <IllustrationConstruction
                    style={{ width: 150, height: 150 }}
                  />
                }
                description={"No mutual groups"}
              />
            )}
          </Tabs.Tab>
          <Tabs.Tab label="Mutual Servers">
            {profile && profile.server.length > 0 ? (
              profile.server.map((server) => <div>{server.id}</div>)
            ) : (
              <Empty
                image={
                  <IllustrationConstruction
                    style={{ width: 150, height: 150 }}
                  />
                }
                description={"No mutual servers"}
              />
            )}
          </Tabs.Tab>
        </Tabs>
      </div>
    </Modal>
  );
}
