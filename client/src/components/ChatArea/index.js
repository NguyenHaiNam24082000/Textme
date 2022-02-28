import {
  IconChevronDown,
  IconClose,
  IconChevronUp,
  IconHash,
  IconInfoCircle,
  IconChevronLeft,
} from "@douyinfe/semi-icons";
import { ActionIcon, Autocomplete, Button, Loader } from "@mantine/core";
import { useIdle } from "@mantine/hooks";
import axios from "axios";
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  LayoutGroup,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import "react-bubble-ui/dist/index.css";
import { IoSearchCircle } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import Editor from "../../components/Editor";
import Message from "../../components/Message";
import useUnsavedChangesWarning from "../../hooks/useUnsavedChangesWarning";
import { CSSTransition } from "react-transition-group";
import { Collapse, Tabs, TabPane } from "@douyinfe/semi-ui";
import AccessibleButton from "../AccessibleButton";
import { DateRangePicker } from "@mantine/dates";
import { Avatar, Highlight } from "@mantine/core";
import { Input } from "@mantine/core";
import ImageGrid from "../ImageGrid";
import InfinityGauntlet from "react-thanos-snap";
import "./index.css";
import Parallax from "../BackgroundEffect/Parallax";

const users = [
  {
    id: "Jenny1",
    name: "Manten",
    avatar:
      "https://pbs.twimg.com/profile_images/1101590785824057344/QQZ-QXQX_400x400.jpg",
  },
  {
    id: "Jenn2",
    name: "John",
    avatar:
      "https://pbs.twimg.com/profile_images/1101590785824057344/QQZ-QXQX_400x400.jpg",
  },
  {
    id: "Jenny3",
    name: "Jack",
    avatar:
      "https://pbs.twimg.com/profile_images/1101590785824057344/QQZ-QXQX_400x400.jpg",
  },
  {
    id: "Jenny4",
    name: "Jill",
    avatar:
      "https://pbs.twimg.com/profile_images/1101590785824057344/QQZ-QXQX_400x400.jpg",
  },
  {
    id: "Jenny5",
    name: "Jenny",
    avatar:
      "https://pbs.twimg.com/profile_images/1101590785824057344/QQZ-QXQX_400x400.jpg",
  },
  {
    id: "Jenny6",
    name: "Jenny",
    avatar:
      "https://pbs.twimg.com/profile_images/1101590785824057344/QQZ-QXQX_400x400.jpg",
  },
  {
    id: "Jenny7",
    name: "Jenny",
    avatar:
      "https://pbs.twimg.com/profile_images/1101590785824057344/QQZ-QXQX_400x400.jpg",
  },
  {
    id: "Jenny8",
    name: "Hai",
    avatar:
      "https://pbs.twimg.com/profile_images/1101590785824057344/QQZ-QXQX_400x400.jpg",
  },
  {
    id: "Jenny9",
    name: "Naman",
    avatar:
      "https://pbs.twimg.com/profile_images/1101590785824057344/QQZ-QXQX_400x400.jpg",
  },
];

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

