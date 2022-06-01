import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { ActionIcon, AspectRatio, Drawer, Grid, Popover } from "@mantine/core";
import FloatingReactionItem from "../FloatingReactions/FloatingReactionItem";
import GiantReactionMotionWrapper from "../FloatingReactions/GiantReactionMotionWrapper";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  BsMicMuteFill,
  BsMicFill,
  BsCameraVideoOffFill,
  BsCameraVideoFill,
} from "react-icons/bs";
// import "@tensorflow/tfjs-core";
// import "@tensorflow/tfjs-conferer";
// import "@tensorflow/tfjs-backend-webgl";
import { Modal } from "@mantine/core";
// import * as Kalidokit from "kalidokit";
// import { Badge } from "@douyinfe/semi-ui";
// import * as bodyPix from "@tensorflow-models/body-pix";
// import Webcam from "react-webcam";
import {
  MdBlurOff,
  MdBlurOn,
  MdOutlineScreenShare,
  // MdOutlineStopScreenShare,
} from "react-icons/md";
// import { HiOutlineDesktopComputer } from "react-icons/hi";
import { Group } from "@mantine/core";
import { Button } from "@mantine/core";
import {
  // IconCaretdown,
  IconChevronDown,
} from "@douyinfe/semi-icons";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFullscreen } from "@mantine/hooks";
import { PackedGrid } from "react-packed-grid";
import VideoCard from "./Video";

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

const selfieSegmentation = new SelfieSegmentation({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
});

