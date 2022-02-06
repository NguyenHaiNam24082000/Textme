import { useState } from "react";
import { IconMicrophone, IconSetting, IconVolume2 } from "@douyinfe/semi-icons";
import { Avatar, Badge, Tooltip } from "@douyinfe/semi-ui";
import { ActionIcon, Button, Divider, Group, Menu, Text } from "@mantine/core";
import React from "react";
import "react-bubble-ui/dist/index.css";
import Tree from "../../components/Tree";
import ModalUserSettings from "../Modals/ModalUserSettings";
import ModalWorkspaceSettings from "../Modals/ModalWorkspaceSettings";

export default function Channel() {
  const [openedModalUserSettings, setOpenedModalUserSettings] = useState(false);
  const [openedModalWorkspaceSettings, setOpenedModalWorkspaceSettings] =
    useState(false);
  return (
    <div className="flex flex-col w-64 h-full flex-shrink-0">
      <Menu
        radius="md"
        size="lg"
        placement="center"
        closeOnItemClick={false}
        control={
          <div className="flex w-full h-12 flex-shrink-0 px-4 bg-red-500">
            <div className="flex w-full h-full items-center justify-between border-b-2">
              <div>test</div>
              <div>icon</div>
            </div>
          </div>
        }
      >
        <Menu.Item>Invite People</Menu.Item>
        <Menu.Item onClick={() => setOpenedModalWorkspaceSettings(true)}>
          Workspace Settings
        </Menu.Item>
        <Menu.Item>Create Channel</Menu.Item>
        <Menu.Item>Create Category</Menu.Item>
        <Menu.Item>Create Event</Menu.Item>
        <Divider />
        <Menu.Item>Notification Settings</Menu.Item>
        <Menu.Item>Privacy Settings</Menu.Item>
        <Menu.Item>Security Settings</Menu.Item>
        <Divider />
        <Menu.Item>Edit Workspace Profile</Menu.Item>
        <Menu.Item>Hide Muted Channels</Menu.Item>
      </Menu>
      <div className="flex flex-col flex-1 w-full h-full flex-shrink-0">
        <Tree />
        <div
          className="flex flex-col justify-between w-full h-auto items-center px-2"
          style={{ backgroundColor: "#ececea" }}
        >
          <div className="flex flex-col w-full h-24 border-b-2 pb-2">
            <div className="flex w-full flex-auto justify-between items-center">
              <div className="flex flex-col">
                <div className="text-sm">Voice Connected</div>
                <div className="text-xs">BreadCom</div>
              </div>
              <ActionIcon>
                <IconMicrophone />
              </ActionIcon>
            </div>
            <Group grow>
              <Button className="bg-yellow-400">Video</Button>
              <Button className="bg-yellow-400">Screen</Button>
            </Group>
          </div>
          <div className="flex w-full truncate h-14 justify-between items-center">
            <div className="flex truncate items-center">
              <Menu
                // trigger="hover"
                // delay={250}
                // closeOnScroll={false}
                gutter={5}
                // position="right"
                className="menu justify-center items-center flex-shrink-0"
                control={
                  <div>
                    <Badge
                      count={
                        <div
                          className="flex rounded-full absolute"
                          style={{
                            backgroundColor: "#ececea",
                            width: 12,
                            height: 12,
                            bottom: 2,
                            right: 2,
                            padding: 2,
                          }}
                        >
                          <Tooltip content={"Online"}>
                            <div
                              className="flex rounded-full"
                              style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#87d068",
                              }}
                            ></div>
                          </Tooltip>
                        </div>
                      }
                      position="rightBottom"
                    >
                      <Avatar
                        size="small"
                        // src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                        style={{
                          backgroundColor: "#339af0",
                          borderRadius: 4,
                          margin: 4,
                        }}
                      >
                        YZ
                      </Avatar>
                    </Badge>
                  </div>
                }
              >
                <Menu.Label>Application</Menu.Label>
                <Menu.Item>Settings</Menu.Item>
                <Menu.Item>Messages</Menu.Item>
                <Menu.Item>Gallery</Menu.Item>
                <Menu.Item
                  rightSection={
                    <Text size="xs" color="gray">
                      ⌘K
                    </Text>
                  }
                >
                  Search
                </Menu.Item>
                <Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item color="red">Delete my account</Menu.Item>
              </Menu>

              <div className="flex flex-col truncate justify-center">
                <div className="font-bold text-xs truncate">Nguyen Hai Nam</div>
                <div className="text-xs truncate">#00000000003213213211</div>
              </div>
            </div>
            <div className="flex ">
              <ActionIcon variant="hover" size="lg">
                <IconMicrophone />
              </ActionIcon>
              <ActionIcon variant="hover" size="lg">
                <IconVolume2 />
              </ActionIcon>
              <ActionIcon
                variant="hover"
                size="lg"
                onClick={() => setOpenedModalUserSettings(true)}
              >
                <IconSetting />
              </ActionIcon>
            </div>
          </div>
        </div>
      </div>
      <ModalUserSettings
        opened={openedModalUserSettings}
        onClose={() => setOpenedModalUserSettings(false)}
      />
      <ModalWorkspaceSettings
        opened={openedModalWorkspaceSettings}
        onClose={() => setOpenedModalWorkspaceSettings(false)}
      />
    </div>
  );
}
