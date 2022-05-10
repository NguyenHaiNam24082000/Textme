import { IconClose } from "@douyinfe/semi-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Box, Divider, Transition } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { themeSelector } from "../../../store/uiSlice";
import { GetMe, logoutSuccess } from "../../../store/userSlice";
import { logout } from "../../../apis/auth";
import getSocket from "../../../apis/socket";
import { ME_SOCKET } from "../../../configs/socketRoute";
import Account from "./utils/Account";
import AudioVideo from "./utils/AudioVideo";
import Display from "./utils/Display";
import Hotkeys from "./utils/Hotkeys";
import Language from "./utils/Language";
import Sessions from "./utils/Sessions";
import { useTranslation } from "react-i18next";

// const sidebar = [
//   {
//     title: "Cài đặt người dùng",
//     items: [
//       {
//         title: "Tài khoản của tôi",
//         value: "account",
//         icon: "fa-user",
//       },
//       // {
//       //   title: "Hồ sơ người dùng",
//       //   value: "profile",
//       //   icon: "fa-id-card",
//       // },
//       // {
//       //   title: "Bảo mật & an toàn",
//       //   value: "security",
//       //   icon: "fa-shield",
//       // },
//       // {
//       //   title: "Quản lý phiên",
//       //   value: "sessions",
//       //   icon: "fa-circle-check",
//       // },
//       // {
//       //   title: "Kết nối",
//       //   value: "connections",
//       //   icon: "fa-plug",
//       // },
//     ],
//   },
//   {
//     title: "Cài đặt ứng dụng",
//     items: [
//       {
//         title: "Hiển thị",
//         value: "display",
//         icon: "fa-tv",
//       },
//       // {
//       //   title: "Trợ năng",
//       //   value: "help",
//       //   icon: "fa-tachograph-digital",
//       // },
//       {
//         title: "Giọng nói và Video",
//         value: "audio",
//         icon: "fa-headset",
//       },
//       // {
//       //   title: "Văn bản và Hình ảnh",
//       //   value: "text",
//       //   icon: "fa-file-image",
//       // },
//       // {
//       //   title: "Các thông báo",
//       //   value: "notifications",
//       //   icon: "fa-bell",
//       // },
//       // {
//       //   title: "Các phím nóng",
//       //   value: "hotkeys",
//       //   icon: "fa-keyboard",
//       // },
//       {
//         title: "Ngôn ngữ",
//         value: "language",
//         icon: "fa-earth-asia",
//       },
//       // {
//       //   title: "Chế độ streamer",
//       //   value: "streamer",
//       //   icon: "key",
//       // },
//       // {
//       //   title: "Nâng cao",
//       //   value: "advanced",
//       //   icon: "key",
//       // },
//     ],
//   },
//   // {
//   //   title: "Textme",
//   //   items: [
//   //     {
//   //       title: "Bot của tôi",
//   //       value: "bots",
//   //       icon: "fa-robot",
//   //     },
//   //     {
//   //       title: "Labs",
//   //       value: "labs",
//   //       icon: "fa-flask",
//   //     },
//   //     {
//   //       title: "Nhật ký thay đổi",
//   //       value: "logs",
//   //       icon: "fa-history",
//   //     },
//   //     {
//   //       title: "Phản hồi",
//   //       value: "feedback",
//   //       icon: "fa-comment-alt",
//   //     },
//   //   ],
//   // },
// ];

const transition = {
  out: {
    transform: "scale(1.2)",
    opacity: 0,
  },
  in: {
    transform: "scale(1)",
    opacity: 1,
  },
  transitionProperty: "opacity, transform",
};