export default function VideoCall({ channel }) {
  const me = GetMe();
  const socket = getSocket(me?.tokens?.access?.token);
  const { ref, toggle, fullscreen } = useFullscreen();
  const [openedModalPreviewVideo, setOpenedModalPreviewVideo] = useState(false);
  const [audioInput, setAudioInput] = useState([]);
  const [videoInput, setVideoInput] = useState([]);
  const [audioOutput, setAudioOutput] = useState([]);
  const userVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const webcamRef = useRef(null);
  // const imgRef = useRef(null);
  // const [bodypixnet, setBodypixnet] = useState();
  // const [prevClassName, setPrevClassName] = useState();
  const [openedSetting, setOpenedSetting] = useState(false);
  const [background, setBackground] = useState("none");
  // const [stream, setStream] = useState();
  // const [callerSignal, setCallerSignal] = useState();
  // const screenTrackRef = useRef();
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  const peersRef = useRef([]);
  const [peers, setPeers] = useState([]);
  const userStream = useRef();
  const [aspectRatio, setAspectRatio] = useState(1);
  const updateLayoutRef = useRef();
  // const webcamCanvasRef = useRef();
  // const webcamContextRef = useRef();

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

  useEffect(() => {
    if (background !== "none") {
      selfieSegmentation.onResults(onResults);
    }
  }, [background]);

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
      const audioOutputs = devices.filter(
        (device) => device.kind === "audiooutput"
      );
      setAudioInput(audioInputs);
      setVideoInput(videoInputs);
      setAudioOutput(audioOutputs);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        contextRef.current = canvasRef.current.getContext("2d");
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;
        sendToMediaPipe();
        socket.emit(CHANNEL_SOCKET.CALL, {
          to: channel.id,
          from: me.user,
        });

        socket.on("join-call", (users) => {
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
          const listPeers = [];
          users.forEach((user) => {
            if (user.id !== me.user.id) {
              const peer = createPeer(user.id, socket.id, stream);
              peer.peerId = user.id;
              console.log(peer, "listPeers1");
              listPeers.push(peer);
              console.log("listPeers1");
              peersRef.current = [
                ...peersRef.current,
                {
                  peerId: user.id,
                  peer: peer,
                },
              ];
              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [user.id]: { video: user.info.video, audio: user.info.audio },
                };
              });
            }
          });
          console.log(listPeers, "peers");
          setPeers(listPeers);
        });

        socket.on("receive-call", (user) => {
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");
          const peerIndex = findPeer(user.id);
          console.log(peerIndex, "peerIndex");
          if (!peerIndex) {
            const peer = addPeer(user.signal, user.id, stream);
            peer.peerId = user.id;
            peersRef.current.push({
              peerId: user.id,
              peer: peer,
            });
            setPeers((preList) => {
              return [...preList, peer];
            });
            setUserVideoAudio((preList) => {
              return {
                ...preList,
                [user.id]: { video: user.info.video, audio: user.info.audio },
              };
            });
          }
        });

        socket.on("call-accepted", (user) => {
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2");
          const peerIndex = findPeer(user.id);
          peerIndex.peer.signal(user.signal);
        });
      });

    selfieSegmentation.setOptions({
      modelSelection: 1,
      selfieMode: true,
    });

    if (background !== "none") {
      selfieSegmentation.onResults(onResults);
    }
    const sendToMediaPipe = async () => {
      if (!userVideoRef.current.videoWidth) {
        // console.log(userVideoRef.current.videoWidth);
        requestAnimationFrame(sendToMediaPipe);
      } else {
        await selfieSegmentation.send({ image: userVideoRef.current });
        requestAnimationFrame(sendToMediaPipe);
      }
    };
  }, [channel.id, me.user, socket]);

  console.log(peers, "listPeers");

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
      socket.emit("call-user", {
        to: channel.id,
        from: caller,
        signal,
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
      socket.emit("accept-call", { signal, to: channel.id, from: socket.id });
    });

    peer.on("disconnect", () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function findPeer(id) {
    return peersRef.current.find((p) => p.peerId === id);
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
        <VideoCard key={index} peer={peer} number={arr.length} />
      </VideoBox>
    );
  }

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

  // const clickScreenSharing = () => {
  //   if (!screenShare) {
  //     navigator.mediaDevices
  //       .getDisplayMedia({ cursor: true })
  //       .then((stream) => {
  //         const screenTrack = stream.getTracks()[0];

  //         peersRef.current.forEach(({ peer }) => {
  //           // replaceTrack (oldTrack, newTrack, oldStream);
  //           peer.replaceTrack(
  //             peer.streams[0]
  //               .getTracks()
  //               .find((track) => track.kind === "video"),
  //             screenTrack,
  //             userStream.current
  //           );
  //         });

  //         // Listen click end
  //         screenTrack.onended = () => {
  //           peersRef.current.forEach(({ peer }) => {
  //             peer.replaceTrack(
  //               screenTrack,
  //               peer.streams[0]
  //                 .getTracks()
  //                 .find((track) => track.kind === "video"),
  //               userStream.current
  //             );
  //           });
  //           userVideoRef.current.srcObject = userStream.current;
  //           setScreenShare(false);
  //         };

  //         userVideoRef.current.srcObject = stream;
  //         screenTrackRef.current = screenTrack;
  //         setScreenShare(true);
  //       });
  //   } else {
  //     screenTrackRef.current.onended();
  //   }
  // };

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
    <div ref={ref} className="bg-black flex w-full h-full relative">
      <FloatingTrackContainer>
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
      />
      <PackedGrid
        boxAspectRatio={aspectRatio}
        className="fullscreen"
        updateLayoutRef={updateLayoutRef}
      >
        <div className="flex justify-center items-center relative w-full h-full rounded-md overflow-hidden">
          <video
            autoPlay
            muted
            playsInline
            ref={userVideoRef}
            className="absolute inset-0 z-10 w-full h-auto rounded-md top-auto bottom-auto"
          />
          {/* <video
          autoPlay
          ref={webcamRef}
          className="absolute inset-0 z-10 w-full h-auto rounded-md"
        /> */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 rounded-md top-auto bottom-auto"
            style={{
              width: userVideoRef.current?.clientWidth || "100%",
              height: userVideoRef.current?.clientHeight || "100%",
            }}
          />
        </div>
        {peers &&
          peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
      </PackedGrid>
      <div className="px-2 w-full h-14 flex items-center justify-between absolute bottom-2 left-0">
        <div>
          <Popover
            opened={true}
            // onClose={() => setOpenedMenuReactions(false)}
            target={
              <ActionIcon
                size="xl"
                radius="xl"
                variant="filled"
                // onClick={() => setOpenedMenuReactions((v) => !v)}
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
        </div>
        <Group spacing="xs">
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
              <Divider />
              <Menu.Label>OUTPUT</Menu.Label>
              {audioOutput &&
                audioOutput.map((device) => (
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
          <ActionIcon
            size={56}
            radius="xl"
            variant="light"
            onClick={getDisplayMedia}
          >
            <MdOutlineScreenShare className="w-6 h-auto" />
          </ActionIcon>
          <ActionIcon
            size={56}
            radius="xl"
            variant="light"
            onClick={() => {
              setOpenedSetting(!openedSetting);
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
          </ActionIcon>
          <ActionIcon size={56} radius="xl" variant="light">
            <FontAwesomeIcon
              icon="fa-solid fa-phone"
              className="rotate-[135deg]"
            />
          </ActionIcon>
        </Group>
        <Group>
          <ActionIcon onClick={toggle} size={56} radius="xl" variant="light">
            <FontAwesomeIcon icon="fa-solid fa-expand" />
          </ActionIcon>
        </Group>
      </div>
      <Drawer
        opened={openedSetting}
        onClose={() => setOpenedSetting(false)}
        title="Settings"
        padding="xl"
        size="xl"
      >
        {/* <AspectRatio ratio={16 / 9}>
          <div className="flex relative w-full rounded-md overflow-hidden">
            <video
              autoPlay
              ref={webcamRef}
              className="absolute inset-0 z-10 w-full h-auto rounded-md"
            />
            <canvas
              ref={webcamCanvasRef}
              className="absolute inset-0 z-10 rounded-md"
              style={{
                width: webcamRef.current?.clientWidth || "100%",
                height: webcamRef.current?.clientHeight || "100%",
              }}
            />
          </div>
        </AspectRatio> */}
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
                    style={{
                      border: background === bg && "2px solid #000",
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
