import React from "react";
import { useMatch, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import useSound from "use-sound";
import { useMeSocket } from "../../apis/socket/useMeSocket";
import config from "../../assets/jsons/cherrymx-brown-abs/config.json";
import sound from "../../assets/sounds/audio.ogg";
import Friends from "./Friends";
import DMPage from "./DMPage";

import {
  ChannelListSidebar,
  ServerListSidebar,
  HomeSidebar,
} from "../../components/navigations";
import { themeState } from "../../recoil/themeState";
import { isVisibleChanelSelector } from "../../store/uiSlice";
import Home from "./Home";
import Discover from "./Discover";

export default function Me() {
  useMeSocket();
  //   const match = useRouteMatch();
  const location = useLocation();
  const isVisibleChanel = useSelector(isVisibleChanelSelector);
  const [play] = useSound(sound, {
    sprite: config.defines,
  });
  const theme = useRecoilValue(themeState);
  // LogRocket.init('emr1fu/textme');

  return (
    <div
      className="flex w-full h-full overflow-hidden flex-shrink-0 "
      style={{
        background: theme.palette.background,
      }}
      // style={{
      //   background:
      //     "url(https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/new-year-bg-light-2.png) no-repeat center center fixed",
      //   backgroundSize: "cover",
      // }}
      onKeyDown={(e) => {
        play({ id: e.keyCode.toString() });
      }}
    >
      <ServerListSidebar />
      <div className="flex flex-auto">
        {location.pathname.includes("/channel/@me") ||
        location.pathname === "/friends" ? (
          <HomeSidebar />
        ) : (
          <ChannelListSidebar />
        )}
        {location.pathname === "/friends" && <Friends />}
        {location.pathname === "/channel/@me"&& <Home/>}
        {location.pathname === "/discover" && <Discover />}
        {useMatch("/channel/@me/:channelId") && <DMPage />}
 
      </div>
     
    </div>
  );
}
