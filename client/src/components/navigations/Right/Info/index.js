import { IconClose } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import {
  Accordion,
  ActionIcon,
  Avatar,
  Image,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React, { useState } from "react";

export default function Info({ messages, channel }) {
  const [attachments, setAttachments] = useState([
    ...messages.filter((message) => message.attachments.length === 0),
  ]);
  // const [links, setLinks] = useState([
  //   ...messages.filter((message) =>
  //     ...message.embed.map((embed) => {
  //       ogUrl:embed.ogUrl)
  //   ),
  // ]);
  console.log(
    messages.filter((message) => message.attachments.length === 0),
    "attachments"
  );
  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);
  console.log(messages, "images");
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full h-10 items-center justify-end p-2">
        <ActionIcon>
          <IconClose />
        </ActionIcon>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          radius="50%"
          size="xl"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
        <Text size="md" weight={600} color="black">
          @HaiNam2000
        </Text>
        <Text size="xs" color="black">
          Online
        </Text>
      </div>
      <Accordion className="w-full" offsetIcon={false} multiple>
        <Accordion.Item label="Members">
          {channel &&
            channel.members.map((member) => (
              <div>{JSON.stringify(member)}</div>
            ))}
          <Button
            className="w-full bg-yellow-400"
            onClick={() => {
              // setActiveMenu("members");
              console.log("members");
            }}
          >
            More
          </Button>
        </Accordion.Item>
        <Accordion.Item label="Images/Videos">
          {attachments && (
            <SimpleGrid cols={4} spacing="xs">
              {attachments.map((image) => (
                <Image
                  key={image}
                  radius="sm"
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/textme-chat.appspot.com/o/62380034d4b2be0e54a64da8%2F62512d0b70a197adfccbfd7e%2Fleague-of-legends-penguin-uhdpaper.com-4K-5.3306.jpg?alt=media"
                  }
                  alt="Random unsplash image"
                />
              ))}
            </SimpleGrid>
          )}
          <Button
            className="w-full bg-yellow-400"
            onClick={() => {
              // setActiveMenu("storages");
            }}
          >
            More
          </Button>
        </Accordion.Item>
        <Accordion.Item label="Files">
          <Button
            className="w-full bg-yellow-400"
            onClick={() => {
              // setActiveMenu("storages");
            }}
          >
            More
          </Button>
        </Accordion.Item>
        <Accordion.Item label="Links">
          <Button
            className="w-full bg-yellow-400"
            onClick={() => {
              // setActiveMenu("storages");
            }}
          >
            More
          </Button>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
