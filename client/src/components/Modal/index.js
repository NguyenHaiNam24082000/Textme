import React from "react";
import { Modal as ModalContainer, Text } from "@mantine/core";

export default function Modal({
  title,
  children,
  opened,
  onClose,
  size = "xl",
  zIndex = "auto",
  className,
  style,
  styles,
  classNames,
}) {
  return (
    <ModalContainer
      className={className}
      style={style}
      classNames={classNames}
      styles={styles}
      opened={opened}
      onClose={onClose}
      size={size}
      noFocusTrap={true}
      overflow="inside"
      padding="xl"
      radius="md"
      centered
      zIndex={zIndex}
      title={
        <Text style={{ fontSize: "var(--font-size-xxxlarge)" }} weight={600}>
          {title}
        </Text>
      }
    >
      {children}
    </ModalContainer>
  );
}
