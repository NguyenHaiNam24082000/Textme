import { useState } from "react";
import { IconMicrophone, IconSetting, IconVolume2 } from "@douyinfe/semi-icons";
import { Avatar, Badge, Tooltip } from "@douyinfe/semi-ui";
import {
  ActionIcon,
  Divider,
  Group,
  Menu,
  Text,
  Popper,
  Paper,
  Center,
  BackgroundImage,
} from "@mantine/core";
import React from "react";
import "react-bubble-ui/dist/index.css";
import Tree from "../../../Tree";
import ModalUserSettings from "../../../Modals/ModalUserSettings";
import ModalWorkspaceSettings from "../../../Modals/ModalWorkspaceSettings";
// import Delayed from "../Delayed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animated } from "react-spring";
import useBoop from "../../../../hooks/use-boop";
import { Button } from "@douyinfe/semi-ui";
import { MdScreenShare } from "react-icons/md";
import HoverTextEffect from "../../../HoverTextEffect";

export default function Channel() {
  const [openedModalUserSettings, setOpenedModalUserSettings] = useState(false);
  const [openedModalWorkspaceSettings, setOpenedModalWorkspaceSettings] =
    useState(false);
  const [style, trigger] = useBoop({ y: 2 });
  const [referenceElement, setReferenceElement] = useState(null);
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="flex flex-col w-64 h-full flex-shrink-0 overflow-hidden"
      style={{ backgroundColor: "#f3f4f6", borderRight: "2px solid #e5e7eb" }}
    >
      <nav className="flex flex-col w-full flex-auto min-h-0">
        <Menu
          radius="md"
          size="lg"
          placement="center"
          closeOnItemClick={false}
          control={
            <BackgroundImage
              src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
              radius="xs"
            >
              <div
                className="flex w-full h-12 flex-shrink-0 px-2 cursor-pointer hover:bg-gray-200"
                onMouseEnter={trigger}
              >
                <div
                  className="flex w-full h-full items-center justify-between px-2"
                  style={{ borderBottom: "2px solid #e5e7eb" }}
                >
                  <div className="font-bold">test</div>
                  <animated.span style={style}>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                  </animated.span>
                </div>
              </div>
            </BackgroundImage>
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
        {/* ${active === it.value && "bg-gray-200"} */}
        <div className="flex flex-col flex-auto w-full overflow-x-hidden overflow-y-scroll">
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full flex-shrink-0 px-1 my-2">
              <div
                className={`flex items-center h-8 px-2 text-base cursor-pointer gap-2 hover:bg-gray-200 
          `}
                style={{ marginBottom: 2, borderRadius: 4 }}
                onClick={() => {
                  // setActive(it.value);
                }}
              >
                <div className="flex items-center justify-center w-5 contrast-50">
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </div>
                <div className="text-sm font-semibold">Search</div>
              </div>
              <div
                className={`flex items-center h-8 px-2 text-base cursor-pointer gap-2 hover:bg-gray-200 
          `}
                style={{ marginBottom: 2, borderRadius: 4 }}
                onClick={() => {
                  // setActive(it.value);
                }}
              >
                <div className="flex items-center justify-center w-5 contrast-50">
                  <FontAwesomeIcon icon="fa-solid fa-at" />
                </div>
                <div className="text-sm font-semibold">Mentions</div>
              </div>
              <div
                className={`flex items-center h-8 px-2 text-base cursor-pointer gap-2 hover:bg-gray-200 
          `}
                style={{ marginBottom: 2, borderRadius: 4 }}
                onClick={() => {
                  // setActive(it.value);
                }}
              >
                <div className="flex items-center justify-center w-5 contrast-50">
                  <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                </div>
                <div className="text-sm font-semibold">Bookmark</div>
              </div>
              <div
                className={`flex items-center h-8 px-2 text-base cursor-pointer gap-2 hover:bg-gray-200 
          `}
                style={{ marginBottom: 2, borderRadius: 4 }}
                onClick={() => {
                  // setActive(it.value);
                }}
              >
                <div className="flex items-center justify-center w-5 contrast-50">
                  <FontAwesomeIcon icon="fa-solid fa-copy" />
                </div>
                <div className="text-sm font-semibold">Draft</div>
              </div>
            </div>
            <Tree />
          </div>
        </div>
      </nav>
      <section
        className="flex flex-col justify-between w-full h-auto items-center px-2"
        style={{ flex: "0 0 auto" }}
      >
        <div
          className="flex w-full h-auto py-2 items-center relative"
          style={{ borderTop: "2px solid #e5e7eb" }}
        >
          {visible && (
            <div
              className="absolute bottom-full w-full h-32"
              style={{ zIndex: 100 }}
            >
              <Paper padding="md" shadow="xl" className="h-full w-full">
                <div className="w-full flex justify-center items-center">
                  3 in the huddle
                </div>
                <div className="w-full h-full flex-auto flex justify-center items-center gap-2">
                  <Avatar
                    size="default"
                    style={{
                      backgroundColor: "#339af0",
                    }}
                  >
                    YZ
                  </Avatar>
                  <Avatar
                    size="default"
                    style={{
                      backgroundColor: "#339af0",
                    }}
                  >
                    YZ
                  </Avatar>
                </div>
              </Paper>
            </div>
          )}
          <Avatar
            size="small"
            style={{
              backgroundColor: "#339af0",
              borderRadius: 4,
              margin: 4,
            }}
          >
            YZ
          </Avatar>
          <div className="flex flex-col">
            <div className="text-xs font-bold">John is talking...</div>
            <Text
              variant="link"
              size="xs"
              className="cursor-pointer"
              weight={500}
              ref={setReferenceElement}
              onClick={() => setVisible((v) => !v)}
            >
              3 in the huddle
            </Text>
          </div>
        </div>
        <div
          className="flex flex-col w-full h-auto py-2 gap-2"
          style={{ borderTop: "2px solid #e5e7eb" }}
        >
          <div className="flex w-full flex-auto justify-between items-center">
            <div className="flex flex-col text-green-300">
              <div className="flex gap-2">
                <FontAwesomeIcon icon="fa-solid fa-tower-broadcast" />
                <div className="text-sm font-bold">Voice Connected</div>
              </div>
              <HoverTextEffect>Test / Phòng chờ</HoverTextEffect>
              {/* <Text variant="link" size="xs" className="cursor-pointer" weight={500}>Test / Phòng chờ</Text> */}
            </div>
            <ActionIcon>
              <FontAwesomeIcon icon="fa-solid fa-phone-flip" />
            </ActionIcon>
          </div>
          <div className="group relative h-32 cursor-pointer rounded-md overflow-hidden bg-black">
            <div
              className="group-hover:opacity-100 opacity-0 absolute top-0 left-0 flex w-full h-auto z-50 p-2"
              style={{
                borderTopLeftRadius: "inherit",
                borderTopRightRadius: "inherit",
                background:
                  "linear-gradient(#000,transparent 85%,transparent 100%)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                transition: "all 1s ease",
              }}
            >
              <ActionIcon variant="transparent" className="z-50">
                {/* <IconArrowLeft style={{ color: "#fff" }} /> */}
              </ActionIcon>
            </div>
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              src={"https://www.w3schools.com/html/mov_bbb.mp4"}
            ></video>
            <div
              className="group-hover:opacity-100 opacity-0 absolute bottom-0 left-0 flex w-full h-auto z-50 p-2 justify-between"
              style={{
                borderBottomLeftRadius: "inherit",
                borderBottomRightRadius: "inherit",
                background:
                  "linear-gradient(to top,#000,transparent 85%,transparent 100%)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                transition: "all 1s ease",
              }}
            >
              <div>
                <ActionIcon variant="transparent" className="z-50">
                  {/* <IconUserCardVideo
                    style={{ color: "#fff" }}
                    size="extra-large"
                  /> */}
                </ActionIcon>
              </div>
              <div className="flex">
                <Menu
                  position="left"
                  placement="end"
                  control={
                    <div>
                      <ActionIcon variant="transparent" className="z-50 mr-3">
                        {/* <IconSetting
                          style={{ color: "#fff" }}
                          size="extra-large"
                        /> */}
                      </ActionIcon>
                    </div>
                  }
                >
                  <Menu.Item>Report problem</Menu.Item>
                  <Menu.Item>Change view</Menu.Item>
                  {/* <Menu.Item onClick={() => setActive(!active)}>
                    Picture in picture
                  </Menu.Item> */}
                </Menu>
                <ActionIcon variant="transparent" className="z-50">
                  {/* <IconStop style={{ color: "#fff" }} size="extra-large" /> */}
                </ActionIcon>
              </div>
            </div>
          </div>
          <Group grow spacing="xs">
            <Button icon={<FontAwesomeIcon icon="fa-solid fa-video" />}>
              Video
            </Button>
            <Button icon={<MdScreenShare />}>Screen</Button>
          </Group>
        </div>
        <div
          className="flex w-full truncate h-14 justify-between items-center"
          style={{ borderTop: "2px solid #e5e7eb" }}
        >
          <div className="flex truncate items-center">
            <Menu
              // trigger="hover"
              // delay={250}
              // closeOnScroll={false}
              gutter={5}
              // position="right"
              className="menu justify-center items-center flex-shrink-0"
              control={
                <div 
                // className="avatar-ring"
                >
                  <Badge
                    count={
                      <div
                        className="flex rounded-full absolute justify-center items-center"
                        style={{
                          backgroundColor: "#ececea",
                          width: 16,
                          height: 16,
                          bottom: 2,
                          right: 2,
                        }}
                      >
                        <Tooltip content={"Online"}>
                          {/* <div
                            className="flex rounded-full"
                            style={{
                              width: 10,
                              height: 10,
                              backgroundColor: "#87d068",
                            }}
                          ></div> */}
                          <div
                            style={{
                              fontSize: 10,
                              width: 10,
                              height: 10,
                            }}
                            className="flex rounded-full justify-center items-center"
                          >
                            🎁
                          </div>
                        </Tooltip>
                      </div>
                    }
                    position="rightBottom"
                  >
                    <Avatar
                      size="small"
                      radius="xl"
                      // src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                      style={{
                        backgroundColor: "#339af0",
                        margin: 4,
                      }}
                    >
                      YZ
                    </Avatar>
                  </Badge>
                </div>
              }
              size="xl"
            >
              <Menu.Label>
                <div className="flex flex-col">
                  <div className="font-bold text-sm">@Nguyen Hai Nam</div>
                  <div className="text-xs">Trực tuyến</div>
                </div>
              </Menu.Label>
              <Divider />
              <Menu.Item
                icon={
                  <FontAwesomeIcon
                    icon="fa-solid fa-earth-asia"
                    className="text-green-600"
                  />
                }
              >
                Trực tuyến
              </Menu.Item>
              <Menu.Item
                icon={
                  <FontAwesomeIcon
                    icon="fa-solid fa-clock"
                    className="text-yellow-600"
                  />
                }
              >
                Chờ
              </Menu.Item>
              <Menu.Item
                icon={
                  <FontAwesomeIcon
                    icon="fa-solid fa-circle-minus"
                    className="text-red-600"
                  />
                }
              >
                <div className="flex flex-col gap-1">
                  <div>Vui lòng không làm phiền</div>
                  <div className="text-xs">
                    You will not receive any desktop notifications
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item
                icon={
                  <FontAwesomeIcon
                    icon="fa-solid fa-power-off"
                    className="text-gray-600"
                  />
                }
              >
                <div className="flex flex-col gap-1">
                  <div>Vô hình</div>
                  <div className="text-xs">
                    You will not appear online, but will have full access to all
                    of Textme
                  </div>
                </div>
              </Menu.Item>
              <Divider />
              <Menu.Item icon={"😀"}>Trạng thái tuỳ chỉnh</Menu.Item>
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
      </section>
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
