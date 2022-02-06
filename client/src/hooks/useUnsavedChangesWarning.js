import React, { useState, useEffect } from "react";
import { useModals } from "@mantine/modals";
import { Button, Text } from "@mantine/core";

export default function useUnsavedChangesWarning(
  message = "Are you sure want to discard changes?"
) {
  const [dirty, setDirty] = useState(false);
  const modals = useModals();

  useEffect(() => {
    window.onbeforeunload = dirty && ((e) => {
      openConfirmModal();
      return <div>aaaa</div>;
    });
    return () => {
      window.onbeforeunload = null;
    };
  }, [dirty]);

  const openConfirmModal =
    dirty &&
    (() =>
      modals.openConfirmModal({
        title: "Please confirm your action",
        children: (
          <Text size="sm">
            This action is so important that you are required to confirm it with
            a modal. Please click one of these buttons to proceed.
          </Text>
        ),
        onCancel: () => console.log("Cancel"),
        onConfirm: () => console.log("Confirmed"),
      }));

  return [openConfirmModal, () => setDirty(true), () => setDirty(false)];
}
