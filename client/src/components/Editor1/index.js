import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { RichTextEditor } from "@mantine/rte";
import {
  ActionIcon,
  Group,
  Menu,
  Divider,
  Popper,
  Paper,
  Center,
  TextInput,
  SimpleGrid,
  Switch,
} from "@mantine/core";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useClickOutside } from "@mantine/hooks";
import { IconPlusCircle } from "@douyinfe/semi-icons";
import { MdGif } from "react-icons/md";
import { BiSticker } from "react-icons/bi";
import { BsBarChartFill } from "react-icons/bs";
import { IconMicrophone } from "@douyinfe/semi-icons";
import { GiphyFetch } from "@giphy/js-fetch-api";
import QuillMarkdown from "quilljs-markdown";
import {
  Carousel,
  Gif,
  Grid,
  Video,
  VideoOverlay,
} from "@giphy/react-components";
import "./index.css";
const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

const people = [
  { id: 1, value: "Bill Horsefighter" },
  { id: 2, value: "Amanda Hijacker" },
  { id: 3, value: "Leo Summerhalter" },
  { id: 4, value: "Jane Sinkspitter" },
];

const tags = [
  { id: 1, value: "JavaScript" },
  { id: 2, value: "TypeScript" },
  { id: 3, value: "Ruby" },
  { id: 3, value: "Python" },
];

const slashes = [
  {
    id: 1,
    value: "giphy",
    description: "Search Animated GIFs on the Web",
    options: "message",
  },
  {
    id: 2,
    value: "tenor",
    description: "Search Animated GIFs on the Web",
    options: "message",
  },
  {
    id: 3,
    value: "shrug",
    description: "Appends ¯_(ツ)_/¯ to your message.",
    options: "message",
  },
  {
    id: 4,
    value: "tableflip",
    description: "Appends (╯°□°）╯︵ ┻━┻ to your message.",
    options: "message",
  },
  {
    id: 5,
    value: "unflip",
    description: "Appends ┬─┬ ノ( ゜-゜ノ) to your message.",
    options: "message",
  },
  {
    id: 6,
    value: "tts",
    description:
      "Use text-to-speech to read the message to all members currently viewing the channel.",
    options: "message",
  },
  {
    id: 7,
    value: "me",
    description: "Displays text with emphasis.",
    options: "message",
  },
  {
    id: 8,
    value: "spoiler",
    description: "Marks your message as a spoiler.",
    options: "message",
  },
  {
    id: 9,
    value: "nick",
    description: "Change nickname on this server.",
    options: "message",
  },
  {
    id: 10,
    value: "thread",
    description: "Start new thread",
    options: "message",
  },
  { id: 11, value: "kick", description: "Kick user", options: "message" },
  { id: 12, value: "ban", description: "Ban user", options: "message" },
  {
    id: 13,
    value: "timeout",
    description: "Time out user",
    options: "message",
  },
  { id: 14, value: "msg", description: "Message user", options: "message" },
  {
    id: 15,
    value: "rainbow",
    description: "Gửi nội dung tin nhắn được tô màu cầu vồng",
    options: "message",
  },
];

