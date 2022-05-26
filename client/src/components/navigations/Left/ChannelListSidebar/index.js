import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackgroundImage, Divider, Menu } from "@mantine/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import "react-bubble-ui/dist/index.css";
import { animated } from "react-spring";
import useBoop from "../../../../hooks/use-boop";
import ModalWorkspaceSettings from "../../../Modals/ModalWorkspaceSettings";
import Tree from "../../../Tree";
import SidebarBase from "../../SidebarBase";
import { useSelector, useDispatch } from "react-redux";
import {
  expandedComplement,
  isVisibleComplement,
  setActiveComplement,
} from "../../../../store/uiSlice";

export default function ChannelListSidebar({ server }) {
  const [openedModalWorkspaceSettings, setOpenedModalWorkspaceSettings] =
    useState(false);
  const [style, trigger] = useBoop({ y: 2 });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isVisibleRightSidebar = useSelector(isVisibleComplement);
  return (
    <SidebarBase>
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
                <div className="font-bold">{server?.name || ""}</div>
                <animated.span style={style}>
                  <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                </animated.span>
              </div>
            </div>
          </BackgroundImage>
        }
      >
        <Menu.Item
          onClick={() => {
            console.log("selectFriends");
            dispatch(setActiveComplement("selectFriends"));
            !isVisibleRightSidebar && dispatch(expandedComplement());
          }}
        >
          Invite People
        </Menu.Item>
        <Menu.Item onClick={() => setOpenedModalWorkspaceSettings(true)}>
          Workspace Settings
        </Menu.Item>
        <Menu.Item>Create Channel</Menu.Item>
        {/* <Menu.Item>Create Category</Menu.Item>
        <Menu.Item>Create Event</Menu.Item> */}
        <Divider />
        <Menu.Item>Notification Settings</Menu.Item>
        <Menu.Item>Privacy Settings</Menu.Item>
        <Menu.Item>Security Settings</Menu.Item>
        {/* <Divider />
        <Menu.Item>Edit Workspace Profile</Menu.Item>
        <Menu.Item>Hide Muted Channels</Menu.Item> */}
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
              <div className="text-sm font-semibold">{t("Search")}</div>
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
            <div>
              {/* {server &&
                server.channels.map((channel) => (
                  <div
                    key={channel.channel._id}
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
                    <div className="text-sm font-semibold">
                      {channel.channel.name}
                    </div>
                  </div>
                ))} */}
            </div>
          </div>

          <Tree server={server} />
        </div>
      </div>
      <ModalWorkspaceSettings
        opened={openedModalWorkspaceSettings}
        onClose={() => {
          setOpenedModalWorkspaceSettings(false);
        }}
      />
    </SidebarBase>
  );
}
