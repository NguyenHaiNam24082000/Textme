import React, { useState } from "react";
import { Paper, ActionIcon } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../Modals/Modal";
import IconPDF from "../../../assets/images/icons/files-PDF.svg";

export default function DocumentPreview({ attachment }) {
  const [opened, setOpened] = useState(false);
  console.log(
    `https://drive.google.com/viewerng/viewer?url=${attachment.url}&embedded=true&hl=en&retry=1`
  );
  return (
    <Paper
      p="xs"
      withBorder
      className="relative rounded-md flex justify-between"
      style={{ width: 500 }}
    >
      <div className="flex gap-2">
        <div>
          <img src={IconPDF} className="h-10 w-auto" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{attachment.filename}</span>
          <span className="text-xs">{attachment.size}KB</span>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <ActionIcon onClick={() => setOpened(true)}>
          <FontAwesomeIcon icon="fa-solid fa-eye" />
        </ActionIcon>
        <ActionIcon>
          <FontAwesomeIcon icon="fa-solid fa-download" />
        </ActionIcon>
      </div>
      <Modal
        size="full"
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Preview Document`}
        zIndex="100"
      >
        {/* <iframe
          scrolling="yes"
          width="100%"
          height="500px"
          className="flex-auto"
          src={`https://drive.google.com/viewerng/viewer?url=${encodeURIComponent(attachment.url)}&embedded=true&hl=en&retry=1`}
          frameBorder="0"
        ></iframe> */}
        {/* <embed src={attachment.url} width="100%" height="500px" /> */}
        <iframe
          scrolling="yes"
          width="100%"
          height="500px"
          className="flex-auto"
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(attachment.url)}`}
          frameBorder="0"
        ></iframe>
      </Modal>
    </Paper>
  );
}
