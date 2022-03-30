import { IconClose } from "@douyinfe/semi-icons";
import { ActionIcon } from "@mantine/core";
import React, { useState } from "react";
import Delayed from "../../Delayed";
import Account from "./utils/Account";
import Sessions from "./utils/Sessions";
import AudioVideo from "./utils/AudioVideo";
import Language from "./utils/Language";
import Display from "./utils/Display";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Checkbox from "../../Checkbox";
import Hotkeys from "./utils/Hotkeys";
import { useHotkeys } from '@mantine/hooks';

const sidebar = [
  {
    title: "Cài đặt người dùng",
    items: [
      {
        title: "Tài khoản của tôi",
        value: "account",
        icon: "fa-user",
      },
      {
        title: "Hồ sơ người dùng",
        value: "profile",
        icon: "fa-id-card",
      },
      {
        title: "Bảo mật & an toàn",
        value: "security",
        icon: "fa-shield",
      },
      {
        title: "Quản lý phiên",
        value: "sessions",
        icon: "fa-circle-check",
      },
      {
        title: "Kết nối",
        value: "connections",
        icon: "fa-plug",
      },
    ],
  },
  {
    title: "Cài đặt ứng dụng",
    items: [
      {
        title: "Hiển thị",
        value: "display",
        icon: "fa-tv",
      },
      {
        title: "Trợ năng",
        value: "help",
        icon: "fa-tachograph-digital",
      },
      {
        title: "Giọng nói và Video",
        value: "audio",
        icon: "fa-headset",
      },
      {
        title: "Văn bản và Hình ảnh",
        value: "text",
        icon: "fa-file-image",
      },
      {
        title: "Các thông báo",
        value: "notifications",
        icon: "fa-bell",
      },
      {
        title: "Các phím nóng",
        value: "hotkeys",
        icon: "fa-keyboard",
      },
      {
        title: "Ngôn ngữ",
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
  {
    title: "Textme",
    items: [
      {
        title: "Bot của tôi",
        value: "bots",
        icon: "fa-robot",
      },
      {
        title: "Labs",
        value: "labs",
        icon: "fa-flask",
      },
      {
        title: "Nhật ký thay đổi",
        value: "logs",
        icon: "fa-history",
      },
      {
        title: "Phản hồi",
        value: "feedback",
        icon: "fa-comment-alt",
      },
      {
        title: "Đăng xuất",
        value: "logout",
        icon: "fa-sign-out-alt",
      },
    ],
  },
];

export default function ModalUsersSetting({ opened, onClose }) {
  const [active, setActive] = useState(sidebar[0].items[0].value);
  useHotkeys([
    ['escape', () => onClose()],
  ]);
  return (
    // <Delayed show={opened}>
      <div
        className="flex w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-white overflow-hidden"
        style={{ zIndex: 500 }}
      >
        <div
          className="flex justify-end bg-slate-300 pt-10"
          style={{ flex: "1 0 200px" }}
        >
          <div
            style={{ flex: "1 0 auto", overflow: "hidden scroll" }}
            className="pr-0 flex-row items-start flex justify-end"
          >
            <div
              className="sidebar w-64 h-full flex flex-col pb-6 pl-6 pr-4 overflow-y-auto flex-shrink-0"
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            >
              <div>
                {sidebar &&
                  sidebar.map((item, index) => {
                    const sidebarItems = item.items.map((it, index) => (
                      <div
                        key={item.value}
                        className={`flex items-center h-8 px-2 text-base cursor-pointer gap-2 hover:bg-gray-200 ${
                          active === it.value && "bg-gray-200"
                        }`}
                        style={{ marginBottom: 2, borderRadius: 6 }}
                        onClick={() => {
                          setActive(it.value);
                        }}
                      >
                        <div className="flex items-center justify-center w-5 contrast-50">
                          <FontAwesomeIcon icon={`fa-solid ${it.icon}`}/>
                        </div>
                        <div>{it.title}</div>
                      </div>
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
            {active && active === "notifications" && <div>Notifications</div>}

            {/* Các phím nóng */}
            {active && active === "hotkeys" && <Hotkeys />}

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
    // </Delayed>
  );
}
