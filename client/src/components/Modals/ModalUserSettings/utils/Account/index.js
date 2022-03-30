import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Avatar,
  BackgroundImage,
  Button,
  Divider,
  Group,
  Text,
} from "@mantine/core";
import React, { useState } from "react";

export default function Account() {
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [info, setInfo] = useState({
    username: "NguyenHaiNam",
    email: "nghainam2000@gmail.com",
    phone: "0989898989",
    password: "********",
  });
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold mb-3">Tài khoản người dùng</h3>
        <div className="flex flex-col w-full h-auto bg-gray-200 rounded-lg overflow-hidden">
          <BackgroundImage
            src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
            radius="xs"
            className="h-40"
          />
          <div className="relative">
            <div className="flex w-full gap-3 p-5 justify-between items-center absolute -top-[84px]">
              <div className="flex items-center relative">
                <Avatar
                  size={128}
                  radius="50%"
                  style={{ border: "8px solid #fff" }}
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
                <div
                  className="rounded-full w-8 h-8 justify-center items-center flex absolute bottom-3 right-3"
                  style={{ border: "8px solid #fff" }}
                >
                  😀
                </div>
              </div>
              <Group
                grow
                direction="column"
                className="flex-auto h-32 items-start py-3"
              >
                <div className="flex items-end w-full">
                  <span className="text-white text-2xl font-bold">
                    {/* @{user && pending && pendingUsername(user, pending)} */}
                    @{info.username}
                  </span>
                  <span className="text-slate-300 text-2xl font-medium">
                    #12345
                  </span>
                </div>
                <div className="flex w-full text-black text-sm font-medium items-center">
                  <div className="desc">
                    {/* <span className="desc">
                      💜When you're screaming💜 💜When you're screaming💜 💜When
                      you're screaming💜 💜When you're screaming💜 💜When you're
                      screaming💜💜When you're screaming💜 💜When you're
                      screaming💜
                    </span> */}
                  </div>
                </div>
              </Group>
              <div className="flex flex-col justify-end h-32 py-5">
                <div className="flex items-center gap-2">
                  <Button
                    className="bg-red-600"
                    leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                  >
                    Edit User Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col mx-4 mb-4 mt-20 bg-white flex-auto p-4 gap-6"
            style={{ borderRadius: "inherit" }}
          >
            <div className="flex w-full h-full justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-user"
                  className="text-3xl contrast-0"
                />
                <div className="flex flex-col">
                  <div className="flex uppercase text-xs font-semibold mb-1">
                    Tên đăng nhập
                  </div>
                  <div className="flex">{info.username}</div>
                </div>
              </div>
              <div className="flex">
                <Button
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                  variant="white"
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex w-full h-full justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-at"
                  className="text-3xl contrast-0"
                />
                <div className="flex flex-col">
                  <div className="flex uppercase text-xs font-semibold mb-1">
                    Email
                  </div>
                  <div className="flex items-center">
                    {showEmail ? info.email : info.email.replace(/[^@.]/g, "*")}
                    <Text
                      variant="link"
                      className="ml-1 cursor-pointer"
                      onClick={() => setShowEmail((v) => !v)}
                    >
                      {showEmail ? "Ẩn" : "Hiện"}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex">
                <Button
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                  variant="white"
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex w-full h-full justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-phone"
                  className="text-3xl contrast-0"
                />
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
                      {showPhone ? "Ẩn" : "Hiện"}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex">
                <Button
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                  variant="white"
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex w-full h-full justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-key"
                  className="text-3xl contrast-0"
                />
                <div className="flex flex-col">
                  <div className="flex uppercase text-xs font-semibold mb-1">
                    Mật khẩu
                  </div>
                  <div className="flex">{info.password}</div>
                </div>
              </div>
              <div className="flex">
                <Button
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                  variant="white"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider className="my-6" />
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold mb-3">Bảo mật hai lớp</h3>
        <h6 className="text-xs font-medium">
          Two-factor authentication is currently work-in-progress. Bảo vệ tài
          khoản Discord bằng một lớp bảo mật bổ sung. Sau khi điều chỉnh, bạn sẽ
          được yêu cầu nhập cả mật khẩu và mã xác thực từ điện thoại di động để
          đăng nhập.
        </h6>
      </div>
      <Divider className="my-6" />
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold mb-3">Quản lý tài khoản</h3>
        <h6 className="text-xs font-medium">
          Vô hiệu hoá hoặc xoá tài khoản của bạn bất cứ lúc nào. Hành động này
          sẽ đăng xuất và xoá hoàn toàn tài khoản của bạn, bao gồm lịch sử trò
          chuyện và bạn bè.
        </h6>
      </div>
    </div>
  );
}