const gifsGallery = [
  {
    id: 1,
    value: "Favourites",
  },
  {
    id: 2,
    value: "Trending",
  },
  {
    id: 3,
    value: "Random",
  },
  {
    id: 4,
    value: "Awesome",
  },
  {
    id: 5,
    value: "Cute",
  },
  {
    id: 6,
    value: "jk",
  },
  {
    id: 7,
    value: "good luck",
  },
  {
    id: 8,
    value: "good",
  },
  {
    id: 9,
    value: "bad",
  },
  {
    id: 10,
    value: "high five",
  },
  {
    id: 11,
    value: "nervous",
  },
  {
    id: 12,
    value: "duh",
  },
  {
    id: 13,
    value: "aww",
  },
  {
    id: 14,
    value: "scared",
  },
  {
    id: 15,
    value: "bored",
  },
  {
    id: 16,
    value: "happy",
  },
  {
    id: 17,
    value: "sigh",
  },
  {
    id: 18,
    value: "kiss",
  },
  {
    id: 19,
    value: "cry",
  },
  {
    id: 20,
    value: "angry",
  },
  {
    id: 21,
    value: "good night",
  },
  {
    id: 22,
    value: "good morning",
  },
  {
    id: 23,
    value: "good evening",
  },
  {
    id: 24,
    value: "good afternoon",
  },
  {
    id: 25,
    value: "confused",
  },
  {
    id: 26,
    value: "thinking",
  },
  {
    id: 27,
    value: "congrats",
  },
  {
    id: 28,
    value: "yay",
  },
  {
    id: 29,
    value: "love",
  },
  {
    id: 30,
    value: "haha",
  },
  {
    id: 31,
    value: "yes",
  },
  {
    id: 32,
    value: "no",
  },
  {
    id: 33,
    value: "ok",
  },
  {
    id: 34,
    value: "bye",
  },
  {
    id: 35,
    value: "lol",
  },
  {
    id: 36,
    value: "excited",
  },
  {
    id: 37,
    value: "sorry",
  },
  {
    id: 38,
    value: "sleepy",
  },
  {
    id: 39,
    value: "hello",
  },
  {
    id: 40,
    value: "welcome",
  },
  {
    id: 41,
    value: "hugs",
  },
  {
    id: 42,
    value: "please",
  },
  {
    id: 43,
    value: "thank you",
  },
  {
    id: 44,
    value: "thumbs up",
  },
  {
    id: 45,
    value: "thumbs down",
  },
  {
    id: 46,
    value: "punch",
  },
  {
    id: 47,
    value: "miss you",
  },
  {
    id: 48,
    value: "wink",
  },
  {
    id: 49,
    value: "whatever",
  },
  {
    id: 50,
    value: "dance",
  },
  {
    id: 51,
    value: "hungry",
  },
];

function CarouselGif({ query }) {
  const fetchGifs = (offset) => giphyFetch.search(query, { offset, limit: 10 });
  return <Carousel fetchGifs={fetchGifs} gifHeight={200} gutter={6} />;
}

function GridGif({ query }) {
  const fetchGifs = async (offset) => {
    const result = await giphyFetch.trending({ offset, limit: 10 });
    if (offset === 0) {
      const [firstGif] = result.data;
      firstGif.bottle_data = {
        // fake an ad, this should have moat
        tid: query,
      };
    }
    return result;
  };
  return <Grid fetchGifs={fetchGifs} width={340} columns={2} gutter={6} />;
}

