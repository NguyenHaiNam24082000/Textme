import React from "react";
import { useQueryClient } from "react-query";
import { MainBase } from "../../../components/Main";
import InvitesArea from "../../../components/Main/InvitesArea";
import InviteNavbar from "../../../components/navigations/top/InviteNavbar";

const GetAllInvitesServers = () => {};

function Invites() {
  const cache = useQueryClient();
  // getAllInviteServers();
  return (
    <MainBase>
      <InviteNavbar />
      <div className="flex flex-auto min-w-0 min-h-0 relative overflow-hidden ">
        <InvitesArea />
        {/* <RightSidebar /> */}
      </div>
    </MainBase>
  );
}

export default Invites;
