import {
    IconChevronDown, IconChevronUp, IconHash
} from "@douyinfe/semi-icons";
import {
    ActionIcon, Autocomplete, Button, Loader
} from "@mantine/core";
import { useIdle } from "@mantine/hooks";
import axios from "axios";
import {
    AnimatePresence, motion
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import "react-bubble-ui/dist/index.css";
import { IoSearchCircle } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import Editor from "../../components/Editor";
import Message from "../../components/Message";
import useUnsavedChangesWarning from "../../hooks/useUnsavedChangesWarning";

export default function ChatArea() {
  const [typeWorkspace, setTypeWorkspace] = useState("public");
  const [opened, setOpen] = useState(false);
  const [openModalConfirm, setDirty, setPristine] = useUnsavedChangesWarning();
  const [referenceElement, setReferenceElement] = useState(null);
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
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
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
            <ActionIcon>
              <IoSearchCircle />
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
        <div className="flex w-full h-9 flex-shrink-0 absolute top-full left-0 right-0 bg-white z-10">
          {idle ? "idle" : "not idle"}
        </div>
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
          <Button>Close</Button>
        </div>
      </div>
      <div className="flex w-full h-full relative flex-col flex-auto">
        <div className="flex flex-auto w-full relative">
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
              dataLength={data.length}
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
              endMessage={null}
              scrollableTarget="scrollableDiv"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.5,
                    },
                  },
                }}
              >
                {data.map((post, index) => (
                  // <InfinityGauntlet snap={true}>
                  <AnimatePresence>
                    <Message
                      post={post}
                      key={index}
                      searchMessage={searchMessage}
                    />
                  </AnimatePresence>
                  // </InfinityGauntlet>
                ))}
              </motion.ul>
            </InfiniteScroll>
            <div className="block h-8 w-full pointer-events-none"></div>
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
    </div>
  );
}
