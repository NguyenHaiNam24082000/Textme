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
  ContentState,
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
  Text,
  Divider,
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
import { repliesSelector, replyMessages } from "../../store/uiSlice";
import { v4 as uuid } from "uuid";
import {
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  MS_EXCEL_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
  MIME_TYPES,
} from "@mantine/dropzone";
import IconGif from "../UI/IconGif";
import IconPdf from "../../assets/images/icons/files-PDF.svg";
import IconWord from "../../assets/images/icons/files-DOCX.svg";
import IconExcel from "../../assets/images/icons/files-XLS.svg";
import IconPowerpoint from "../../assets/images/icons/files-PPT.svg";
import IconMusic from "../../assets/images/icons/files-music.svg";
import IconVideo from "../../assets/images/icons/files-video.svg";
import IconZip from "../../assets/images/icons/files-zip.svg";
import IconPicture from "../../assets/images/icons/files-picture.svg";
import IconOther from "../../assets/images/icons/files-other.svg";
import * as nsfwjs from "nsfwjs";
import Giphy from "../Giphy";
import Sticker from "../Sticker";
import { Picker } from "emoji-mart";

const IconFile = ({ type }) => {
  if (PDF_MIME_TYPE.includes(type))
    return <Image width="auto" height="auto" src={IconPdf} />;
  else if (MS_WORD_MIME_TYPE.includes(type))
    return <Image width="auto" height="auto" src={IconWord} />;
  else if (MS_EXCEL_MIME_TYPE.includes(type))
    return <Image width="auto" height="auto" src={IconExcel} />;
  else if (MS_POWERPOINT_MIME_TYPE.includes(type))
    return <Image width="auto" height="auto" src={IconPowerpoint} />;
  else if (["audio/mpeg", "audio/mp3"].includes(type))
    return <Image width="auto" height="auto" src={IconMusic} />;
  else if (["video/mp4", "video/quicktime"].includes(type))
    return <Image width="auto" height="auto" src={IconVideo} />;
  else if (["application/zip", "application/x-zip-compressed"].includes(type))
    return <Image width="auto" height="auto" src={IconZip} />;
  else
    return (
      <div className="flex items-center justify-center relative">
        <Image width="auto" height="auto" src={IconOther} />
        {/* <div className="text-white font-medium text-2xl select-none absolute inset-0 w-full h-full flex justify-center items-center uppercase"
        style={{
          fontSize: "0.5vw",
        }}
      >
        {type.split("/")[1]}
      </div> */}
      </div>
    );
};

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
  console.log(searchValue, "aaaaaaa");
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
          {/* <img
            src={mention.avatar}
            className={theme?.mentionSuggestionsEntryAvatar}
            role="presentation"
          /> */}
        </div>

        <div className={theme?.mentionSuggestionsEntryContainerRight}>
          <div className={theme?.mentionSuggestionsEntryText}>
            <Highlight highlight={searchValue}>{mention.username}</Highlight>
          </div>

          <div className={theme?.mentionSuggestionsEntryTitle}>
            {/* {mention.title} */}
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

const handleFileChosen = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      // if (IMAGE_MIME_TYPE.includes(file.type)) {
      //   const image = new Image();
      //   image.src = data;
      //   image.onload = function () {
      //     console.log(this.width);
      //   };
      // }
      resolve(reader.result);
    };
    reader.onerror = reject;
    // if (IMAGE_MIME_TYPE.includes(file.type)) {
    reader.readAsDataURL(file);
    // } else {
    //   // reader.readAsArrayBuffer(file);
    //   reader.readAsText(file);
    // }
  });
};

const isShowEditor = (channel) => {
  console.log(channel.with_status);
  if (!channel.with_status) {
    return true;
  }
  if (
    channel.with_status === "BLOCKED_BY_SENDER" ||
    channel.with_status === "BLOCKED_BY_RECEIVER"
  ) {
    return false;
  }
  return true;
};

