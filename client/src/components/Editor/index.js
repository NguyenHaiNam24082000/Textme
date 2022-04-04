import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CompositeDecorator,
  convertFromRaw,
  convertToRaw,
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
} from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import editorStyles from "./index.css";
import mentionsStyles from "./MentionsStyles.module.css";
import mentions from "./Mentions";
import "./index.css";
import {
  ActionIcon,
  Group,
  Button,
  Switch,
  Highlight,
  Kbd,
  Tooltip,
  Menu,
  Popover,
  Badge,
  Avatar,
  Image,
  Center,
  CloseButton,
} from "@mantine/core";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import {
  IconCalendarClock,
  IconPlus,
  IconBold,
  IconItalic,
  IconUnderline,
  IconList,
  IconOrderedList,
  IconQuote,
  IconCode,
  IconTerminal,
  IconExpand,
  IconStrikeThrough,
  IconCalendar,
} from "@douyinfe/semi-icons";
import { BsMarkdown } from "react-icons/bs";
import { VscCaseSensitive } from "react-icons/vsc";
import { useHotkeys } from "@mantine/hooks";
import createMarkdownShortcutsPlugin from "draft-js-markdown-shortcuts-plugin";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import createEmojiPlugin from "@draft-js-plugins/emoji";
// import "draft-js/dist/Draft.css";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { SegmentedControl } from "@mantine/core";
import { Map } from "immutable";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import syntaxHighlightingStyles from "./syntaxHighlightingStyles";
import MapBox from "./MapBox";
import { useNotifications } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { Progress } from "@douyinfe/semi-ui";
import { useQueryClient } from "react-query";
import { sendMessage } from "../../apis/messages";
import getSocket from "../../apis/socket";
import { GetMe } from "../../store/userSlice";
import { CHANNEL_MESSAGES_KEY, OPEN_CHANNEL } from "../../configs/queryKeys";
import { CHANNEL_SOCKET } from "../../configs/socketRoute";
import { useSelector, useDispatch } from "react-redux";
import { repliesSelector } from "../../store/uiSlice";

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
  { label: "Line Height", style: "LINEHEIGHT" },
];

const blockRenderMap = Map({
  "unordered-list-item": { element: "li", wrapper: <ul /> },
  "ordered-list-item": { element: "li", wrapper: <ol /> },
  blockquote: { element: <blockquote className="" /> },
  atomic: { element: "figure" },
  // "code-block": { element: "span", wrapper: <CodeBlockWrapper /> },
  unstyled: { element: "p" },
});

const TRAILING_NEW_LINE = /\n$/;

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

const findCodeInlineStyleRanges = (contentBlock, callback, contentState) => {
  contentBlock.findStyleRanges(
    (character) => character.hasStyle("CODE"),
    callback
  );
};

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return <a href={url}>{props.children}</a>;
};

const Code = (props) => {
  console.log("CODE");
  return <code>{props.children}</code>;
};

function EntryMembers(props) {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line @typescript-eslint/no-unused-vars
    isFocused, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...parentProps
  } = props;
  const index = parentProps.id.split("-").slice(-1)[0];
  useHotkeys([
    [
      `ctrl+${index}`,
      () => {
        parentProps.onMouseEnter();
      },
    ],
  ]);
  return (
    <div
      {...parentProps}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className={theme?.mentionSuggestionsEntryContainer}>
        <div className={theme?.mentionSuggestionsEntryContainerLeft}>
          <img
            src={mention.avatar}
            className={theme?.mentionSuggestionsEntryAvatar}
            role="presentation"
          />
        </div>

        <div className={theme?.mentionSuggestionsEntryContainerRight}>
          <div className={theme?.mentionSuggestionsEntryText}>
            <Highlight highlight={searchValue}>{mention.name}</Highlight>
          </div>

          <div className={theme?.mentionSuggestionsEntryTitle}>
            {mention.title}
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: 10,
          color: "#a7a7a7",
        }}
      >
        Ctrl+{index}
      </div>
    </div>
  );
}

