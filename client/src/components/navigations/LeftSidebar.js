import React from "react";
import { useLocation } from "react-router-dom";
import ChannelListSidebar from "./Left/ChannelListSidebar";
import HomeSidebar from "./Left/HomeSidebar";
import ServerListSidebar from "./Left/ServerListSidebar";
import SidebarBase from "./SidebarBase";
export default function LeftSidebar() {
  // const isVisibleChanel = useSelector(isVisibleChanelSelector);
  const location = useLocation();
  console.log(location)
  return (
    <SidebarBase>
      <ServerListSidebar />
      {location.pathname === "/channel/@me" ? (
        <HomeSidebar />
      ) : (
        <ChannelListSidebar />
      )}
    </SidebarBase>
  );
}
