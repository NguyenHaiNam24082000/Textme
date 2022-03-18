import React from "react";
import { FriendsArea } from "../../../components/Main";
import { MainBase } from "../../../components/Main";
import { FriendsNavbar } from "../../../components/navigations";

export default function Friends() {
  return (
    <MainBase>
      <FriendsNavbar />
      <div className="flex flex-auto min-w-0 min-h-0 relative overflow-hidden ">
        <FriendsArea />
      </div>
    </MainBase>
  );
}
