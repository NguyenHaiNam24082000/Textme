import React, { useEffect, useState, useRef } from "react";
// import styled from "styled-components";
import { ActionIcon } from "@mantine/core";
// import FloatingReactionItem from "../FloatingReactions/FloatingReactionItem";
// import GiantReactionMotionWrapper from "../FloatingReactions/GiantReactionMotionWrapper";
// import { Player } from "@lottiefiles/react-lottie-player";
import {
  BsMicMuteFill,
  BsMicFill,
  BsCameraVideoOffFill,
  BsCameraVideoFill,
} from "react-icons/bs";
import { Modal } from "@mantine/core";
import { Badge } from "@douyinfe/semi-ui";
import { MdOutlineScreenShare, MdOutlineStopScreenShare } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { Group } from "@mantine/core";
import { Button } from "@mantine/core";
import { IconCaretdown, IconChevronDown } from "@douyinfe/semi-icons";
import { Menu, Divider, Text } from "@mantine/core";
const FloatingTrackContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 150px;
  z-index: 100;
  // temporary
  height: 100%;
  //   background: rgba(0, 0, 0, 0.5);
`;

export default function VideoCall() {
  const [openedModalPreviewVideo, setOpenedModalPreviewVideo] = useState(false);
  const [audioInput, setAudioInput] = useState([]);
  const [videoInput, setVideoInput] = useState([]);
  const videoRef = useRef(null);
  useEffect(() => {
    console.log("VideoCall");
    //get enumerateMediaDevices
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          devices.forEach((device) => {
            if (device.kind === "audioinput") {
              setAudioInput([...audioInput, device]);
            }
            if (device.kind === "videoinput") {
              setVideoInput([...videoInput, device]);
              console.log(device);
            }
            // console.log(
            //   device.kind + ": " + device.label + " id = " + device.deviceId
            // );
          });
        });
      });
  }, []);

  // const getVideo = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       videoRef.current.srcObject = stream;
  //       videoRef.current.play();
  //     });
  // };
  // useEffect(() => {
  //   getVideo();
  // }, [videoRef]);
  return (
    <div className="bg-white flex w-full h-full relative">
      {/* <FloatingTrackContainer>
        <FloatingReactionItem />
      </FloatingTrackContainer>
      <GiantReactionMotionWrapper
        motionKey={0}
        children={
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src="https://assets2.lottiefiles.com/packages/lf20_n6VH6C.json"
            style={{ height: "250px", width: "auto", marginRight: "8px" }}
          ></Player>
        }
      /> */}
      <video
        style={{ borderRadius: 4, objectFit: "cover" }}
        className="w-60 h-60"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      ></video>
      <div className="px-2 w-full h-14 flex items-center justify-between absolute bottom-2 left-0">
        <Group spacing="xs">
          <div className="w-auto h-auto relative">
            <ActionIcon size={56} radius="xl" variant="light">
              <BsCameraVideoFill className="w-6 h-auto" />
            </ActionIcon>
            <Menu
              control={
                <ActionIcon
                  size={20}
                  radius="xl"
                  variant="filled"
                  className="absolute bottom-0 right-0"
                >
                  <IconChevronDown />
                </ActionIcon>
              }
              className="absolute bottom-0 right-0"
            >
              <Menu.Label>CAMERA</Menu.Label>
              {videoInput &&
                videoInput.map((device) => (
                  <Menu.Item
                    key={device.deviceId}
                    onClick={() => {
                      console.log(device.deviceId);
                    }}
                  >
                    {device.label}
                  </Menu.Item>
                ))}
              <Divider />
              <Menu.Item onClick={() => setOpenedModalPreviewVideo(true)}>Xem trước camera</Menu.Item>
            </Menu>
          </div>
          <div className="w-auto h-auto relative">
            <ActionIcon size={56} radius="xl" variant="light">
              <BsMicFill className="w-6 h-auto" />
            </ActionIcon>
            <Menu
              gutter={40}
              closeOnItemClick={false}
              placement="center"
              control={
                <ActionIcon
                  size={20}
                  radius="xl"
                  variant="filled"
                  className="absolute bottom-0 right-0"
                >
                  <IconChevronDown />
                </ActionIcon>
              }
              className="absolute bottom-0 right-0"
            >
              <Menu.Label>Application</Menu.Label>
              <Menu.Item>Settings</Menu.Item>
              <Menu.Item>Messages</Menu.Item>
              <Menu.Item>Gallery</Menu.Item>
            </Menu>
          </div>
          <Badge
            count={<IconChevronDown />}
            theme="solid"
            position="rightBottom"
            style={{
              backgroundColor: "var(--semi-color-primary)",
              borderRadius: "50%",
              width: 20,
              height: 20,
              padding: 2,
              bottom: 10,
              right: 10,
              cursor: "pointer",
            }}
          >
            <ActionIcon size={56} radius="xl" variant="light">
              <MdOutlineScreenShare className="w-6 h-auto" />
            </ActionIcon>
          </Badge>
        </Group>
        <Group>
          <Button variant="light">Controls</Button>
          <Button variant="light" color="red">
            Leave
          </Button>
        </Group>
      </div>
      <Modal opened={openedModalPreviewVideo}
        onClose={() => setOpenedModalPreviewVideo(false)}
      centered>
        <div className="flex flex-col items-center justify-center">
          <video
            className="w-96 h-52"
            style={{ borderRadius: 6, objectFit: "cover" }}
            ref={videoRef}
          ></video>
        </div>
      </Modal>
    </div>
  );
}
