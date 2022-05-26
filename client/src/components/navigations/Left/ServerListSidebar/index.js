import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import ModalCreateWorkspace from "../../../Modals/ModalCreateWorkspace";
import SpaceAvatar from "../../../SpaceAvatar";
import "./index.css";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../../store/uiSlice";

export default function Sidebar({ servers }) {
  const [openedModalCreateWorkspace, setOpenedModalCreateWorkspace] =
    useState(false);
  const history = useNavigate();
  const { server: serverId } = useParams();
  const theme = useSelector(themeSelector);
  return (
    <div
      className="flex flex-col w-16 h-full flex-shrink-0 bg-slate-300"
      style={{
        backgroundColor: theme.sidebarBackground,
      }}
    >
      <div className="sidebar flex flex-col overflow-x-hidden overflow-y-auto">
        <Link to="/channel/@me">
          <ActionIcon variant="transparent" className="w-auto h-auto">
            <img
              src="/logo512.png"
              alt="logo"
              className="logo my-1 mx-2 w-12 cursor-pointer"
            />
          </ActionIcon>
        </Link>
        <div
          className="h-0 m-2 flex-shrink-0"
          style={{ borderTop: "2px solid #e2e2e2" }}
        ></div>
        {servers &&
          servers.map((workspace) => (
            <SpaceAvatar
              key={workspace._id}
              image={workspace.avatar || workspace.name}
              alt={workspace.name}
              title={workspace.name}
              active={workspace._id === serverId}
              onClick={() => {
                history(
                  `/channel/${workspace._id}/${workspace.channels[0].channel._id}`
                );
              }}
            />
          ))}

        <div className="w-16 h-16 flex justify-center items-center">
          <ActionIcon
            radius="xl"
            size={48}
            variant="filled"
            className="space-avatar"
            active={openedModalCreateWorkspace}
            onClick={() => setOpenedModalCreateWorkspace(true)}
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" className="text-xl" />
          </ActionIcon>
        </div>
      </div>
      <div className="flex justify-center items-center w-16 h-16">
        <Link to="/discover">
          <ActionIcon
            radius="xl"
            size={48}
            variant="filled"
            className="space-avatar"
          >
            <FontAwesomeIcon icon="fa-solid fa-compass" className="text-xl" />
          </ActionIcon>
        </Link>
      </div>
      <ModalCreateWorkspace
        opened={openedModalCreateWorkspace}
        onClose={() => setOpenedModalCreateWorkspace(false)}
      />
    </div>
  );
}
