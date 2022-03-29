import { Button } from "@douyinfe/semi-ui";
import { ActionIcon, Avatar, Collapse, Text } from "@mantine/core";
import { IconClose } from "@douyinfe/semi-icons";
import React from "react";

export default function Info() {
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
      <Collapse className="w-full">
        <Collapse.Panel header="Members" itemKey="1">
          <Button
            className="w-full bg-yellow-400"
            onClick={() => {
              setActiveMenu("members");
            }}
          >
            More
          </Button>
        </Collapse.Panel>
        <Collapse.Panel header="Images/Videos" itemKey="2">
          <Button
            className="w-full bg-yellow-400"
            onClick={() => {
              setActiveMenu("storages");
              setTabKey(1);
            }}
          >
            More
          </Button>
        </Collapse.Panel>
        <Collapse.Panel header="Files" itemKey="3">
          <Button
            className="w-full bg-yellow-400"
            onClick={() => {
              setActiveMenu("storages");
              setTabKey(2);
            }}
          >
            More
          </Button>
        </Collapse.Panel>
        <Collapse.Panel header="Links" itemKey="4">
          <Button
            className="w-full bg-yellow-400"
            onClick={() => {
              setActiveMenu("storages");
              setTabKey(3);
            }}
          >
            More
          </Button>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}