export default function EditorDraft({ channel, user, scrollToBottom }) {
  const me = GetMe();
  const ref = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty("")
  );
  const [openedEmojiPicker, setOpenedEmojiPicker] = useState(false);
  const cache = useQueryClient();
  const [openStaticToolbar, setOpenStaticToolbar] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const [openChannels, setOpenChannels] = useState(false);
  const [openSlash, setOpenSlash] = useState(false);
  const [suggestionsMembers, setSuggestionsMembers] = useState([]);
  const [suggestionsChannels, setSuggestionsChannels] = useState([]);
  const replies = useSelector(repliesSelector);
  const dispatch = useDispatch();
  const [suggestionsSlash, setSuggestionsSlash] = useState([]);
  const [openedShareLocation, setOpenedShareLocation] = useState(false);
  const [openedEditor, setOpenedEditor] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [isTyping, setTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const notifications = useNotifications();
  const [selectedId, setSelectedId] = useState(null);
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);
  const [indexFileReplace, setIndexFileReplace] = useState(-1);
  const [isMultiSelect, setIsMultiSelect] = useState(true);
  const [openedGif, setOpenedGif] = useState(false);
  const [openedSticker, setOpenedSticker] = useState(false);
  const [embed, setEmbed] = useState([]);
  const [mentions, setMentions] = useState([]);
  // const [isNSFW, setIsNSFW] = useState(false);
  useEffect(() => {
    if (channel && channel.members) {
      setMentions({ ...mentions, "@": channel.members });
      setSuggestionsMembers(channel.members);
    } else {
      setMentions({ ...mentions, "@": [] });
      setSuggestionsMembers([]);
    }
    console.log(channel.members);
  }, [channel]);
  console.log(mentions);
  useEffect(() => {
    if (embed.length > 0) {
      handleSendMessage();
    }
  }, [embed]);
  // useEffect(() => {
  //   if (images && images.length > 0) {
  //     const files = Promise.all(
  //       images.map(async (image, i) => {
  //         if (
  //           IMAGE_MIME_TYPE.includes(image.type) ||
  //           (image.name.match(/\.(?:jpeg|jpg|png|gif)$/i) &&
  //             image.nsfw === false)
  //         ) {
  //           const img = document.getElementById(`image-${image.id}`);
  //           if (img) {
  //             const model = await nsfwjs.load();
  //             const predictions = await model.classify(img, 1);
  //             return {
  //               ...image,
  //               watermark: predictions[0].className,
  //               nsfw: ["Hentai", "Sexy", "Porn"].includes(
  //                 predictions[0].className
  //               )
  //                 ? true
  //                 : image.nsfw,
  //             };
  //           }
  //           return image;
  //         }
  //         return image;
  //       })
  //     );
  //     files.then((files) => {
  //       const filesClone = [...files].sort((a, b) => a.createdAt - b.createdAt);
  //       const imagesClone = [...images].sort(
  //         (a, b) => a.createdAt - b.createdAt
  //       );
  //       if (JSON.stringify(filesClone) === JSON.stringify(imagesClone)) return;
  //       console.log(filesClone, "images");
  //       setImages(filesClone);
  //     });
  //   }
  // }, [images]);
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
    // if (!editorState.getCurrentContent().hasText() || images.length===0) return;
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const markdownString = draftToMarkdown(rawContent);
    const data = new FormData();
    const replyMsg =
      channel && replies[channel._id] && replies[channel._id].length
        ? replies[channel._id].map((reply) => reply.id)
        : [];

    const attachments =
      images?.map((image, index) => {
        return {
          id: index,
          filename: image.name,
          type: image.type,
          size: image.size,
          nsfw: image.nsfw,
        };
      }) || [];
    console.log(attachments);
    const files =
      images?.map((image) => {
        const base64 = image.url.split(";base64,");
        const byteCharacters = atob(base64[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: image.type });
        return blob;
      }) || [];
    data.append("channelId", channel._id);
    data.append("content", markdownString);
    data.append("replies", replyMsg);
    data.append("embed", JSON.stringify(embed[0]) || []);
    data.append("attachments", JSON.stringify(attachments));
    if (files.length > 0)
      files.map((file, index) => {
        data.append(`files[${index}]`, file);
      });
    // data.append("files", files);

    try {
      let result = null;
      if (images.length > 0) {
        const config = {
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted);
          },
          timeout: 20000,
        };
        result = await sendMessage(data, config);
      } else {
        result = await sendMessage(data);
      }
      // const result = await sendMessage(data);
      socket.emit(CHANNEL_SOCKET.CHANNEL_SEND_MESSAGE, {
        msg: result?.data,
        receiverId: channel._id,
      });
      setEditorState(EditorState.createEmpty(""));
      replies[channel._id] &&
        dispatch(
          replyMessages({
            id: channel._id,
            messages: [],
          })
        );
      setImages([]);
      setEmbed([]);
      cache.invalidateQueries(OPEN_CHANNEL);
      cache.setQueryData(CHANNEL_MESSAGES_KEY(channel._id), (d) => {
        if (d?.pages[0]?.results[0]?.id !== result?.data?.id) {
          d?.pages[0]?.results.unshift(result?.data);
        }

        return d;
      });
      scrollToBottom();
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

  // const images = [
  //   {
  //     albumId: 1,
  //     id: 1,
  //     title: "accusamus beatae ad facilis cum similique qui sunt",
  //     url: "https://pagepro.co/blog/wp-content/uploads/2020/03/framercover.png",
  //     thumbnailUrl: "https://via.placeholder.com/150/92c952",
  //   },
  // ];

  const handleRichTextEditorChange = (newEditorState) => {
    // Convert input from draftjs state to markdown
    const rawEditorState = convertToRaw(newEditorState.getCurrentContent());
    console.log(rawEditorState);
    const newMarkdown = draftToMarkdown(rawEditorState, {
      // styleItems: {
      //   admonition: {
      //     open: (block) => `:::${block.data.type || ""}\n`,
      //     close: () => "\n:::"
      //   }
      // },
      entityItems: {
        mention: {
          open: (entity) => `<@${entity.id}`,
          close: () => `>`,
        },
      },
    });
    // const decoratedEditorState = EditorState.set(newEditorState, { decorator });
    console.log(newMarkdown);
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
    plugins,
    MentionMembersSuggestions,
    MentionChannelsSuggestions,
    MentionSlashSuggestions,
    InlineToolbar,
    EmojiSuggestions,
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
      // mentionComponent: ({ entityKey, mention, className, decoratedText }) => (
      //   <Badge
      //     sx={{ paddingLeft: 0 }}
      //     className="normal-case select-none"
      //     size="lg"
      //     radius="xl"
      //     color="teal"
      //     leftSection={
      //       <Avatar
      //         alt="Avatar for badge"
      //         size={24}
      //         mr={5}
      //         radius="xl"
      //         src="https://yt3.ggpht.com/yti/APfAmoGyHvZbfLTnkvMzb7VBVVkkqJpD6HgoYUMO770U=s88-c-k-c0x00ffffff-no-rj-mo"
      //       />
      //     }
      //   >
      //     <span>{decoratedText}</span>
      //   </Badge>
      // ),
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
      mentionMembersPlugin,
      mentionChanelsPlugin,
      hashtagPlugin,
      mentionSlashPlugin,
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
    console.log(_open);
    setOpenMembers(_open);
  }, []);
  const onOpenChannelsChange = useCallback((_open) => {
    console.log(_open);
    setOpenChannels(_open);
  }, []);
  const onSearchChangeMembers = useCallback(({ trigger, value }) => {
    console.log(value, "mention search");
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
    <div className="mx-4 relative flex-shrink-0 overflow-ellipsis">
      {channel &&
        replies[channel._id] &&
        replies[channel._id].map((reply, index) => (
          <div
            key={reply.id}
            className="flex h-8 px-3 select-none items-center bg-slate-300 truncate overflow-ellipsis"
            style={{
              // borderRadius: `${replies.findIndex((r)=>r.id===reply.id)===0?"6px 6px":"0px 0px"} 0px 0px`,
              borderRadius: `${index === 0 ? "6px 6px" : "0px 0px"} 0px 0px`,
              animation:
                "340ms cubic-bezier(0.2, 0.9, 0.5, 1.16) 0s 1 normal forwards running bottomBounce",
            }}
          >
            <div className="gap-2 flex flex-auto min-w-0 items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-reply"
                className="-scale-x-[1]"
              />
              <div className="flex gap-1 items-center truncate overflow-ellipsis min-w-0">
                <div className="self-center flex-shrink-0 whitespace-nowrap truncate overflow-ellipsis overflow-hidden font-medium text-sm">
                  Replying to
                </div>
                <div
                  className="py-[2px] flex items-center gap-1 max-h-8 truncate"
                  style={{ flex: "1 1 0%" }}
                >
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
                    {reply.sender.username}
                  </Badge>
                  <div
                    className="truncate overflow-ellipsis max-h-7"
                    style={{ maxWidth: 320 }}
                  >
                    {reply.content}
                  </div>
                </div>
              </div>
            </div>
            <CloseButton
              size="xs"
              radius="xl"
              onClick={() => {
                // const index = replies[channel.id].indexOf(reply);
                const repliesClone = replies[channel._id].filter(
                  (r) => r.id !== reply.id
                );
                // const repliesClone= replies.splice(replies.indexOf(reply), 1);
                dispatch(
                  replyMessages({
                    id: channel._id,
                    messages: repliesClone,
                  })
                );
              }}
            />
          </div>
        ))}
      {/* // <div className="flex flex-col w-24 truncate overflow-ellipsis text-center">
                  //         //   <Image
                  //         //     radius="sm"
                  //         //     width={96}
                  //         //     height={96}
                  //         //     src={null}
                  //         //     className="cursor-pointer"
                  //         //     style={{ border: "2px solid rgba(255,255,255,0.8)" }}
                  //         //     alt="Click to upload"
                  //         //     withPlaceholder
                  //         //   />
                  //         //   <span className="text-xs truncate overflow-ellipsis">
                  //         //     Click to upload
                  //         //   </span>
                  //         //   <span className="truncate overflow-ellipsis" style={{ fontSize: 10 }}>
                  //         //     max 5 MB
                  //         //   </span>
                  //         // </div> */}
      <input
        ref={inputRef}
        accept="*"
        type="file"
        multiple={isMultiSelect}
        autoComplete="off"
        style={{ display: "none", pointerEvents: "none" }}
        onChange={async (e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            const results = await Promise.all(
              Array.from(files, async (file) => {
                const fileContents = await handleFileChosen(file);
                let result = null;
                if (isMultiSelect) {
                  result = {
                    id: uuid(),
                    url: fileContents,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    nsfw: false,
                    watermark: "Neutral",
                    createdAt: new Date(),
                  };
                } else {
                  result = {
                    id: images[indexFileReplace].id,
                    url: fileContents,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    watermark: file.watermark,
                    nsfw: images[indexFileReplace].nsfw,
                    createdAt: images[indexFileReplace].createdAt,
                  };
                }
                return result;
              })
            );
            if (isMultiSelect) {
              console.log(results);
              setImages([...images, ...results]);
            } else {
              setImages([
                ...images.filter(
                  (image) => image.id !== images[indexFileReplace].id
                ),
                ...results,
              ]);
            }
          }
        }}
      />
      {isShowEditor(channel) ? (
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
          <div
            style={{
              border: "2px solid #e5e7eb",
              borderRadius: `${
                channel && replies[channel._id] && replies[channel._id].length
                  ? "0px 0px"
                  : "6px 6px"
              } 6px 6px`,
              backgroundColor: "#e5e7eb",
              height: "auto",
            }}
          >
            {images.length > 0 && (
              <div
                className="flex overflow-x-auto py-2 px-3"
                style={{
                  borderBottom: "2px solid #e5e7eb",
                }}
              >
                <div className="flex w-fit gap-6 overflow-x-auto">
                  <AnimateSharedLayout type="crossfade">
                    {images
                      .sort((a, b) => a.createdAt - b.createdAt)
                      .map((img, index) => (
                        <>
                          <div
                            key={index}
                            className="group flex flex-col w-52 p-2 truncate overflow-ellipsis text-center bg-slate-300 rounded"
                          >
                            <div
                              onClick={() => {
                                if (img.type.includes("image")) {
                                  setSelectedId(index);
                                  console.log(index);
                                }
                              }}
                              // style={{ border: "2px solid red" }}
                              className="upload-image overflow-hidden relative w-48 h-48 cursor-pointer flex justify-center items-center"
                            >
                              {!img.type.includes("image") ? (
                                <IconFile type={img.type} />
                              ) : (
                                <motion.img
                                  className="w-full h-full rounded object-cover"
                                  layoutId={img.id}
                                  src={img.url}
                                  id={`image-${img.id}`}
                                  style={{
                                    filter: img.nsfw
                                      ? "blur(30px)"
                                      : "blur(0px)",
                                  }}
                                />
                              )}
                              {/* <Center className="absolute inset-0">
                    <Progress
                      percent={50}
                      type="circle"
                      showInfo
                      format={(per) => per + "%"}
                      style={{ margin: 5 }}
                      strokeWidth={8}
                      aria-label="Upload progress"
                    />
                  </Center> */}
                              {/* <div className="flex absolute bottom-2 right-2 gap-2">
                    <FontAwesomeIcon
                      icon="fa-solid fa-circle-exclamation"
                      className="w-5 h-5"
                      style={{ color: "red" }}
                    />
                  </div> */}
                              <div className="group-hover:visible invisible flex absolute top-2 right-2 gap-2">
                                <ActionIcon
                                  variant="light"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const imagesClone = [
                                      ...images.filter(
                                        (image) => image.id !== img.id
                                      ),
                                      {
                                        ...img,
                                        nsfw: !img.nsfw,
                                      },
                                    ].sort((a, b) => a.createdAt - b.createdAt);
                                    setImages(imagesClone);
                                  }}
                                >
                                  {img.nsfw ? (
                                    <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                                  ) : (
                                    <FontAwesomeIcon icon="fa-solid fa-eye" />
                                  )}
                                </ActionIcon>
                                <ActionIcon
                                  variant="light"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMultiSelect(false);
                                    setIndexFileReplace(index);
                                    inputRef.current.click();
                                  }}
                                >
                                  <FontAwesomeIcon icon="fa-solid fa-rotate" />
                                </ActionIcon>
                                <ActionIcon variant="light">
                                  <FontAwesomeIcon icon="fa-solid fa-pen" />
                                </ActionIcon>
                                <ActionIcon
                                  variant="light"
                                  color="red"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImages(
                                      images.filter(
                                        (image) => image.id !== img.id
                                      )
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                                </ActionIcon>
                              </div>
                            </div>

                            <span className="text-xs font-medium truncate overflow-ellipsis">
                              {img.name}
                            </span>
                            <span
                              className="truncate overflow-ellipsis"
                              style={{ fontSize: 10 }}
                            >
                              {`${img.size}`.length < 7
                                ? `${Math.round(+img.size / 1024).toFixed(
                                    2
                                  )} KB`
                                : `${Math.round(
                                    +img.size / 1024 / 1024
                                  ).toFixed(2)} MB`}
                            </span>
                          </div>
                          <AnimatePresence>
                            {selectedId !== null && (
                              <div className="fixed inset-0 z-50">
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 0.6 }}
                                  exit={{ opacity: 0 }}
                                  key="overlay"
                                  className="overlay inset-0 z-50"
                                  style={{
                                    backgroundImage: `url(${images[selectedId].url})`,
                                    backgroundSize: "100% 100%",
                                    backgroundPosition: "50%",
                                    backgroundRepeat: "no-repeat",
                                    filter: "blur(7px) brightness(.7)",
                                  }}
                                  onClick={() => setSelectedId(null)}
                                />
                                <div
                                  className="single-image-container"
                                  // onClick={() => setSelectedId(null)}
                                >
                                  <motion.img
                                    key="image"
                                    index={images[selectedId].id}
                                    className="single-image"
                                    style={{ height: "auto" }}
                                    layoutId={images[selectedId].id}
                                    src={images[selectedId].url}
                                  />
                                </div>
                              </div>
                            )}
                          </AnimatePresence>
                        </>
                      ))}
                  </AnimateSharedLayout>
                </div>
              </div>
            )}
            {openedShareLocation && (
              <MapBox
                setEmbed={setEmbed}
                setOpenedShareLocation={() => setOpenedShareLocation(false)}
              />
            )}
            {openStaticToolbar && (
              <Group
                spacing="xs"
                style={{
                  marginBottom: 4,
                }}
              >
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
                </Group>
                <Group spacing={0}>
                  {renderBlockButton(
                    "Block Quote",
                    "blockquote",
                    <IconQuote />
                  )}
                  <ActionIcon>
                    <IconCode />
                  </ActionIcon>
                  <ActionIcon>
                    <IconTerminal />
                  </ActionIcon>
                </Group>
              </Group>
            )}
            <div className="flex gap-1 items-center px-3 rounded-md flex-auto min-w-0 relative">
              <Menu
                control={
                  <ActionIcon size="sm" radius="xl" variant="filled">
                    <FontAwesomeIcon
                      icon="fa-solid fa-bolt"
                      className="text-xs"
                    />
                  </ActionIcon>
                }
              >
                <Menu.Item
                  icon={<FontAwesomeIcon icon="fa-solid fa-upload" />}
                  onClick={() => {
                    setIsMultiSelect(true);
                    inputRef.current.click();
                  }}
                >
                  Upload files
                </Menu.Item>
                {/* <Menu.Item
                  icon={
                    <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                  }
                >
                  Priority Message
                </Menu.Item> */}
                <Menu.Item
                  icon={<FontAwesomeIcon icon="fa-solid fa-map-location-dot" />}
                  onClick={() => setOpenedShareLocation(!openedShareLocation)}
                >
                  Location
                </Menu.Item>
                {/* <Menu.Item
                  icon={<FontAwesomeIcon icon="fa-solid fa-microphone" />}
                >
                  Voice
                </Menu.Item> */}
                {/* <Menu.Item icon={<FontAwesomeIcon icon="fa-solid fa-video" />}>
                  Video
                </Menu.Item> */}
                {/* <Menu.Item
                  icon={
                    <FontAwesomeIcon icon="fa-solid fa-square-poll-vertical" />
                  }
                >
                  Create Polls
                </Menu.Item> */}
              </Menu>
              <div
                className="editor flex-auto min-w-0"
                onClick={() => {
                  ref.current?.focus();
                }}
              >
                <Editor
                  editorKey={"editor"}
                  editorState={editorState}
                  onChange={(state) => handleRichTextEditorChange(state)}
                  placeholder={<span>Message</span>}
                  plugins={plugins}
                  handleKeyCommand={handleKeyCommand}
                  handlePastedFiles={async (files) => {
                    // const fileLength = im;
                    if (files && files.length) {
                      // const file = files[0];
                      const results = await Promise.all(
                        files.map(async (file) => {
                          const fileContents = await handleFileChosen(file);
                          return {
                            id: uuid(),
                            url: fileContents,
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            nsfw: false,
                            watermark: "Neutral",
                            createdAt: new Date(),
                          };
                        })
                      );
                      setImages([...images, ...results]);
                    }
                  }}
                  handlePastedText={(text, html) => {
                    console.log(text, html);
                  }}
                  blockRenderMap={blockRenderMap}
                  keyBindingFn={(e) => {
                    if (e.keyCode === 13) {
                      handleSendMessage();
                      return false;
                    }
                    return getDefaultKeyBinding(e);
                  }}
                  ref={ref}
                />
                <EmojiSuggestions />
                {/* {!openStaticToolbar && <InlineToolbar />} */}
                <MentionMembersSuggestions
                  open={openMembers}
                  // open={false}
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
                      className="bg-white z-[1000]"
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
                      <div>
                        <div className="overflow-x-hidden overflow-y-scroll max-h-[490px] relative">
                          {children}
                        </div>
                      </div>
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
                      className="bg-white z-[1000] shadow-md"
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
              <Group spacing="xs">
                <ActionIcon
                  variant="transparent"
                  onClick={() => setOpenStaticToolbar((v) => !v)}
                >
                  <VscCaseSensitive size={24} />
                </ActionIcon>
                <Popover
                  opened={openedEmojiPicker}
                  onClose={() => setOpenedEmojiPicker(false)}
                  target={
                    <ActionIcon
                      variant="transparent"
                      onClick={() => setOpenedEmojiPicker(!openedEmojiPicker)}
                    >
                      <span className="text-lg">😀</span>
                    </ActionIcon>
                  }
                  spacing={0}
                  placement="end"
                  width="100%"
                  position="bottom"
                >
                  <Picker
                  // set="all"
                  />
                </Popover>
                <Popover
                  opened={openedSticker}
                  onClose={() => setOpenedSticker(false)}
                  trapFocus={false}
                  placement="end"
                  spacing="sm"
                  width={425}
                  target={
                    <ActionIcon
                      variant="transparent"
                      onClick={() => setOpenedSticker((v) => !v)}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-note-sticky"
                        className="text-xl"
                      />
                    </ActionIcon>
                  }
                >
                  <Sticker />
                </Popover>
                <Popover
                  opened={openedGif}
                  onClose={() => setOpenedGif(false)}
                  trapFocus={false}
                  placement="end"
                  spacing="sm"
                  width={425}
                  target={
                    <ActionIcon
                      variant="transparent"
                      onClick={() => setOpenedGif((v) => !v)}
                    >
                      <IconGif className="w-6 h-6" />
                    </ActionIcon>
                  }
                >
                  {openedGif && <Giphy setEmbed={setEmbed} />}
                </Popover>
                <Group
                  spacing={0}
                  style={{
                    background: "#fafafa",
                    borderRadius: 4,
                  }}
                >
                  <ActionIcon onClick={() => handleSendMessage()}>
                    <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
                  </ActionIcon>
                  <Menu
                    control={
                      <ActionIcon>
                        <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                      </ActionIcon>
                    }
                  >
                    <Menu.Item>Schedule for later</Menu.Item>
                    <Menu.Item>Save draft</Menu.Item>
                    <Menu.Item>Delete</Menu.Item>
                  </Menu>
                </Group>
              </Group>
            </div>
          </div>
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
          className="mb-6 flex flex-1 gap-1 text-sm overflow-hidden items-center justify-between cursor-pointer"
          style={{
            border: "2px solid #e5e7eb",
            backgroundColor: "#e5e7eb",
            borderRadius: `${
              channel && replies[channel._id] && replies[channel._id].length
                ? "0px 0px"
                : "6px 6px"
            } 6px 6px`,
            padding: 8,
          }}
        >
          <div className="text-gray-500 text-xl overflow-ellipsis truncate flex flex-1 gap-1">
            <div className="inline-block flex-1 min-w-0 overflow-ellipsis truncate font-bold select-none">
              {["BLOCKED_BY_RECEIVER", "BLOCKED_BY_SENDER"].includes(
                channel.with_status
              ) && "You cannot send messages to a user."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
