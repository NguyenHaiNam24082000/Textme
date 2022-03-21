import { IconChevronLeft, IconClose } from "@douyinfe/semi-icons";
import { Button, Collapse } from "@douyinfe/semi-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Avatar,
  Highlight,
  Input,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { useIdle } from "@mantine/hooks";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import "react-bubble-ui/dist/index.css";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Editor from "../../Editor";
import Message from "../../Message";
// import "./index.css";

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

function ChatArea() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [openedSearchBar, setOpenedSearchBar] = useState(false);
  const [degree, setDegree] = useState(0);
  const [newScale, setNewScale] = useState(1);
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");
  const ref = useRef(null);
  const inputRef = useRef(null);
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
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch(pageMessage);
    // setMembers([...users]);
    // setInterval(() => {
    //   socket.emit("chatMessage", (d) => {
    //     setData([...data, "aaa"]);
    //   });
    // }, 10000);
  }, []);

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
      // axios
      //   .get("https://jsonplaceholder.typicode.com/posts", {
      //     params: { page: pageNumber },
      //   })
      //   .then((res) => {
      //     setData((d) => d.concat(res.data));
      //     setPageMessage((p) => p + 1);
      //   });
    }
  };
  const fetchMoreData = (page) => {
    return fetch(page);
  };

  const onSearchChangeMembers = (e) => {
    setSearchMember(e.target.value);
  };

  useEffect(() => {
    console.log(inputRef?.current);
  }, [inputRef?.current]);

  return (
    //   <div className="flex flex-col flex-auto min-w-0 min-h-0 relative">
    //     <section
    //       className="h-auto w-full min-w-0 relative flex "
    //       style={{ flex: "0 0 auto" }}
    //     >
    //       <div
    //         className="flex w-full h-12 px-2"
    //         style={{ backgroundColor: "#f3f4f6" }}
    //       >
    //         <div
    //           className="flex w-full h-full items-center justify-between px-2"
    //           style={{ borderBottom: "2px solid #e1e1e1" }}
    //         >
    //           <div className="flex gap-2 items-center">
    //             <FontAwesomeIcon
    //               icon="fa-regular fa-window-maximize"
    //               className="fa-rotate-90 cursor-pointer"
    //               onClick={() => {
    //                 dispatch(expandedChannel());
    //               }}
    //             />
    //             <Button
    //               size="md"
    //               icon={<IconHash size="small" />}
    //               variant="subtle"
    //               radius="sm"
    //               compact
    //             >
    //               test
    //             </Button>
    //             <div className="flex gap-2 items-center h-auto">
    //               <div
    //                 className="w-1 rounded h-9"
    //                 style={{ backgroundColor: "#000000" }}
    //               ></div>
    //               <div className="flex flex-col">
    //                 <div className="text-sm font-semibold">Xin chào</div>
    //                 <div className="text-xs">aaaaaaaaaa</div>
    //               </div>
    //             </div>
    //           </div>
    //           <Group>
    //             <Group
    //               spacing={4}
    //               className="rounded-full"
    //               style={{ border: "2px solid #3bb246", padding: "2px 4px" }}
    //             >
    //               <Switch
    //                 checkedText={
    //                   <FontAwesomeIcon icon="fa-solid fa-microphone" />
    //                 }
    //                 uncheckedText={
    //                   <FontAwesomeIcon icon="fa-solid fa-microphone-slash" />
    //                 }
    //                 // size="large"
    //               />
    //               <Avatar
    //                 radius="xl"
    //                 size={22}
    //                 src="https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/62498267_1122772321257230_1257182363998224384_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=VPPfNnnvFVAAX8VxZxh&_nc_ht=scontent.fhan15-2.fna&oh=00_AT8POEy0BdNfsodV94sKHFnY8XSVf3__t5f7o7SYBVlS0w&oe=6248A0A1"
    //               />
    //               <Avatar
    //                 radius="xl"
    //                 size={22}
    //                 src="https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/62498267_1122772321257230_1257182363998224384_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=VPPfNnnvFVAAX8VxZxh&_nc_ht=scontent.fhan15-2.fna&oh=00_AT8POEy0BdNfsodV94sKHFnY8XSVf3__t5f7o7SYBVlS0w&oe=6248A0A1"
    //               />
    //               <Avatar
    //                 radius="xl"
    //                 size={22}
    //                 classNames={{
    //                   placeholder: "font-bold text-white bg-green-600",
    //                 }}
    //               >
    //                 +3
    //               </Avatar>
    //             </Group>
    //             <FontAwesomeIcon
    //               icon="fa-solid fa-bell"
    //               className="cursor-pointer fa-shake"
    //             />
    //             <FontAwesomeIcon
    //               icon="fa-solid fa-thumbtack"
    //               className="cursor-pointer fa-bounce"
    //             />
    //             <FontAwesomeIcon
    //               icon="fa-solid fa-inbox"
    //               className="cursor-pointer"
    //             />
    //             <FontAwesomeIcon
    //               icon="fa-solid fa-magnifying-glass"
    //               className="cursor-pointer"
    //               onClick={() => setActiveMenu("search")}
    //             />
    //             <FontAwesomeIcon
    //               icon="fa-solid fa-circle-info"
    //               className="cursor-pointer"
    //               onClick={() => setActiveMenu("main")}
    //             />
    //           </Group>
    //           {/* <button ref={referenceElement}>Reference element</button>
    //     <Popper referenceElement={referenceElement} mounted={true}>
    //       <Paper
    //         style={{
    //           backgroundColor: "red",
    //         }}
    //       >
    //         Pop
    //       </Paper>
    //     </Popper> */}
    //         </div>
    //       </div>
    //       {/* <div className="flex w-full h-9 flex-shrink-0 absolute top-full left-0 right-0 bg-white z-10">
    //         {idle ? "idle" : "not idle"}
    //       </div> */}
    //       {/* {openedSearchBar && (
    //         <div className="flex w-full h-14 py-2 px-4 bg-black items-center">
    //           <Autocomplete
    //             className="w-full"
    //             maxSelectedValues={1}
    //             searchable
    //             value={searchMessage}
    //             onChange={setSearchMessage}
    //             placeholder="Pick one"
    //             data={["React", "Angular", "Svelte", "Vue"]}
    //           />
    //           <ActionIcon>
    //             <IconChevronUp />
    //           </ActionIcon>
    //           <ActionIcon>
    //             <IconChevronDown />
    //           </ActionIcon>
    //           <Button onClick={() => setOpenedSearchBar(false)}>Close</Button>
    //         </div>
    //       )} */}
    //     </section>
    <div className="flex flex-auto min-w-0 min-h-0 relative overflow-hidden ">
      <main className="flex min-w-0 min-h-0 relative flex-col flex-auto">
        <div className="chat-area flex flex-col flex-auto relative min-h-0 min-w-0">
          {/* <Parallax /> */}
          {/* <ActionIcon
                className="absolute bottom-2 right-8 z-10"
                size="xl"
                radius="xl"
                variant="outline"
                onClick={scrollToBottom}
              >
                <IconChevronDown />
              </ActionIcon> */}
          <div
            ref={viewportRef}
            id="scrollableDiv"
            className="flex flex-col flex-auto min-h-0 absolute top-0 left-0 right-0 bottom-0  overflow-y-scroll overflow-x-hidden"
          >
            {/*  <InfiniteScroll
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
                > */}
            {/* <div className="mb-5 overflow-y-auto"> */}
            {/* {data.map((post, index) => (
                      // <InfinityGauntlet snap={true}>
                      <AnimatePresence key={index}>
                        <Message
                          message={post}
                          key={index}
                          searchMessage={searchMessage}
                          messages={data}
                        />
                      </AnimatePresence>
                      // </InfinityGauntlet>
                    ))} */}
            <Message
              message={"test"}
              // key={index}
              searchMessage={searchMessage}
              messages={data}
            />
            <Message
              message={"test"}
              // key={index}
              searchMessage={searchMessage}
              messages={data}
            />
            <Message
              message={"test"}
              // key={index}
              searchMessage={searchMessage}
              messages={data}
            />
            <Message
              message={"test"}
              // key={index}
              searchMessage={searchMessage}
              messages={data}
            />
            <Message
              message={"test"}
              // key={index}
              searchMessage={searchMessage}
              messages={data}
            />
            <Message
              message={"test"}
              // key={index}
              searchMessage={searchMessage}
              messages={data}
            />
            {/* <Message
                  message={"test"}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                />
                <Message
                  message={"test"}
                  isUnread={true}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                />
                <Message
                  message={"test"}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                />
                <Message
                  message={"test"}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                />
                <Message
                  message={"test"}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                />
                <Message
                  message={"test"}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                />
                <Message
                  message={"test"}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                />
                <Message
                  message={"test"}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                />
                <Message
                  message={"test"}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                />
                <Message
                  message={"test"}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                />
                <Message
                  message={"test"}
                  // key={index}
                  searchMessage={searchMessage}
                  messages={data}
                /> */}
          </div>
          {/* </InfiniteScroll> */}
          {/* </div> */}
        </div>
        {/* <div className="m-4 relative flex-shrink-0">
              <div
                style={{
                  border: "2px solid #e5e7eb",
                  borderRadius: 8,
                  padding: 8,
                  backgroundColor: "#fff",
                }}
              >
                aAaaaaaaaa
              </div>
            </div> */}
        <Editor />
        {/* <main className="flex flex-col h-auto w-full absolute bottom-0 left-0 px-4 pb-2">
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
      </main>
      <aside
        className="flex w-96 h-full flex-shrink-0 overflow-hidden relative"
        style={{
          backgroundColor: "#f3f4f6",
          borderLeft: "2px solid #e5e7eb",
        }}
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
            <div className="flex w-full h-10 items-center justify-end p-2">
              <ActionIcon>
                <IconClose />
              </ActionIcon>
            </div>
            <div className="flex flex-col items-center">
              <Avatar
                radius="50%"
                size="xl"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              />
              <Text size="md" weight={600} color="black">
                @HaiNam2000
              </Text>
              <Text size="xs" color="black">
                Online
              </Text>
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
            <div className="flex w-full h-10 items-center justify-between p-2 flex-shrink-0">
              <ActionIcon onClick={() => setActiveMenu("main")}>
                <IconChevronLeft />
              </ActionIcon>
              <ActionIcon>
                <IconClose />
              </ActionIcon>
            </div>
            <div className="flex px-4 w-full h-full">
              <div className="w-full h-auto">
                <SegmentedControl
                  fullWidth
                  //               value={value}
                  // onChange={setValue}
                  data={[
                    { label: "Images/Videos", value: "media" },
                    { label: "Files", value: "files" },
                    { label: "Links", value: "links" },
                  ]}
                />
              </div>
              {/* <Tabs defaultActiveKey={`${tabKey}`}>
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
                  </Tabs> */}
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
            <div className="flex w-full h-10 p-2 flex-shrink-0">
              <div className="flex w-full items-center justify-between">
                <ActionIcon onClick={() => setActiveMenu("main")}>
                  <IconChevronLeft />
                </ActionIcon>
                <Text weight={500}>Members</Text>
                <ActionIcon>
                  <IconClose />
                </ActionIcon>
              </div>
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
        <CSSTransition
          in={activeMenu === "search"}
          timeout={250}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="flex flex-col w-full h-full">
            <div className="flex w-full h-10 items-center justify-between p-2 flex-shrink-0">
              <ActionIcon onClick={() => setActiveMenu("main")}>
                <IconChevronLeft />
              </ActionIcon>
              <ActionIcon>
                <IconClose />
              </ActionIcon>
            </div>
            <div className="flex flex-col px-4 w-full h-full">
              <div className="flex flex-col w-full h-auto py-2 my-1 gap-2">
                <div className="flex w-full">
                  <Input
                    icon={
                      <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    }
                    className="flex-auto"
                    searchable
                    // value={searchMember}
                    // onChange={onSearchChangeMembers}
                    ref={inputRef}
                    placeholder="Pick all that you like"
                    clearable
                  />
                  <Button
                    leftIcon={<FontAwesomeIcon icon="fa-solid fa-filter" />}
                  >
                    Filter
                  </Button>
                </div>
                <SegmentedControl
                  data={[
                    { label: "Mới nhất", value: "New" },
                    { label: "Cũ nhất", value: "Old" },
                    { label: "Liên quan", value: "vue" },
                  ]}
                />
              </div>
            </div>
          </div>
        </CSSTransition>
      </aside>
    </div>
    //     {/* <div className=" absolute p-2 z-50">
    //       <div className="bg-yellow-500 shadow-lg rounded-md w-80 flex flex-col h-auto p-2">
    //         <div>hello</div>
    //         <div className="flex flex-col h-auto w-full">
    //           <div className="flex w-full justify-between items-center">
    //             <div>Tim kiem</div>
    //             <div className="flex items-center">
    //               <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd>
    //             </div>
    //           </div>
    //           <Button>aaaaa</Button>
    //         </div>
    //       </div>
    //     </div> */}
    //   {/* </div> */}
  );
}

export default React.memo(ChatArea);