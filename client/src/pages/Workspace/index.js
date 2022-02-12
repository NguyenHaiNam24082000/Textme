import React, { useState, useEffect, useRef } from "react";
import { FullScreenDropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Modal from "../../components/Modal";
import {
  TextInput,
  Card,
  Button,
  Text,
  Group,
  Collapse,
  Popper,
  Paper,
  ActionIcon,
  Menu,
  Divider,
  Autocomplete,
  Highlight,
  Loader,
  MultiSelect,
} from "@mantine/core";
import { Slider } from "@douyinfe/semi-ui";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import UploadImage from "../../components/UI/UploadImage";
import { Upload } from "@douyinfe/semi-ui";
import useUnsavedChangesWarning from "../../hooks/useUnsavedChangesWarning";
import { Tabs, TabPane } from "@douyinfe/semi-ui";
import Sidebar from "../../components/Sidebar";
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import { RotateClockwise2, Plus, Minus } from "tabler-icons-react";
import { wrap } from "popmotion";
import {
  IconTreeTriangleRight,
  IconChevronDown,
  IconHash,
  IconVolume2,
  IconMicrophone,
  IconSetting,
  IconChevronUp,
} from "@douyinfe/semi-icons";
import Tree from "../../components/Tree";
import FallingGlitter from "../../components/Animations/FallingGlitter";
import Editor from "../../components/Editor";
import { Tooltip, Avatar, Badge } from "@douyinfe/semi-ui";
import { IoSearchCircle } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { useIdle } from "@mantine/hooks";
import axios from "axios";
import Message from "../../components/Message";
import InfinityGauntlet from "react-thanos-snap";
import ReactSplit, { SplitDirection } from "@devbookhq/splitter";
import SpaceAvatar from "../../components/SpaceAvatar";
import ChatArea from "../../components/ChatArea";
import Channel from "../../components/Channel";
import ModalCreateWorkspace from "../../components/Modals/ModalCreateWorkspace";
import { SocketContext } from "../../sockets";
import useSound from 'use-sound';
import sound from "../../assets/sounds/audio.ogg";
import config from "../../assets/jsons/cherrymx-brown-abs/config.json";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const options = {
  size: 250,
  minSize: 0,
  gutter: 15,
  provideProps: true,
  numCols: 6,
  fringeWidth: 200,
  yRadius: 400,
  xRadius: 400,
  cornerRadius: 0,
  showGuides: false,
  compact: true,
  gravitation: 5,
};

const images = [
  {
    id: 1,
    src: "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
  },
  {
    id: 2,
    src: "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
  },
  {
    id: 3,
    src: "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
  },
];

let root = {
  label: "Root",
  state: "open",
  children: [
    {
      label: "Node1",
      children: [
        {
          label: "Sub Node1",
        },
        {
          label: "Sub Node1",
        },
      ],
    },
    {
      label: "Node2",
      children: [
        {
          label: "Sub Node3",
        },
        {
          label: "Sub Node4",
        },
      ],
    },
  ],
};

// Download the Framer Beta: https://www.framer.com/beta/
// Framer Beta API documentation: https://www.framer.com/api/

// Fill a grid of numbers to represent each app icon
const grid = new Array(10).fill([0, 1, 2, 3, 4, 5, 6, 7]);

export default function Workspace() {
  const [typeWorkspace, setTypeWorkspace] = useState("public");
  const [opened, setOpen] = useState(false);
  const [openModalConfirm, setDirty, setPristine] = useUnsavedChangesWarning();
  const [referenceElement, setReferenceElement] = useState(null);
  const [degree, setDegree] = useState(0);
  const [newScale, setNewScale] = useState(1);
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);
  const [selectedId, setSelectedId] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");
  const ref = useRef(null);
  const viewportRef = useRef(null);
  const idle = useIdle(2000, { events: ["scroll"] });
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [pageMessage, setPageMessage] = useState(1);
  const [data, setData] = useState([]);
  const [openedModalCreateWorkspace, setOpenedModalCreateWorkspace] =
    useState(false);
  const socket = React.useContext(SocketContext);
  const [play] = useSound(sound,{
    sprite: config.defines,
  });

  // We manually create x/y motion values for the draggable plane as it allows us to pass these to
  // icon children, which can then listen to when they change and respond.
  // -220 is an arbitrary position that centers an initial icon - this could be calculated
  const x = useMotionValue(-225);
  const y = useMotionValue(-225);

  useEffect(() => {
    socket.emit("chatMessage", "Hello");
  }, []);

  const fetch = (pageNumber = 1) => {
    if (pageNumber <= 10) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: { page: pageNumber },
        })
        .then((res) => {
          setData((d) => d.concat(res.data));
          setPageMessage((p) => p + 1);
        });
    }
  };
  const fetchMoreData = (page) => {
    return fetch(page);
  };

  useEffect(() => {
    fetch(pageMessage);
  }, []);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  function handleClick() {
    console.log("aaa");
  }

  const scrollToBottom = () =>
    viewportRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  return (
    <div
      className="flex w-full h-full overflow-hidden flex-shrink-0 bg-white"
      // style={{
      //   background:
      //     "url(https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/new-year-bg-light-2.png) no-repeat center center fixed",
      //   backgroundSize: "cover",
      // }}
      onKeyDown={(e) => {play({id: e.keyCode.toString()});}}
    >
      <div
        className="flex flex-col w-16 h-full flex-shrink-0"
        onClick={() => setOpenedModalCreateWorkspace(true)}
        style={{backgroundColor: "#f3f4f6",borderRight: "2px solid #e5e7eb"}}
      >
        <SpaceAvatar
          image="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="avatar"
        />
      </div>
      <div className="flex w-full h-full flex-shrink-0 flex-1">
        <Channel />
        <ChatArea />
      </div>

      <FullScreenDropzone accept={IMAGE_MIME_TYPE}>
        {() => {
          return <div>jeejej</div>;
        }}
      </FullScreenDropzone>
      {openModalConfirm && openModalConfirm()}
      <ModalCreateWorkspace
        opened={openedModalCreateWorkspace}
        onClose={() => setOpenedModalCreateWorkspace(false)}
      />
    </div>
  );
}
