import { useIdle } from "@mantine/hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "react-bubble-ui/dist/index.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getMessages } from "../../../apis/messages";
import { CHANNEL_MESSAGES_KEY } from "../../../configs/queryKeys";
import Editor from "../../Editor";
import Message from "../../Message";
import MockChat from "../../MockChat";
import "./index.css";

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

function ChatArea({ channel, user }) {
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
  // const [data, setData] = useState([]);
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const [tabKey, setTabKey] = useState(1);
  const [searchMember, setSearchMember] = useState("");
  const [members, setMembers] = useState([]);
  const [previousIdMember, setPreviousIdMember] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentEditMessageId, setCurrentEditMessageId] = useState(null);
  const [currentMessageSelected, setCurrentMessageSelected] = useState(null);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const observer = useRef();
  console.log(channel, "aAaaaaa");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      CHANNEL_MESSAGES_KEY(channel?._id),
      async ({ pageParam }) => {
        const { data } = await getMessages(channel?._id, pageParam);
        return data;
      },
      {
        getNextPageParam: (lastPage) => {
          const { page, totalPages } = lastPage;
          console.log(lastPage);
          return page < totalPages ? page + 1 : undefined;
        },
      }
    );
  const lastMessageRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage]
  );
  const msg = data ? data.pages.flatMap((page) => page?.results ?? []) : [];
  useEffect(() => {
    // const msg = data ? data.pages.flatMap((page) => page?.results ?? []) : [];
    // setMessages(msg.reverse());
    scrollToBottom();
  }, [data]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document
      .getElementById(`chat-messages-${currentMessageSelected}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    // scroller.scrollTo(`chat-messages-${currentMessageSelected}`, {
    //   duration: 1500,
    //   delay: 0,
    //   containerId: "chat-viewport",
    //   smooth: true,
    // });
    if (currentMessageSelected) {
      const resetCurrentMessages = setTimeout(() => {
        setCurrentMessageSelected(null);
      }, 3000);
      // console.log("aaaaaaazzzzz");
      return () => clearTimeout(resetCurrentMessages);
    }
  }, [currentMessageSelected]);

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

  // const scrollToBottom = () =>
  //   viewportRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  const onSearchChangeMembers = (e) => {
    setSearchMember(e.target.value);
  };

  useEffect(() => {
    console.log(inputRef?.current);
  }, [inputRef?.current]);

  return (
    <div className="flex flex-auto min-w-0 min-h-0 relative overflow-hidden ">
      <main className="flex min-w-0 min-h-0 relative flex-col flex-auto">
        <div className="chat-area flex flex-col flex-auto relative min-h-0 min-w-0">
          <div
            ref={viewportRef}
            id="chat-viewport"
            className="flex flex-col justify-end flex-auto min-h-0 absolute top-0 left-0 right-0 bottom-0  overflow-y-scroll overflow-x-hidden"
          >
            {isLoading ? (
              <MockChat />
            ) : (
              <InfiniteScroll
                dataLength={msg.length}
                next={fetchNextPage}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={hasNextPage}
                loader={
                  <div className="flex w-full h-auto justify-center items-center my-2">
                    Loading...
                  </div>
                }
                endMessage={hasNextPage}
                scrollableTarget="chat-viewport"
              >
                {msg &&
                  msg.reverse().map((message, index) => (
                    // <InfinityGauntlet snap={true}>
                    // <AnimatePresence key={index}>
                    // <Element
                    //   key={message.id}
                    //   name={`chat-messages-${message.id}`}
                    // >
                    <React.Fragment key={message.id}>
                      <div
                        // key={message.id}
                        id={`chat-messages-${message.id}`}
                        ref={lastMessageRef}
                      >
                        <Message
                          message={message}
                          key={message.id}
                          user={user}
                          searchMessage={searchMessage}
                          messages={msg}
                          currentEditMessageId={currentEditMessageId}
                          setCurrentEditMessageId={setCurrentEditMessageId}
                          currentMessageSelected={currentMessageSelected}
                          setCurrentMessageSelected={setCurrentMessageSelected}
                        />
                      </div>
                    </React.Fragment>
                    // </Element>
                    // </AnimatePresence>
                    // </InfinityGauntlet>
                  ))}
                <div ref={messagesEndRef} className="h-8 w-full"></div>
              </InfiniteScroll>
            )}
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
        </div>
        <Editor channel={channel} user={user} />
      </main>
      {/* <aside
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
      </aside> */}
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
