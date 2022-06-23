import { IconClose } from "@douyinfe/semi-icons";
import { ActionIcon, Divider, Transition } from "@mantine/core";
import React, { useState } from "react";
import "./index.css";
import Blocked from "./utils/Blocked";
import Categories from "./utils/Categories";
import Invites from "./utils/Invites";
import Members from "./utils/Members";
// import Moderation from "./utils/Moderation";
import Overview from "./utils/Overview";
import Roles from "./utils/Roles";

const sidebar = [
  {
    title: "Test",
    items: [
      {
        title: "Tổng quan",
        value: "overview",
        icon: "user",
      },
      {
        title: "Danh mục",
        value: "categories",
        icon: "cog",
      },
      {
        title: "Vai trò",
        value: "roles",
        icon: "cog",
      },
      // {
      //   title: "Điều chỉnh",
      //   value: "settings",
      //   icon: "cog",
      // },
      // {
      //   title: "Nhật ký chỉnh sửa",
      //   value: "history",
      //   icon: "cog",
      // },
    ],
  },
  {
    title: "Quản lý người dùng",
    items: [
      {
        title: "Thành viên",
        value: "members",
        icon: "lock",
      },
      {
        title: "Lời mời",
        value: "invites",
        icon: "key",
      },
      {
        title: "Chặn",
        value: "blocked",
        icon: "key",
      },
    ],
  },
  {
    title: <Divider />,
    items: [
      {
        title: "Xoá máy chủ",
        value: "delete",
        icon: "key",
      },
    ],
  },
];

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

export default function ModalWorkspaceSettings({ onClose, opened, server }) {
  const [active, setActive] = useState(sidebar[0].items[0].value);

  return (
    <Transition
      key={"modal-workspace-settings"}
      mounted={opened}
      transition={transition}
      duration={340}
      timingFunction={"cubic-bezier(.2,.9,.5,1.16)"}
    >
      {(styles) => (
        <div
          className="flex w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-white"
          style={{ zIndex: 500, ...styles }}
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
                className="sidebar w-64 h-full flex flex-col py-6 pl-6 pr-4 overflow-y-auto flex-shrink-0"
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              >
                <div>
                  {sidebar &&
                    sidebar.map((item, index) => {
                      const sidebarItems = item.items.map((it, index) => (
                        <div
                          key={item.value}
                          className={`flex items-center h-8 px-2 text-base cursor-pointer hover:bg-gray-200 ${
                            active === it.value && "bg-gray-200"
                          }`}
                          style={{ marginBottom: 2, borderRadius: 6 }}
                          onClick={() => {
                            setActive(it.value);
                          }}
                        >
                          {it.title}
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
            style={{ flex: "1 1 800px" }}
          >
            <div className="w-full h-full">
              {active && active === "categories" && <Categories />}
              {active && active === "overview" && <Overview server={server} />}
              {active && active === "roles" && <Roles server={server} />}
              {active && active === "members" && <Members server={server} />}
              {active && active === "invites" && <Invites server={server} />}
              {active && active === "blocked" && <Blocked server={server} />}
              {/* {active && active === "settings" && <Moderation />} */}
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
