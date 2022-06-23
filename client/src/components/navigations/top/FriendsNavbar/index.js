import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
// import VideoCall from "../../../VideoCall";
import { useDispatch, useSelector } from "react-redux";
import {
  // deafen,
  expandedComplement,
  isVisibleComplement,
  setActiveComplement,
} from "../../../../store/uiSlice";

export default function FriendsNavbar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isVisibleRightSidebar = useSelector(isVisibleComplement);
  return (
    <section
      className="h-auto w-full min-w-0 relative flex "
      style={{ flex: "0 0 auto" }}
    >
      <div
        className="flex w-full h-12 px-2"
        style={{ backgroundColor: "#f3f4f6" }}
      >
        <div
          className="flex w-full h-full items-center justify-between px-2"
          style={{ borderBottom: "2px solid #e1e1e1" }}
        >
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon="fa-solid fa-user-group" />
            <Text weight={500}>{t("Friends")}</Text>
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => {
              dispatch(setActiveComplement("selectFriends"));
              !isVisibleRightSidebar && dispatch(expandedComplement());
            }}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-comments"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
