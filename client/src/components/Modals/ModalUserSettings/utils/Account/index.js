import { Divider, Text } from "@mantine/core";
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
                    {showPhone ? "Ẩn" : "Hiện"}
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