export default function ChatArea() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [openedSearchBar, setOpenedSearchBar] = useState(false);
  const [degree, setDegree] = useState(0);
  const [newScale, setNewScale] = useState(1);
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");
  const ref = useRef(null);
  const viewportRef = useRef(null);
  const idle = useIdle(2000, { events: ["scroll"] });
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [pageMessage, setPageMessage] = useState(1);
  const [data, setData] = useState([]);
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const [tabKey, setTabKey] = useState(1);
  const [searchMember, setSearchMember] = useState("");
  const [members, setMembers] = useState([]);
  const [previousIdMember, setPreviousIdMember] = useState(null);

  useEffect(() => {
    if (searchMember.length === 0) {
      setMembers(users);
      return;
    }
    const mems = users.filter((user) =>
      user.name.toLowerCase().includes(searchMember.toLowerCase())
    );
    setMembers(mems);
  }, [searchMember]);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const scrollToBottom = () =>
    viewportRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });

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
    setMembers([...users]);
  }, []);

  const onSearchChangeMembers = (e) => {
    setSearchMember(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="h-auto w-full relative">
        <div className="flex w-full h-12 px-4">
          <div className="flex w-full h-full border-b-2 items-center justify-between">
            <Button
              size="md"
              leftIcon={<IconHash size="small" />}
              rightIcon={<IconChevronDown size="small" />}
              variant="subtle"
              radius="md"
              compact
            >
              test
            </Button>
            <ActionIcon onClick={() => setOpenedSearchBar((v) => !v)}>
              <IoSearchCircle />
            </ActionIcon>
            <ActionIcon>
              <IconInfoCircle />
            </ActionIcon>
            {/* <button ref={referenceElement}>Reference element</button>
      <Popper referenceElement={referenceElement} mounted={true}>
        <Paper
          style={{
            backgroundColor: "red",
          }}
        >
          Pop
        </Paper>
      </Popper> */}
          </div>
        </div>
        {/* <div className="flex w-full h-9 flex-shrink-0 absolute top-full left-0 right-0 bg-white z-10">
          {idle ? "idle" : "not idle"}
        </div> */}
        {openedSearchBar && (
          <div className="flex w-full h-14 py-2 px-4 bg-black items-center">
            <Autocomplete
              className="w-full"
              maxSelectedValues={1}
              searchable
              value={searchMessage}
              onChange={setSearchMessage}
              placeholder="Pick one"
              data={["React", "Angular", "Svelte", "Vue"]}
            />
            <ActionIcon>
              <IconChevronUp />
            </ActionIcon>
            <ActionIcon>
              <IconChevronDown />
            </ActionIcon>
            <Button onClick={() => setOpenedSearchBar(false)}>Close</Button>
          </div>
        )}
      </div>
      <div className="flex w-full h-full relative overflow-hidden ">
        <div className="flex w-full h-full relative flex-col flex-auto">
          <div
            className="chat-area flex flex-auto w-full relative"
          >
            {/* <Parallax /> */}
            <ActionIcon
              className="absolute bottom-2 right-8 z-10"
              size="xl"
              radius="xl"
              variant="outline"
              onClick={scrollToBottom}
            >
              <IconChevronDown />
            </ActionIcon>
            <div
              ref={viewportRef}
              id="scrollableDiv"
              className="flex flex-col-reverse w-full h-full absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll overflow-x-hidden"
            >
              <InfiniteScroll
                dataLength={data.length + 1}
                next={fetchMoreData}
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  overflowX: "hidden",
                }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={true}
                loader={
                  <div className="flex w-full h-auto justify-center items-center my-2">
                    <Loader />
                  </div>
                }
                endMessage={100}
                scrollableTarget="scrollableDiv"
              >
                <div
                  className="mb-5"
                >
                  {data.map((post, index) => (
                    // <InfinityGauntlet snap={true}>
                    <AnimatePresence>
                      <Message
                        message={post}
                        key={index}
                        searchMessage={searchMessage}
                        messages={data}
                      />
                    </AnimatePresence>
                    // </InfinityGauntlet>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </div>
          <Editor />
          {/* <div className="flex flex-col h-auto w-full absolute bottom-0 left-0 px-4 pb-2">
      {/* <FallingGlitter/> */}
          {/* <BubbleUI options={options} className="w-full h-full">
        {children}
      </BubbleUI> */}
          {/* </div> */}
          {/* <div
      className="flex w-80 h-full"
      style={{ padding: "8px 8px 8px 4px" }}
    >
      <div className="flex w-full h-full rounded-lg"> */}
          {/* <AnimateSharedLayout type="crossfade">
          {images.map((img, index) => (
            <motion.img
              className="w-32 h-32"
              layoutId={img.id}
              key={img.id}
              src={img.src}
              onClick={() => {
                setSelectedId(index);
                console.log(index);
              }}
            />
          ))}
          <AnimatePresence>
            {selectedId !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                key="overlay"
                className="overlay absolute"
                // style={{
                //   backgroundImage: `url(${images[selectedId].src})`,
                //   backgroundSize: "100% 100%",
                //   backgroundPosition: "50%",
                //   backgroundRepeat: "no-repeat",
                //   filter: "blur(7px) brightness(.7)",
                // }}
                onClick={() => setSelectedId(null)}
              />
            )}
            {selectedId !== null && (
              <div
                className="single-image-container"
                onClick={() => setSelectedId(null)}
              >
                <motion.img
                  className="single-image"
                  layoutId={images[selectedId].id}
                  src={images[selectedId].src}
                />
              </div>
            )}
          </AnimatePresence>
        </AnimateSharedLayout> */}
          {/* </div>
    </div> */}
        </div>
        <div
          className="flex w-96 h-full flex-shrink-0"
          style={{ padding: "8px 8px 8px 4px" }}
        >
          <div
            className="flex w-full h-full rounded-lg overflow-hidden relative"
            style={{ backgroundColor: "#f3f4f6",border: "2px solid #e5e7eb" }}
            ref={dropdownRef}
          >
            <CSSTransition
              in={activeMenu === "main"}
              timeout={250}
              classNames="menu-primary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div className="flex flex-col w-full h-full">
                <div className="flex w-full h-10 items-center justify-end p-4">
                  <ActionIcon size="sm" radius="xl">
                    <IconClose />
                  </ActionIcon>
                </div>
                <Collapse className="w-full">
                  <Collapse.Panel header="Members" itemKey="1">
                    <Button
                      className="w-full bg-yellow-400"
                      onClick={() => {
                        setActiveMenu("members");
                      }}
                    >
                      More
                    </Button>
                  </Collapse.Panel>
                  <Collapse.Panel header="Images/Videos" itemKey="2">
                    <Button
                      className="w-full bg-yellow-400"
                      onClick={() => {
                        setActiveMenu("storages");
                        setTabKey(1);
                      }}
                    >
                      More
                    </Button>
                  </Collapse.Panel>
                  <Collapse.Panel header="Files" itemKey="3">
                    <Button
                      className="w-full bg-yellow-400"
                      onClick={() => {
                        setActiveMenu("storages");
                        setTabKey(2);
                      }}
                    >
                      More
                    </Button>
                  </Collapse.Panel>
                  <Collapse.Panel header="Links" itemKey="4">
                    <Button
                      className="w-full bg-yellow-400"
                      onClick={() => {
                        setActiveMenu("storages");
                        setTabKey(3);
                      }}
                    >
                      More
                    </Button>
                  </Collapse.Panel>
                </Collapse>
              </div>
            </CSSTransition>

            <CSSTransition
              in={activeMenu === "storages"}
              timeout={250}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div className="flex flex-col w-full h-full">
                <div className="flex w-full h-10 items-center justify-between p-4 flex-shrink-0">
                  <ActionIcon
                    size="sm"
                    radius="xl"
                    onClick={() => setActiveMenu("main")}
                  >
                    <IconChevronLeft />
                  </ActionIcon>
                  <ActionIcon size="sm" radius="xl">
                    <IconClose />
                  </ActionIcon>
                </div>
                <div className="flex px-4 w-full h-full">
                  <Tabs defaultActiveKey={`${tabKey}`}>
                    <TabPane
                      tab="Images/Videos"
                      itemKey="1"
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col w-full h-full bg-red-500">
                        <DateRangePicker
                          amountOfMonths={3}
                          placeholder="Time"
                          className="py-2 my-1"
                        />
                        <div className="flex w-full h-full">
                          <ImageGrid />
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="Files" itemKey="2">
                      <DateRangePicker amountOfMonths={3} placeholder="Time" />
                    </TabPane>
                    <TabPane tab="Links" itemKey="3">
                      <DateRangePicker amountOfMonths={3} placeholder="Time" />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </CSSTransition>

            <CSSTransition
              in={activeMenu === "members"}
              timeout={250}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div className="flex flex-col w-full h-full">
                <div className="flex w-full h-10 items-center justify-between p-4 flex-shrink-0">
                  <ActionIcon
                    size="sm"
                    radius="xl"
                    onClick={() => setActiveMenu("main")}
                  >
                    <IconChevronLeft />
                  </ActionIcon>
                  <ActionIcon size="sm" radius="xl">
                    <IconClose />
                  </ActionIcon>
                </div>
                <div className="flex flex-col px-4 w-full h-full">
                  <div className="flex w-full h-12 py-2 my-1">
                    <Input
                      placeholder="Your email"
                      className="w-full"
                      value={searchMember}
                      onChange={onSearchChangeMembers}
                    />
                    <Button
                      onClick={() => {
                        const mems = users.filter((user) =>
                          user.name
                            .toLowerCase()
                            .includes(searchMember.toLowerCase())
                        );
                        setMembers(mems);
                      }}
                    >
                      Search
                    </Button>
                  </div>
                  <AnimateSharedLayout>
                    <motion.div
                      layout
                      className="flex flex-col w-full h-full flex-1 overflow-y-auto basis-0"
                    >
                      <AnimatePresence>
                        {members.map((user, index) => {
                          return (
                            <motion.div
                              key={user.id}
                              layout
                              animate={{ opacity: 1 }}
                              initial={{ opacity: 0 }}
                              exit={{ opacity: 0 }}
                              transition={spring}
                              className="flex w-full h-12 py-1 px-2 items-center hover:bg-slate-200 rounded-lg cursor-pointer"
                            >
                              <Avatar
                                className="mr-3"
                                radius="xl"
                                src={`https://cdn.discordapp.com/avatars/802606776314626078/6ceaaf5d73a74731ef9a669a595de977.webp?size=40`}
                              />
                              <Highlight
                                highlight={searchMember}
                                className="text-sm font-semibold"
                                children={user.name}
                              />
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </motion.div>
                  </AnimateSharedLayout>

                  <div className="flex w-full h-12 mt-1">
                    <Button
                      className="w-full bg-yellow-400"
                      onClick={() => {
                        setActiveMenu("members");
                      }}
                    >
                      Add Members
                    </Button>
                  </div>
                </div>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  );
}
