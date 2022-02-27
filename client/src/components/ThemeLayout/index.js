import React from "react";
import { FaHashtag, FaCircle } from "react-icons/fa";

export default function ThemeLayout({
  background,
  sidebar,
  channel,
  activeItem,
  textColor,
  border,
}) {
  return (
    <div className="flex h-40 w-full overflow-hidden" style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
      <div
        className="flex flex-col items-center w-5 h-full"
        style={{ borderRight: `2px solid ${border}`, background: `${sidebar}` }}
      >
        <div
          className="w-3 h-3 mt-1"
          style={{
            borderRadius: "50%",
            opacity: 0.5,
            boxShadow: "inset 0 0 0 6px",
          }}
        ></div>
        <div
          className="w-3 h-3 mt-1"
          style={{
            borderRadius: "50%",
            opacity: 0.4,
            boxShadow: "inset 0 0 0 6px",
          }}
        ></div>
        <div
          className="w-3 h-3 mt-1"
          style={{
            borderRadius: "50%",
            opacity: 0.3,
            boxShadow: "inset 0 0 0 6px",
          }}
        ></div>
        <div
          className="w-3 h-3 mt-1"
          style={{
            borderRadius: "50%",
            opacity: 0.2,
            boxShadow: "inset 0 0 0 6px",
          }}
        ></div>
        <div
          className="w-3 h-3 mt-1"
          style={{
            borderRadius: "50%",
            opacity: 0.1,
            boxShadow: "inset 0 0 0 6px",
          }}
        ></div>
      </div>
      <div
        className="w-36 h-full"
        style={{ borderRight: `2px solid ${border}`, background: `${channel}` }}
      >
        <div className="flex flex-col w-full h-full pb-1">
          <div className="flex w-full h-5 items-center justify-start px-3">
            <div
              className="w-12 pt-1"
              style={{
                height: 6,
                borderRadius: 3,
                opacity: 0.5,
                boxShadow: "inset 0 0 0 6px",
              }}
            ></div>
          </div>
          <div className="flex h-5 justify-start items-center px-3">
            <FaHashtag
              className="relative inline-flex h-5 items-center justify-center"
              style={{ width: 8, opacity: 0.7, transform: "translateY(-1px)" }}
            />
            <div
              className="w-16 ml-1"
              style={{
                height: 6,
                borderRadius: 3,
                opacity: 0.5,
                boxShadow: "inset 0 0 0 6px",
              }}
            ></div>
          </div>
          <div
            className="flex h-5 justify-start items-center px-3"
            style={{ backgroundColor: `${activeItem}` }}
          >
            <FaHashtag
              className="relative inline-flex h-5 items-center justify-center"
              style={{ width: 8, opacity: 0.7, transform: "translateY(-1px)" }}
            />
            <div
              className="w-16 ml-1"
              style={{
                height: 6,
                borderRadius: 3,
                opacity: 0.5,
                boxShadow: "inset 0 0 0 6px",
              }}
            ></div>
          </div>
          <div className="flex h-5 justify-start items-center px-3">
            <FaCircle
              className="relative inline-flex h-5 items-center justify-center"
              style={{ width: 8, opacity: 0.7, transform: "translateY(-1px)" }}
            />
            <div
              className="w-16 ml-1"
              style={{
                height: 6,
                borderRadius: 3,
                opacity: 0.5,
                boxShadow: "inset 0 0 0 6px",
              }}
            ></div>
            <div
              className="w-5 ml-auto"
              style={{ background: "blue", height: 10, borderRadius: 5 }}
            ></div>
          </div>
          {/* <div className="flex h-5 justify-start items-center px-3 mt-auto">
            <div
              className="w-1/2 h-full bg-green-200 mr-1"
              style={{ borderRadius: 4 }}
            ></div>
            <div
              className="w-1/2 h-full bg-red-200 ml-1"
              style={{ borderRadius: 4 }}
            ></div>
          </div> */}
        </div>
      </div>
      <div
        className="flex-auto h-full"
        style={{ background: `${background}` }}
      ></div>
    </div>
  );
}
