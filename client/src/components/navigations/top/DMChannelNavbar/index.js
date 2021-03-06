import React, { useEffect, useState } from "react";
import {
  Group,
  Avatar,
  ActionIcon,
  Popover,
  Text,
  Indicator,
  // Kbd,
  Button,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ringBack from "../../../../assets/sounds/ringback.ogg";
import callEnd from "../../../../assets/sounds/callend.ogg";
import useSound from "use-sound";
import { MdScreenShare } from "react-icons/md";
import VideoCall from "../../../VideoCall";
import ModalUserProfile from "../../../Modals/ModalUserProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  mute,
  // deafen,
  voiceConnected,
  expandedComplement,
  setActiveComplement,
  isVisibleComplement,
} from "../../../../store/uiSlice";
import getSocket from "../../../../apis/socket";
import { GetMe } from "../../../../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function DMChannelNavbar({ channel, user }) {
  const me = GetMe();
  const socket = getSocket(me?.tokens?.access?.token);
  const [voiceCall, setVoiceCall] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const [openedMenuReactions, setOpenedMenuReactions] = useState(false);
  // const [mute, setMute] = useState(false);
  const [video, setVideo] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [play, { stop, isPlaying, duration }] = useSound(ringBack);
  const [playEnd, { stopEnd, isPlayingEnd }] = useSound(callEnd);
  const isMute = useSelector((state) => state.ui.isMute);
  const isDeafen = useSelector((state) => state.ui.isDeafen);
  const isVisibleRightSidebar = useSelector(isVisibleComplement);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    // let ringSound = null;
    if (voiceCall || videoCall) {
      const receiverId =
        channel.type === "DM"
          ? channel.members[0].id === user.user.id
            ? [channel.members[1].id]
            : [channel.members[0].id]
          : [
              channel.owner.id,
              ...channel.members.map((member) => member.id),
            ].filter((id) => id !== user.user.id);
      console.log(receiverId, user, "receiver");
      socket.emit("start-call", {
        receiverId,
        channel,
      });
      //   play();
      //   ringSound = setInterval(() => {
      //     if (!isPlaying) {
      //       play();
      //     }
      //   }, duration);
      // } else {
      //   stop();
      // }
      // const ring = setTimeout(() => {
      //   setVoiceCall(false);
      //   setVideoCall(false);
      //   dispatch(voiceConnected(false));
      //   clearInterval(ringSound);
      // }, 30000);
      // return () => {
      //   stop();
      //   clearInterval(ringSound);
      //   clearTimeout(ring);
    }
  }, [voiceCall, videoCall]);

  return (
    <section
      className="h-auto w-full min-w-0 relative flex shadow-sm"
      style={{
        flex: "0 0 auto",
        background: video ? "black" : "#f3f4f6",
        color: video ? "white" : "black",
      }}
    >
      {/* <div
        className="flex flex-col w-full h-12 px-2"
        style={{ backgroundColor: "#f3f4f6" }}
      > */}
      <div className="flex flex-col w-full h-auto px-2">
        <div
          className="flex w-full h-12 items-center justify-between px-2"
          style={{ borderBottom: "2px solid #e1e1e1" }}
        >
          {/* <VideoCall channel={channel} /> */}
          <Group
            className="cursor-pointer"
            onClick={() => setShowUserProfile(true)}
          >
            {channel.type === "GROUP" ? (
              <div className="h-[38px] w-10 relative">
                <Indicator
                  inline
                  size={12}
                  offset={7}
                  position="bottom-end"
                  color={
                    channel.owner?.status?.online
                      ? "green"
                      : channel.members.some((member) => member?.status?.online)
                      ? "green"
                      : "gray"
                  }
                  withBorder
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    indicator: {
                      zIndex: "5",
                    },
                  }}
                >
                  <Avatar
                    src={channel.owner.avatar_url}
                    radius="xl"
                    size="sm"
                    style={{
                      height: "calc(100% * (2/3))",
                      border: "2px solid #fff",
                    }}
                    className="absolute left-0 bottom-0 z-[1]"
                    styles={{
                      placeholder: {
                        color: "#fff",
                        backgroundColor: `#${Math.floor(
                          channel.owner.accent_color
                        ).toString(16)}`,
                      },
                    }}
                  >
                    {channel.owner.username[0]}
                  </Avatar>
                  <Avatar
                    src={channel.members[0].avatar_url}
                    radius="xl"
                    size="sm"
                    style={{ height: "calc(100% * (2/3))" }}
                    className="absolute right-0 top-0 z-0"
                    styles={{
                      placeholder: {
                        color: "#fff",
                        backgroundColor: `#${Math.floor(
                          channel.members[0].accent_color
                        ).toString(16)}`,
                      },
                    }}
                  >
                    {channel.members[0].username[0]}
                  </Avatar>
                </Indicator>
              </div>
            ) : (
              <Indicator
                sx={{
                  indicator: {
                    zIndex: "5",
                  },
                }}
                inline
                size={16}
                offset={7}
                position="bottom-end"
                color={
                  channel.members[0]._id !== user._id
                    ? channel.members[0]?.status?.online
                      ? "green"
                      : "gray"
                    : channel.members[1]?.status?.online
                    ? "green"
                    : "gray"
                }
                withBorder
              >
                <Avatar
                  src={
                    channel.members[0]._id !== user._id
                      ? channel.members[0].avatar_url
                      : channel.members[1].avatar_url
                  }
                  radius="xl"
                  styles={{
                    placeholder: {
                      color: "#fff",
                      backgroundColor: `#${
                        channel.members[0]._id !== user._id
                          ? Math.floor(
                              channel.members[0].accent_color
                            ).toString(16)
                          : Math.floor(
                              channel.members[1].accent_color
                            ).toString(16)
                      }`,
                    },
                  }}
                >
                  {channel.members[0]._id !== user._id
                    ? channel.members[0].username[0]
                    : channel.members[1].username[0]}
                </Avatar>
              </Indicator>
            )}
            <div className="flex flex-col">
              <span className="font-bold">
                {channel?.type === "GROUP"
                  ? channel?.name === null
                    ? channel?.members
                        .map((member) => member?.username)
                        .join(", ")
                    : channel?.name
                  : channel?.members[0]._id !== user._id
                  ? channel?.members[0].username
                  : channel?.members[1].username}
              </span>
              <span className="text-xs">
                {channel?.type === "GROUP"
                  ? channel.owner?.status?.online
                    ? "Online"
                    : channel.members.some((member) => member?.status?.online)
                    ? "Online"
                    : "Offline"
                  : channel?.members[0]._id !== user._id
                  ? channel?.members[0].status?.online
                  : channel?.members[1].status?.online
                  ? "Online"
                  : "Offline"}
              </span>
            </div>
          </Group>
          <Group>
            {/* {!(voiceCall || videoCall) && ( */}
            <>
              <FontAwesomeIcon
                icon="fa-solid fa-phone-volume"
                className="cursor-pointer"
                onClick={() => {
                  setVoiceCall(true);
                  window.open(
                    `/channel/${channel.id}/videoCall`,
                    "Video Call",
                    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${
                      window.innerWidth - 50
                    },height=${window.innerHeight - 50},left=${
                      window.screenX + 25
                    },top=${window.screenY + 25}`
                  );
                  dispatch(mute(false));
                  // dispatch(voiceConnected(true));
                }}
              />
              {/* <FontAwesomeIcon
                  icon="fa-solid fa-video"
                  className="cursor-pointer"
                  onClick={() => {
                    setVideoCall(true);
                    dispatch(mute(false));
                    dispatch(voiceConnected(true));
                  }}
                /> */}
            </>
            {/* )} */}
            <FontAwesomeIcon
              icon="fa-solid fa-user-plus"
              className="cursor-pointer"
              onClick={() => {
                dispatch(setActiveComplement("selectFriends"));
                !isVisibleRightSidebar && dispatch(expandedComplement());
              }}
            />
            <FontAwesomeIcon
              icon="fa-solid fa-thumbtack"
              className={`cursor-pointer ${
                channel?.savedMessages.length ? "fa-bounce" : ""
              }`}
              onClick={() => {
                dispatch(setActiveComplement("pinnedList"));
                !isVisibleRightSidebar && dispatch(expandedComplement());
              }}
            />
            {/* <FontAwesomeIcon
              icon="fa-solid fa-inbox"
              className="cursor-pointer"
            /> */}
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              className="cursor-pointer"
              onClick={() => {
                dispatch(setActiveComplement("search"));
                !isVisibleRightSidebar && dispatch(expandedComplement());
              }}
            />
            <FontAwesomeIcon
              icon="fa-solid fa-circle-info"
              className="cursor-pointer"
              onClick={() => {
                dispatch(setActiveComplement("main"));
                !isVisibleRightSidebar && dispatch(expandedComplement());
              }}
            />
          </Group>
        </div>
      </div>
      {/* <ModalUserProfile
        opened={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        user={null}
        pending={null}
      /> */}
    </section>
  );
}
