import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { motion, AnimatePresence } from "framer-motion";

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
      <div ref={sidebarRef} className="sidebar-menu">
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
      <div className="sidebar-content">
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
                >
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                  <div className="font-bold">{item.display}</div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
