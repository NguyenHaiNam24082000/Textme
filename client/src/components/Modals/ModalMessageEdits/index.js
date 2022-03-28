import React from "react";
import Modal from "../Modal";
import { Group } from "@mantine/core";
import "./index.css";
var Diff = require("text-diff");
var diff = new Diff();

const message = {
  content: "aaaaaaaaaa",
  systemMessage: false,
  sender: "6234bcf0819377cc2ffe0b29",
  channel: "62380034d4b2be0e54a64da8",
  embed: [],
  messagesEdited: [
    {
      content: "xin chao",
      editedAt: "2022-03-27T13:31:28.870Z",
      _id: "62406730744a4406f067920a",
    },
    {
      content: "aaaaaaaaaa",
      _id: "62406c69744a4406f0679225",
      editedAt: "2022-03-27T13:53:45.757Z",
    },
  ],
  reactions: [],
  createdAt: "2022-03-27T12:14:06.318Z",
  updatedAt: "2022-03-27T13:53:45.731Z",
  id: "6240550ec4888e3c03dedf2a",
};

export default function ModalMessageEdits() {
  return (
    <Modal
      opened={false}
      onClose={() => {}}
      zIndex={500}
      title="Lịch sử chỉnh sửa"
    >
      {message.messagesEdited?.reverse()?.map((item, index) => {
        let textDiff;
        if (index >= 1) {
          textDiff = diff.main(
            message.messagesEdited[index - 1].content,
            message.messagesEdited[index].content
          );
          return (
            <Group key={index} grow>
              <div
                dangerouslySetInnerHTML={{ __html: diff.prettyHtml(textDiff) }}
              ></div>
            </Group>
          );
        }
        return (
          <Group key={index} grow>
            <div>{item.content}</div>
          </Group>
        );
      })}
    </Modal>
  );
}
