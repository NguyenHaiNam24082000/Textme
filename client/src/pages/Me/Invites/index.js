import React from "react";
import { MainBase } from "../../../components/Main";
import InvitesArea from "../../../components/Main/InvitesArea";

function Invites() {
  return (
    <MainBase>
      {/* <FriendsNavbar /> */}
      <div className="flex flex-auto min-w-0 min-h-0 relative overflow-hidden ">
        <InvitesArea />
        {/* <RightSidebar /> */}
      </div>
    </MainBase>
  );
}

export default Invites;
