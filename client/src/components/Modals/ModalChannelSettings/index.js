import { IconClose } from "@douyinfe/semi-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Transition } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import React, { useState } from "react";

const sidebar = [
  {
    title: "",
    items: [
      {
        title: "Xem chung",
        value: "overview",
        //   icon: "fa-user",
      },
      {
        title: "Permissions",
        value: "permissions",
        //   icon: "fa-id-card",
      },
      {
        title: "Invites",
        value: "invites",
        //   icon: "fa-shield",
      },
      {
        title: "Delete Channel",
        value: "delete",
        //   icon: "fa-circle-check",
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

export default function ModalChannelSettings({ opened, onClose, channel }) {
  const [active, setActive] = useState(sidebar[0].items[0].value);
  useHotkeys([["escape", () => onClose()]]);
  return (
    // <Delayed show={opened}>
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
                          {/* <div className="flex items-center justify-center w-5 contrast-50">
                            <FontAwesomeIcon icon={`fa-solid ${it.icon}`} />
                          </div> */}
                          <div>{it.title}</div>
                        </div>
                      ));

                      return (
                        <>
                          <div
                            key={index}
                            className="category text-xs font-bold py-1 pl-2 mb-1 mt-1"
                          >
                            {channel ? channel.name: "Channel Settings"}
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
            <div className="w-full h-full"></div>
            <div className="ml-5 relative w-16" style={{ flex: "0 0 36px" }}>
              <ActionIcon className="fixed" onClick={onClose}>
                <IconClose />
              </ActionIcon>
            </div>
          </div>
        </div>
      )}
    </Transition>
    // </Delayed>
  );
}
