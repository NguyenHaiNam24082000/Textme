import { IconClose } from "@douyinfe/semi-icons";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  CloseButton,
  Group,
  Indicator,
  MultiSelect,
  Text,
} from "@mantine/core";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { forwardRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router";
import {
  createGroupChannel,
  getOrCreateDMChannel,
  inviteFriendsToChannel,
} from "../../../../apis/channel";
import friendObject from "../../../../commons/friendObject";
import { OPEN_CHANNEL } from "../../../../configs/queryKeys";
import { GetOpenChannels } from "../../../../reactQuery/channel";
import { AllFriends } from "../../../../reactQuery/friend";
import { GetMe } from "../../../../store/userSlice";
import Checkbox from "../../../Checkbox";
import ModalCreateNewGroup from "../../../Modals/ModalCreateNewGroup";
import { useDispatch } from "react-redux";
import { expandedComplement } from "../../../../store/uiSlice";

const Item = forwardRef(({ value, label, ...others }, ref) => {
  // const Flag = flags[value];
  return (
    <div ref={ref} {...others}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box mr={10}>
          <Avatar
            radius="xl"
            size="sm"
            src={others.avatar_url}
            styles={{
              placeholder: {
                color: "#fff",
                backgroundColor: `#${Math.floor(others.accent_color).toString(
                  16
                )}`,
              },
            }}
          >
            {label[0].toUpperCase()}
          </Avatar>
        </Box>
        <div>{label}</div>
      </Box>
    </div>
  );
});

function Value({ value, label, onRemove, classNames, ...others }) {
  //   const Flag = flags[value];
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <Box mr={10}>
          <Avatar
            radius="xl"
            size="xs"
            src={others.avatar_url}
            styles={{
              placeholder: {
                color: "#fff",
                backgroundColor: `#${Math.floor(others.accent_color).toString(
                  16
                )}`,
              },
            }}
          >
            {label[0].toUpperCase()}
          </Avatar>
        </Box>
        <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}

export default function SelectFriends({
  alreadyFriends = [],
  channel,
  server = null,
}) {
  const me = GetMe();
  const { data: allFriends } = AllFriends();
  const { data: channels } = GetOpenChannels();
  const [groupChannels, setGroupChannels] = useState([]);
  const [openedModalCreateNewGroup, setOpenedModalCreateNewGroup] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const history = useNavigate();
  const cache = useQueryClient();
  const params = useParams();
  const dispatch = useDispatch();

  const data = allFriends
    ? allFriends
        .filter((friend) => {
          return !alreadyFriends.includes(friendObject(me, friend).id);
        })
        .flatMap((friend) => {
          const obj = friendObject(me, friend);
          return {
            ...obj,
            value: obj.id,
            label: obj.username,
          };
        })
    : [];

  const friends = allFriends
    ? allFriends.filter((friend) => {
        return !alreadyFriends.includes(friendObject(me, friend).id);
      })
    : [];

  const createGroup = async () => {
    if (value.length === 0) {
      return;
    }
    try {
      if (value.length === 1) {
        const { data: channel } = await getOrCreateDMChannel(value[0]);
        if (channel) {
          cache.invalidateQueries(OPEN_CHANNEL);
          history(`/channel/@me/${channel._id}`);
        } else {
          setLoading(false);
        }
      } else if (value.length > 1) {
        const data = channels.filter((channel) => {
          if (channel.type === "GROUP") {
            const members = [...value, me.id].filter(
              (id) => channel.owner.id !== id
            );
            if (
              channel.members.every((member) => members.includes(member.id))
            ) {
              return channel;
            }
          }
        });
        setGroupChannels(data);
        if (data.length) {
          setOpenedModalCreateNewGroup(true);
        } else {
          const { data: channel } = await createGroupChannel({
            members: value,
          });
          if (channel) {
            cache.invalidateQueries(OPEN_CHANNEL);
            history(`/channel/@me/${channel._id}`);
          } else {
            setLoading(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const inviteFriends = async () => {
    if (value.length === 0) {
      return;
    }
    try {
      if (!server) {
        if (channel.type === "DM") {
          const members = channel.members
            .filter((member) => member.id !== me.user.id)
            .map((member) => member.id);
          const { data: channelId } = await createGroupChannel({
            members: [...value, ...members],
          });
          if (channelId) {
            cache.invalidateQueries(OPEN_CHANNEL);
            history(`/channel/@me/${channelId._id}`);
          }
        } else if (channel.type === "GROUP") {
          const { data: channelId } = await inviteFriendsToChannel(channel.id, {
            members: [...channel.members.map((member) => member.id), ...value],
            type: channel.type,
          });
          if (channelId) {
            cache.invalidateQueries(OPEN_CHANNEL);
          }
        }
      } else {
        //todo
        // const { data } = await inviteMembers({
        //   members: value,
        // });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full h-10 p-2 flex-shrink-0">
        <div className="flex w-full items-center justify-between">
          {/* <ActionIcon onClick={() => setActiveMenu("main")}>
            <IconChevronLeft />
          </ActionIcon> */}
          <Text weight={500}>Select Friend</Text>
          <ActionIcon onClick={() => dispatch(expandedComplement())}>
            <IconClose />
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col px-4 w-full h-full">
        <div className="flex w-full h-12 py-2 my-1">
          <MultiSelect
            data={data}
            value={value}
            onChange={setValue}
            valueComponent={Value}
            itemComponent={Item}
            className="w-full"
            searchable
            placeholder="Type the username of a friend"
            label={`You can add ${data.length - value.length} more friends`}
          />
        </div>
        <AnimateSharedLayout>
          <motion.div
            layout
            className="flex flex-col w-full flex-auto mt-8 overflow-y-auto gap-1"
          >
            <AnimatePresence>
              {/* {members.map((user, index) => {
                    return (
                      <motion.div
                        key={user.id}
                        layout
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={spring}
                        className="flex w-full h-12 py-1 px-2 items-center hover:bg-slate-200 rounded-lg cursor-pointer"
                      >
                        <Avatar
                          className="mr-3"
                          radius="xl"
                          src={`https://cdn.discordapp.com/avatars/802606776314626078/6ceaaf5d73a74731ef9a669a595de977.webp?size=40`}
                        />
                        <Highlight
                          highlight={searchMember}
                          className="text-sm font-semibold"
                          children={user.name}
                        />
                      </motion.div>
                    );
                  })} */}
              {friends &&
                friends.map((user, index) => (
                  <Checkbox
                    key={user.id}
                    isChecked={value.includes(friendObject(me, user).id)}
                    onClick={() => {
                      if (value.includes(friendObject(me, user).id)) {
                        setValue(
                          value.filter((id) => id !== friendObject(me, user).id)
                        );
                      } else {
                        setValue([...value, friendObject(me, user).id]);
                      }
                    }}
                    className={`hover:bg-slate-200 flex w-full h-11 p-2 rounded-md justify-between items-center cursor-pointer`}
                  >
                    <Group spacing="xs">
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
                          friendObject(me, user)?.status?.online
                            ? "green"
                            : "gray"
                        }
                        withBorder
                      >
                        <Avatar
                          src={friendObject(me, user).avatar_url}
                          radius="xl"
                          styles={{
                            placeholder: {
                              color: "#fff",
                              backgroundColor: `#${Math.floor(
                                friendObject(me, user).accent_color
                              ).toString(16)}`,
                            },
                          }}
                        >
                          {friendObject(me, user).username[0]}
                        </Avatar>
                      </Indicator>
                      <div className="select-none">
                        <Text weight={600}>
                          {friendObject(me, user).username}
                        </Text>
                        <Text size="xs" color="dimmed">
                          #{friendObject(me, user).discriminator}
                        </Text>
                      </div>
                    </Group>
                  </Checkbox>
                ))}
            </AnimatePresence>
          </motion.div>
        </AnimateSharedLayout>

        <div className="flex w-full h-12 mt-1">
          {params.channel ? (
            <Button
              className="w-full bg-yellow-400"
              onClick={inviteFriends}
              loading={loading}
            >
              Invite Friends
            </Button>
          ) : (
            <Button
              className="w-full bg-yellow-400"
              onClick={createGroup}
              loading={loading}
            >
              Create Group DM
            </Button>
          )}
        </div>
      </div>
      <ModalCreateNewGroup
        opened={openedModalCreateNewGroup}
        onClose={() => setOpenedModalCreateNewGroup(false)}
        channels={groupChannels}
        members={value}
      />
    </div>
  );
}
