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
  hideCloseButton = true,
  padding = "xl",
  ref = null,
}) {
  return (
    <ModalContainer
      ref={ref}
      className={className}
      style={style}
      classNames={classNames}
      styles={styles}
      opened={opened}
      onClose={onClose}
      size={size}
      trapFocus={true}
      overflow="inside"
      padding={padding}
      radius="md"
      centered
      zIndex={zIndex}
      withCloseButton={hideCloseButton}
      title={
        title ? (
          <Text style={{ fontSize: "var(--font-size-xxxlarge)" }} weight={600}>
            {title}
          </Text>
        ) : null
      }
    >
      {children}
    </ModalContainer>
  );
}
