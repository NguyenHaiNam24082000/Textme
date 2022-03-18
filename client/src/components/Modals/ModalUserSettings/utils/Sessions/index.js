import { Divider } from "@mantine/core";
import React from "react";
import { useUA } from "../../../../../hooks/use-ua-parser-js";

export default function Sessions() {
  const UADetails = useUA(); //get current browser data
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold mb-3">Các phiên đăng nhập</h3>
        <h6 className="text-xs font-medium">
          Vô hiệu hoá hoặc xoá tài khoản của bạn bất cứ lúc nào. Hành động này
          sẽ đăng xuất và xoá hoàn toàn tài khoản của bạn, bao gồm lịch sử trò
          chuyện và bạn bè.
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
  );
}
