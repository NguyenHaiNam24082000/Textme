// import { useIdle } from "@mantine/hooks";
import { Loader } from "@mantine/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "react-bubble-ui/dist/index.css";
import { MdSignalCellular3Bar } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../apis/messages";
import { CHANNEL_MESSAGES_KEY } from "../../../configs/queryKeys";
import { nearBySelector, setNearBy } from "../../../store/uiSlice";
import Editor from "../../Editor";
// import Editor from "../../LexicalEditor";
import Message from "../../Message";
import MessageBeginner from "../../Message/MessageBeginner";
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

// const spring = {
//   type: "spring",
//   stiffness: 500,
//   damping: 30,
// };

function ChatArea({ channel, user, setMessages = null }) {
  // const [activeMenu, setActiveMenu] = useState("main");
  // const [openedSearchBar, setOpenedSearchBar] = useState(false);
  // const [degree, setDegree] = useState(0);
  // const [newScale, setNewScale] = useState(1);
  // const [[page, direction], setPage] = useState([0, 0]);
  // const [selectedId, setSelectedId] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");
  // const ref = useRef(null);
  const inputRef = useRef(null);
  const viewportRef = useRef(null);
  // const idle = useIdle(2000, { events: ["scroll"] });
  // const [items, setItems] = useState(Array.from({ length: 20 }));
  // const [pageMessage, setPageMessage] = useState(1);
  // const [data, setData] = useState([]);
  const [menuHeight, setMenuHeight] = useState(null);
  // const dropdownRef = useRef(null);
  // const [tabKey, setTabKey] = useState(1);
  const [searchMember, setSearchMember] = useState("");
  const [members, setMembers] = useState([]);
  // const [previousIdMember, setPreviousIdMember] = useState(null);
  // const [messages, setMessages] = useState([]);
  const [currentEditMessageId, setCurrentEditMessageId] = useState(null);
  const [currentMessageSelected, setCurrentMessageSelected] = useState(null);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const cache = useQueryClient();
  const nearBy = useSelector(nearBySelector);
  const observer = useRef();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      CHANNEL_MESSAGES_KEY(channel?._id),
      async ({ pageParam }) => {
        const { data } = await getMessages(
          channel?._id,
          pageParam && pageParam?.page,
          pageParam && pageParam?.before,
          pageParam && pageParam?.after,
          nearBy
        );
        return data;
      },
      {
        getNextPageParam: (lastPage) => {
          const { page, totalPages, after, before } = lastPage;
          if (page && totalPages) {
            return {
              page: page < totalPages ? page + 1 : undefined,
              before,
              after,
            };
          } else if (after || before) {
            const near = undefined;
            dispatch(setNearBy(near));
            return { page, before, after };
          }
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
  const msgIds = msg.map((m) => m?._id);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    // const msg = data ? data.pages.flatMap((page) => page?.results ?? []) : [];
    // setMessages(msg.reverse());
    typeof setMessages === "function" && setMessages(msg);
    scrollToBottom();
  }, [data]);
  useEffect(() => {
    if (currentMessageSelected && msgIds.includes(currentMessageSelected)) {
      document
        .getElementById(`chat-messages-${currentMessageSelected}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
    }
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
                    <Loader />
                  </div>
                }
                endMessage={hasNextPage}
                scrollableTarget="chat-viewport"
              >
                <MessageBeginner channel={channel} />
                {msg &&
                  msg.reverse().map((message, index) => (
                    <React.Fragment key={message.id}>
                      <div
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
                  ))}
                <div ref={messagesEndRef} className="h-8 w-full"></div>
              </InfiniteScroll>
            )}
            {/* </div> */}
          </div>
        </div>
        <Editor channel={channel} user={user} scrollToBottom={scrollToBottom} />
      </main>
    </div>
  );
}

export default React.memo(ChatArea);
