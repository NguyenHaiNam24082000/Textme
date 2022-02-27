import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { motion, AnimatePresence } from "framer-motion";
import ThemeLayout from "../ThemeLayout";
import { themes } from "../../configs/themes";
import { RadioGroup, Radio } from "@mantine/core";
import { InputWrapper } from "@mantine/core";

const sidebarNavItems = [
  {
    display: "General",
  },
  {
    display: "Appearance",
  },
  {
    display: "Notifications",
  },
  {
    display: "Preferences",
  },
  {
    display: "Voice & Video",
  },
  {
    display: "Security & Privacy",
  },
  {
    display: "Help & About",
  },
];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const [activeDisplayName, setActiveDisplayName] = useState(
    sidebarNavItems[0].display
  );
  const [checkRadioValue, setCheckRadioValue] = useState("360channel");
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      const sidebarItem =
        sidebarRef.current.querySelector(".sidebar-menu-item");
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 32);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = activeDisplayName;
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.display === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [activeDisplayName]);

  return (
    <div className="sidebar">
      <div ref={sidebarRef} className="sidebar-menu w-64 bg-black py-6 pl-6 pr-4">
        <div
          ref={indicatorRef}
          className="sidebar-menu-indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveDisplayName(item.display)}
            className={`sidebar-menu-item cursor-pointer ${
              activeIndex === index && "active"
            }`}
          >
            <div className="sidebar-menu-item-text">{item.display}</div>
          </div>
        ))}
      </div>
      <div className="sidebar-content overflow-y-auto">
        <AnimatePresence exitBeforeEnter>
          {sidebarNavItems.map(
            (item, index) =>
              activeIndex === index && (
                <motion.div
                  key={index}
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex flex-wrap justify-evenly h-full"
                >
                  {/* {themes
                    .sort((a, b) =>
                      a.name
                        .toLowerCase()
                        .localeCompare(b.name.toLocaleLowerCase())
                    )
                    .map((theme) => (
                      <div
                        key={theme.value}
                        className="flex flex-col rounded-lg border-2 h-auto flex-shrink-0 overflow-hidden mb-5 cursor-pointer"
                        style={{
                          padding: 2,
                          width: "30%",
                          borderColor:
                            theme.value === checkRadioValue
                              ? "#4eabd2"
                              : "#f1f1f1",
                          backgroundColor:
                            theme.value === checkRadioValue
                              ? "rgba(29,155,209,.12)"
                              : "#fff",
                        }}
                        onClick={() => setCheckRadioValue(theme.value)}
                      >
                        <ThemeLayout
                          sidebar={theme.sidebarBackground}
                          channel={theme.sidebarBackground}
                          activeItem={theme.activeItem}
                        />
                        <div className="text-center h-12 border-t-2 flex w-full items-center justify-center">
                          {theme.name}
                        </div>
                      </div>
                    ))} */}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
