import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import {
  Highlight,
  TypographyStylesProvider,
  Avatar,
  ActionIcon,
  Menu,
  Divider,
  Text,
  Badge,
} from "@mantine/core";
import "./index.css";
import Sparkles from "../MessageEffect/Sparkles";
import "@lottiefiles/lottie-player";
import "@lottiefiles/lottie-player";
import useSound from "use-sound";
import fireSound from "../../assets/sounds/fire.mp3";
import wowSound from "../../assets/sounds/wow.mp3";
import test from "../../assets/images/test.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import ACard from "../ACard";
import CodeBlockPreview from "../PreviewFeature/CodeBlockPreview";
import DocumentPreview from "../PreviewFeature/DocumentPreview";
import MusicPreview from "../PreviewFeature/MusicPreview";
import MessageInlineEditor from "../MessageInlineEditor";
import { getTime, isNewDay, getTimeDifference } from "../../commons/dataUtils";
import ModalMessageEdits from "../Modals/ModalMessageEdits";
const item = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] },
  },
};

export default function Message(props) {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const x = useMotionValue(0);
  const [play] = useSound(fireSound);
  const [play2] = useSound(wowSound);
  const [edit, setEdit] = useState(false);
  let i;
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const checkSameTime = (message1, message2) => {
    return getTimeDifference(message1.createdAt, message2.createdAt) < 5;
  };

  const isExtraMessage = () => {
    const index = props.messages.findIndex((m) => m.id === props.message.id);
    // const prev = props.messages[index - 1];
    // if (!prev) return false;
    if (index + 1 >= props.messages.length) return false;
    const next = props.messages[index + 1];
    return (
      (next.userId === props.message.userId &&
        checkSameTime(props.message, next)) ||
      props.message.systemMessage
    );
  };

  const hasAfterMessage = () => {
    const index = props.messages.findIndex((m) => m.id === props.message.id);
    i = index;
    // if (index + 1 >= props.messages.length) return false;
    // const next = props.messages[index + 1];
    // return next.userId === props.message.userId;
    const prev = props.messages[index - 1];
    if (!prev) return false;
    return true;
  };

  const hasNewDate = () => {
    const index = props.messages.findIndex((m) => m.id === props.message.id);
    if (index + 1 >= props.messages.length) return false;
    const next = props.messages[index + 1];
    return isNewDay(next.createdAt, props.message.createdAt);
  };

  const isActuallyExtraMessage = isExtraMessage();
  const hasActuallyAfterMessage = hasAfterMessage();
  const isActuallyNewDay = hasNewDate();

  const LeftSide = () => {
    return isActuallyExtraMessage ? (
      <div
        style={{
          width: 56,
          fontSize: 10,
          marginRight: 4,
          color: "rgb(116, 127, 141)",
          height: 22,
          lineHeight: "22px",
        }}
        className="chat-time text-center"
      >
        {getTime(props.message.createdAt)}
      </div>
    ) : (
      <div className="chat-avatar">
        <Avatar
          radius="xl"
          size={40}
          className="hover:shadow-md cursor-pointer"
          src="https://cdn.discordapp.com/icons/854810300876062770/f4121b15626152fd6c6ba71e078f9936.webp?size=128"
        />
      </div>
    );
  };

  const MessageHeader = () => {
    return isActuallyExtraMessage ? null : (
      <div className="chat-content-member">
        <span className="text-sm font-bold" style={{ color: "rgb(255,0,17)" }}>
          {props.message.sender.username}
        </span>
        <span
          style={{ fontSize: 10, color: "#72767d", direction: "ltr" }}
          className="flex h-full mx-3 items-center"
        >
          {getTime(props.message.createdAt)}
        </span>
      </div>
    );
  };
  const fire = props.message.id === 89;
  const MessageText = () => {
    return (
      <>
        {props.message.systemMessage && (
          <Badge
            sx={{ paddingLeft: 0 }}
            // size="xs"
            radius="xl"
            color="teal"
            leftSection={
              <Avatar
                radius="xl"
                alt="Avatar for badge"
                size={18}
                mr={5}
                src="https://cdn.discordapp.com/icons/854810300876062770/f4121b15626152fd6c6ba71e078f9936.webp?size=128"
              />
            }
          >
            {props.message.sender.username}
          </Badge>
        )}
        <Highlight
          style={{
            overflowWrap: "break-word",
            zIndex: 3,
            borderRadius: "inherit",
            backgroundImage: `url(${test})`,
          }}
          className="message-content text-sm h-full bg-inherit text-black"
          highlight={props.searchMessage.split(" ")}
          // onClick={() => (fire ? play() : play2())}
          children={props.message.content}
        ></Highlight>
        {props.message.messagesEdited.length>=1 && (
          <Text size="xs" color="dimmed" className="align-baseline">
            (Đã chỉnh sửa)
            <ModalMessageEdits />
          </Text>
          
        )}
        {/* // <ACard />
      // <CodeBlockPreview />
      // <div className="flex flex-col">
      //   <DocumentPreview />
      //   <MusicPreview url={"https://vnno-vn-5-tf-mp3-320s1-zmp3.zadn.vn/6b2b7943f7041e5a4715/8109663103068771612?authen=exp=1647341485~acl=/6b2b7943f7041e5a4715/*~hmac=4f0ebbb630c35a1b4cdfc21d790c0ffb&fs=MTY0NzE2ODY4NTA2OHx3ZWJWNnwwfDExNy4yLjY2LjE4OA"}/>
      // </div> */}
      </>
    );
  };

  return (
    <>
      {props.isUnread && (
        <div className="sticky z-20 flex w-full -top-1">
          <div className="absolute top-3 left-2">
            <div className="text-center my-1">
              <span
                className="text-white font-bold h-6 px-2 inline-flex justify-center items-center rounded-md shadow-md text-xs cursor-pointer"
                style={{ border: "2px solid #FD6671", background: "#FD6671" }}
              >
                New
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${!isActuallyExtraMessage ? "mt-3" : ""} ${
          !hasActuallyAfterMessage ? "mb-3" : ""
        }`}
      >
        {isActuallyNewDay && (
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
                          border: !props.isUnread
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
                    borderTop: !props.isUnread
                      ? "2px solid #e2e2e2"
                      : "2px solid #FD6671",
                  }}
                ></div>
              </div>
            </div>
          </>
        )}
        <div
          className={`chat-box ${
            props.message.userId === 10 || props.message.userId === 6
              ? "chat-box-sender"
              : ""
          }`}
        >
          <div className="chat-content">
            <LeftSide />
            <MessageHeader />
            <div className="relative">
              <div
                ref={ref}
                style={{
                  x,
                  cursor: "pointer",
                  zIndex: 2,
                  // background: fire
                  //   ? `url(https://us.123rf.com/450wm/macrovector/macrovector1905/macrovector190500014/122825424-flame-of-gold-fire-on-dark-transparent-background-with-red-sparks-flying-up-realistic-vector-illustr.jpg?ver=6)`
                  //   : "",
                  // backgroundSize: "contain",
                }}
                className={`${isActuallyExtraMessage ? "message-last" : ""} ${
                  hasActuallyAfterMessage ? "message-first" : ""
                } chat-content-text relative`}
              >
                  {/* // <Sparkles children={<MessageText />} /> */}
                    {edit ? (
                      <MessageInlineEditor message={props.message.content} />
                    ) : (
                      <MessageText />
                    )}
              </div>
              {/* <div className="message-accessories">
                <div className="reactions">
                  <div>
                    <div className="reaction">
                      <div>
                        <div className="reaction-inner">
                          <span>😀</span>
                          <span>1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="msg-toolbar absolute right-0 top-0">
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
                    {!props.message.systemMessage && (
                      <ActionIcon size={32} onClick={() => setEdit(true)}>
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
                      {!props.message.systemMessage || props.message.sender._id===props.user._id && (
                        <Menu.Item
                          icon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                          onClick={() => setEdit(true)}
                        >
                          Chỉnh sửa tin nhắn
                        </Menu.Item>
                      )}
                      <Menu.Item
                        icon={<FontAwesomeIcon icon="fa-solid fa-thumbtack" />}
                      >
                        Ghim tin nhắn
                      </Menu.Item>
                      <Menu.Item
                        icon={<FontAwesomeIcon icon="fa-solid fa-reply" />}
                      >
                        Trả lời
                      </Menu.Item>
                      <Menu.Item>Tạo chủ đề</Menu.Item>
                      <Menu.Item>Đánh dấu chưa đọc</Menu.Item>
                      <Menu.Item
                        icon={<FontAwesomeIcon icon="fa-solid fa-link" />}
                      >
                        Sao chép đường dẫn tin nhắn
                      </Menu.Item>
                      <Menu.Item>Sao chép ID</Menu.Item>
                      {!props.message.systemMessage || props.message.sender._id===props.user._id && (
                        <Menu.Item
                          color="red"
                          icon={
                            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                          }
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
        </div>
      </div>
    </>
  );
}
