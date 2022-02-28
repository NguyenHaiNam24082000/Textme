import React, { useEffect, useRef, useState } from "react";
import Modal from "../../Modal";
import { Text, Divider, ActionIcon } from "@mantine/core";
import { useUA } from "../../../hooks/use-ua-parser-js";
import Delayed from "../../Delayed";
import { IconClose } from "@douyinfe/semi-icons";

const sidebar = [
  {
    title: "Cài đặt người dùng",
    items: [
      {
        title: "Tài khoản của tôi",
        value: "account",
        icon: "user",
      },
      {
        title: "Hồ sơ người dùng",
        value: "profile",
        icon: "cog",
      },
      {
        title: "Bảo mật & an toàn",
        value: "security",
        icon: "cog",
      },
      {
        title: "Quản lý phiên",
        value: "sessions",
        icon: "cog",
      },
      {
        title: "Kết nối",
        value: "connections",
        icon: "cog",
      },
    ],
  },
  {
    title: "Cài đặt ứng dụng",
    items: [
      {
        title: "Hiển thị",
        value: "display",
        icon: "lock",
      },
      {
        title: "Trợ năng",
        value: "help",
        icon: "key",
      },
      {
        title: "Giọng nói và Video",
        value: "audio",
        icon: "key",
      },
      {
        title: "Văn bản và Hình ảnh",
        value: "text",
        icon: "key",
      },
      {
        title: "Các thông báo",
        value: "notifications",
        icon: "key",
      },
      {
        title: "Các phím nóng",
        value: "hotkeys",
        icon: "key",
      },
      {
        title: "Ngôn ngữ",
        value: "language",
        icon: "key",
      },
      {
        title: "Chế độ streamer",
        value: "streamer",
        icon: "key",
      },
      {
        title: "Nâng cao",
        value: "advanced",
        icon: "key",
      },
    ],
  },
  {
    title: "Textme",
    items: [
      {
        title: "Bot của tôi",
        value: "bots",
        icon: "key",
      },
      {
        title: "Nhật ký thay đổi",
        value: "logs",
        icon: "key",
      },
      {
        title: "Phản hồi",
        value: "feedback",
        icon: "key",
      },
      {
        title: "Đăng xuất",
        value: "logout",
        icon: "key",
      },
    ],
  },
];

export default function ModalUsersSetting({ opened, onClose }) {
  const [active, setActive] = useState(sidebar[0].items[0].value);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [info, setInfo] = useState({
    username: "NguyenHaiNam",
    email: "nghainam2000@gmail.com",
    phone: "0989898989",
    password: "********",
  });
  const UADetails = useUA(); //get current browser data
  return (
    <Delayed show={opened}>
      <div
        className="flex w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-white"
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
            {/* Tài khoản người dùng */}
            {/* <div className="flex flex-col w-full h-full">
          <div className="flex flex-col w-full">
            <h3 className="text-xl font-semibold mb-3">Tài khoản người dùng</h3>
            <div className="flex flex-col w-full h-auto bg-gray-200 rounded-lg">
              <div
                className="flex flex-col mx-4 mb-4 mt-2 bg-white flex-auto p-4"
                style={{ borderRadius: "inherit" }}
              >
                <div className="flex w-full h-full justify-between items-center">
                  <div className="flex flex-col">
                    <div className="flex uppercase text-xs font-semibold mb-1">
                      Tên đăng nhập
                    </div>
                    <div className="flex">{info.username}</div>
                  </div>
                  <div className="flex">button</div>
                </div>
                <div className="flex w-full h-full justify-between items-center mt-6">
                  <div className="flex flex-col">
                    <div className="flex uppercase text-xs font-semibold mb-1">
                      Email
                    </div>
                    <div className="flex items-center">
                      {showEmail
                        ? info.email
                        : info.email.replace(/[^@.]/g, "*")}
                      <Text
                        variant="link"
                        className="ml-1 cursor-pointer"
                        onClick={() => setShowEmail((v) => !v)}
                      >
                        {showEmail ? <>Ẩn</> : <>Hiện</>}
                      </Text>
                    </div>
                  </div>
                  <div className="flex">button</div>
                </div>
                <div className="flex w-full h-full justify-between items-center mt-6">
                  <div className="flex flex-col">
                    <div className="flex uppercase text-xs font-semibold mb-1">
                      Số điện thoại
                    </div>
                    <div className="flex items-center">
                      {showPhone ? info.phone : info.phone.replace(/./g, "*")}
                      <Text
                        variant="link"
                        className="ml-1 cursor-pointer"
                        onClick={() => setShowPhone((v) => !v)}
                      >
                        {showPhone ? <>Ẩn</> : <>Hiện</>}
                      </Text>
                    </div>
                  </div>
                  <div className="flex">button</div>
                </div>
                <div className="flex w-full h-full justify-between items-center mt-6">
                  <div className="flex flex-col">
                    <div className="flex uppercase text-xs font-semibold mb-1">
                      Mật khẩu
                    </div>
                    <div className="flex">{info.password}</div>
                  </div>
                  <div className="flex">button</div>
                </div>
              </div>
            </div>
          </div>
          <Divider className="my-6" />
          <div className="flex flex-col w-full">
            <h3 className="text-xl font-semibold mb-3">Bảo mật hai lớp</h3>
            <h6 className="text-xs font-medium">
              Two-factor authentication is currently work-in-progress. Bảo vệ
              tài khoản Discord bằng một lớp bảo mật bổ sung. Sau khi điều
              chỉnh, bạn sẽ được yêu cầu nhập cả mật khẩu và mã xác thực từ điện
              thoại di động để đăng nhập.
            </h6>
          </div>
          <Divider className="my-6" />
          <div className="flex flex-col w-full">
            <h3 className="text-xl font-semibold mb-3">Quản lý tài khoản</h3>
            <h6 className="text-xs font-medium">
              Vô hiệu hoá hoặc xoá tài khoản của bạn bất cứ lúc nào. Hành động
              này sẽ đăng xuất và xoá hoàn toàn tài khoản của bạn, bao gồm lịch
              sử trò chuyện và bạn bè.
            </h6>
          </div>
        </div> */}

            {/* Quản lý phiên */}
            <div className="flex flex-col w-full h-full">
              <div className="flex flex-col w-full">
                <h3 className="text-xl font-semibold mb-3">
                  Các phiên đăng nhập
                </h3>
                <h6 className="text-xs font-medium">
                  Vô hiệu hoá hoặc xoá tài khoản của bạn bất cứ lúc nào. Hành
                  động này sẽ đăng xuất và xoá hoàn toàn tài khoản của bạn, bao
                  gồm lịch sử trò chuyện và bạn bè.
                </h6>
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full bg-slate-300 p-3 rounded-lg my-3">
                    <div className="flex w-full mb-2 text-xs font-semibold">
                      Thiết bị này
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="text-sm font-semibold">
                        {`${UADetails.browser.name} on ${UADetails.os.name} ${UADetails.os.version}`}
                      </div>
                      <div className="text-xs">Đăng nhập từ 7 giờ trước</div>
                    </div>
                  </div>
                </div>
                <Divider className="my-6" />
              </div>
            </div>
          </div>
          <div className="ml-5 relative w-16" style={{ flex: "0 0 36px" }}>
            <ActionIcon className="fixed" onClick={onClose}>
              <IconClose />
            </ActionIcon>
          </div>
        </div>
      </div>
    </Delayed>
  );
}
