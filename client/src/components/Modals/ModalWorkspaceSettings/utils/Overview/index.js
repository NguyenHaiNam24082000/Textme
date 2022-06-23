import React from "react";
import {
  BackgroundImage,
  Divider,
  Image,
  Switch,
  Textarea,
  TextInput,
  Avatar,
  Button,
} from "@mantine/core";
import { Badge, Upload } from "@douyinfe/semi-ui";
import UploadAvatar from "../../../../../assets/images/icons/upload_avatar.svg";
import Atropos from "atropos/react";
import "atropos/css";

export default function Overview({ server }) {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col w-full h-full">
        <h3 className="text-xl font-semibold mb-3">Tổng quan về máy chủ</h3>
        <div className="w-full flex justify-between mb-3">
          <h5 className="text-sm font-semibold">Xem trước</h5>
          <Button>Edit</Button>
        </div>
        <div className="flex flex-col justify-center items-center relative w-full bg-slate-100 rounded-md py-16 overflow-hidden">
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
              width: 300,
            }}
            className="card-main rounded-lg inline-flex h-80 flex-col select-none font-normal pointer overflow-hidden"
          >
            <div className="h-32 overflow-hidden">
              <BackgroundImage
                // src="https://images.hdqwalls.com/wallpapers/genshin-impact-game-2021-ig.jpg"
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#7289DA",
                }}
              />
            </div>
            <div className="relative">
              <div className="flex absolute w-full justify-center">
                <div
                  className="w-16 h-16 object-cover rounded-full flex z-10 justify-center items-center -mt-20"
                  style={{ width: 100, height: 100, border: "6px solid #fff" }}
                >
                  <Avatar
                    size="100%"
                    styles={{
                      placeholder: {
                        backgroundColor: "#7289DA",
                        color: "#fff",
                        fontSize: 32,
                      },
                    }}
                    className="rounded-full"
                    src="https://cdn.discordapp.com/avatars/94490510688792576/a_84032ca2190d12afb662bb4a381a4199"
                  >
                    {server.name[0].toUpperCase()}
                  </Avatar>
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <div
                className="h-full flex flex-col bg-slate-200 gap-2"
                style={{ padding: "24px 16px 16px" }}
              >
                <div className="flex items-center justify-center text-lg font-semibold">
                  {server.name}
                </div>
                <div className="overflow-hidden text-xs">
                  {server.description}
                </div>
                <div className="flex justify-between mt-auto">
                  <div className="text-xs flex item-center">
                    {server.members.length + 1} members
                  </div>
                  <div className="flex text-xs items-center">
                    <span>low active</span>
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
      <div className="w-full flex flex-col">Custom Banner</div>
      <div className="h-32 w-full overflow-hidden mb-5">
        <BackgroundImage
          // src="https://images.hdqwalls.com/wallpapers/genshin-impact-game-2021-ig.jpg"
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "#7289DA",
          }}
        />
      </div>
    </div>
  );
}
