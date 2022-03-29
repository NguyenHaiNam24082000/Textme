import { useMotionValue } from "framer-motion";
import React, { useState } from "react";
import { useMatch, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import useSound from "use-sound";
import { useMeSocket } from "../../apis/socket/useMeSocket";
import config from "../../assets/jsons/cherrymx-brown-abs/config.json";
import sound from "../../assets/sounds/audio.ogg";
import Friends from "./Friends";
import DMPage from "./DMPage";
// import Channel from "../../components/Channel";
// import ChatArea from "../../components/ChatArea";
// import ModalCreateWorkspace from "../../components/Modals/ModalCreateWorkspace";
// import Sidebar from "../../components/Sidebar";
import {
  ChannelListSidebar,
  ServerListSidebar,
  HomeSidebar,
} from "../../components/navigations";
import { themeState } from "../../recoil/themeState";
import { isVisibleChanelSelector } from "../../store/uiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "./Home";

export default function Me() {
  useMeSocket();
  //   const match = useRouteMatch();
  const location = useLocation();
  const [openedModalCreateWorkspace, setOpenedModalCreateWorkspace] =
    useState(false);
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
      {/* <LeftSidebar /> */}
      <div className="flex flex-auto">
        {location.pathname.includes("/channel/@me") ||
        location.pathname === "/friends" ? (
          <HomeSidebar />
        ) : (
          <ChannelListSidebar />
        )}
        {location.pathname === "/friends" && <Friends />}
        {location.pathname === "/channel/@me"&& <Home/>}
        {useMatch("/channel/@me/:channelId") && <DMPage />}
        {/* {isVisibleChanel && (
          <div
            className="flex flex-col w-64 h-full flex-shrink-0 overflow-hidden"
            style={{
              backgroundColor: "#f3f4f6",
              borderRight: "2px solid #e5e7eb",
            }}
          ></div>
        )}
        <div className="flex flex-col flex-auto min-w-0 min-h-0 relative"></div> */}
      </div>
      {/* {openModalConfirm && openModalConfirm()} */}
      {/* <ModalCreateWorkspace
        opened={openedModalCreateWorkspace}
        onClose={() => setOpenedModalCreateWorkspace(false)}
      /> */}
    </div>
  );
}
