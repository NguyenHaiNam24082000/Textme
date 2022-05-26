import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { ActionIcon, AspectRatio, Drawer, Grid } from "@mantine/core";
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
import {
  MdBlurOff,
  MdBlurOn,
  MdOutlineScreenShare,
  MdOutlineStopScreenShare,
} from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { Group } from "@mantine/core";
import { Button } from "@mantine/core";
import { IconCaretdown, IconChevronDown } from "@douyinfe/semi-icons";
import { Menu, Divider, Text } from "@mantine/core";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import "./index.css";
import bg1 from "../../assets/images/backgrounds/bg1.jpg";
import bg2 from "../../assets/images/backgrounds/bg2.jpg";
import bg3 from "../../assets/images/backgrounds/bg3.jpeg";
import bg4 from "../../assets/images/backgrounds/bg4.jpg";
import bg5 from "../../assets/images/backgrounds/bg5.jpg";
import bg6 from "../../assets/images/backgrounds/bg6.jpg";
import bg7 from "../../assets/images/backgrounds/bg7.jpg";
import bg8 from "../../assets/images/backgrounds/bg8.jpg";
import bg9 from "../../assets/images/backgrounds/bg9.jpg";
import bg10 from "../../assets/images/backgrounds/bg10.webp";
import bg11 from "../../assets/images/backgrounds/bg11.webp";
import bg12 from "../../assets/images/backgrounds/bg12.jpg";
import Peer from "simple-peer";
import { GetMe } from "../../store/userSlice";
import getSocket from "../../apis/socket";
import { CHANNEL_SOCKET } from "../../configs/socketRoute";

const backgrounds = [
  bg1,
  bg2,
  bg3,
  bg4,
  bg5,
  bg6,
  bg7,
  bg8,
  bg9,
  bg10,
  bg11,
  bg12,
];

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

const VideoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > video {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  :hover {
    > i {
      display: block;
    }
  }
`;

export default function VideoCall({ channel }) {
  const me = GetMe();
  const [openedModalPreviewVideo, setOpenedModalPreviewVideo] = useState(false);
  const [audioInput, setAudioInput] = useState([]);
  const [videoInput, setVideoInput] = useState([]);
  const userVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const webcamRef = useRef(null);
  const imgRef = useRef(null);
  const [bodypixnet, setBodypixnet] = useState();
  const [prevClassName, setPrevClassName] = useState();
  const [openedSetting, setOpenedSetting] = useState(false);
  const [background, setBackground] = useState("none");
  const [socket, setSocket] = useState(getSocket(me?.tokens?.access?.token));
  const [stream, setStream] = useState();
  const [callerSignal, setCallerSignal] = useState();
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  const peersRef = useRef(null);
  const [peers, setPeers] = useState();
  const userStream = useRef();

  useEffect(() => {
    if (openedSetting) {
      if (canvasRef.current) {
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
      }
    }
  }, [openedSetting, background]);

  useEffect(() => {
    // const newSocket = getSocket(me?.tokens?.access?.token);
    // if (!socket) {
    //   setSocket(newSocket);
    // }
    // const peer = new Peer({
    //   initiator: true,
    //   trickle: false,
    //   stream: videoRef.current.srcObject,
    // });
    // peer.on("signal", (data) => {
    //   newSocket.emit(CHANNEL_SOCKET.CALL, {
    //     to: channel.id,
    //     signalData: data,
    //     from: newSocket.id,
    //   });
    // });
    // peer.on("stream", (stream) => {
    //   // setPeer(peer)
    //   // setStream(stream)
    //   // setCall(true)
    // });
    // socket.on("callAccepted", (data) => {
    //   peer.signal(data);
    // });
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioInputs = devices.filter(
        (device) => device.kind === "audioinput"
      );
      const videoInputs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setAudioInput(audioInputs);
      setVideoInput(videoInputs);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;
        socket.emit(CHANNEL_SOCKET.CALL, {
          to: channel.id,
          from: socket.id,
        });
      });
  }, []);

  const toggleCameraAudio = (e) => {
    const target = e.target.getAttribute("data-switch");

    setUserVideoAudio((preList) => {
      let videoSwitch = preList["localUser"].video;
      let audioSwitch = preList["localUser"].audio;

      if (target === "video") {
        console.log(target);
        const userVideoTrack =
          userVideoRef.current.srcObject.getVideoTracks()[0];
        videoSwitch = !videoSwitch;
        if (videoSwitch) {
          userVideoTrack.enabled = true;
          userVideoTrack.start();
        } else {
          userVideoTrack.enabled = false;
          userVideoTrack.stop();
        }
      } else {
        const userAudioTrack =
          userVideoRef.current.srcObject.getAudioTracks()[0];
        audioSwitch = !audioSwitch;

        if (userAudioTrack) {
          userAudioTrack.enabled = audioSwitch;
        } else {
          userStream.current.getAudioTracks()[0].enabled = audioSwitch;
        }
      }

      return {
        ...preList,
        localUser: { video: videoSwitch, audio: audioSwitch },
      };
    });

    // socket.emit('BE-toggle-camera-audio', { roomId, switchTarget: target });
  };

  function createPeer(userId, caller, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit(CHANNEL_SOCKET.CALL, {
        to: channel.id,
        signalData: signal,
        from: socket.id,
      });
    });
    peer.on("disconnect", () => {
      peer.destroy();
    });

    return peer;
  }

  function addPeer(incomingSignal, callerId, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-accept-call", { signal, to: callerId });
    });

    peer.on("disconnect", () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function findPeer(id) {
    return peersRef.current.find((p) => p.peerID === id);
  }

  function createUserVideo(peer, index, arr) {
    return (
      <VideoBox
        className={`width-peer${peers.length > 8 ? "" : peers.length}`}
        // onClick={expandScreen}
        key={index}
      >
        {/* {writeUserName(peer.userName)} */}
        {/* <FaIcon className='fas fa-expand' /> */}
        {/* <VideoCard key={index} peer={peer} number={arr.length} /> */}
      </VideoBox>
    );
  }

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
    // contextRef.current.fillStyle = "#00FF00";
    // contextRef.current.fillRect(
    //   0,
    //   0,
    //   canvasRef.current.width,
    //   canvasRef.current.height
    // );
    const image = new Image();
    image.src = background;
    if (background === "blur(5px)") {
      contextRef.current.filter = "blur(5px)";
    } else if (background === "blur(10px)") {
      contextRef.current.filter = "blur(10px)";
    } else {
      contextRef.current.drawImage(
        image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

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
  //       userVideoRef.current.srcObject = stream;
  //       userVideoRef.current.play();
  //     });
  // };
  // useEffect(() => {
  //   getVideo();
  // }, [userVideoRef]);

  const getDisplayMedia = () => {
    try {
      navigator.mediaDevices
        .getDisplayMedia({
          video: false,
        })
        .then((stream) => {
          webcamRef.current.srcObject = stream;
        });
    } catch (e) {
      console.log("Unable to acquire screen capture: " + e);
    }
  };

  const call = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: webcamRef.current.srcObject,
    });
    peer.on("signal", (data) => {
      socket.emit(CHANNEL_SOCKET.CALL, {
        to: id,
        signalData: data,
        from: socket.id,
      });
    });
    peer.on("stream", (stream) => {
      // setPeer(peer)
      // setStream(stream)
      // setCall(true)
      webcamRef.current.srcObject = stream;
    });
    socket.on("callAccepted", ({ signalData }) => {
      peer.signal(signalData);
    });
  };

  const clickCameraDevice = (id) => {
    if (id) {
      const deviceId = id;
      const enabledAudio =
        userVideoRef.current.srcObject.getAudioTracks()[0].enabled;
      console.log(id);

      navigator.mediaDevices
        .getUserMedia({ video: { deviceId }, audio: enabledAudio })
        .then((stream) => {
          const newStreamTrack = stream
            .getTracks()
            .find((track) => track.kind === "video");
          const oldStreamTrack = userStream.current
            .getTracks()
            .find((track) => track.kind === "video");

          userStream.current.removeTrack(oldStreamTrack);
          userStream.current.addTrack(newStreamTrack);

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              oldStreamTrack,
              newStreamTrack,
              userStream.current
            );
          });
        });
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
      {/* <img
        ref={imgRef}
        id="scream"
        src="https://magazine.artstation.com/wp-content/uploads/2022/04/FG6.jpg"
        alt="The Scream"
        width="220"
        height="277"
      ></img> */}
      <div className="flex relative w-6/12 rounded-md overflow-hidden">
        <video
          autoPlay
          muted
          playInline
          ref={userVideoRef}
          className="absolute inset-0 z-10 w-full h-auto rounded-md"
        />
        {/* <video
          autoPlay
          ref={webcamRef}
          className="absolute inset-0 z-10 w-full h-auto rounded-md"
        /> */}
        {/* <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 rounded-md"
          style={{
            width: webcamRef.current?.clientWidth || "100%",
            height: webcamRef.current?.clientHeight || "100%",
          }}
        /> */}
      </div>
      <div className="px-2 w-full h-14 flex items-center justify-between absolute bottom-2 left-0">
        <Group spacing="xs">
          <ActionIcon
            size={56}
            radius="xl"
            variant="light"
            onClick={() => {
              setOpenedSetting(!openedSetting);
            }}
          >
            <BsMicFill className="w-6 h-auto" />
          </ActionIcon>
          <div className="w-auto h-auto relative">
            <ActionIcon
              size={56}
              radius="xl"
              variant="light"
              onClick={toggleCameraAudio}
              data-switch="video"
            >
              <BsCameraVideoFill className="w-6 h-auto" />
            </ActionIcon>
            <Menu
              size="xl"
              closeOnItemClick={false}
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
                    data-value={device.deviceId}
                    onClick={() => clickCameraDevice(device.deviceId)}
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
            <ActionIcon
              size={56}
              radius="xl"
              variant="light"
              onClick={toggleCameraAudio}
              data-switch="audio"
            >
              <BsMicFill className="w-6 h-auto" />
            </ActionIcon>
            <Menu
              closeOnItemClick={false}
              size="xl"
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
              <Menu.Label>MICROPHONE</Menu.Label>
              {audioInput &&
                audioInput.map((device) => (
                  <Menu.Item
                    key={device.deviceId}
                    onClick={() => {
                      console.log(device.deviceId);
                    }}
                  >
                    {device.label}
                  </Menu.Item>
                ))}
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
            <ActionIcon
              size={56}
              radius="xl"
              variant="light"
              onClick={getDisplayMedia}
            >
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
      <Drawer
        opened={openedSetting}
        onClose={() => setOpenedSetting(false)}
        title="Settings"
        padding="xl"
        size="xl"
      >
        <AspectRatio ratio={16 / 9}>
          <div className="flex relative w-full rounded-md overflow-hidden">
            <video
              autoPlay
              ref={webcamRef}
              className="absolute inset-0 z-10 w-full h-auto rounded-md"
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-10 rounded-md"
              style={{
                width: webcamRef.current?.clientWidth || "100%",
                height: webcamRef.current?.clientHeight || "100%",
              }}
            />
          </div>
        </AspectRatio>
        <div className="flex flex-col gap-2 mt-2">
          <Text weight={500}>Semibold</Text>
          <Grid>
            <Grid.Col span={3}>
              <ActionIcon size="100%" variant="outline">
                <MdBlurOff className="w-6 h-auto" />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={3}>
              <ActionIcon
                onClick={() => setBackground("blur(5px)")}
                size="100%"
                variant="outline"
              >
                <MdBlurOn className="w-6 h-auto" />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={3}>
              <ActionIcon
                onClick={() => setBackground("blur(10px)")}
                size="100%"
                variant="outline"
              >
                <MdBlurOn className="w-12 h-auto" />
              </ActionIcon>
            </Grid.Col>
          </Grid>
          <Text weight={500}>Semibold</Text>
          <Grid gutter="xs">
            {backgrounds &&
              backgrounds.map((bg, index) => (
                <Grid.Col span={3} key={index}>
                  <img
                    onClick={() => {
                      setBackground(bg);
                    }}
                    className="rounded"
                    src={bg}
                    alt="bg"
                    width="100%"
                    height="100%"
                  />
                </Grid.Col>
              ))}
          </Grid>
        </div>
      </Drawer>
      <Modal
        opened={openedModalPreviewVideo}
        onClose={() => setOpenedModalPreviewVideo(false)}
        centered
      >
        <div className="flex flex-col items-center justify-center">
          <video
            className="w-96 h-52"
            style={{ borderRadius: 6, objectFit: "cover" }}
            // ref={userVideoRef}
          ></video>
        </div>
      </Modal>
    </div>
  );
}