export default function Editor() {
  const ref = useRef(null);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [visible, setVisible] = useState(false);
  const aRef = useClickOutside(() => setVisible(false));
  const [value, setValue] = useState("");
  const [mardownText, setMarkdownText] = useState("");
  const [checked, setChecked] = useState(false);
  // useEffect(() => {
  //   const markdownOptions = {
  //      ignoreTags: [ 'pre', 'p'],
  //   }
  //   new QuillMarkdown(ref.current.editor,markdownOptions);
  // }, []);
  const handleChange = useCallback((content, delta, source, editor) => {
    console.log(editor.getText());
    setValue(content);
    setMarkdownText(editor.getText());
  }, []);
  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      fixMentionsToQuill: true,
      mentionDenotationChars: ["@", "#", "/"],
      mentionContainerClass:
        "ql-mention-list-container max-h-80 overflow-y-scroll p-2",
      listItemClass: "ql-mention-list-item rounded-lg",
      renderItem: (item, searchTerm) => {
        return `<div class="flex justify-between items-center">
            <div class="font-medium text-sm flex font-effect-fire">/${item.value}
              <div class="options flex rounded-md items-center ml-2 text-xs font-normal text-white" style="background: #fab005;padding: 3px 5px">${item.options}</div>
            </div>
            <div class="text-xs font-medium" style="color: rgb(79, 86, 96)">${item.description}</div>
          </div>`;
      },
      // renderLoading: () => {
      //   return `<div class="bg-black">Loading...</div>`;
      // },
      source: (searchTerm, renderList, mentionChar) => {
        const list =
          mentionChar === "@" ? people : mentionChar === "#" ? tags : slashes;
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(includesSearchTerm);
        // window.setTimeout(() => {
        //   renderList(includesSearchTerm);
        // }, 1000);
      },
    }),
    []
  );

  return <div className="flex flex-col"></div>;

  return (
    <>
      {/* <CarouselGif query={value} key={value}/> */}
      <Group
        ref={setReferenceElement}
        className="flex w-6/12 h-auto bg-white rounded-lg "
      >
        <Menu
          radius="md"
          opened={openedMenu}
          styles={{ root: { maxWidth: "100% !important", width: "100%" } }}
          onClose={() => setOpenedMenu(false)}
          control={
            <div className="flex w-full h-auto items-center">
              <ActionIcon
                radius="xl"
                size="md"
                className="ml-4 mr-1"
                onClick={() => setOpenedMenu((v) => !v)}
              >
                <IconPlusCircle size="extra-large" />
              </ActionIcon>
              {!checked ? (
                <RichTextEditor
                  ref={ref}
                  value={value}
                  onChange={handleChange}
                  radius={0}
                  className="border-none flex-1"
                  styles={{ toolbar: { display: "none" } }}
                  placeholder="abc"
                  mentions={mentions}
                />
              ) : (
                <ReactMarkdown
                  className="markdown-editor border-none flex-1 mx-4 my-3 text-sm"
                  rehypePlugins={[rehypeRaw]}
                  // skipHtml={true}
                  children={mardownText}
                />
              )}
              <Group spacing="xs">
                <Switch
                  checked={checked}
                  onChange={(event) => setChecked(event.currentTarget.checked)}
                />
                <ActionIcon radius="md" size="md">
                  <IconMicrophone />
                </ActionIcon>
                <ActionIcon radius="md" size="md">
                  <BsBarChartFill size={16} />
                </ActionIcon>
                <ActionIcon
                  radius="md"
                  size="md"
                  onClick={() => setVisible((m) => !m)}
                >
                  <MdGif size={24} />
                </ActionIcon>
                <ActionIcon radius="md" size="md">
                  <BiSticker size={16} />
                </ActionIcon>
              </Group>
            </div>
          }
        >
          <Menu.Label>Shortcuts</Menu.Label>
          <Menu.Item>Create a Post</Menu.Item>
          <Menu.Item>Create Thread</Menu.Item>
          <Menu.Item>Use Slash Command</Menu.Item>
          <Divider />
          <Menu.Label>Attach</Menu.Label>
          <Menu.Item>Recent files</Menu.Item>
          <Menu.Item>Format</Menu.Item>
        </Menu>
      </Group>
      <Popper
        position="top"
        placement="end"
        mounted={visible}
        withinPortal={false}
        referenceElement={referenceElement}
        transition="pop-top-right"
        transitionDuration={200}
      >
        <Paper
          ref={aRef}
          radius="md"
          className="w-96 pointer-events-auto overflow-hidden"
          padding="md"
          style={{
            backgroundColor: "white",
          }}
        >
          <Group grow direction="column">
            <TextInput placeholder="Search" />
            <SimpleGrid
              cols={1}
              className="max-h-72 overflow-y-scroll overflow-x-hidden"
            >
              {/* {gifsGallery &&
                gifsGallery.map((gif, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-yellow-500 flex justify-center items-center text-base font-normal text-white h-32 cursor-pointer hover:underline"
                  >
                    {gif.value}
                  </div>
                ))} */}
              {/* <GridGif query="dog" /> */}
            </SimpleGrid>
          </Group>
        </Paper>
      </Popper>
    </>
  );
}
