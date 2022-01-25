import React from "react";
import { ActionIcon } from "@mantine/core";

export default function AccessibleButton({ children }) {
  return <ActionIcon size={32} radius="md" style={{backgroundColor: "#363c44"}} variant="filled">{children}</ActionIcon>;
}