function EntryChannels(props) {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line @typescript-eslint/no-unused-vars
    isFocused, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <div className={theme?.mentionSuggestionsEntryContainer}>
        <div className={theme?.mentionSuggestionsEntryContainerRight}>
          <div className={theme?.mentionSuggestionsEntryText}>
            <Highlight highlight={searchValue}>{mention.name}</Highlight>
          </div>
          {/* 
          <div className={theme?.mentionSuggestionsEntryTitle}>
            {mention.title}
          </div> */}
        </div>
      </div>
    </div>
  );
}

const decorator = new CompositeDecorator([
  { strategy: findLinkEntities, component: Link },
  { strategy: findCodeInlineStyleRanges, component: Code },
]);

export default function EditorDraft({ channel, user }) {
  const me = GetMe();
  const ref = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty("")
  );
  const cache = useQueryClient();
  const [openStaticToolbar, setOpenStaticToolbar] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const [openChannels, setOpenChannels] = useState(false);
  const [openSlash, setOpenSlash] = useState(false);
  const [suggestionsMembers, setSuggestionsMembers] = useState(mentions["@"]);
  const [suggestionsChannels, setSuggestionsChannels] = useState(
    mentions["in:"]
  );
  const replies = useSelector(repliesSelector);
  const [suggestionsSlash, setSuggestionsSlash] = useState(mentions["/"]);
  const [openedShareLocation, setOpenedShareLocation] = useState(false);
  const [openedEditor, setOpenedEditor] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [isTyping, setTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const notifications = useNotifications();
  const [selectedId, setSelectedId] = useState(null);

  // connect to socket on component mount.
  useEffect(() => {
    const newSocket = getSocket(me?.tokens?.access?.token);
    setSocket(newSocket);
  }, [setSocket, me?.tokens?.access?.token]);

  useHotkeys([
    // ["R", () => setOpenedEditor(true)],
    ["ctrl+R", () => setOpenedEditor(true)],
  ]);
  const handleSendMessage = async () => {
    if (!editorState.getCurrentContent().hasText()) return;
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const markdownString = draftToMarkdown(rawContent);
    const data = new FormData();
    data.append("channelId", channel._id);
    data.append("content", markdownString);

    try {
      const result = await sendMessage(data);
      socket.emit(CHANNEL_SOCKET.CHANNEL_SEND_MESSAGE, {
        msg: result?.data,
        receiverId: channel._id,
      });
      setEditorState(EditorState.createEmpty(""));
      cache.invalidateQueries(OPEN_CHANNEL);
      cache.setQueryData(CHANNEL_MESSAGES_KEY(channel._id), (d) => {
        if (d?.pages[0]?.results[0]?.id !== result?.data?.id) {
          d?.pages[0]?.results.unshift(result?.data);
        }

        return d;
      });
    } catch (err) {
      console.log(err);
    }
  };

  // async function handleInputSubmit(e) {
  //   if (e.key === 'Enter') {
  //     if (editorState.isEmpty()) return
  //     socket.emit('stopTyping', channel._id)
  //     // setSubmitting(true)
  //     // setTyping(false)

  //     const data = new FormData()
  //     data.append('channelId', channel._id)
  //     data.append('text', text.trim())

  //     try {
  //       const result = await sendMessage(data)
  //       socket.emit(ROOM_SOCKET.ROOM_SEND_MESSAGE, {
  //         msg: result?.data,
  //         receiverId: friendObject(
  //           user,
  //           room,
  //           'sender.id',
  //           'sender',
  //           'receiver'
  //         ).id,
  //       })

  //       setText('')
  //       setSubmitting(false)
  //       inputRef?.current?.focus()

  //       // populate actual sender object
  //       result.data.senderId = me?.user

  //       cache.setQueryData(ROOM_MESSAGES_KEY(room.id), (d) => {
  //         if (d?.pages[0]?.results[0]?.id !== result?.data?.id) {
  //           d?.pages[0]?.results.unshift(result?.data)
  //         }

  //         return d
  //       })
  //     } catch (e) {
  //       console.log('e: ', e)
  //       setText('')
  //       setSubmitting(false)
  //     }
  //   }
  // }

  const images = [
    {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://pagepro.co/blog/wp-content/uploads/2020/03/framercover.png",
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
  ];

  useEffect(() => {
    const elements = document.querySelectorAll('[data-contents="true"]');

    elements.forEach((element) => element.classList.add("markdown"));
    handleMarkdownEditorChange(markdown);

    // const notificationsInterval = setInterval(() => {
    //   notifications.showNotification({
    //     title: `Notification 1`,
    //     message: "Most notifications are added to queue",
    //     autoClose: 10000,
    //     icon: <FontAwesomeIcon icon="fa-solid fa-exclamation" />,
    //     color: "red",
    //   });
    //   console.log("Notification 1");
    // }, 5000);

    // const a = setTimeout(() => {
    //   clearInterval(notificationsInterval);
    // }, 30000);

    // return () => {
    //   clearTimeout(a);
    // };
  }, []);

  const handleRichTextEditorChange = (newEditorState) => {
    // Convert input from draftjs state to markdown
    const rawEditorState = convertToRaw(newEditorState.getCurrentContent());
    // console.log(rawEditorState);
    const newMarkdown = draftToMarkdown(
      rawEditorState
      // {
      //   styleItems: {
      //     admonition: {
      //       open: (block) => `:::${block.data.type || ""}\n`,
      //       close: () => "\n:::"
      //     }
      //   },
      //   entityItems: {
      //     mention: {
      //       open: (entity) =>
      //         `<span class="mention-item" data-user-id="${entity.data.id}">`,
      //       close: () => `</span>`
      //     }
      //   }
      // }
    );
    // const decoratedEditorState = EditorState.set(newEditorState, { decorator });

    setEditorState(newEditorState);
    setMarkdown(
      // formatMarkdown(
      newMarkdown
      // )
    );
  };

  const renderMarkButton = (label, type, icon) => {
    const isActive = false;
    const newEditorState = RichUtils.toggleInlineStyle(editorState, type);
    return (
      <Tooltip label={label}>
        <ActionIcon
          variant={`${isActive ? "outline" : "hover"}`}
          onClick={() => {
            setEditorState(newEditorState);
            handleRichTextEditorChange(newEditorState);
          }}
        >
          {icon}
        </ActionIcon>
      </Tooltip>
    );
  };

  const renderBlockButton = (label, type, icon) => {
    let isActive = false;
    const newEditorState = RichUtils.toggleBlockType(editorState, type);

    return (
      <Tooltip label={label}>
        <ActionIcon
          variant={`${isActive ? "outline" : "hover"}`}
          onClick={() => {
            setEditorState(newEditorState);
            handleRichTextEditorChange(newEditorState);
          }}
        >
          {icon}
        </ActionIcon>
      </Tooltip>
    );
  };

  const handleMarkdownEditorChange = (newMarkdown) => {
    // Convert input from markdown to draftjs state
    const rawData = markdownToDraft(newMarkdown, {
      // remarkableOptions: {
      //   enable: {
      //     block: "table"
      //   }
      // },
      blockTypes: {
        admonition: (item) => ({
          type: "admonition",
          data: { type: item.params || "" },
          // remarkable seems to always append an erronious trailing newline to its codeblock content, so we need to trim it out.
          text: (item.content || "").replace(TRAILING_NEW_LINE, ""),
          entityRanges: [],
          inlineStyleRanges: [],
        }),
      },
    });
    const editorStateContent = convertFromRaw(rawData);
    const newEditorState = EditorState.createWithContent(editorStateContent);
    // const decoratedEditorState = EditorState.set(newEditorState, { decorator });

    setEditorState(newEditorState);

    console.log(rawData);

    setMarkdown(
      // formatMarkdown(
      newMarkdown
      // )
    );
  };

  const {
    MentionMembersSuggestions,
    MentionChannelsSuggestions,
    MentionSlashSuggestions,
    InlineToolbar,
    EmojiSuggestions,
    plugins,
  } = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const hashtagPlugin = createHashtagPlugin();
    const markdownShortcutsPlugin = createMarkdownShortcutsPlugin();
    const emojiPlugin = createEmojiPlugin();
    const mentionMembersPlugin = createMentionPlugin({
      entityMutability: "IMMUTABLE",
      theme: mentionsStyles,
      mentionPrefix: "@",
      supportWhitespace: true,
      mentionTrigger: "@",
      mentionComponent: ({ entityKey, mention, className, decoratedText }) => (
        <Badge
          sx={{ paddingLeft: 0 }}
          className="normal-case select-none"
          size="lg"
          radius="xl"
          color="teal"
          leftSection={
            <Avatar
              alt="Avatar for badge"
              size={24}
              mr={5}
              radius="xl"
              src="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
            />
          }
        >
          <span>{decoratedText}</span>
        </Badge>
      ),
    });
    const mentionChanelsPlugin = createMentionPlugin({
      entityMutability: "IMMUTABLE",
      theme: mentionsStyles,
      mentionPrefix: "#",
      supportWhitespace: true,
      mentionTrigger: "in:",
      // mentionComponent: ({ entityKey, mention, className, decoratedText }) => (
      //   <div className="bg-slate-300">{decoratedText}</div>
      // ),
    });
    const mentionSlashPlugin = createMentionPlugin({
      entityMutability: "IMMUTABLE",
      theme: mentionsStyles,
      mentionPrefix: "/",
      supportWhitespace: true,
      mentionTrigger: "/",
      // mentionComponent: ({ entityKey, mention, className, decoratedText }) => (
      //   <div className="bg-slate-300">{decoratedText}</div>
      // ),
    });
    // eslint-disable-next-line no-shadow
    const MentionMembersSuggestions = mentionMembersPlugin.MentionSuggestions;
    const MentionChannelsSuggestions = mentionChanelsPlugin.MentionSuggestions;
    const MentionSlashSuggestions = mentionSlashPlugin.MentionSuggestions;
    const InlineToolbar = inlineToolbarPlugin.InlineToolbar;
    const EmojiSuggestions = emojiPlugin.EmojiSuggestions;
    // eslint-disable-next-line no-shadow
    const plugins = [
      mentionChanelsPlugin,
      hashtagPlugin,
      mentionSlashPlugin,
      mentionMembersPlugin,
      markdownShortcutsPlugin,
      inlineToolbarPlugin,
      EmojiSuggestions,
    ];
    return {
      plugins,
      MentionMembersSuggestions,
      MentionChannelsSuggestions,
      MentionSlashSuggestions,
      InlineToolbar,
      EmojiSuggestions,
    };
  }, []);

  const onChange = useCallback((_editorState) => {
    const contentState = _editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const markdown = draftToMarkdown(rawContent);
    console.log(markdown);
    setEditorState(_editorState);
  }, []);
  const onOpenMembersChange = useCallback((_open) => {
    setOpenMembers(_open);
  }, []);
  const onOpenChannelsChange = useCallback((_open) => {
    setOpenChannels(_open);
  }, []);
  const onSearchChangeMembers = useCallback(({ trigger, value }) => {
    setSuggestionsMembers(defaultSuggestionsFilter(value, mentions, trigger));
  }, []);
  const onSearchChangeChannels = useCallback(({ trigger, value }) => {
    setSuggestionsChannels(defaultSuggestionsFilter(value, mentions, trigger));
  }, []);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleRichTextEditorChange(newState);

      return "handled";
    }

    return "not-handled";
  };

  return (
    <div className="mx-4 relative flex-shrink-0 truncate overflow-ellipsis">
      {replies.map((reply) => (
        <div
          className="flex h-8 px-3 select-none items-center bg-slate-300"
          style={{
            animation:
              "340ms cubic-bezier(0.2, 0.9, 0.5, 1.16) 0s 1 normal forwards running bottomBounce",
          }}
        >
          <div className="gap-2 flex flex-auto min-w-0 items-center">
            <FontAwesomeIcon
              icon="fa-solid fa-reply"
              className="-scale-x-[1]"
            />
            <div className="flex gap-1 items-center truncate overflow-ellipsis">
              <div className="self-center flex-shrink-0 whitespace-nowrap truncate overflow-ellipsis overflow-hidden font-medium text-sm">
                Replying to
              </div>
              <Badge
                sx={{ paddingLeft: 0 }}
                className="normal-case"
                radius="xl"
                color="teal"
                leftSection={
                  <Avatar
                    alt="Avatar for badge"
                    size="xs"
                    radius="xl"
                    src="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
                  />
                }
              >
                Badge with Avatar
              </Badge>
              <div className="truncate overflow-ellipsis">
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </div>
            </div>
          </div>
          <CloseButton size="xs" radius="xl" />
        </div>
      ))}

      {/* <div className="flex overflow-x-auto pt-5 pb-1 px-3">
        <div className="flex w-fit gap-6">
          <AnimateSharedLayout type="crossfade">
            {images.map((img, index) => (
              <div
                key={index}
                className="flex flex-col w-52 truncate overflow-ellipsis text-center"
              >
                <div
                  onClick={() => {
                    setSelectedId(index);
                    console.log(index);
                  }}
                  style={{ border: "2px solid red" }}
                  className="upload-image overflow-hidden relative w-52 h-52 p-2 rounded-md cursor-pointer bg-slate-300 flex justify-center items-center"
                >
                  <motion.img
                    className="w-full h-auto rounded"
                    layoutId={img.id}
                    src={img.url}
                  />
                  <Center className="absolute inset-0">
                    <Progress
                      percent={50}
                      type="circle"
                      showInfo
                      format={(per) => per + "%"}
                      style={{ margin: 5 }}
                      strokeWidth={8}
                      aria-label="Upload progress"
                    />
                  </Center>
                  <div className="flex absolute bottom-2 right-2 gap-2">
                    <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" className="w-5 h-5" style={{color:"red"}}/>
                  </div>
                  <div className="flex absolute top-2 right-2 gap-2">
                    <ActionIcon variant="light">
                      <FontAwesomeIcon icon="fa-solid fa-eye" />
                      {/* <FontAwesomeIcon icon="fa-solid fa-eye-slash" /> */}
      {/* </ActionIcon>
                    <ActionIcon variant="light">
                      <FontAwesomeIcon icon="fa-solid fa-pen" />
                    </ActionIcon>
                    <ActionIcon variant="light" color="red">
                      <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                    </ActionIcon>
                  </div>
                </div>

                <span className="text-xs font-medium truncate overflow-ellipsis">
                  YeuDuongKhoQuaThiChayVeKhocVoiAnh-ERIK-7128950.mp3
                </span>
                <span
                  className="truncate overflow-ellipsis"
                  style={{ fontSize: 10 }}
                >
                  50.5 MB
                </span>
              </div> */}

      {/* <div className="flex flex-col w-24 truncate overflow-ellipsis text-center">
              //   <Image
              //     radius="sm"
              //     width={96}
              //     height={96}
              //     src={null}
              //     className="cursor-pointer"
              //     style={{ border: "2px solid rgba(255,255,255,0.8)" }}
              //     alt="Click to upload"
              //     withPlaceholder
              //   />
              //   <span className="text-xs truncate overflow-ellipsis">
              //     Click to upload
              //   </span>
              //   <span className="truncate overflow-ellipsis" style={{ fontSize: 10 }}>
              //     max 5 MB
              //   </span>
              // </div> */}

      {/* //       ))}
      //       <AnimatePresence>
      //         {selectedId !== null && (
      //           <div className="fixed inset-0 z-50">
      //             <motion.div
      //               initial={{ opacity: 0 }}
      //               animate={{ opacity: 0.6 }}
      //               exit={{ opacity: 0 }}
      //               key="overlay"
      //               className="overlay inset-0 z-50"
      //               style={{
      //                 backgroundImage: `url(${images[selectedId].url})`,
      //                 backgroundSize: "100% 100%",
      //                 backgroundPosition: "50%",
      //                 backgroundRepeat: "no-repeat",
      //                 filter: "blur(7px) brightness(.7)",
      //               }}
      //               onClick={() => setSelectedId(null)}
      //             />
      //             <div
      //               className="single-image-container"
      //               // onClick={() => setSelectedId(null)}
      //             >
      //               <motion.img
      //                 key="image"
      //                 index={images[selectedId].id}
      //                 className="single-image"
      //                 layoutId={images[selectedId].id}
      //                 src={images[selectedId].url}
      //               />
      //             </div>
      //           </div>
      //         )}
      //       </AnimatePresence>
      //     </AnimateSharedLayout>
        </div>
      // </div> */}
      {openedEditor ? (
        <>
          {/* <Popover
            opened={true}
            position="top"
            placement="start"
            spacing={0}
            radius="md"
            // onClose={() => setOpened(false)}
            className="w-full overflow-hidden"
            target={ */}
          {openedShareLocation && (
            <MapBox
              setOpenedShareLocation={() => setOpenedShareLocation(false)}
            />
          )}
          <div
            style={{
              border: "2px solid #e5e7eb",
              borderRadius: 6,
              padding: 8,
              backgroundColor: "#f3f4f6",
            }}
          >
            {openStaticToolbar && (
              <Group
                position="apart"
                style={{
                  marginBottom: 4,
                }}
              >
                <Group spacing="xs">
                  <Group spacing={0}>
                    {renderMarkButton("Bold", "BOLD", <IconBold />)}
                    {renderMarkButton("Italic", "ITALIC", <IconItalic />)}
                    {renderMarkButton(
                      "Underline",
                      "UNDERLINE",
                      <IconUnderline />
                    )}
                    {renderMarkButton(
                      "Strikethrough",
                      "STRIKETHROUGH",
                      <IconStrikeThrough />
                    )}
                    {/* <ActionIcon>
                      <IconBold />
                    </ActionIcon>
                    <ActionIcon>
                      <IconItalic />
                    </ActionIcon> */}
                    {/* <ActionIcon>
                      <IconUnderline />
                    </ActionIcon> */}
                  </Group>
                  <Group spacing={0}>
                    {renderBlockButton(
                      "Bulleted List",
                      "unordered-list-item",
                      <IconList />
                    )}
                    {renderBlockButton(
                      "Numbered List",
                      "ordered-list-item",
                      <IconOrderedList />
                    )}
                    {/* <ActionIcon>
                      <IconList />
                    </ActionIcon>
                    <ActionIcon>
                      <IconOrderedList />
                    </ActionIcon> */}
                  </Group>
                  <Group spacing={0}>
                    {renderBlockButton(
                      "Block Quote",
                      "blockquote",
                      <IconQuote />
                    )}
                    {/* <ActionIcon>
                      <IconQuote />
                    </ActionIcon> */}
                    <ActionIcon>
                      <IconCode />
                    </ActionIcon>
                    <ActionIcon>
                      <IconTerminal />
                    </ActionIcon>
                  </Group>
                </Group>
                <Group spacing="xs">
                  <ActionIcon>
                    <IconExpand />
                  </ActionIcon>
                </Group>
              </Group>
            )}
            <div
              className="editor"
              onClick={() => {
                ref.current?.focus();
              }}
            >
              <Editor
                editorKey={"editor"}
                editorState={editorState}
                onChange={(state) => handleRichTextEditorChange(state)}
                placeholder="test"
                plugins={plugins}
                handleKeyCommand={handleKeyCommand}
                blockRenderMap={blockRenderMap}
                keyBindingFn={(e) => {
                  if (e.keyCode === 13) {
                    return false;
                  }
                  return getDefaultKeyBinding(e);
                }}
                ref={ref}
              />
              <EmojiSuggestions />
              {!openStaticToolbar && <InlineToolbar />}
              <MentionMembersSuggestions
                open={openMembers}
                onOpenChange={onOpenMembersChange}
                suggestions={suggestionsMembers}
                onSearchChange={onSearchChangeMembers}
                onAddMention={(entry) => {
                  // get the mention object selected
                  console.log(entry);
                }}
                entryComponent={EntryMembers}
                popoverContainer={({ children }) => (
                  <div
                    className="bg-white z-50"
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: "calc(100% + 8px)",
                      cursor: "pointer",
                      border: "1px solid #d5d5d5",
                      borderRadius: 6,
                      padding: 8,
                    }}
                  >
                    {children}
                  </div>
                )}
              />
              <MentionChannelsSuggestions
                open={openChannels}
                onOpenChange={onOpenChannelsChange}
                suggestions={suggestionsChannels}
                onSearchChange={onSearchChangeChannels}
                onAddMention={() => {
                  // get the mention object selected
                }}
                entryComponent={EntryChannels}
                popoverContainer={({ children }) => (
                  <div
                    className="bg-white z-50 shadow-md"
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: "calc(100% + 8px)",
                      cursor: "pointer",
                      border: "1px solid #d5d5d5",
                      borderRadius: 8,
                      padding: 8,
                    }}
                  >
                    {children}
                  </div>
                )}
              />
              {/* <MentionSlashSuggestions
                open={openChannels}
                onOpenChange={onOpenChannelsChange}
                suggestions={suggestionsChannels}
                onSearchChange={onSearchChangeChannels}
                onAddMention={() => {
                  // get the mention object selected
                }}
                entryComponent={EntryChannels}
                popoverContainer={({ children }) => (
                  <div
                    className="bg-white z-50 shadow-md"
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: "calc(100% + 8px)",
                      cursor: "pointer",
                      border: "1px solid #d5d5d5",
                      borderRadius: 8,
                      padding: 8,
                    }}
                  >
                    {children}
                  </div>
                )}
              /> */}
            </div>
            <Group
              position="apart"
              style={{
                marginTop: 4,
              }}
            >
              <Group spacing={0}>
                <Menu
                  control={
                    <ActionIcon>
                      <FontAwesomeIcon icon="fa-solid fa-bolt" />
                    </ActionIcon>
                  }
                >
                  <Menu.Item
                    icon={<FontAwesomeIcon icon="fa-solid fa-photo-film" />}
                  >
                    Send photo
                  </Menu.Item>
                  <Menu.Item icon={<FontAwesomeIcon icon="fa-solid fa-file" />}>
                    Attach File
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                    }
                  >
                    Priority Message
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <FontAwesomeIcon icon="fa-solid fa-map-location-dot" />
                    }
                    onClick={() => setOpenedShareLocation(!openedShareLocation)}
                  >
                    Location
                  </Menu.Item>
                  <Menu.Item
                    icon={<FontAwesomeIcon icon="fa-solid fa-microphone" />}
                  >
                    Voice
                  </Menu.Item>
                  <Menu.Item
                    icon={<FontAwesomeIcon icon="fa-solid fa-video" />}
                  >
                    Video
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <FontAwesomeIcon icon="fa-solid fa-square-poll-vertical" />
                    }
                  >
                    Create Polls
                  </Menu.Item>
                </Menu>
                <div
                  style={{
                    width: 1,
                    height: 20,
                    background: "black !important",
                  }}
                ></div>
                <ActionIcon onClick={() => setOpenStaticToolbar((v) => !v)}>
                  <VscCaseSensitive size={20} />
                </ActionIcon>
                <ActionIcon>
                  <BsMarkdown size={20} />
                </ActionIcon>
              </Group>
              <Group spacing="xs">
                <Button
                  variant="subtle"
                  size="xs"
                  color="gray"
                  onClick={() => setOpenedEditor(false)}
                >
                  Discard
                </Button>
                <Group
                  spacing={0}
                  style={{
                    background: "#fafafa",
                    borderRadius: 4,
                  }}
                >
                  <Button
                    variant="subtle"
                    size="xs"
                    color="gray"
                    onClick={() => handleSendMessage()}
                  >
                    Send now
                  </Button>
                  <div
                    style={{
                      width: 1,
                      height: 20,
                      background: "black !important",
                    }}
                  ></div>
                  <ActionIcon size={30}>
                    <IconCalendarClock />
                  </ActionIcon>
                </Group>
              </Group>
            </Group>
          </div>
          {/* } */}
          {/* >
            {/* <div style={{ display: "flex" }}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </div> */}
          {/* </Popover> */}
          <div
            className="flex w-full h-6 justify-end items-center pl-3 pr-2 gap-3"
            style={{
              fontSize: 10,
            }}
          >
            <div>
              <span className="font-semibold">Enter</span> to send
            </div>
            <div>
              <span className="font-semibold">Shift + Enter</span> to add a new
              line
            </div>
          </div>
        </>
      ) : (
        <div
          className="mb-6 flex w-full overflow-ellipsis truncate items-center justify-between cursor-pointer"
          style={{
            border: "2px solid #e5e7eb",
            backgroundColor: "#e5e7eb",
            borderRadius: 6,
            padding: 8,
          }}
          onClick={() => setOpenedEditor(true)}
        >
          <div className="text-gray-500 text-sm overflow-ellipsis truncate flex flex-1 gap-1">
            {/* Rely to #test */}
            <span style={{ color: "red" }}>Draft:</span>
            <span className="flex overflow-ellipsis truncate">
              aaaaaaaaaaaaaaaaaaaaaaaaaaa
            </span>
          </div>
          <div>
            <Kbd>Ctrl+R</Kbd>
          </div>
        </div>
      )}
    </div>
  );
}
