import { IconClose } from "@douyinfe/semi-icons";
import {
  Accordion,
  ActionIcon,
  Avatar,
  Group,
  Image,
  SimpleGrid,
  UnstyledButton,
  Text,
  Indicator,
  Stack,
  AspectRatio,
  Button,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getAttachments, getLinks } from "../../../../apis/channel";
import { GetMe } from "../../../../store/userSlice";
import { useDispatch } from "react-redux";
import { expandedComplement } from "../../../../store/uiSlice";

export default function Info({ messages, channel }) {
  const me = GetMe();
  const user = me.user;
  const [attachments, setAttachments] = useState([]);
  const [links, setLinks] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAttachmentsFromChannel = async () => {
      const { data } = await getAttachments(channel.id);
      setAttachments(data);
    };
    const getLinkFromChannel = async () => {
      const { data } = await getLinks(channel.id);
      setLinks(data);
    };
    Promise.all([getAttachmentsFromChannel(), getLinkFromChannel()]);
  }, [channel]);
  // console.log(links, attachments, "attachments");

  const showImage = () => {
    let index = 0;
    return attachments.map((at) => {
      if (index > 8) return null;
      return at.attachments.map((image) => {
        if (image.filename.match(/^.+[.](jpg|jpeg|svg|webp|png|gif)$/i)) {
          index++;
          return (
            <AspectRatio ratio={1}>
              <Image
                key={image.id}
                radius="sm"
                src={image.url}
                alt={image.filename}
                width={"100%"}
                height={"100%"}
              />
            </AspectRatio>
          );
        }
        return null;
      });
    });
  };

  const showFiles = () => {
    let index = 0;
    return attachments.map((at) => {
      if (index > 8) return null;
      return at.attachments.map((image) => {
        if (
          image.filename.match(/^.+[.](doc|docx|pdf|xls|xlsx|ppt|pptx|csv)$/i)
        ) {
          index++;
          return (
            <AspectRatio ratio={1}>
              <Image
                key={image.id}
                radius="sm"
                src={image.url}
                alt={image.filename}
                width={"100%"}
                height={"100%"}
              />
            </AspectRatio>
          );
        }
        return null;
      });
    });
  };
  // console.log(showImage(), "showImage");
  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);
  // console.log(messages, "images");
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full h-10 items-center justify-end p-2">
        <ActionIcon
          onClick={() => {
            dispatch(expandedComplement());
          }}
        >
          <IconClose />
        </ActionIcon>
      </div>
      <div className="overflow-scroll">
        <div className="flex flex-col items-center">
          {channel.type === "GROUP" ? (
            <Indicator
              inline
              size={16}
              offset={7}
              position="bottom-end"
              color={
                channel.owner?.status?.online
                  ? "green"
                  : channel.members.some((member) => member?.status?.online)
                  ? "green"
                  : "gray"
              }
              withBorder
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                indicator: {
                  zIndex: "5",
                },
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
                {channel.owner.username[0]}
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
                {channel.members[0].username[0]}
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
              size={20}
              offset={12}
              position="bottom-end"
              color={
                channel.members[0]._id !== user._id
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
                  channel.members[0]._id !== user._id
                    ? channel.members[0].avatar_url
                    : channel.members[1].avatar_url
                }
                radius="50%"
                size="xl"
                styles={{
                  placeholder: {
                    color: "#fff",
                    backgroundColor: `#${
                      channel.members[0]._id !== user._id
                        ? Math.floor(channel.members[0].accent_color).toString(
                            16
                          )
                        : Math.floor(channel.members[1].accent_color).toString(
                            16
                          )
                    }`,
                  },
                }}
              >
                {channel.members[0]._id !== user._id
                  ? channel.members[0].username[0]
                  : channel.members[1].username[0]}
              </Avatar>
            </Indicator>
          )}
          <Text size="md" weight={600} color="black">
            {channel.type === "GROUP"
              ? channel.name === null
                ? channel.members.map((member) => member.username).join(", ")
                : channel.name
              : channel.members[0]._id !== user._id
              ? channel.members[0].username
              : channel.members[1].username}
          </Text>
          <Text size="xs" color="black">
            {/* {channel.type === "GROUP"
            ? channel.owner?.status?.online
              ? "Online"
              : channel.members.some((member) => member?.status?.online)
              ? "Online"
              : "Offline"
            : channel.members[0]._id !== user._id
            ? channel.members[0]?.status?.online
              ? "Online"
              : "Offline"
            : channel.members[1]?.status?.online
            ? "Online"
            : "Offline"} */}
          </Text>
        </div>
        <Accordion className="w-full" offsetIcon={false} multiple>
          <Accordion.Item label="Members">
            <Stack spacing={2}>
              {channel &&
                channel.members.map((member) => (
                  <Group className={`rounded-md p-2 hover:bg-[#DCDFE3] w-full`}>
                    <Avatar
                      src={member.avatar_url}
                      radius="xl"
                      styles={{
                        placeholder: {
                          color: "#fff",
                          backgroundColor: `#${Math.floor(
                            member.accent_color
                          ).toString(16)}`,
                        },
                      }}
                    >
                      {member.username[0]}
                    </Avatar>
                    <div
                      style={{ flex: 1 }}
                      className="overflow-ellipsis truncate"
                    >
                      <Text
                        size={15}
                        weight={500}
                        className="overflow-ellipsis truncate"
                      >
                        {member.username}
                      </Text>
                    </div>
                  </Group>
                ))}
            </Stack>
            {/* <Button
              className="w-full"
              onClick={() => {
                // setActiveMenu("members");
                console.log("members");
              }}
              mt={8}
            >
              More
            </Button> */}
          </Accordion.Item>
          <Accordion.Item label="Images/Videos">
            {attachments && (
              <SimpleGrid cols={4} spacing="xs">
                {showImage()}
              </SimpleGrid>
            )}
            {/* <Button
              className="w-full bg-yellow-400"
              onClick={() => {
                // setActiveMenu("storages");
              }}
              mt={8}
            >
              More
            </Button> */}
          </Accordion.Item>
          <Accordion.Item label="Files">
            {attachments && (
              <SimpleGrid cols={4} spacing="xs">
                {showFiles()}
              </SimpleGrid>
            )}
            {/* <Button
              className="w-full bg-yellow-400"
              onClick={() => {
                // setActiveMenu("storages");
              }}
              mt={8}
            >
              More
            </Button> */}
          </Accordion.Item>
          <Accordion.Item label="Links">
            {links &&
              links.length > 0 &&
              links.map((link) => {
                return link.embed.map((embed) => {
                  if (!embed?.title) return null;
                  return (
                    <UnstyledButton
                      onClick={() =>
                        console.log("try focusing button with tab")
                      }
                    >
                      <Group>
                        <Image
                          lineClamp={1}
                          width={40}
                          height={40}
                          sx={{
                            maxWidth: "250px",
                          }}
                          src={embed?.image?.url}
                        />
                        <div>
                          <Text lineClamp={1}>
                            {embed?.title ?? "Untitled"}
                          </Text>
                          <Text
                            size="xs"
                            color="blue"
                            component={"a"}
                            href={embed?.url}
                            target="_blank"
                          >
                            {embed?.url}
                          </Text>
                        </div>
                      </Group>
                    </UnstyledButton>
                  );
                });
              })}

            {/* <Button
              className="w-full bg-yellow-400"
              onClick={() => {
                // setActiveMenu("storages");
              }}
            >
              More
            </Button> */}
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
