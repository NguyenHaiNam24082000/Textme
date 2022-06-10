import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  BackgroundImage,
  createStyles,
  Group,
  // Divider,
  Menu,
  Text,
  Tooltip,
} from "@mantine/core";
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
import ModalCreateChannel from "../../../Modals/ModalCreateChannel";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    marginBottom: 8,
  },

  collectionLink: {
    display: "block",
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export default function ChannelListSidebar({ server }) {
  const classes = useStyles();
  const [openedModalWorkspaceSettings, setOpenedModalWorkspaceSettings] =
    useState(false);
  const [openedModalCreateChannel, setOpenedModalCreateChannel] =
    useState(false);
  const [style, trigger] = useBoop({ y: 2 });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isVisibleRightSidebar = useSelector(isVisibleComplement);
  const [type, setType] = useState("channel");
  return (
    <SidebarBase>
      <Menu
        radius="md"
        size="lg"
        placement="center"
        closeOnItemClick={false}
        control={
          <BackgroundImage
            // src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
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
        <Menu.Item
          onClick={() => {
            setType("channel");
            setOpenedModalCreateChannel(true);
          }}
        >
          Create Channel
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setType("category");
            setOpenedModalCreateChannel(true);
          }}
        >
          Create Category
        </Menu.Item>
        {/* <Menu.Item>Create Category</Menu.Item>
        <Menu.Item>Create Event</Menu.Item> */}
        {/* <Divider />
        <Menu.Item>Notification Settings</Menu.Item>
        <Menu.Item>Privacy Settings</Menu.Item>
        <Menu.Item>Security Settings</Menu.Item> */}
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
              <Group className={classes.collectionsHeader} position="apart">
                <Text weight={500} color="dimmed">
                  Channels
                </Text>
                <Group spacing={8}>
                  <Tooltip label="List options" withArrow position="right">
                    <ActionIcon variant="hover">
                      <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Create collection" withArrow position="right">
                    <ActionIcon variant="hover">
                      <FontAwesomeIcon icon="fa-solid fa-plus" />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>
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

          <Tree
            server={server}
            setOpenedModalCreateChannel={setOpenedModalCreateChannel}
          />
        </div>
      </div>
      <ModalCreateChannel
        opened={openedModalCreateChannel}
        onClose={() => {
          setOpenedModalCreateChannel(false);
        }}
        server={server}
        type={type}
      />
      <ModalWorkspaceSettings
        opened={openedModalWorkspaceSettings}
        onClose={() => {
          setOpenedModalWorkspaceSettings(false);
        }}
      />
    </SidebarBase>
  );
}
