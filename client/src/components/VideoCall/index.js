import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
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
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import { Modal } from "@mantine/core";
import { Badge } from "@douyinfe/semi-ui";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import { MdOutlineScreenShare, MdOutlineStopScreenShare } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { Group } from "@mantine/core";
import { Button } from "@mantine/core";
import { IconCaretdown, IconChevronDown } from "@douyinfe/semi-icons";
import { Menu, Divider, Text } from "@mantine/core";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import "./index.css";
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
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const webcamRef = useRef(null);
  const [bodypixnet, setBodypixnet] = useState();
  const [prevClassName, setPrevClassName] = useState();

  useEffect(() => {
    contextRef.current = canvasRef.current.getContext("2d");
    const constraints = {
      video: { width: { min: 1280 }, height: { min: 720 } },
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      webcamRef.current.srcObject = stream;
      sendToMediaPipe();
    });

    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });

    selfieSegmentation.setOptions({
      modelSelection: 1,
      selfieMode: true,
    });

    selfieSegmentation.onResults(onResults);

    const sendToMediaPipe = async () => {
      if (!webcamRef.current.videoWidth) {
        console.log(webcamRef.current.videoWidth);
        requestAnimationFrame(sendToMediaPipe);
      } else {
        await selfieSegmentation.send({ image: webcamRef.current });
        requestAnimationFrame(sendToMediaPipe);
      }
    };
  }, []);

  const onResults = (results) => {
    contextRef.current.save();
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    contextRef.current.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    // Only overwrite existing pixels.
    contextRef.current.globalCompositeOperation = "source-out";
    contextRef.current.fillStyle = "#00FF00";
    contextRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // Only overwrite missing pixels.
    contextRef.current.globalCompositeOperation = "destination-atop";
    contextRef.current.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    contextRef.current.restore();
  };

  // useEffect(() => {
  //   console.log("VideoCall");
  //   // get enumerateMediaDevices
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: false })
  //     .then((stream) => {
  //       webcamRef.current.srcObject = stream;
  //       // navigator.mediaDevices.enumerateDevices().then((devices) => {
  //       //   devices.forEach((device) => {
  //       //     if (device.kind === "audioinput") {
  //       //       setAudioInput([...audioInput, device]);
  //       //     }
  //       //     if (device.kind === "videoinput") {
  //       //       setVideoInput([...videoInput, device]);
  //       //       console.log(device);
  //       //     }
  //       //     // console.log(
  //       //     //   device.kind + ": " + device.label + " id = " + device.deviceId
  //       //     // );
  //       //   });
  //       // });
  //     });
  //   bodyPix.load({
  //     architecture: "MobileNetV1",
  //     outputStride: 16,
  //     multiplier: 0.75,
  //     quantBytes: 2,
  //   }).then((net) => {
  //     setBodypixnet(net);
  //   });
  // }, []);

  // const drawimage = async (webcam, context, canvas) => {
  //   // create tempCanvas
  //   const tempCanvas = document.createElement("canvas");
  //   tempCanvas.width = webcam.clientWidth;
  //   tempCanvas.height = webcam.clientHeight;
  //   const tempCtx = tempCanvas.getContext("2d");
  //   (async function drawMask() {
  //     requestAnimationFrame(drawMask);
  //     // draw mask on tempCanvas
  //     const segmentation = await bodypixnet.segmentPerson(webcam,{
  //       internalResolution: "high",
  //     });
  //     const mask = bodyPix.toMask(segmentation);
  //     tempCtx.putImageData(mask, 0, 0);
  //     // draw original image
  //     context.drawImage(webcam, 0, 0, canvas.width, canvas.height);
  //     // use destination-out, then only masked area will be removed
  //     context.save();
  //     context.globalCompositeOperation = "destination-out";
  //     context.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
  //     context.restore();
  //   })();
  // };

  // const clickHandler = async (className) => {
  //   const webcam = webcamRef.current;
  //   const canvas = canvasRef.current;
  //   webcam.width = canvas.width = webcam.clientWidth;
  //   webcam.height = canvas.height = webcam.clientHeight;
  //   const context = canvas.getContext("2d");
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   if (prevClassName) {
  //     canvas.classList.remove(prevClassName);
  //     setPrevClassName(className);
  //   } else {
  //     setPrevClassName(className);
  //   }
  //   canvas.classList.add(className);
  //   if (bodypixnet) {
  //     drawimage(webcam, context, canvas);
  //   }
  // };

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

  const getDisplayMedia = () => {
    try {
      navigator.mediaDevices.getDisplayMedia({
        video: false
      }).then((stream) => {
        webcamRef.current.srcObject = stream;
      });
    } catch (e) {
      console.log("Unable to acquire screen capture: " + e);
    }
  };

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
      <div className="flex relative w-6/12">
        <video
          autoPlay
          ref={webcamRef}
          className="absolute inset-0 z-10 w-full h-auto"
        />
        <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full" />
      </div>
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
                  // onClick={() => clickHandler("video-background")}
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
              <Menu.Item onClick={() => setOpenedModalPreviewVideo(true)}>
                Xem trước camera
              </Menu.Item>
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
            <ActionIcon size={56} radius="xl" variant="light" onClick={getDisplayMedia}>
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
      <Modal
        opened={openedModalPreviewVideo}
        onClose={() => setOpenedModalPreviewVideo(false)}
        centered
      >
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
