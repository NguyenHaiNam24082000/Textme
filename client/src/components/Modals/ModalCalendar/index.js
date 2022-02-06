import React from "react";
import Modal from "../../Modal";
import { Calendar } from "@mantine/dates";

export default function ModalCalendar({opened,onClose}) {
  return (
    <Modal opened={opened} onClose={onClose} title="Jump to a specific date">
      <Calendar />;
    </Modal>
  );
}
