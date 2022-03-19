import { TabPane, Tabs } from "@douyinfe/semi-ui";
import { Avatar, BackgroundImage, Text } from "@mantine/core";
import React from "react";
import Modal from "../Modal";
export default function ModalUserProfile({ opened, onClose }) {
  return (
    <Modal
      title={null}
      hideCloseButton={false}
      opened={opened}
      onClose={onClose}
      zIndex={500}
      padding={0}
    >
      <BackgroundImage
        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
        radius="xs"
      >
        <div className="flex gap-3 p-5 justify-between items-center">
          <Avatar
            size="xl"
            radius="50%"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          />
          <div className="flex flex-col flex-auto">
            <span className="text-white text-3xl font-bold">@John Doe</span>
            <Text size="xl" color="dimmed">
              @johndoe
            </Text>
          </div>
          <div>aaaaaaaaaa</div>
        </div>
        <Tabs type="line">
          <TabPane tab="Document" itemKey="1">
            Document
          </TabPane>
          <TabPane tab="Quick Start" itemKey="2">
            Quick Start
          </TabPane>
          <TabPane tab="Help" itemKey="3">
            Help
          </TabPane>
        </Tabs>
      </BackgroundImage>
    </Modal>
  );
}
