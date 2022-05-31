import React, { useEffect, useState } from "react";
import { useMatch, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import useSound from "use-sound";
import { useMeSocket } from "../../apis/socket/useMeSocket";
import config from "../../assets/jsons/cherrymx-brown-abs/config.json";
import sound from "../../assets/sounds/audio.ogg";
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
import { isVisibleChanelSelector } from "../../store/uiSlice";
import Home from "./Home";
import Discover from "./Discover";
import { GetAllWorkspaces } from "../../reactQuery/workspace";
import { GetOpenChannels } from "../../reactQuery/channel";
import Invite from "./Invite";
import { registerSpotlightActions, useSpotlight } from "@mantine/spotlight";
import { GetMe } from "../../store/userSlice";
import { Avatar } from "@mantine/core";
import VideoCall from "../../components/VideoCall";
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
  //   const match = useRouteMatch();
  const { data: channels } = GetOpenChannels();
  const { data: servers } = GetAllWorkspaces();
  const spotlight = useSpotlight();
  const location = useLocation();
  const isVisibleChanel = useSelector(isVisibleChanelSelector);
  const [play] = useSound(sound, {
    sprite: config.defines,
  });
  const theme = useRecoilValue(themeState);
  const [channel, setChannel] = useState(null);
  const [server, setServer] = useState(null);
  const params = useParams();

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
    }
  }, [params]);

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
      // console.log(
      //   servers.map((server) => {
      //     return server.channels.map((channel) => {
      //       return {
      //         id: channel.channel.id,
      //         title: channel.channel.name,
      //         description: channel.channel.topic,
      //         group: "Channel",
      //       };
      //     });
      //   })
      // );
      spotlight.registerActions([...l]);
    }
  }, [channels, servers, me]);

  console.log("channel", channel, server);

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
    </div>
  );
}
