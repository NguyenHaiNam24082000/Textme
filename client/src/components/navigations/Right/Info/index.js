import { Button } from "@douyinfe/semi-ui";
import {
  ActionIcon,
  Avatar,
  Accordion,
  Text,
  SimpleGrid,
  Image,
} from "@mantine/core";
import { IconClose } from "@douyinfe/semi-icons";
import React, { useEffect, useState } from "react";

export default function Info({ setActiveMenu, messages }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    console.log(messages);
  }, [messages]);
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
          {images.length && (
            <SimpleGrid cols={4} spacing="xs">
              {images.map((image) => (
                <Image
                  key={image}
                  radius="sm"
                  src={image}
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
