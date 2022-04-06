import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Image,
  Menu,
  Text,
  Tooltip,
  Popover,
  Timeline,
  Avatar,
} from "@mantine/core";
import React, { useState, useEffect, useCallback } from "react";
import {
  chatMainTime,
  getMoreDetailsTime,
  getTime,
  getTimeDifference,
  isNewDay,
  isSameTime,
} from "../../commons/dateUtils";
import { GetMe } from "../../store/userSlice";
import "./index.css";
import MessageInlineEditor from "./MessageInlineEditor";
import { Link } from "react-scroll";
import { pinnedMessage } from "../../apis/channel";
import { deleteMessage } from "../../apis/messages";
import getSocket from "../../apis/socket";
import { useQueryClient } from "react-query";
import { CHANNEL_SOCKET } from "../../configs/socketRoute";
import { CHANNEL_MESSAGES_KEY } from "../../configs/queryKeys";
import ReactPlayer from "react-player/lazy";
import {
  AnimatePresence,
  motion,
  AnimateSharedLayout,
  useAnimation,
} from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { replyMessages, repliesSelector } from "../../store/uiSlice";
import { TikTok } from "react-tiktok";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useClipboard } from "@mantine/hooks";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";

// const synth = window.speechSynthesis;
// const voices = synth.getVoices();
const counter_animations = {
  initial: {
    y: "65%",
    opacity: 0,
  },
  center: {
    y: "0%",
    opacity: 1,
  },
  exit: {
    y: "-65%",
    opacity: 0,
  },
};

const settings = {
  y: {
    duration: 0.1,
  },
  // opacity: { type: "tween", duration: 0.15 }
};

const patterns_embed_media_link = {
  TikTok: /https:\/\/tiktok\.com\/[a-zA-Z0-9_]+/,
  Spotify: /https:\/\/open\.spotify\.com\/[a-zA-Z0-9_]+/,
};

