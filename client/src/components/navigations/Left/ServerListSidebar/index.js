import React, { useState } from "react";
import SpaceAvatar from "../../../SpaceAvatar";
import "./index.css";
// import { Drawer, Button } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@modulz/radix-icons";
import { MdExplore} from "react-icons/md";
// import { AwesomeButton } from "react-awesome-button";
// import "react-awesome-button/dist/styles.css";
// import "react-awesome-button/dist/themes/theme-blue.css";
// import { Player } from "@lottiefiles/react-lottie-player";
// import { Profile2User } from "iconsax-react";
// // import { Howl, Howler } from "howler";
// import { Tooltip } from "@douyinfe/semi-ui";
// import { FocusRing } from "react-focus-rings";
// import NyanCatAnimation from "../../assets/jsons/animations/nyan_cat.json";
// import DiscoverAnimation from "../../assets/jsons/animations/compass.json";

export default function Sidebar() {
  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState("left");
  const [hostKeys, setHostKeys] = useState([]);
  useHotkeys([["ctrl+shift+Z", () => openDrawer()], ...hostKeys]);
  // const sound = new Howl({
  //   src: "https://www.memesoundboard.com/sounds/1Nyan%20Cat.0138.mp3",
  //   autoplay: true,
  //   volume: 0.5,
  //   onend: function () {
  //     console.log("Finished!");
  //   },
  // });
  const openDrawer = () => {
    if (!opened) {
      // sound.play();
      setHostKeys([
        ["arrowUp", () => setPosition("top")],
        ["arrowLeft", () => setPosition("left")],
        ["arrowRight", () => setPosition("right")],
        ["arrowDown", () => setPosition("bottom")],
        ["W", () => setPosition("top")],
        ["A", () => setPosition("left")],
        ["D", () => setPosition("right")],
        ["S", () => setPosition("bottom")],
      ]);
    } else {
      // sound.stop();
      setHostKeys([]);
    }
    setOpened(!opened);
  };
  return (
    <>
      <div
        className="sidebar flex flex-col w-16 h-full flex-shrink-0 overflow-x-hidden overflow-y-auto"
        style={{
          backgroundColor: "#f3f4f6",
          borderRight: "2px solid #e5e7eb",
        }}
      >
        <img
          src="/logo512.png"
          alt="logo"
          className="logo my-1 mx-2 w-12 cursor-pointer"
        />
        <div className="h-0 m-2 flex-shrink-0" style={{borderTop: "2px solid #e2e2e2"}}>
        </div>
        {/* <FocusRing> */}
          <SpaceAvatar
            image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
            alt="avatar"
          />
        {/* </FocusRing> */}
        <MdExplore />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
        <MdExplore />
        {/* <div
          className="h-14 w-16 justify-center items-center flex fixed z-50 bottom-0 left-0 "
          style={{ backgroundColor: "#f7f6f3" }}
        >
          <Tooltip
            position="rightBottom"
            content={
              <div className="flex flex-col">
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={NyanCatAnimation}
                  style={{ height: "175px", width: "auto" }}
                ></Player>
                <div className="flex justify-between items-center w-full h-auto">
                  <div>Discover</div>
                  <div>
                    <AwesomeButton type="primary">Ctrl</AwesomeButton>
                    <AwesomeButton type="primary">Shift</AwesomeButton>
                    <AwesomeButton type="primary">Z</AwesomeButton>
                  </div>
                </div>
              </div>
            }
          >
            <div className="flex w-full h-full items-center justify-center">
              <FocusRing>
                <button
                  className="w-auto h-auto rounded-full cursor-pointer"
                  onClick={openDrawer}
                >
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={DiscoverAnimation}
                    style={{ height: "48px", width: "auto" }}
                  ></Player>
                </button>
              </FocusRing>
            </div>
          </Tooltip>
        </div> */}
      {/* <Drawer
        opened={opened}
        onClose={openDrawer}
        styles={{
          title: { width: "100%" },
        }}
        title={
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src={NyanCatAnimation}
                style={{ height: "150px", width: "auto" }}
              ></Player>
              {/* <ul className="c-rainbow font-bold text-5xl">
                <li className="c-rainbow__layer c-rainbow__layer--white">
                  DISCOVER
                </li>
                <li className="c-rainbow__layer c-rainbow__layer--orange">
                  DISCOVER
                </li>
                <li className="c-rainbow__layer c-rainbow__layer--red">
                  DISCOVER
                </li>
                <li className="c-rainbow__layer c-rainbow__layer--violet">
                  DISCOVER
                </li>
                <li className="c-rainbow__layer c-rainbow__layer--blue">
                  DISCOVER
                </li>
                <li className="c-rainbow__layer c-rainbow__layer--green">
                  DISCOVER
                </li>
                <li className="c-rainbow__layer c-rainbow__layer--yellow">
                  DISCOVER
                </li>
              </ul> */}
              {/* <div className="font-bold text-5xl">Discover</div>
            </div>
            <div className="flex h-auto">
              <div className="flex items-end">
                <AwesomeButton
                  type="primary"
                  onPress={() => setPosition("left")}
                >
                  <ArrowLeftIcon />
                </AwesomeButton>
              </div>
              <div className="flex flex-col">
                <AwesomeButton
                  type="primary"
                  onPress={() => setPosition("top")}
                >
                  <ArrowUpIcon />
                </AwesomeButton>
                <div className="flex mt-1"></div>
                <AwesomeButton
                  type="primary"
                  onPress={() => setPosition("bottom")}
                >
                  <ArrowDownIcon />
                </AwesomeButton>
              </div>
              <div className="flex items-end">
                <AwesomeButton
                  type="primary"
                  onPress={() => setPosition("right")}
                >
                  <ArrowRightIcon />
                </AwesomeButton>
              </div>
            </div>
          </div>
        }
        padding="xl"
        size={"50%"}
        position={position}
      >
        <div className="flex flex-col w-full overflow-y-scroll">
          <Button
            uppercase
            className="h-auto flex justify-start"
            classNames={{
              inner: "flex w-full justify-start",
              label: "flex w-full justify-center text-2xl",
            }}
            variant="light"
            leftIcon={
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets2.lottiefiles.com/packages/lf20_vckswclv.json"
                style={{ height: "100px", width: "100px" }}
              ></Player>
            }
          >
            COVID 19
          </Button>
          <Button
            uppercase
            className="h-auto flex justify-start mt-5"
            classNames={{
              inner: "flex w-full justify-start",
              label: " text-2xl flex w-full justify-center",
            }}
            variant="light"
            leftIcon={
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets4.lottiefiles.com/packages/lf20_ztprgcoz.json"
                style={{ height: "100px", width: "100px" }}
              ></Player>
            }
          >
            Add SpaceAvatar
          </Button>
          <Button
            uppercase
            className="h-auto flex justify-start mt-5"
            classNames={{
              inner: "flex w-full justify-start",
              label: " text-2xl flex w-full justify-center",
            }}
            variant="light"
            leftIcon={
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets10.lottiefiles.com/packages/lf20_wbhsa1lf.json"
                style={{ height: "100px", width: "100px" }}
              ></Player>
            }
          >
            Join SpaceAvatar
          </Button>
          <Button
            uppercase
            className="h-auto w-full justify-between flex mt-5"
            classNames={{
              inner: "flex w-full justify-start",
              label: " text-2xl flex w-full justify-center",
            }}
            variant="light"
            leftIcon={
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets5.lottiefiles.com/packages/lf20_bwysuvzk.json"
                style={{ height: "100px", width: "100px" }}
              ></Player>
            }
          >
            Gathering Place
          </Button>
        </div>
      </Drawer> */}
      </div>
    </>
  );
}
