import React, { useState } from "react";
import { Paper, ActionIcon } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../Modals/Modal";

export default function DocumentPreview() {
  const [opened, setOpened] = useState(false);
  return (
    <Paper
      p="md"
      withBorder
      className="relative rounded-md flex justify-between"
      style={{ width: 500 }}
    >
      <div className="flex">
        <div>
          <img src="https://discord.com/assets/325421cb49d6e0717b8c7b9dfa2d4bdc.svg" />
        </div>
        <div className="flex flex-col">
          <span>Hello world.pdf</span>
          <span>3.01KB</span>
        </div>
      </div>
      <div className="flex gap-2">
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
        title={`Preview Code`}
        zIndex="100"
      >
        <iframe
          scrolling="yes"
          width="100%"
          height="500px"
          className="flex-auto"
          src={`https://drive.google.com/viewerng/viewer?url=http://www.africau.edu/images/default/sample.pdf&embedded=true&hl=en&retry=1`}
          frameBorder="0"
        ></iframe>
      </Modal>
    </Paper>
  );
}
