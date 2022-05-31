import React, { useEffect, useState } from "react";
import {
  Group,
  Avatar,
  ActionIcon,
  Popover,
  Text,
  Kbd,
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
  deafen,
  voiceConnected,
  expandedComplement,
  setActiveComplement,
  isVisibleComplement,
} from "../../../../store/uiSlice";

export default function DMChannelNavbar({ channel, user }) {
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
  useEffect(() => {
    let ringSound = null;
    if (voiceCall || videoCall) {
      play();
      ringSound = setInterval(() => {
        if (!isPlaying) {
          play();
        }
      }, duration);
    } else {
      stop();
    }
    const ring = setTimeout(() => {
      setVoiceCall(false);
      setVideoCall(false);
      dispatch(voiceConnected(false));
      clearInterval(ringSound);
    }, 30000);
    return () => {
      stop();
      clearInterval(ringSound);
      clearTimeout(ring);
    };
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
          <VideoCall channel={channel} />
          {/* <Group
            className="cursor-pointer"
            onClick={() => setShowUserProfile(true)}
          >
            <Avatar
              radius="50%"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            />
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
              <span className="text-xs">Online</span>
            </div>
          </Group>
          <Group>
            {!(voiceCall || videoCall) && (
              <>
                <FontAwesomeIcon
                  icon="fa-solid fa-phone-volume"
                  className="cursor-pointer"
                  onClick={() => {
                    setVoiceCall(true);
                    dispatch(mute(false));
                    dispatch(voiceConnected(true));
                  }}
                />
                <FontAwesomeIcon
                  icon="fa-solid fa-video"
                  className="cursor-pointer"
                  onClick={() => {
                    setVideoCall(true);
                    dispatch(mute(false));
                    dispatch(voiceConnected(true));
                  }}
                />
              </>
            )}
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
            />
            <FontAwesomeIcon
              icon="fa-solid fa-inbox"
              className="cursor-pointer"
            />
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
          </Group> */}
        </div>
        {(voiceCall || videoCall) && (
          <div
            className="flex flex-col justify-center py-5 gap-5"
            style={{
              borderBottom: "2px solid #e1e1e1",
            }}
          >
            {/* {!video ? ( */}
            <div className="gap-5 flex justify-center">
              <div className="relative rounded-full w-fit h-fit inline-block">
                <Avatar
                  radius="50%"
                  size="xl"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
                {isMute ? (
                  <div
                    className="rounded-full w-9 h-9 bg-red-500 absolute right-0 bottom-0 flex justify-center items-center text-white"
                    style={{ border: "5px solid #f3f4f6" }}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-microphone-slash" />
                  </div>
                ) : (
                  <div
                    className="absolute -inset-1 rounded-full"
                    style={{ border: "3px solid #000" }}
                  ></div>
                )}
              </div>
              <div className="avatar-ring rounded-full w-fit h-fit inline-block">
                <Avatar
                  radius="50%"
                  size="xl"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
              </div>
              <div className="avatar-ring rounded-full w-fit h-fit inline-block">
                <Avatar
                  radius="50%"
                  size="xl"
                  className="avatar-ring"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
              </div>
            </div>
            {/* //   ) : (
        //     <VideoCall />
        //   )} */}
            <div className="flex justify-center gap-3">
              <ActionIcon
                color={!video ? "red" : ""}
                size="xl"
                radius="xl"
                variant="filled"
                onClick={() => setVideo((v) => !v)}
              >
                <FontAwesomeIcon
                  icon={`fa-solid ${video ? "fa-video" : "fa-video-slash"}`}
                />
              </ActionIcon>
              <ActionIcon size="xl" radius="xl" variant="filled">
                <MdScreenShare />
              </ActionIcon>
              <ActionIcon
                color={isMute ? "red" : ""}
                size="xl"
                radius="xl"
                variant="filled"
                onClick={() => dispatch(mute(!isMute))}
              >
                <FontAwesomeIcon
                  icon={`fa-solid ${
                    isMute ? "fa-microphone-slash" : "fa-microphone"
                  }`}
                />
              </ActionIcon>
              <Popover
                opened={openedMenuReactions}
                onClose={() => setOpenedMenuReactions(false)}
                target={
                  <ActionIcon
                    size="xl"
                    radius="xl"
                    variant="filled"
                    onClick={() => setOpenedMenuReactions((v) => !v)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-phone-volume" />
                  </ActionIcon>
                }
                width={365}
                position="bottom"
                withArrow
                radius="md"
              >
                <div className="flex flex-col gap-2">
                  <Text weight={600}>Reactions</Text>
                  <Group direction="column" grow spacing="xs">
                    <Group grow spacing="xs" className="w-full">
                      <Button variant="subtle" leftIcon={"🧠"}>
                        I agree
                      </Button>
                      <Button variant="subtle" leftIcon={"😀"}>
                        I disagree
                      </Button>
                    </Group>
                    <Group grow spacing="xs" className="w-full">
                      <Button variant="subtle" leftIcon={"😀"}>
                        Hahahahaha
                      </Button>
                      <Button variant="subtle" leftIcon={"😀"}>
                        I LOVE THIS
                      </Button>
                    </Group>
                    <Group grow spacing="xs" className="w-full">
                      <Button variant="subtle" leftIcon={"😀"}>
                        Wooohooo!
                      </Button>
                      <Button variant="subtle" leftIcon={"😀"}>
                        Excellent!
                      </Button>
                    </Group>
                    <Group grow spacing="xs" className="w-full">
                      <Button variant="subtle" leftIcon={"😀"}>
                        Hmmm...
                      </Button>
                      <Button variant="subtle" leftIcon={"🤫"}>
                        Shhh...
                      </Button>
                    </Group>
                    <Group grow spacing="xs" className="w-full">
                      <Button variant="subtle" leftIcon={""}>
                        I don't get it?
                      </Button>
                      <Button variant="subtle" leftIcon={"🧠"}>
                        Big brain!
                      </Button>
                    </Group>
                  </Group>
                </div>
              </Popover>
              <ActionIcon
                color="red"
                size="xl"
                radius="xl"
                variant="filled"
                onClick={() => playEnd()}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-phone"
                  className="rotate-[135deg]"
                />
              </ActionIcon>
            </div>
          </div>
        )}
      </div>
      <ModalUserProfile
        opened={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        user={null}
        pending={null}
      />
    </section>
  );
}
