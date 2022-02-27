import React from "react";
import { Divider, Image, Switch, Textarea, TextInput } from "@mantine/core";
import { Avatar, Badge, Upload } from "@douyinfe/semi-ui";
import UploadAvatar from "../../../../../assets/images/icons/upload_avatar.svg";

export default function Overview() {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col w-full h-full">
        <h3 className="text-xl font-semibold mb-3">Tổng quan về máy chủ</h3>
        <div className="w-full flex justify-between mb-3">
          <h5 className="text-sm font-semibold">Xem trước</h5>
          <Switch className="cursor-pointer" />
        </div>
        <div className="flex flex-col justify-evenly relative w-full bg-slate-100 rounded-md py-16 overflow-hidden">
          <div
            className="flex justify-evenly w-full h-auto absolute"
            style={{ top: "calc(100% - 32px)" }}
          >
            <div className="inline-flex w-72 h-80 flex-col select-none rounded-md font-normal pointer overflow-hidden">
              <div className="h-32 overflow-hidden bg-slate-300"></div>
              <div className="relative">
                <div className="flex absolute w-full justify-center ">
                  <div
                    className="-mt-12 w-16 h-16 object-cover rounded-full bg-slate-300"
                    style={{ borderWidth: 6 }}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div
                  className="h-full flex flex-col bg-slate-200"
                  style={{ padding: "24px 16px 16px" }}
                >
                  <div className="flex items-center justify-center text-lg font-semibold">
                    <div className="h-5 w-32 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="overflow-hidden text-xs flex-col flex mt-2 gap-2">
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-3/4 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="text-xs flex item-center">
                      <div className="h-4 w-20 bg-slate-300 rounded-sm"></div>
                    </div>
                    <div className="flex text-xs items-center">
                      <div className="h-4 w-12 bg-slate-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex w-72 h-80 flex-col select-none rounded-md font-normal pointer overflow-hidden">
              <div className="h-32 overflow-hidden bg-slate-300"></div>
              <div className="relative">
                <div className="flex absolute w-full justify-center ">
                  <div
                    className="-mt-12 w-16 h-16 object-cover rounded-full bg-slate-300"
                    style={{ borderWidth: 6 }}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div
                  className="h-full flex flex-col bg-slate-200"
                  style={{ padding: "24px 16px 16px" }}
                >
                  <div className="flex items-center justify-center text-lg font-semibold">
                    <div className="h-5 w-32 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="overflow-hidden text-xs flex-col flex mt-2 gap-2">
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-3/4 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="text-xs flex item-center">
                      <div className="h-4 w-20 bg-slate-300 rounded-sm"></div>
                    </div>
                    <div className="flex text-xs items-center">
                      <div className="h-4 w-12 bg-slate-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex w-72 h-80 flex-col select-none rounded-md font-normal pointer overflow-hidden">
              <div className="h-32 overflow-hidden bg-slate-300"></div>
              <div className="relative">
                <div className="flex absolute w-full justify-center ">
                  <div
                    className="-mt-12 w-16 h-16 object-cover rounded-full bg-slate-300"
                    style={{ borderWidth: 6 }}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div
                  className="h-full flex flex-col bg-slate-200"
                  style={{ padding: "24px 16px 16px" }}
                >
                  <div className="flex items-center justify-center text-lg font-semibold">
                    <div className="h-5 w-32 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="overflow-hidden text-xs flex-col flex mt-2 gap-2">
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-3/4 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="text-xs flex item-center">
                      <div className="h-4 w-20 bg-slate-300 rounded-sm"></div>
                    </div>
                    <div className="flex text-xs items-center">
                      <div className="h-4 w-12 bg-slate-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-evenly w-full h-auto">
            <div className="inline-flex w-72 h-80 flex-col select-none rounded-md font-normal pointer overflow-hidden">
              <div className="h-32 overflow-hidden bg-slate-300"></div>
              <div className="relative">
                <div className="flex absolute w-full justify-center ">
                  <div
                    className="-mt-12 w-16 h-16 object-cover rounded-full bg-slate-300"
                    style={{ borderWidth: 6 }}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div
                  className="h-full flex flex-col bg-slate-200"
                  style={{ padding: "24px 16px 16px" }}
                >
                  <div className="flex items-center justify-center text-lg font-semibold">
                    <div className="h-5 w-32 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="overflow-hidden text-xs flex-col flex mt-2 gap-2">
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-3/4 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="text-xs flex item-center">
                      <div className="h-4 w-20 bg-slate-300 rounded-sm"></div>
                    </div>
                    <div className="flex text-xs items-center">
                      <div className="h-4 w-12 bg-slate-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-main inline-flex w-72 h-80 flex-col select-none rounded-md font-normal pointer overflow-hidden">
              <div className="h-32 overflow-hidden">
                <img
                  src="https://autumn.revolt.chat/banners/SpkJokgeOj8P-YIZyHVFfc5FMzEHI_zqEQSGyEmT5U?width=640"
                  className="w-full h-full object-cover border-none"
                />
              </div>
              <div className="relative">
                <div className="flex absolute w-full justify-center ">
                  <img
                    loading="lazy"
                    src="https://autumn.revolt.chat/icons/0nhgfJgJOed3YZXhVFSvZo3O2UZ94g9u3kZaPVJl_w?width=128"
                    draggable="false"
                    crossorigin="anonymous"
                    className="-mt-12 w-16 h-16 object-cover rounded-full"
                    style={{ borderWidth: 6 }}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div
                  className="h-full flex flex-col bg-slate-200 gap-2"
                  style={{ padding: "24px 16px 16px" }}
                >
                  <div className="flex items-center justify-center text-lg font-semibold">
                    Textme Developer
                  </div>
                  <div className="overflow-hidden text-xs">
                    A very code hoặc
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="text-xs flex item-center">135 members</div>
                    <div className="flex text-xs items-center">
                      <span>low active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex w-72 h-80 flex-col select-none rounded-md font-normal pointer overflow-hidden">
              <div className="h-32 overflow-hidden bg-slate-300"></div>
              <div className="relative">
                <div className="flex absolute w-full justify-center ">
                  <div
                    className="-mt-12 w-16 h-16 object-cover rounded-full bg-slate-300"
                    style={{ borderWidth: 6 }}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div
                  className="h-full flex flex-col bg-slate-200"
                  style={{ padding: "24px 16px 16px" }}
                >
                  <div className="flex items-center justify-center text-lg font-semibold">
                    <div className="h-5 w-32 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="overflow-hidden text-xs flex-col flex mt-2 gap-2">
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-3/4 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="text-xs flex item-center">
                      <div className="h-4 w-20 bg-slate-300 rounded-sm"></div>
                    </div>
                    <div className="flex text-xs items-center">
                      <div className="h-4 w-12 bg-slate-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-evenly w-full h-auto absolute"
            style={{ bottom: "calc(100% - 32px)" }}
          >
            <div className="inline-flex w-72 h-80 flex-col select-none rounded-md font-normal pointer overflow-hidden">
              <div className="h-32 overflow-hidden bg-slate-300"></div>
              <div className="relative">
                <div className="flex absolute w-full justify-center ">
                  <div
                    className="-mt-12 w-16 h-16 object-cover rounded-full bg-slate-300"
                    style={{ borderWidth: 6 }}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div
                  className="h-full flex flex-col bg-slate-200"
                  style={{ padding: "24px 16px 16px" }}
                >
                  <div className="flex items-center justify-center text-lg font-semibold">
                    <div className="h-5 w-32 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="overflow-hidden text-xs flex-col flex mt-2 gap-2">
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-3/4 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="text-xs flex item-center">
                      <div className="h-4 w-20 bg-slate-300 rounded-sm"></div>
                    </div>
                    <div className="flex text-xs items-center">
                      <div className="h-4 w-12 bg-slate-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="inline-flex w-72 h-80 flex-col select-none rounded-md font-normal pointer overflow-hidden">
              <div className="h-32 overflow-hidden bg-slate-300"></div>
              <div className="relative">
                <div className="flex absolute w-full justify-center ">
                  <div
                    className="-mt-12 w-16 h-16 object-cover rounded-full bg-slate-300"
                    style={{ borderWidth: 6 }}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div
                  className="h-full flex flex-col bg-slate-200"
                  style={{ padding: "24px 16px 16px" }}
                >
                  <div className="flex items-center justify-center text-lg font-semibold">
                    <div className="h-5 w-32 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="overflow-hidden text-xs flex-col flex mt-2 gap-2">
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-3/4 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="text-xs flex item-center">
                      <div className="h-4 w-20 bg-slate-300 rounded-sm"></div>
                    </div>
                    <div className="flex text-xs items-center">
                      <div className="h-4 w-12 bg-slate-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="inline-flex w-72 h-80 flex-col select-none rounded-md font-normal pointer overflow-hidden">
              <div className="h-32 overflow-hidden bg-slate-300"></div>
              <div className="relative">
                <div className="flex absolute w-full justify-center ">
                  <div
                    className="-mt-12 w-16 h-16 object-cover rounded-full bg-slate-300"
                    style={{ borderWidth: 6 }}
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div
                  className="h-full flex flex-col bg-slate-200"
                  style={{ padding: "24px 16px 16px" }}
                >
                  <div className="flex items-center justify-center text-lg font-semibold">
                    <div className="h-5 w-32 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="overflow-hidden text-xs flex-col flex mt-2 gap-2">
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-full bg-slate-300 rounded-sm"></div>
                    <div className="h-5 w-3/4 bg-slate-300 rounded-sm"></div>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="text-xs flex item-center">
                      <div className="h-4 w-20 bg-slate-300 rounded-sm"></div>
                    </div>
                    <div className="flex text-xs items-center">
                      <div className="h-4 w-12 bg-slate-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="w-full flex flex-col">
        <div className="flex w-full h-auto gap-4">
          <div className="w-auto h-auto flex flex-col items-center gap-2">
            <Upload
              // className="avatar-upload"
              // action={api}
              // onSuccess={onSuccess}
              // accept={imageOnly}
              showUploadList={false}
              // onError={() => Toast.error("upload failed")}
            >
              <Badge
                count={
                  <Image
                    width={20}
                    height={20}
                    radius="xl"
                    src={UploadAvatar}
                  />
                }
                style={{
                  width: "28px",
                  height: "28px",
                  right: "18px",
                  top: "18px",
                  boxShadow: "0 2px 4px 0 rgb(0 0 0 / 60%)",
                }}
                className="flex justify-center items-center bg-white rounded-full"
                type="primary"
              >
                <Avatar
                  data-content="Change Avatar"
                  size="extra-large"
                  className="avatar relative"
                />
              </Badge>
            </Upload>
            <div className="flex flex-col items-center">
              <a className="text-sm font-semibold cursor-pointer">Gỡ bỏ</a>
              <small className="text-xs">(Tối đa 2.50 MB)</small>
            </div>
          </div>
          <TextInput
            placeholder="Server's name"
            label="Server's name"
            required
            className="w-full mt-5"
          />
        </div>
        <div className="w-full flex flex-col">
          <Textarea placeholder="Your comment" label="Your comment" required />
          <h6>Descriptions support Markdown formatting,</h6>
        </div>
      </div>
      <Divider />
      <div className="w-full flex flex-col">
          Biểu tượng tuỳ chỉnh
      </div>
      <Divider />
      <div className="w-full flex flex-col">
          Biểu tượng lời mời
      </div>
      <Divider />
      <div className="w-full flex flex-col">
          Kênh tin nhắn hệ thống
      </div>
      <Divider />
      <div className="w-full flex flex-col">
          Cài đặt thông báo mặc định
      </div>
    </div>
  );
}
