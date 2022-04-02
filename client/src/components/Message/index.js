import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Divider, Image, Menu, Text, Tooltip } from "@mantine/core";
import React from "react";
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
import getSocket from "../../apis/socket";
import { useQueryClient } from "react-query";
import { CHANNEL_SOCKET } from "../../configs/socketRoute";
import { CHANNEL_MESSAGES_KEY } from "../../configs/queryKeys";
import ReactPlayer from "react-player/lazy";

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
    .replace(patterns.hashtag, '<span class="text-blue-300">$1</span>')
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
    text: (message) => {
      return (
        <div className="select-none">
          <a className="text-black hover:underline text-sm font-medium cursor-pointer">
            {message.sender.username}
          </a>
          {" unpinned "}
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
  const isUnread = false;

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
    return (
      (checkSameTime(message, prev) && !hasNewDate() && !prev.systemMessage) ||
      message.systemMessage
    );
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

  // const isSameTimeNext = () => {
  //   if (messages.length === 0) {
  //     return false;
  //   }
  //   const index = messages.findIndex((m) => m.id === message.id);
  //   if (index + 1 >= messages.length) return false;
  //   const next = messages[index + 1];
  //   return checkSameTime(next,message) || message.systemMessage;
  // };

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
      <div
        id={`chat-messages-${message.id}`}
        className="w-full flex flex-col justify-between"
      >
        <div
          className={`group w-full flex flex-col justify-between relative hover:bg-slate-50 ${
            isMentioned() ? "mentioned" : ""
          } ${isSameTimePrev() ? "" : "mt-4"} ${
            message.systemMessage ? "mt-4" : ""
          } ${currentEditMessageId === message.id ? "bg-slate-50" : ""} ${
            currentMessageSelected === message.id ? "message-selected" : ""
          }`}
          // style={{
          //   background: "rgba(88, 101, 242, 0)",
          // }}
        >
          {isSameTimePrev() ? (
            <div className="w-full flex justify-start items-start px-4 py-1">
              <div className="flex w-full">
                {message.systemMessage ? (
                  <div className="cursor-default w-12 flex flex-shrink-0 justify-center mt-1">
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
                      message={message.content}
                      finish={() => setCurrentEditMessageId(null)}
                    />
                  ) : (
                    <pre className="break-all text-sm ml-2 font-normal text-left">
                      {message.systemMessage ? (
                        systemMessageTypes[message.systemMessageType]?.text(
                          message
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
            <div className="w-full flex justify-start items-start px-4 py-1">
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
                    className="text-black hover:underline text-sm font-medium cursor-pointer"
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
                    message={message.content}
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
                <ActionIcon size={32}>
                  <FontAwesomeIcon icon="fa-solid fa-face-laugh" />
                </ActionIcon>
                {(!message.systemMessage || isMyMessage) && (
                  <ActionIcon
                    size={32}
                    onClick={() => setCurrentEditMessageId(message.id)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-pen" />
                  </ActionIcon>
                )}
                <Menu
                  position="right"
                  size="lg"
                  control={
                    <ActionIcon size={32}>
                      <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                    </ActionIcon>
                  }
                >
                  {(!message.systemMessage || isMyMessage) && (
                    <Menu.Item
                      icon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                      onClick={() => setCurrentEditMessageId(message.id)}
                    >
                      Chỉnh sửa tin nhắn
                    </Menu.Item>
                  )}
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
                  <Menu.Item
                    icon={<FontAwesomeIcon icon="fa-solid fa-reply" />}
                  >
                    Trả lời
                  </Menu.Item>
                  <Menu.Item>Tạo chủ đề</Menu.Item>
                  <Menu.Item>Đánh dấu chưa đọc</Menu.Item>
                  <Menu.Item icon={<FontAwesomeIcon icon="fa-solid fa-link" />}>
                    Sao chép đường dẫn tin nhắn
                  </Menu.Item>
                  <Menu.Item>Sao chép ID</Menu.Item>
                  {(!message.systemMessage || isMyMessage) && (
                    <Menu.Item
                      color="red"
                      icon={<FontAwesomeIcon icon="fa-solid fa-trash-can" />}
                    >
                      Xoá tin nhắn
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
  return (
    <div
      className="grid grid-flow-row indent-0 min-h-0 min-w-0 py-[0.125rem] relative"
      style={{
        gridRowGap: "0.25rem",
        gridTemplateColumns: "repeat(auto-fill,minmax(100%,1fr))",
      }}
    >
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
              {embed.description}
            </div>
          )}
          {embed.thumbnail?.url && (
            <>
              {embed.type === "link" ? (
                <div
                  className="w-20 h-20 ml-4 mt-2 flex-shrink-0 justify-self-end flex justify-center items-center object-fill"
                  style={{ gridRow: "1/8", gridColumn: "2/2" }}
                >
                  <Image
                    withPlaceholder
                    width={80}
                    height={80}
                    radius={4}
                    fit="contain"
                    src={
                      embed.thumbnail.url && !Array.isArray(embed.image)
                        ? embed.image.url
                        : embed.image[0].url
                    }
                  />
                </div>
              ) : (
                <div
                  className="mt-4 min-w-0 rounded object-fill flex justify-center items-center"
                  style={{ gridColumn: "1/1", width: "100%", height: "auto" }}
                >
                  {embed.type === "article" ? (
                    <Image
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
                    />
                  ) : (
                    <ReactPlayer url={embed.url} controls={true} Ơ />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </article>
    </div>
  );
};