export default function ModalUsersSetting({ opened, onClose }) {
  useHotkeys([["escape", () => onClose()]]);
  const theme = useSelector(themeSelector);
  const user = GetMe();
  const history = useNavigate();
  const dispatch = useDispatch();
  const cache = useQueryClient();
  const socket = getSocket(user?.user?.tokens?.access?.token);
  const { t } = useTranslation();
  const sidebar = [
    {
      title: t("User Settings"),
      items: [
        {
          title: t("My Account"),
          value: "account",
          icon: "fa-user",
        },
        // {
        //   title: "Hồ sơ người dùng",
        //   value: "profile",
        //   icon: "fa-id-card",
        // },
        // {
        //   title: "Bảo mật & an toàn",
        //   value: "security",
        //   icon: "fa-shield",
        // },
        // {
        //   title: "Quản lý phiên",
        //   value: "sessions",
        //   icon: "fa-circle-check",
        // },
        // {
        //   title: "Kết nối",
        //   value: "connections",
        //   icon: "fa-plug",
        // },
      ],
    },
    {
      title: t("App Settings"),
      items: [
        {
          title: t("Display"),
          value: "display",
          icon: "fa-tv",
        },
        // {
        //   title: "Trợ năng",
        //   value: "help",
        //   icon: "fa-tachograph-digital",
        // },
        {
          title: t("Voice & Video"),
          value: "audio",
          icon: "fa-headset",
        },
        // {
        //   title: "Văn bản và Hình ảnh",
        //   value: "text",
        //   icon: "fa-file-image",
        // },
        // {
        //   title: "Các thông báo",
        //   value: "notifications",
        //   icon: "fa-bell",
        // },
        // {
        //   title: "Các phím nóng",
        //   value: "hotkeys",
        //   icon: "fa-keyboard",
        // },
        {
          title: t("Language"),
          value: "language",
          icon: "fa-earth-asia",
        },
        // {
        //   title: "Chế độ streamer",
        //   value: "streamer",
        //   icon: "key",
        // },
        // {
        //   title: "Nâng cao",
        //   value: "advanced",
        //   icon: "key",
        // },
      ],
    },
    // {
    //   title: "Textme",
    //   items: [
    //     {
    //       title: "Bot của tôi",
    //       value: "bots",
    //       icon: "fa-robot",
    //     },
    //     {
    //       title: "Labs",
    //       value: "labs",
    //       icon: "fa-flask",
    //     },
    //     {
    //       title: "Nhật ký thay đổi",
    //       value: "logs",
    //       icon: "fa-history",
    //     },
    //     {
    //       title: "Phản hồi",
    //       value: "feedback",
    //       icon: "fa-comment-alt",
    //     },
    //   ],
    // },
  ];
  const [active, setActive] = useState(sidebar[0].items[0].value);

  const logoutHandler = async () => {
    if (user) {
      try {
        await logout(user?.tokens?.refresh?.token);
        cache.clear();
        dispatch(logoutSuccess());
        history("./login");

        //disconnect socket after logout.
        socket.emit(ME_SOCKET.LOGOUT, { userId: user?.user?.id });
        socket.close();
      } catch (err) {
        console.log("err: ", err);
      }
    }
  };
  return (
    <Transition
      mounted={opened}
      transition={transition}
      duration={340}
      timingFunction={"cubic-bezier(.2,.9,.5,1.16)"}
    >
      {(styles) => (
        <div
          className="flex w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-white overflow-hidden"
          style={{ zIndex: 9999, ...styles }}
        >
          <div
            className="flex justify-end bg-slate-300 pt-10"
            style={{ flex: "1 0 200px", background: theme.sidebarBackground }}
          >
            <div
              style={{ flex: "1 0 auto", overflow: "hidden scroll" }}
              className="pr-0 flex-row items-start flex justify-end"
            >
              <div
                className="sidebar w-64 h-full flex flex-col pb-6 pl-6 pr-4 overflow-y-auto flex-shrink-0"
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  color: theme.textColor,
                }}
              >
                <div>
                  {sidebar &&
                    sidebar.map((item, index) => {
                      const sidebarItems = item.items.map((it, index) => (
                        <Box
                          key={item.value}
                          sx={(t) => ({
                            background:
                              active === it.value &&
                              `${theme.activeItem}!important`,
                            color:
                              active === it.value &&
                              `${theme.activeItemText}!important`,
                            "&:hover": {
                              background: `${theme.hoverItem}!important`,
                            },
                          })}
                          className={`flex items-center h-8 px-2 text-base cursor-pointer gap-2 hover:bg-gray-200 ${
                            active === it.value && "bg-gray-200"
                          }`}
                          style={{ marginBottom: 2, borderRadius: 6 }}
                          onClick={() => {
                            setActive(it.value);
                          }}
                        >
                          <div className="flex items-center justify-center w-5 contrast-50">
                            <FontAwesomeIcon icon={`fa-solid ${it.icon}`} />
                          </div>
                          <div>{it.title}</div>
                        </Box>
                      ));

                      return (
                        <>
                          <div
                            key={index}
                            className="category text-xs font-bold py-1 pl-2 mb-1 mt-1 uppercase"
                          >
                            {item.title}
                          </div>
                          {sidebarItems}
                        </>
                      );
                    })}
                  <Divider m={4} />
                  <Box
                    sx={(t) => ({
                      "&:hover": {
                        background: `${theme.hoverItem}!important`,
                      },
                    })}
                    className={`flex items-center h-8 px-2 text-base cursor-pointer gap-2 hover:bg-gray-200`}
                    style={{ marginBottom: 2, borderRadius: 6 }}
                    onClick={() => {
                      logoutHandler();
                    }}
                  >
                    <div className="flex items-center justify-center w-5 contrast-50">
                      <FontAwesomeIcon icon="fa-solid fa-sign-out-alt" />
                    </div>
                    <div>{t("Logout")}</div>
                  </Box>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex h-full overflow-y-auto pb-6 pt-16 px-12"
            style={{ flex: "1 1 800px", overflow: "hidden auto" }}
          >
            <div className="w-full h-full">
              {/* Tài khoản người dùng */}
              {active && active === "account" && <Account />}

              {/* Quản lý phiên */}
              {active && active === "sessions" && <Sessions />}

              {/* Hồ sơ người dùng */}
              {active && active === "profile" && <div>Profile</div>}

              {/* Bảo mật & an toàn */}
              {active && active === "security" && <div>Security</div>}

              {/* Hiển thị */}
              {active && active === "display" && <Display />}

              {/* Trợ năng */}
              {active && active === "help" && <div>Help</div>}

              {/* Giọng nói và Video */}
              {active && active === "audio" && <AudioVideo />}

              {/* Văn bản và Hình ảnh */}
              {/* {active && active === "text" && <TextImage />} */}

              {/* Các thông báo */}
              {/* {active && active === "notifications" && <div>Notifications</div>} */}

              {/* Các phím nóng */}
              {/* {active && active === "hotkeys" && <Hotkeys />} */}

              {/* Ngôn ngữ */}
              {active && active === "language" && <Language />}
            </div>
            <div className="ml-5 relative w-16" style={{ flex: "0 0 36px" }}>
              <ActionIcon className="fixed" onClick={onClose}>
                <IconClose />
              </ActionIcon>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
}
