import React, { useState } from "react";
import styled from "styled-components";
import { Textarea } from "@mantine/core";

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
  const [content, setContent] = useState(message ?? "");
    const save=()=>{};
  return (
    <EditorBase>
      <Textarea placeholder="Your comment"
        minRows={1}
        maxRows={5}
        value={content}
        onChange={(event) => setContent(event.currentTarget.value)}
      />
      <span className="caption">
        <span className="font-semibold">Escape</span> to <a onClick={finish}>cancel</a> &middot; <span className="font-semibold">Enter</span> to{" "}
        <a onClick={save}>save</a>
      </span>
    </EditorBase>
  );
}
