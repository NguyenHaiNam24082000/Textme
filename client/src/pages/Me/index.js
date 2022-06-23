import React, { useEffect, useState } from "react";
import { useMatch, useLocation, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
// import useSound from "use-sound";
import { useMeSocket } from "../../apis/socket/useMeSocket";
// import config from "../../assets/jsons/cherrymx-brown-abs/config.json";
// import sound from "../../assets/sounds/audio.ogg";
import Friends from "./Friends";
import DMPage from "./DMPage";
import Server from "./Server";
import Invites from "./Invites";

import {
  ChannelListSidebar,
  ServerListSidebar,
  HomeSidebar,
} from "../../components/navigations";
import { themeState } from "../../recoil/themeState";
// import { isVisibleChanelSelector } from "../../store/uiSlice";
import Home from "./Home";
import Discover from "./Discover";
import { GetAllWorkspaces } from "../../reactQuery/workspace";
import { GetOpenChannels } from "../../reactQuery/channel";
import Invite from "./Invite";
import { useSpotlight } from "@mantine/spotlight";
import { GetMe } from "../../store/userSlice";
import {
  ActionIcon,
  Avatar,
  Button,
  CloseButton,
  Group,
  Indicator,
  Stack,
  Text,
} from "@mantine/core";
import VideoCall from "../../components/VideoCall";
import getSocket from "../../apis/socket";
import Modal from "../../components/Modals/Modal";
import { useDispatch } from "react-redux";
import { expandedComplement } from "../../store/uiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Server from "./Server";

// const MainBase = ({ location }) => {
//   // useEffect(() => {
//   //   switch (true) {
//   //     case useMatch("/channel/@me/:channelId"):
//   //       return <DMPage />;
//   //     case useMatch("/channel/:server/:channel"):
//   //       return <Server />;
//   //     case useMatch("/discover"):
//   //       return <Discover />;
//   //     case useMatch("/friends"):
//   //       return <Friends />;
//   //     default:
//   //       return <Home />;
//   //   }
//   // }, [location]);
//   return <Discover />;
// };

export default function Me() {
  useMeSocket();
  const me = GetMe();
  const socket = getSocket(me.tokens.access.token);
  //   const match = useRouteMatch();
  const { data: channels } = GetOpenChannels();
  const { data: servers } = GetAllWorkspaces();
  const spotlight = useSpotlight();
  const location = useLocation();
  // const isVisibleChanel = useSelector(isVisibleChanelSelector);
  // const [play] = useSound(sound, {
  //   sprite: config.defines,
  // });
  const theme = useRecoilValue(themeState);
  const [channel, setChannel] = useState(null);
  const [server, setServer] = useState(null);
  const params = useParams();
  const [call, setCall] = useState(false);
  const dispatch = useDispatch();
  const [channelCall, setChannelCall] = useState(null);

  socket.on("startedCall", ({ call, channel }) => {
    setCall(call);
    setChannelCall(channel);
  });

  useEffect(() => {
    const { channel: channelId, server: serverId } = params;
    if (!serverId && channelId && channels && channels.length > 0) {
      const c = channels.find((channel) => channel._id === channelId);
      setChannel(c);
      setServer(null);
    }
    if (serverId && channelId && servers && servers.length > 0) {
      const s = servers.find((server) => server._id === serverId);
      const c = s.channels.find((channel) => channel.channel._id === channelId);
      setChannel(c.channel);
      setServer(s);
    }
    if (!serverId && !channelId) {
      setChannel(null);
      setServer(null);
    } else {
      dispatch(expandedComplement(false));
    }
  }, [params]);
  console.log(params);

  useEffect(() => {
    if (channels && servers && servers.length > 0 && channels.length > 0) {
      const l = [
        ...channels.map((channel) => {
          let { name } = channel;
          name =
            channel.type === "GROUP"
              ? channel.name === null
                ? channel.members.map((member) => member.username).join(", ")
                : channel.name
              : channel.members[0]._id !== me._id
              ? channel.members[0].username
              : channel.members[1].username;
          return {
            id: channel.id,
            title: name,
            description: channel.topic,
            icon:
              channel.type === "GROUP" ? (
                <div className="relative">
                  <Avatar
                    src={channel.owner.avatar_url}
                    radius="xl"
                    size={12}
                    style={{
                      height: "calc(100% * (2/3))",
                      border: "2px solid #fff",
                    }}
                    className="absolute left-0 bottom-0 z-[1]"
                    color={`#${Math.floor(channel.owner.accent_color).toString(
                      16
                    )}`}
                  >
                    {channel.owner.username[0]}
                  </Avatar>
                  <Avatar
                    src={channel.members[0].avatar_url}
                    radius="xl"
                    size={12}
                    style={{ height: "calc(100% * (2/3))" }}
                    className="absolute right-0 top-0 z-0"
                    color={`#${Math.floor(
                      channel.members[0].accent_color
                    ).toString(16)}`}
                  >
                    {channel.members[0].username[0]}
                  </Avatar>
                </div>
              ) : (
                <Avatar
                  src={
                    channel.members[0]._id !== me._id
                      ? channel.members[0].avatar_url
                      : channel.members[1].avatar_url
                  }
                  radius="xl"
                  size={20}
                  color={`#${
                    channel.members[0]._id !== me._id
                      ? Math.floor(channel.members[0].accent_color).toString(16)
                      : Math.floor(channel.members[1].accent_color).toString(16)
                  }`}
                >
                  {channel.members[0]._id !== me._id
                    ? channel.members[0].username[0]
                    : channel.members[1].username[0]}
                </Avatar>
              ),
            group: "Channel",
            keywords: [...channel.members.map((member) => member.username)],
          };
        }),
        ...servers.map((server) => {
          return {
            id: server.id,
            title: server.name,
            // description: server.description,
            group: "Workspace",
            icon: (
              <Avatar src={server.avatar} radius="xl" size={20}>
                {server.name[0]}
              </Avatar>
            ),
            keywords: [...server.tags],
          };
        }),
      ];
      console.log(l);
      spotlight.registerActions([...l]);
    }
  }, [channels, servers, me]);

  console.log("channelme", me);

  // LogRocket.init('emr1fu/textme');

  return (
    <div
      className="flex w-full h-full overflow-hidden flex-shrink-0 overflow-hidden"
      style={{
        background: theme.palette.background,
      }}
      // style={{
      //   background:
      //     "url(https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/new-year-bg-light-2.png) no-repeat center center fixed",
      //   backgroundSize: "cover",
      // }}
      // onKeyDown={(e) => {
      //   play({ id: e.keyCode.toString() });
      // }}
    >
      {useMatch("/channel/:channel/videoCall") ? (
        <VideoCall channel={channel} />
      ) : location.pathname.includes("/invite/") ? (
        <Invite />
      ) : (
        <>
          <ServerListSidebar servers={servers} />
          <div className="flex flex-auto">
            {location.pathname.includes("/channel/@me") ||
            location.pathname === "/friends" ||
            location.pathname === "/invites" ||
            location.pathname === "/discover" ? (
              <HomeSidebar channels={channels} />
            ) : (
              <ChannelListSidebar server={server} />
            )}
            {location.pathname === "/friends" && <Friends />}
            {location.pathname === "/invites" && <Invites />}
            {location.pathname === "/channel/@me" && <Home />}
            {location.pathname === "/discover" && <Discover />}
            {!server && channel && <DMPage channel={channel} />}
            {server && channel && <Server channel={channel} />}
            {/* <MainBase location={location} /> */}
          </div>
        </>
      )}
      <Modal
        zIndex={10000}
        opened={call}
        onClose={() => {}}
        withCloseButton={false}
        size={300}
      >
        {channelCall && (
          <Stack align="center">
            <div className="h-full w-14 relative">
              {channelCall.type === "GROUP" ? (
                <Indicator
                  inline
                  size={16}
                  offset={7}
                  position="bottom-end"
                  color={
                    channelCall.owner?.status?.online
                      ? "green"
                      : channelCall.members.some(
                          (member) => member?.status?.online
                        )
                      ? "green"
                      : "gray"
                  }
                  withBorder
                  sx={{
                    indicator: {
                      zIndex: "5",
                    },
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Avatar
                    src={channelCall.owner.avatar_url}
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
                          channelCall.owner.accent_color
                        ).toString(16)}`,
                      },
                    }}
                  >
                    {channelCall.owner.username[0]}
                  </Avatar>
                  <Avatar
                    src={channelCall.members[0].avatar_url}
                    radius="xl"
                    style={{ height: "calc(100% * (2/3))" }}
                    className="absolute right-0 top-0 z-0"
                    styles={{
                      placeholder: {
                        color: "#fff",
                        backgroundColor: `#${Math.floor(
                          channelCall.members[0].accent_color
                        ).toString(16)}`,
                      },
                    }}
                  >
                    {channelCall.members[0].username[0]}
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
                  size={16}
                  offset={7}
                  position="bottom-end"
                  color={
                    channelCall.members[0]._id !== me._id
                      ? channelCall.members[0]?.status?.online
                        ? "green"
                        : "gray"
                      : channelCall.members[1]?.status?.online
                      ? "green"
                      : "gray"
                  }
                  withBorder
                >
                  <Avatar
                    src={
                      channelCall.members[0]._id !== me._id
                        ? channelCall.members[0].avatar_url
                        : channelCall.members[1].avatar_url
                    }
                    radius="xl"
                    size="lg"
                    styles={{
                      placeholder: {
                        color: "#fff",
                        backgroundColor: `#${
                          channelCall.members[0]._id !== me._id
                            ? Math.floor(
                                channelCall.members[0].accent_color
                              ).toString(16)
                            : Math.floor(
                                channelCall.members[1].accent_color
                              ).toString(16)
                        }`,
                      },
                    }}
                  >
                    {channelCall.members[0]._id !== me._id
                      ? channelCall.members[0].username[0]
                      : channelCall.members[1].username[0]}
                  </Avatar>
                </Indicator>
              )}
            </div>
            <Text>
              Ban co mot cuoc goi tu{" "}
              {channelCall.type === "GROUP"
                ? channelCall.name === null
                  ? channelCall.members
                      .map((member) => member.username)
                      .join(", ")
                  : channelCall.name
                : channelCall.members[0]._id !== me._id
                ? channelCall.members[0].username
                : channelCall.members[1].username}
            </Text>
            <Group>
              <ActionIcon
                color="green"
                size="xl"
                radius="xl"
                variant="filled"
                onClick={() => {
                  window.open(
                    `/channel/${channelCall.id}/videoCall`,
                    "Video Call",
                    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${
                      window.innerWidth - 50
                    },height=${window.innerHeight - 50},left=${
                      window.screenX + 25
                    },top=${window.screenY + 25}`
                  );
                  setCall(false);
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-phone" />
              </ActionIcon>
              <CloseButton
                color="red"
                size="xl"
                radius="xl"
                variant="filled"
              ></CloseButton>
            </Group>
          </Stack>
        )}
      </Modal>
    </div>
  );
}
