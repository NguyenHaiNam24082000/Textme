import React, { useState } from "react";
import styled from "styled-components";
import { Textarea } from "@mantine/core";
import { useQueryClient } from "react-query";
import { GetMe } from "../../../store/userSlice";
import getSocket from "../../../apis/socket";
import { CHANNEL_MESSAGES_KEY } from "../../../configs/queryKeys";
import { CHANNEL_SOCKET } from "../../../configs/socketRoute";
import { editMessage } from "../../../apis/messages";

const EditorBase = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  textarea {
    resize: none;
    white-space: pre-wrap;
    font-size: 14px;
    background: white;
  }
  .caption {
    padding: 2px;
    font-size: 11px;
    color: black;
    a {
      cursor: pointer;
      color: blue;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default function MessageInlineEditor({ message, finish }) {
  const me = GetMe();

  const [content, setContent] = useState(message.content ?? "");
  const cache = useQueryClient();

  const socket = getSocket(me.tokens?.access?.token);
  async function save() {
    if (!content || !content.trim()) return;

    try {
      const { data } = await editMessage(message.id, content.trim());

      // populate actual sender object
      data.sender = me?.user;

      cache.setQueryData(CHANNEL_MESSAGES_KEY(data.channel), (d) => {
        let index = -1;
        let editId = -1;
        let alreadyFound = false;

        d?.pages.forEach((p, i) => {
          const foundIndex = p.results.findIndex((m) => m.id === data.id);

          if (foundIndex !== -1 && alreadyFound === false) {
            editId = foundIndex;
            alreadyFound = true;
            index = i;
          }
        });

        if (index !== -1 && editId !== -1) {
          d.pages[index].results[editId] = data;
        }

        return d;
      });

      // notify by socket
      socket.emit(CHANNEL_SOCKET.CHANNEL_SEND_EDIT_MESSAGE, data);

      finish();
    } catch (e) {
      console.log("e: ", e);
    }
  }
  async function handleInputSubmit(e) {
    if (e.key === "Enter") {
      save();
    }
  }
  return (
    <EditorBase>
      <Textarea
        placeholder="Your comment"
        minRows={1}
        maxRows={5}
        value={content}
        onChange={(event) => setContent(event.currentTarget.value)}
        onKeyDown={handleInputSubmit}
      />
      <span className="caption">
        <span className="font-semibold">Escape</span> to{" "}
        <a onClick={finish}>cancel</a> &middot;{" "}
        <span className="font-semibold">Enter</span> to{" "}
        <a onClick={save}>save</a>
      </span>
    </EditorBase>
  );
}
