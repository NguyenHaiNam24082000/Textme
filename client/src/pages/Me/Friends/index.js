import React from "react";
import { FriendsArea } from "../../../components/Main";
import { MainBase } from "../../../components/Main";
import { FriendsNavbar } from "../../../components/navigations";
import RightSidebar from "../../../components/navigations/RightSidebar";
import { isVisibleComplement } from "../../../store/uiSlice";
import { useSelector } from "react-redux";

export default function Friends() {
  const isVisibleRightSidebar = useSelector(isVisibleComplement);

  return (
    <MainBase>
      <FriendsNavbar />
      <div className="flex flex-auto min-w-0 min-h-0 relative overflow-hidden ">
        <FriendsArea />
        {isVisibleRightSidebar && <RightSidebar />}
      </div>
    </MainBase>
  );
}
