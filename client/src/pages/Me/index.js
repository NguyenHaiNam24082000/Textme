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
// import Server from "./Server";

const MainBase = ({ location }) => {
  // useEffect(() => {
  //   switch (true) {
  //     case useMatch("/channel/@me/:channelId"):
  //       return <DMPage />;
  //     case useMatch("/channel/:server/:channel"):
  //       return <Server />;
  //     case useMatch("/discover"):
  //       return <Discover />;
  //     case useMatch("/friends"):
  //       return <Friends />;
  //     default:
  //       return <Home />;
  //   }
  // }, [location]);
  return <Discover />;
};

export default function Me() {
  useMeSocket();
  //   const match = useRouteMatch();
  const { data: channels } = GetOpenChannels();
  const { data: servers } = GetAllWorkspaces();
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
      {useMatch("/invite/:serverId") ? (
        <Invite />
      ) : (
        <>
          <ServerListSidebar servers={servers} />
          <div className="flex flex-auto">
            {location.pathname.includes("/channel/@me") ||
            location.pathname === "/friends" ||
            location.pathname === "/discover" ? (
              <HomeSidebar channels={channels} />
            ) : (
              <ChannelListSidebar server={server} />
            )}
            {location.pathname === "/friends" && <Friends />}
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