const patterns = {
  boldItalic: /\*\*\*(.*?)\*\*\*/gs,
  bold: /\*\*(.*?)\*\*/gs,
  italic: /\*(.*?)\*|_(.*?)_/gs,
  underline: /__(.*?)__/gs,
  underlineItalics: /__\*(.*?)\*__/gs,
  underlineBold: /__\*\*(.*?)\*\*__/gs,
  underlineBoldItalics: /__\*\*\*(.*?)\*\*\*__/gs,
  strikethrough: /~~(.*?)~~/gs,
  codeMultiline: /```(.*)```/gm,
  codeLine: /`(.*?)`/gs,
  blockQuoteMultiline: />>> (.*)/gs,
  blockQuoteLine: /^> (.*)$/gm,
  kbd: /\[\[(.*)\]\]/gm,
  hashtag: /(\#[a-zA-Z0-9_%]*)/gm,
  warning: /\!\!(.*)\!\!/gm,
  highlight: />>(.*)<</gm,
  bracket: /\[_(.*)_\]/gm,
  circle: /\(\(_(.*)_\)\)/gs,
  map: /\[map\:\{lat\:\"[0-9]+.[0-9]+",lng:"[0-9]+.[0-9]+\"\}\]/g,
  link: /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gm,
  all: /\B@all/gm,
};

const format = (content) =>
  content
    .replace(patterns.boldItalic, "<strong><em>$1</em></strong>")
    .replace(patterns.bold, "<strong>$1</strong>")
    .replace(patterns.italic, "<em>$1$2</em>")
    .replace(
      patterns.underlineItalics,
      "<pre class='underline'><em>$1</em></pre>"
    )
    .replace(patterns.underlineBold, "<u><strong>$1</strong></u>")
    .replace(
      patterns.underlineBoldItalics,
      "<u><strong><em>$1</strong></em></u>"
    )
    .replace(patterns.strikethrough, "<del>$1</del>")
    // FIXME: don't add message formatting in a code block
    // .replace(
    //   patterns.codeLine,
    //   // '<div class="mockup-code bg-primary text-primary-content mt-3 w-full"><pre data-prefix=">"><code class="facade">$1</code></pre></div>'
    //   "<Code block>$1</Code>"
    // )
    .replace(
      patterns.blockQuoteLine,
      '<span class="border-l-4 border-primary pl-1">$1</span>'
    )
    .replace(
      patterns.blockQuoteMultiline,
      '<div class="border-l-4 border-primary pl-1">$1</div>'
    )
    .replace(patterns.kbd, '<kbd class="kbd">$1</kbd>')
    .replace(patterns.hashtag, '<span class="text-blue-500">$1</span>')
    .replace(patterns.warning, '<span class="text-warning">$1</span>')
    .replace(patterns.highlight, '<span class="text-primary">$1</span>')
    // .replace(patterns.link, content.match(patterns.link).map(link=>{
    //   return `<a href="${link}" target="_blank">${link}</a>`
    // }).join(' '))
    .replace(
      patterns.all,
      '<span class="px-[2px] py-[1px] rounded-[3px] font-medium bg-red-300 text-red-400 hover:bg-red-500 cursor-pointer select-none">@all</span>'
    );

function checkSameTime(message1, message2) {
  if (message1.sender.id !== message2.sender.id) return false;
  // if (message1.createdAt === message2.createdAt) return false;
  return getTimeDifference(message1.createdAt, message2.createdAt) < 5;
}

const systemMessageTypes = {
  JOIN: {
    icon: "user-plus",
    text: "joined the workspace",
  },
  LEAVE: {},
  MEMBER_ADD: {},
  MEMBER_REMOVE: {},
  CALL: {
    icon: <FontAwesomeIcon icon="fa-solid fa-phone" />,
    text: (message) => {
      return (
        <div className="select-none">
          <a className="text-black hover:underline text-sm font-medium cursor-pointer">
            {message.sender.username}
          </a>
          {` started a call that lasted ${message.call.ended_timestamp}`}. —{" "}
          {chatMainTime(message.createdAt)}
        </div>
      );
    },
  },
  CHANNEL_PINNED_MESSAGE: {
    icon: <FontAwesomeIcon icon="fa-solid fa-thumbtack" />,
    text: (message) => {
      return (
        <div className="select-none">
          <a className="text-black hover:underline text-sm font-medium cursor-pointer">
            {message.sender.username}
          </a>
          {" pinned "}
          <Link
            to={`chat-messages-${message.messageReference.message}`}
            activeClass="active"
            spy={true}
            smooth={true}
            // href="#62380034d4b2be0e54a64da8"
            className="text-black hover:underline text-sm font-medium cursor-pointer"
          >
            a message
          </Link>
          {" to this channel. See all "}
          <a
            // href="#62380034d4b2be0e54a64da8"
            className="text-black hover:underline text-sm font-medium cursor-pointer"
          >
            pinned messages
          </a>
          . — {chatMainTime(message.createdAt)}
        </div>
      );
    },
  },
  CHANNEL_UNPINNED_MESSAGE: {
    icon: (
      <FontAwesomeIcon icon="fa-solid fa-thumbtack" className="text-red-600" />
    ),
    text: (message,setCurrentMessageSelected) => {
      return (
        <div className="select-none">
          <a className="text-black hover:underline text-sm font-medium cursor-pointer">
            {message.sender.username}
          </a>
          {" unpinned "}
          <a
            // to={`chat-messages-${message.messageReference.message}`}
            // activeClass="active"
            // spy={true}
            // smooth={true}
            // href="#62380034d4b2be0e54a64da8"
            className="text-black hover:underline text-sm font-medium cursor-pointer"
            onClick={() => {
              setCurrentMessageSelected(message.messageReference.message);
              // document.getElementById(`chat-messages-${message.messageReference.message}`)?.scrollIntoView({
              //   behavior: "smooth",
              //   block: "center",
              //   inline: "center",
              // });
            }}
          >
            a message
          </a>
          {" on this channel. See all "}
          <a
            // href="#62380034d4b2be0e54a64da8"
            className="text-black hover:underline text-sm font-medium cursor-pointer"
          >
            pinned messages
          </a>
          . — {chatMainTime(message.createdAt)}
        </div>
      );
    },
  },
  CHANNEL_NAME_CHANGE: {},
  GUILD_MEMBER_JOIN: {},
  THREAD_CREATED: {},
  MESSAGE_DELETED: {
    icon: (
      <FontAwesomeIcon icon="fa-solid fa-trash-can" className="text-red-600" />
    ),
    text: (message) => {
      return (
        <div className="select-none">
          <a className="text-black hover:underline text-sm font-medium cursor-pointer">
            {message.sender.username}
          </a>
          {" unsent a message. — "}
          {chatMainTime(message.updatedAt)}
        </div>
      );
    },
  },
};

export default function Message({
  message,
  messages,
  setCurrentEditMessageId,
  currentEditMessageId,
  currentMessageSelected,
  setCurrentMessageSelected,
}) {
  const me = GetMe();
  const cache = useQueryClient();
  const dispatch = useDispatch();
  const replies = useSelector(repliesSelector);
  const [num, setNum] = useState(10);
  const [newNum, setNewNum] = useState(10);
  const [voiceIndex, setVoiceIndex] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });
  const voice = voices[voiceIndex] || null;
  const [openedEmojiPicker, setOpenedEmojiPicker] = useState(false);
  const controls = useAnimation();
  const clipboard = useClipboard({ timeout: 500 });

  const count_increase = useCallback(async () => {
    await controls.start("exit");
    setNewNum((newNum) => newNum + 1);
    await controls.start("initial");
    await controls.start("center");
  }, [controls]);

  const count_decrease = useCallback(async () => {
    await controls.start("initial");
    setNewNum((newNum) => newNum - 1);
    await controls.start("exit");
    await controls.start("center");
  }, [controls]);

  useEffect(() => {
    if (num > 0) {
      count_increase();
    }
  }, [count_increase, num]);

  const isUnread = false;
  // const [isReply, setIsReply] = useState(false);
  const isReply = () => {
    const reply =
      replies[message.channel] &&
      replies[message.channel].find((reply) => reply.id === message.id);
    if (reply) {
      return true;
    }
    return false;
  };
  // useEffect(() => {
  //   const reply = replies.find((reply) => reply.id === message.id);
  //   if (reply) {
  //     setIsReply(true);
  //   } else {
  //     setIsReply(false);
  //   }
  // }, [dispatch]);

  const isMyMessage = message.sender.id === me.user.id;

  const ShowEditedLabel = (message) => {
    if (message.messagesEdited.length === 0) {
      return null;
    }
    return (
      <Text size="xs" color="dimmed" className="align-baseline cursor-pointer">
        (edited)
      </Text>
    );
  };

  const hasNewDate = () => {
    if (messages.length === 0) {
      return false;
    }
    const index = messages.findIndex((m) => m.id === message.id);
    // if (index + 1 >= messages.length) return false;
    // const next = messages[index + 1];
    const prev = messages[index - 1];
    if (!prev) return false;
    return isNewDay(prev.createdAt, message.createdAt);
  };

  const isSameTimePrev = () => {
    if (messages.length === 0) {
      return false;
    }
    const index = messages.findIndex((m) => m.id === message.id);
    const prev = messages[index - 1];
    if (!prev) return false;
    return checkSameTime(message, prev) && !hasNewDate() && !prev.systemMessage;
  };

  const isMentioned = () => {
    // message.mentions.find((m) => m.id === me.user.id);
    const isMatch = message.content.match(patterns.all);
    return isMatch;
  };

  const pinMessage = async () => {
    const messageId = message.id;
    const channelId = message.channel;
    try {
      const result = await pinnedMessage(channelId, messageId);
      const socket = getSocket(me?.tokens?.access?.token);
      socket.emit(CHANNEL_SOCKET.CHANNEL_SEND_MESSAGE, {
        msg: result?.data,
        receiverId: channelId,
      });
      cache.setQueryData(CHANNEL_MESSAGES_KEY(channelId), (d) => {
        if (result?.data?.messageReference) {
          const index = d?.pages[0]?.results.findIndex(
            (m) => m.id === result?.data?.messageReference?.message
          );
          if (index) {
            result?.data?.systemMessageType === "CHANNEL_PINNED_MESSAGE"
              ? (d.pages[0].results[index].pinned = true)
              : (d.pages[0].results[index].pinned = false);
          }
        }
        if (d?.pages[0]?.results[0]?.id !== result?.data?.id) {
          d?.pages[0]?.results.unshift(result?.data);
        }

        return d;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const delMessage = async () => {
    const messageId = message.id;
    const channelId = message.channel;
    try {
      const result = await deleteMessage(messageId);
      const socket = getSocket(me?.tokens?.access?.token);
      socket.emit(CHANNEL_SOCKET.CHANNEL_SEND_MESSAGE, {
        msg: result?.data,
        receiverId: channelId,
      });
      cache.setQueryData(CHANNEL_MESSAGES_KEY(channelId), (d) => {
        if (result?.data?.messageReference) {
          const index = d?.pages[0]?.results.findIndex(
            (m) => m.id === result?.data?.messageReference?.message
          );
          if (index) {
            result?.data?.systemMessageType === "CHANNEL_PINNED_MESSAGE"
              ? (d.pages[0].results[index].pinned = true)
              : (d.pages[0].results[index].pinned = false);
          }
        }
        // if (d?.pages[0]?.results[0]?.id !== result?.data?.id) {
        //   d?.pages[0]?.results.unshift(result?.data);
        // }

        return d;
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const isSameTimeNext = () => {
  //   if (messages.length === 0) {
  //     return false;
  //   }
  //   const index = messages.findIndex((m) => m.id === message.id);
  //   if (index + 1 >= messages.length) return false;
  //   const next = messages[index + 1];
  //   return checkSameTime(next,message) || message.systemMessage;
  // };

  // console.log(message.systemMessage, message.id);

  return (
    <>
      {hasNewDate() && (
        <>
          <div className="sticky top-2 z-20 flex justify-center w-full">
            <div className="absolute">
              <div className="text-center my-1">
                <Menu
                  placement="center"
                  control={
                    <span
                      className="bg-white font-bold h-6 px-2 inline-flex justify-center items-center rounded-md shadow-md text-xs cursor-pointer"
                      style={{
                        border: !isUnread
                          ? "2px solid #e2e2e2"
                          : "2px solid #FD6671",
                      }}
                    >
                      Thursday, April 23
                    </span>
                  }
                >
                  <Menu.Label>Jump to...</Menu.Label>
                  <Menu.Item>Most recent</Menu.Item>
                  <Menu.Item>Last month</Menu.Item>
                  <Menu.Item>The every beginning</Menu.Item>
                  <Divider />
                  <Menu.Item>Jump to a specific date</Menu.Item>
                </Menu>
                {/* <span
              className="text-white font-bold h-6 px-2 inline-flex justify-center items-center rounded-md shadow-md text-xs cursor-pointer"
              style={{ border: "2px solid #FD6671", background: "#FD6671" }}
            >
              New
            </span> */}
              </div>
            </div>
          </div>
          <div className="w-full z-10">
            <div className="bg-transparent relative py-4">
              <div
                className="left-0 right-0 relative"
                style={{
                  borderTop: !isUnread
                    ? "2px solid #e2e2e2"
                    : "2px solid #FD6671",
                }}
              ></div>
            </div>
          </div>
        </>
      )}
      <div className="w-full flex flex-col justify-between">
        <div
          className={`group w-full flex flex-col justify-between relative bg-white hover:bg-slate-50 ${
            isMentioned() || isReply() ? "mentioned" : "bg-white"
          } ${isSameTimePrev() ? "" : "mt-4"} ${
            message.systemMessage ? "mt-4" : ""
          } ${message.pinned ? "mt-5" : ""} ${
            currentEditMessageId === message.id ? "bg-slate-50" : ""
          } ${currentMessageSelected === message.id ? "message-selected" : ""}`}
          // style={{
          //   background: "white",
          // }}
        >
          {/* {message.replies.length > 0 &&
            message.replies.map((reply) => (
              <div
                key={reply.id}
                className="flex h-8 px-3 select-none items-center truncate overflow-ellipsis"
                style={{
                  animation:
                    "340ms cubic-bezier(0.2, 0.9, 0.5, 1.16) 0s 1 normal forwards running bottomBounce",
                }}
              >
                <div className="gap-2 flex flex-auto min-w-0 items-center">
                  <div className="cursor-default w-12 flex flex-shrink-0 justify-center mt-1">
                    <ActionIcon radius="xl" variant="light">
                      <FontAwesomeIcon
                        icon="fa-solid fa-reply"
                        className="-scale-x-[1]"
                      />
                    </ActionIcon>
                  </div>
                  <div className="flex gap-1 items-center truncate overflow-ellipsis min-w-0 ml-4">
                    <div
                      className="py-[2px] flex items-center gap-1 max-h-8 truncate"
                      style={{ flex: "1 1 0%" }}
                    >
                      {/* <Badge
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
                      </Badge> */}
          {/* <div
                        className="truncate overflow-ellipsis max-h-7"
                        style={{ maxWidth: 320 }}
                      >
                        {reply.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            ))} */}
          {/* <Timeline active={-1} bulletSize={24} lineWidth={2}>
            {message.replies.length > 0 &&
              message.replies.map((reply) => (
                <Timeline.Item
                  bullet={
                    <Avatar
                      size={22}
                      radius="xl"
                      src="https://avatars0.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
                    />
                  }
                  title={reply.sender.username}
                >
                  <Text color="dimmed" size="sm">
                    {reply.content}
                  </Text>
                </Timeline.Item>
              ))}
          </Timeline> */}
          {isSameTimePrev() && message.replies.length === 0 ? (
            <div
              className="w-full flex justify-start items-start pr-4 pl-3 py-1 z-[1] bg-inherit"
              // style={{ background: "white" }}
            >
              <div className="flex w-full">
                {message.systemMessage ? (
                  <div className="cursor-default w-[52px] flex flex-shrink-0 justify-center mt-1">
                    {systemMessageTypes[message.systemMessageType]?.icon}
                  </div>
                ) : (
                  <Tooltip
                    label={getMoreDetailsTime(message?.createdAt)}
                    withArrow
                  >
                    <p className="cursor-default w-12 flex flex-shrink-0 justify-center mt-1 text-gray-300 text-[10px] group-hover:visible invisible">
                      {getTime(message?.createdAt)}
                    </p>
                  </Tooltip>
                )}
                <div className="w-full flex flex-col">
                  {currentEditMessageId === message.id ? (
                    <MessageInlineEditor
                      message={message}
                      finish={() => setCurrentEditMessageId(null)}
                    />
                  ) : (
                    <pre className="break-all text-sm ml-2 font-normal text-left">
                      {message.systemMessage ? (
                        systemMessageTypes[message.systemMessageType]?.text(
                          message,setCurrentMessageSelected
                        )
                      ) : (
                        <>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `${format(message.content)}`,
                            }}
                          ></div>
                          {ShowEditedLabel(message)}
                        </>
                      )}
                    </pre>
                  )}
                  <div className="flex flex-col">
                    {message.embed.length > 0 &&
                      message.embed.map((embed, index) => (
                        <EmbedLink embed={embed} key={index} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="w-full flex justify-start items-start px-4 py-1 z-[1] bg-inherit"
              // style={{ background: "white" }}
            >
              {message.systemMessage ? (
                <div className="flex w-full">
                  <div className="cursor-default w-[52px] flex flex-shrink-0 justify-center mt-1">
                    {systemMessageTypes[message.systemMessageType]?.icon}
                  </div>
                  <pre className="break-all text-sm font-normal text-left">
                    {systemMessageTypes[message.systemMessageType]?.text(
                      message,setCurrentMessageSelected
                    )}
                  </pre>
                </div>
              ) : (
                <>
                  {message.replies.length > 0 ? (
                    <Timeline
                      active={-1}
                      bulletSize={24}
                      lineWidth={2}
                      classNames={{
                        itemBulletWithChild: "z-10",
                      }}
                      // sx={(theme, { color }) => ({
                      //   "itemLineActive::before": {
                      //     borderLeftColor: theme.fn.themeColor(
                      //       color,
                      //       theme.colorScheme === "dark" ? 6 : 7
                      //     ),
                      //   },
                      // })}
                      style={{ paddingLeft: 20, width: "100%" }}
                    >
                      {message.replies.map((reply, index) => (
                        <Timeline.Item
                          lineActive={
                            index + 1 < message.replies.length - 1
                              ? me.user.id ===
                                  message.replies[index + 1].sender.id &&
                                reply.sender.id === me.user.id
                              : message.sender.id === me.user.id
                          }
                          active={reply.sender.id === me.user.id}
                          // sx={(theme) => ({
                          //   "&:not(:last-of-type)::after": {
                          //     display: "inline-block",
                          //   },

                          //   "&::after": {
                          //     boxSizing: "border-box",
                          //     position: "absolute",
                          //     top: 0,
                          //     left: "left" ? -2 : "auto",
                          //     right: "right" ? -2 : "auto",
                          //     bottom: -6,
                          //     borderLeft: `2px solid ${
                          //       theme.colorScheme === "dark"
                          //         ? theme.colors.dark[4]
                          //         : theme.colors.gray[3]
                          //     }`,
                          //     content: '""',
                          //     display: "none",
                          //     width: 2,
                          //     transform: "rotate(90deg) translate(-2px, -12px)",
                          //   },

                          //   "&.mantine-Timeline-itemLineActive::after": {
                          //     borderLeftColor: theme.fn.themeColor(
                          //       theme.primaryColor,
                          //       // color,
                          //       theme.colorScheme === "dark" ? 6 : 7
                          //     ),
                          //   },
                          // })}
                          // lineVariant="dotted"
                          bullet={
                            <Avatar
                              size={22}
                              radius="xl"
                              src="https://avatars0.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
                            />
                          }
                          style={{
                            marginTop: index === 0 ? 0 : 12,
                            paddingLeft: 16,
                          }}
                          title={
                            <div className="flex gap-1 items-center truncate overflow-ellipsis min-w-0 ml-4">
                              <div
                                className="py-[2px] flex items-center gap-2 max-h-8 truncate"
                                style={{ flex: "1 1 0%" }}
                              >
                                {reply.sender.username}
                                {/* <Badge
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
                      </Badge> */}
                                {/* <Link to={`chat-messages-${reply.id}`} spy={true} smooth={true}> */}
                                <div
                                  className="truncate overflow-ellipsis max-h-7 font-normal text-sm cursor-pointer hover:underline hover:text-slate-200"
                                  style={{ maxWidth: 320 }}
                                  onClick={() => {
                                    setCurrentMessageSelected(reply.id);
                                  }}
                                >
                                  {reply.content}
                                </div>
                                {/* </Link> */}
                                <Tooltip
                                  label={getMoreDetailsTime(reply.createdAt)}
                                  withArrow
                                >
                                  <span className="cursor-default text-xs">
                                    ({chatMainTime(reply.createdAt)})
                                  </span>
                                </Tooltip>
                              </div>
                            </div>
                          }
                        />
                      ))}
                      <Timeline.Item
                        style={{ marginTop: 14, paddingLeft: 16 }}
                        bulletSize={40}
                        bullet={
                          <div className="flex justify-center">
                            <a
                              // href="#"
                              className={`flex items-center mx-auto w-10 h-10 bg-slate-500 text-white rounded-full`}
                            >
                              <svg
                                className="w-6 h-6 text-center mx-auto"
                                aria-hidden="false"
                                width="28"
                                height="20"
                                viewBox="0 0 28 20"
                              >
                                <path
                                  fill="currentColor"
                                  d="M20.6644 20C20.6644 20 19.8014 18.9762 19.0822 18.0714C22.2226 17.1905 23.4212 15.2381 23.4212 15.2381C22.4384 15.881 21.5034 16.3334 20.6644 16.6429C19.4658 17.1429 18.3151 17.4762 17.1884 17.6667C14.887 18.0953 12.7774 17.9762 10.9795 17.6429C9.61301 17.381 8.43836 17 7.45548 16.6191C6.90411 16.4048 6.30479 16.1429 5.70548 15.8096C5.63356 15.7619 5.56164 15.7381 5.48973 15.6905C5.44178 15.6667 5.41781 15.6429 5.39384 15.6191C4.96233 15.381 4.7226 15.2143 4.7226 15.2143C4.7226 15.2143 5.87329 17.1191 8.91781 18.0238C8.19863 18.9286 7.31164 20 7.31164 20C2.0137 19.8333 0 16.381 0 16.381C0 8.7144 3.45205 2.50017 3.45205 2.50017C6.90411 -0.07123 10.1884 0.000197861 10.1884 0.000197861L10.4281 0.285909C6.11301 1.52399 4.12329 3.40493 4.12329 3.40493C4.12329 3.40493 4.65068 3.11921 5.53767 2.71446C8.10274 1.59542 10.1404 1.2859 10.9795 1.21447C11.1233 1.19066 11.2432 1.16685 11.387 1.16685C12.8493 0.976379 14.5034 0.92876 16.2295 1.11923C18.5068 1.38114 20.9521 2.0478 23.4452 3.40493C23.4452 3.40493 21.5514 1.61923 17.476 0.381146L17.8116 0.000197861C17.8116 0.000197861 21.0959 -0.07123 24.5479 2.50017C24.5479 2.50017 28 8.7144 28 16.381C28 16.381 25.9623 19.8333 20.6644 20ZM9.51712 8.88106C8.15068 8.88106 7.07192 10.0715 7.07192 11.5239C7.07192 12.9763 8.17466 14.1667 9.51712 14.1667C10.8836 14.1667 11.9623 12.9763 11.9623 11.5239C11.9863 10.0715 10.8836 8.88106 9.51712 8.88106ZM18.2671 8.88106C16.9007 8.88106 15.8219 10.0715 15.8219 11.5239C15.8219 12.9763 16.9247 14.1667 18.2671 14.1667C19.6336 14.1667 20.7123 12.9763 20.7123 11.5239C20.7123 10.0715 19.6336 8.88106 18.2671 8.88106Z"
                                ></path>
                              </svg>
                            </a>
                          </div>
                        }
                      >
                        <div className="w-full flex flex-col ml-4">
                          <div className="flex items-center">
                            {/* <Link  to="about" spy={true} smooth={true}> */}
                            <a
                              // href="#62380034d4b2be0e54a64da8"
                              className="text-black hover:underline font-medium cursor-pointer"
                            >
                              {message.sender.username}
                            </a>
                            {/* </Link> */}
                            <Tooltip
                              label={getMoreDetailsTime(message.createdAt)}
                              withArrow
                            >
                              <span className="cursor-default ml-2 text-xs">
                                {chatMainTime(message.createdAt)}
                              </span>
                            </Tooltip>
                          </div>
                          {currentEditMessageId === message.id ? (
                            <MessageInlineEditor
                              message={message}
                              finish={() => setCurrentEditMessageId(null)}
                            />
                          ) : (
                            <div className="flex w-full">
                              <pre className="break-all text-sm font-normal text-left">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: `${format(message.content)}`,
                                  }}
                                ></div>
                                {ShowEditedLabel(message)}
                              </pre>
                            </div>
                          )}
                          <div className="flex flex-col">
                            {message.embed.length > 0 &&
                              message.embed.map((embed, index) => (
                                <EmbedLink embed={embed} key={index} />
                              ))}
                          </div>
                          {/* <div className="flex my-1 gap-1 flex-wrap">
                        {Array.from({ length: 20 }, (_, index) => (
                          <Button
                            // variant="gradient"
                            // gradient={{ from: "indigo", to: "cyan" }}
                            variant="outline"
                            classNames={{ leftIcon: "mr-1" }}
                            className="pl-2 pr-[10px] font-medium"
                            style={{
                              background:
                                "hsla(235,calc(0.6*85.6%),64.7%,0.15);",
                            }}
                            leftIcon={<div className="text-base">😀</div>}
                            onClick={() => {
                              if (num > 0) {
                                setNum((num) => num + 1);
                              } else {
                                setNum(1);
                              }
                            }}
                            radius="xl"
                            compact
                          >
                            <AnimatePresence>
                              <motion.span
                                variants={counter_animations}
                                animate={controls}
                                transition={settings}
                              >
                                {newNum}
                              </motion.span>
                            </AnimatePresence>
                          </Button>
                        ))}
                      </div> */}
                        </div>
                      </Timeline.Item>
                    </Timeline>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <a
                          // href="#"
                          className={`flex items-center mx-auto w-10 h-10 bg-slate-500 text-white rounded-full`}
                        >
                          <svg
                            className="w-6 h-6 text-center mx-auto"
                            aria-hidden="false"
                            width="28"
                            height="20"
                            viewBox="0 0 28 20"
                          >
                            <path
                              fill="currentColor"
                              d="M20.6644 20C20.6644 20 19.8014 18.9762 19.0822 18.0714C22.2226 17.1905 23.4212 15.2381 23.4212 15.2381C22.4384 15.881 21.5034 16.3334 20.6644 16.6429C19.4658 17.1429 18.3151 17.4762 17.1884 17.6667C14.887 18.0953 12.7774 17.9762 10.9795 17.6429C9.61301 17.381 8.43836 17 7.45548 16.6191C6.90411 16.4048 6.30479 16.1429 5.70548 15.8096C5.63356 15.7619 5.56164 15.7381 5.48973 15.6905C5.44178 15.6667 5.41781 15.6429 5.39384 15.6191C4.96233 15.381 4.7226 15.2143 4.7226 15.2143C4.7226 15.2143 5.87329 17.1191 8.91781 18.0238C8.19863 18.9286 7.31164 20 7.31164 20C2.0137 19.8333 0 16.381 0 16.381C0 8.7144 3.45205 2.50017 3.45205 2.50017C6.90411 -0.07123 10.1884 0.000197861 10.1884 0.000197861L10.4281 0.285909C6.11301 1.52399 4.12329 3.40493 4.12329 3.40493C4.12329 3.40493 4.65068 3.11921 5.53767 2.71446C8.10274 1.59542 10.1404 1.2859 10.9795 1.21447C11.1233 1.19066 11.2432 1.16685 11.387 1.16685C12.8493 0.976379 14.5034 0.92876 16.2295 1.11923C18.5068 1.38114 20.9521 2.0478 23.4452 3.40493C23.4452 3.40493 21.5514 1.61923 17.476 0.381146L17.8116 0.000197861C17.8116 0.000197861 21.0959 -0.07123 24.5479 2.50017C24.5479 2.50017 28 8.7144 28 16.381C28 16.381 25.9623 19.8333 20.6644 20ZM9.51712 8.88106C8.15068 8.88106 7.07192 10.0715 7.07192 11.5239C7.07192 12.9763 8.17466 14.1667 9.51712 14.1667C10.8836 14.1667 11.9623 12.9763 11.9623 11.5239C11.9863 10.0715 10.8836 8.88106 9.51712 8.88106ZM18.2671 8.88106C16.9007 8.88106 15.8219 10.0715 15.8219 11.5239C15.8219 12.9763 16.9247 14.1667 18.2671 14.1667C19.6336 14.1667 20.7123 12.9763 20.7123 11.5239C20.7123 10.0715 19.6336 8.88106 18.2671 8.88106Z"
                            ></path>
                          </svg>
                        </a>
                      </div>
                      <div className="w-full flex flex-col ml-4">
                        <div className="flex items-center">
                          {/* <Link  to="about" spy={true} smooth={true}> */}
                          <a
                            // href="#62380034d4b2be0e54a64da8"
                            className="text-black hover:underline font-medium cursor-pointer"
                            onClick={() => {
                              setCurrentMessageSelected(message.id);
                            }}
                          >
                            {message.sender.username}
                          </a>
                          {/* </Link> */}
                          <Tooltip
                            label={getMoreDetailsTime(message.createdAt)}
                            withArrow
                          >
                            <span className="cursor-default ml-2 text-xs">
                              {chatMainTime(message.createdAt)}
                            </span>
                          </Tooltip>
                        </div>
                        {currentEditMessageId === message.id ? (
                          <MessageInlineEditor
                            message={message}
                            finish={() => setCurrentEditMessageId(null)}
                          />
                        ) : (
                          <div className="flex w-full">
                            <pre className="break-all text-sm font-normal text-left">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: `${format(message.content)}`,
                                }}
                              ></div>
                              {ShowEditedLabel(message)}
                            </pre>
                          </div>
                        )}
                        <div className="flex flex-col">
                          {message.embed.length > 0 &&
                            message.embed.map((embed, index) => (
                              <EmbedLink embed={embed} key={index} />
                            ))}
                        </div>
                        {/* <div className="flex my-1 gap-1 flex-wrap">
                      {Array.from({ length: 20 }, (_, index) => (
                        <Button
                          // variant="gradient"
                          // gradient={{ from: "indigo", to: "cyan" }}
                          variant="outline"
                          classNames={{ leftIcon: "mr-1" }}
                          className="pl-2 pr-[10px] font-medium"
                          style={{
                            background: "hsla(235,calc(0.6*85.6%),64.7%,0.15);",
                          }}
                          leftIcon={<div className="text-base">😀</div>}
                          onClick={() => {
                            if (num > 0) {
                              setNum((num) => num + 1);
                            } else {
                              setNum(1);
                            }
                          }}
                          radius="xl"
                          compact
                        >
                          <AnimatePresence>
                            <motion.span
                              variants={counter_animations}
                              animate={controls}
                              transition={settings}
                            >
                              {newNum}
                            </motion.span>
                          </AnimatePresence>
                        </Button>
                      ))}
                    </div> */}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
          {/* <iframe src="https://maps.google.com/maps?q=@9.779349,105.6189045,11z&output=embed" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> */}
          {message.pinned && (
            <div className="absolute flex items-start left-0 bottom-full ml-4 h-5">
              <div
                className="py-1 flex items-center bg-red-600 text-white will-change-transform w-10 h-full flex-col z-0 group-hover:-translate-y-0 translate-y-4 rounded-t"
                style={{ transition: "transform .1s linear" }}
              >
                <span className="font-bold uppercase text-[10px] hover:underline cursor-pointer select-none">
                  Pinned
                  {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                </span>
              </div>
            </div>
          )}
          <div className="group-hover:visible invisible absolute right-0 top-0">
            <div className="absolute right-0 -top-6 pr-4 pl-8 z-10">
              <div
                className="flex items-center h-8 rounded-md bg-white relative overflow-hidden transition-shadow shadow-sm hover:shadow-md"
                style={{ border: "2px solid #e2e2e2" }}
              >
                <ActionIcon size={32}>👏</ActionIcon>
                <ActionIcon size={32}>👏</ActionIcon>
                <ActionIcon size={32}>👏</ActionIcon>
                <Popover
                  opened={openedEmojiPicker}
                  onClose={() => setOpenedEmojiPicker(false)}
                  target={
                    <ActionIcon
                      size={32}
                      onClick={() => setOpenedEmojiPicker(!openedEmojiPicker)}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-face-laugh" />
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

                {!message.systemMessage && (
                  <ActionIcon
                    size={32}
                    onClick={() => {
                      const replyClone = replies[message.channel]
                        ? [...new Set([...replies[message.channel], message])]
                        : [message];
                      if (replyClone.length <= 5) {
                        dispatch(
                          replyMessages({
                            id: message.channel,
                            messages: replyClone,
                          })
                        );
                      }
                    }}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-reply" />
                  </ActionIcon>
                )}
                {!message.systemMessage && isMyMessage && (
                  <ActionIcon
                    size={32}
                    onClick={() => setCurrentEditMessageId(message.id)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-pen" />
                  </ActionIcon>
                )}
                <Menu
                  position="right"
                  size="xl"
                  control={
                    <ActionIcon size={32}>
                      <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                    </ActionIcon>
                  }
                >
                  {!message.systemMessage && isMyMessage && (
                    <Menu.Item
                      icon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                      onClick={() => setCurrentEditMessageId(message.id)}
                    >
                      Chỉnh sửa tin nhắn
                    </Menu.Item>
                  )}
                  {!message.systemMessage && (
                    <Menu.Item
                      onClick={pinMessage}
                      icon={
                        <FontAwesomeIcon
                          icon="fa-solid fa-thumbtack"
                          className={`${message.pinned ? "text-red-600" : ""}`}
                        />
                      }
                    >
                      {message.pinned ? "Bỏ ghim" : "Ghim tin nhắn"}
                    </Menu.Item>
                  )}
                  {!message.systemMessage && (
                    <Menu.Item
                      icon={<FontAwesomeIcon icon="fa-solid fa-reply" />}
                    >
                      Trả lời
                    </Menu.Item>
                  )}
                  <Menu.Item>Tạo chủ đề</Menu.Item>
                  <Menu.Item
                    icon={<FontAwesomeIcon icon="fa-solid fa-map-pin" />}
                  >
                    Đánh dấu chưa đọc
                  </Menu.Item>
                  <Menu.Item icon={<FontAwesomeIcon icon="fa-solid fa-link" />}>
                    Sao chép đường dẫn tin nhắn
                  </Menu.Item>
                  <Menu.Item
                    icon={<FontAwesomeIcon icon="fa-solid fa-language" />}
                  >
                    Dịch đoạn văn bản
                  </Menu.Item>
                  {supported && (
                    <Menu.Item
                      icon={
                        <FontAwesomeIcon
                          icon={`fa-solid ${
                            speaking ? "fa-volume-xmark" : "fa-volume-high"
                          }`}
                        />
                      }
                      onClick={() => {
                        if (!speaking) {
                          const text = `${message.sender.username} say ${message.content}`;
                          speak({ text, voice, rate, pitch });
                        } else {
                          cancel();
                        }
                      }}
                    >
                      {speaking ? "Pause Message" : "Speak Message"}
                    </Menu.Item>
                  )}
                  <Menu.Item
                    onClick={() => clipboard.copy(message.id)}
                    icon={<FontAwesomeIcon icon="fa-solid fa-clipboard" />}
                  >
                    Sao chép ID
                  </Menu.Item>
                  {!message.systemMessage && isMyMessage && (
                    <Menu.Item
                      color="red"
                      icon={<FontAwesomeIcon icon="fa-solid fa-trash-can" />}
                    >
                      Xoá tin nhắn
                    </Menu.Item>
                  )}
                  {message.systemMessage &&
                    isMyMessage &&
                    message.systemMessageType === "MESSAGE_DELETED" && (
                      <Menu.Item
                        color="blue"
                        icon={
                          <FontAwesomeIcon icon="fa-solid fa-trash-can-arrow-up" />
                        }
                      >
                        Khôi phục tin nhắn
                      </Menu.Item>
                    )}
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const EmbedLink = ({ embed }) => {
  const [openedImagePreview, setOpenedImagePreview] = useState(false);
  return (
    <div
      className="grid grid-flow-row indent-0 min-h-0 min-w-0 py-[0.125rem] relative"
      style={{
        gridRowGap: "0.25rem",
        gridTemplateColumns: "repeat(auto-fill,minmax(100%,1fr))",
      }}
    >
      {embed.type === "image" ? (
        <div className="justify-self-start self-start relative grid max-w-[520px] rounded">
          <div
            className="min-w-0 rounded object-fill flex justify-center items-center"
            style={{ gridColumn: "1/1", width: "100%", height: "auto" }}
          >
            <AnimateSharedLayout type="crossfade">
              {/* <Image
                        withPlaceholder
                        width="100%"
                        height="auto"
                        fit="contain"
                        radius={4}
                        src={
                          embed.thumbnail.url && !Array.isArray(embed.image)
                            ? embed.image.url
                            : embed.image[0].url
                        }
                      /> */}
              <motion.img
                className="w-full h-auto rounded object-contain"
                onClick={() => setOpenedImagePreview(true)}
                layoutId={
                  embed.thumbnail.url && !Array.isArray(embed.image)
                    ? embed.image.url
                    : embed.image[0].url
                }
                src={
                  embed.thumbnail.url && !Array.isArray(embed.image)
                    ? embed.image.url
                    : embed.image[0].url
                }
              />
              <AnimatePresence>
                {openedImagePreview && (
                  <div className="fixed inset-0 z-50">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                      key="overlay"
                      className="overlay inset-0 z-50"
                      style={{
                        backgroundImage: `url(${
                          embed.thumbnail.url && !Array.isArray(embed.image)
                            ? embed.image.url
                            : embed.image[0].url
                        })`,
                        inset: "-80px -80px -80px -80px",
                        backgroundColor: "rgba(0,0,0)",
                        backgroundSize: "cover",
                        backgroundPosition: "50%",
                        backgroundRepeat: "no-repeat",
                        filter: "blur(7px) brightness(.7)",
                      }}
                      onClick={() => setOpenedImagePreview(false)}
                    />
                    <div
                      className="single-image-container"
                      // onClick={() => setSelectedId(null)}
                    >
                      <motion.img
                        key="image"
                        // index={images[selectedId].id}
                        className="single-image"
                        style={{ height: "auto",zIndex: 200 }}
                        layoutId={
                          embed.thumbnail.url && !Array.isArray(embed.image)
                            ? embed.image.url
                            : embed.image[0].url
                        }
                        src={
                          embed.thumbnail.url && !Array.isArray(embed.image)
                            ? embed.image.url
                            : embed.image[0].url
                        }
                      />
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </AnimateSharedLayout>
          </div>
        </div>
      ) : (
        <article
          className="grid max-w-[520px] rounded relative "
          style={{
            borderLeft: "4px solid #000",
            backgroundColor: "rgba(128,128,128,0.8)",
          }}
        >
          <div
            className="overflow-hidden inline-grid"
            style={{
              gridTemplateColumns: "auto",
              gridTemplateRows: "auto",
              padding: "0.5rem 1rem 1rem 0.75rem",
            }}
          >
            {embed.provider && (
              <div
                className="min-w-0 font-normal mt-2 text-left text-xs"
                style={{ gridColumn: "1/1" }}
              >
                {embed.provider.name}
              </div>
            )}
            {embed.title && (
              <div
                className="min-w-0 font-semibold text-base mt-2"
                style={{ gridColumn: "1/1" }}
              >
                <a
                  href={embed.url}
                  target="_blank"
                  className="text-blue-500 hover:underline no-underline"
                >
                  {embed.title}
                </a>
              </div>
            )}
            {embed.description && (
              <div
                className="mt-2 font-normal text-sm whitespace-pre-line text-left"
                style={{ gridColumn: "1/1" }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${format(embed.description)}`,
                  }}
                ></div>
              </div>
            )}
            {embed.thumbnail?.url && (
              <>
                {embed.type === "link" ? (
                  <div
                    className="w-20 h-20 ml-4 mt-2 flex-shrink-0 justify-self-end flex justify-center items-center object-fill"
                    style={{ gridRow: "1/8", gridColumn: "2/2" }}
                  >
                    <AnimateSharedLayout type="crossfade">
                      {/* <Image
                        withPlaceholder
                        width="80px"
                        height="80px"
                        fit="contain"
                        radius={4}
                        src={
                          embed.thumbnail.url && !Array.isArray(embed.image)
                            ? embed.image.url
                            : embed.image[0].url
                        }
                      /> */}
                      <motion.img
                        className="w-20 h-20 rounded object-contain"
                        onClick={() => setOpenedImagePreview(true)}
                        layoutId={
                          embed.thumbnail.url && !Array.isArray(embed.image)
                            ? embed.image.url
                            : embed.image[0].url
                        }
                        src={
                          embed.thumbnail.url && !Array.isArray(embed.image)
                            ? embed.image.url
                            : embed.image[0].url
                        }
                      />
                      <AnimatePresence>
                        {openedImagePreview && (
                          <div className="fixed inset-0 z-50">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.6 }}
                              exit={{ opacity: 0 }}
                              key="overlay"
                              className="overlay -inset-20 z-50"
                              style={{
                                // backgroundImage: `url(${
                                //   embed.thumbnail.url &&
                                //   !Array.isArray(embed.image)
                                //     ? embed.image.url
                                //     : embed.image[0].url
                                // })`,
                                inset: "-80px -80px -80px -80px",
                                backgroundColor: "rgba(0,0,0)",
                                backgroundSize: "cover",
                                backgroundPosition: "50%",
                                backgroundRepeat: "no-repeat",
                                filter: "blur(7px) brightness(.7)",
                              }}
                              onClick={() => setOpenedImagePreview(false)}
                            />
                            <div
                              className="single-image-container"
                              // onClick={() => setSelectedId(null)}
                            >
                              <motion.img
                                key="image"
                                // index={images[selectedId].id}
                                className="single-image"
                                style={{ height: "auto" }}
                                layoutId={
                                  embed.thumbnail.url &&
                                  !Array.isArray(embed.image)
                                    ? embed.image.url
                                    : embed.image[0].url
                                }
                                src={
                                  embed.thumbnail.url &&
                                  !Array.isArray(embed.image)
                                    ? embed.image.url
                                    : embed.image[0].url
                                }
                              />
                            </div>
                          </div>
                        )}
                      </AnimatePresence>
                    </AnimateSharedLayout>
                  </div>
                ) : (
                  <div
                    className="mt-4 min-w-0 rounded object-fill flex justify-center items-center"
                    style={{ gridColumn: "1/1", width: "100%", height: "auto" }}
                  >
                    {/* {embed?.url && (
                      <TikTok url={embed.url} />
                    )} */}
                    {embed.type === "article" ? (
                      <AnimateSharedLayout type="crossfade">
                        {/* <Image
                        withPlaceholder
                        width="100%"
                        height="auto"
                        fit="contain"
                        radius={4}
                        src={
                          embed.thumbnail.url && !Array.isArray(embed.image)
                            ? embed.image.url
                            : embed.image[0].url
                        }
                      /> */}
                        <motion.img
                          className="w-full h-auto rounded object-contain"
                          onClick={() => setOpenedImagePreview(true)}
                          layoutId={
                            embed.thumbnail.url && !Array.isArray(embed.image)
                              ? embed.image.url
                              : embed.image[0].url
                          }
                          src={
                            embed.thumbnail.url && !Array.isArray(embed.image)
                              ? embed.image.url
                              : embed.image[0].url
                          }
                        />
                        <AnimatePresence>
                          {openedImagePreview && (
                            <div className="fixed inset-0 z-50">
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                exit={{ opacity: 0 }}
                                key="overlay"
                                className="overlay inset-0 z-50"
                                style={{
                                  // backgroundImage: `url(${
                                  //   embed.thumbnail.url &&
                                  //   !Array.isArray(embed.image)
                                  //     ? embed.image.url
                                  //     : embed.image[0].url
                                  // })`,
                                  inset: "-80px -80px -80px -80px",
                                  backgroundColor: "rgba(0,0,0)",
                                  backgroundSize: "100% 100%",
                                  backgroundPosition: "50%",
                                  backgroundRepeat: "no-repeat",
                                  filter: "blur(7px) brightness(.7)",
                                }}
                                onClick={() => setOpenedImagePreview(false)}
                              />
                              <div
                                className="single-image-container"
                                // onClick={() => setSelectedId(null)}
                              >
                                <motion.img
                                  key="image"
                                  // index={images[selectedId].id}
                                  className="single-image"
                                  style={{ height: "auto",zIndex: 200 }}
                                  layoutId={
                                    embed.thumbnail.url &&
                                    !Array.isArray(embed.image)
                                      ? embed.image.url
                                      : embed.image[0].url
                                  }
                                  src={
                                    embed.thumbnail.url &&
                                    !Array.isArray(embed.image)
                                      ? embed.image.url
                                      : embed.image[0].url
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </AnimatePresence>
                      </AnimateSharedLayout>
                    ) : (
                      <>
                        {/* {embed.url.toLowerCase().includes("tiktok") ? (
                          <TikTok url={embed.url} />
                        ) : ( */}
                        <ReactPlayer url={embed.url} controls={true} />
                        {/* )} */}
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </article>
      )}
    </div>
  );
};
