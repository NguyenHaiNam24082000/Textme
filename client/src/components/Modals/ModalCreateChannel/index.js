import { Button, Group, Text, TextInput, UnstyledButton } from "@mantine/core";
import React, { useState } from "react";
import { createWorkspaceChannel } from "../../../apis/workspace";
import Modal from "../Modal";

export default function ModalCreateChannel({ opened, onClose, type, server }) {
  const [payload, setPayload] = useState({
    name: "",
    type: "",
  });

  return (
    <Modal
      size="md"
      opened={opened}
      onClose={onClose}
      title={`Create ${type}`}
      zIndex="100"
      // classNames={{ inner: "" }}
      // className="relative"
    >
      <div className="relative overflow-x-hidden">
        <Group direction="column" grow>
          {type === "channel" && (
            <>
              <UnstyledButton
                style={{ border: "1px solid #06060714" }}
                className="px-4 py-2 rounded-md w-full hover:bg-[#06060714]"
                onClick={() => setPayload({ ...payload, type: "TEXT" })}
              >
                <Group position="apart">
                  <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets6.lottiefiles.com/packages/lf20_iin98jd2.json"
                    style={{ width: 40, height: 40 }}
                  ></lottie-player>
                  <div className="flex flex-col flex-auto">
                    <Text
                      component="span"
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                      // size="xl"
                      weight={700}
                    >
                      Text
                    </Text>
                    <Text size="xs" color="dimmed">
                      Send messages, images, GIFs, emoji, and more
                    </Text>
                  </div>
                  {/* <div>
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
              </div> */}
                </Group>
              </UnstyledButton>
              <UnstyledButton
                style={{ border: "1px solid #06060714" }}
                className="px-4 py-2 rounded-md w-full hover:bg-[#06060714]"
                onClick={() => setPayload({ ...payload, type: "VOICE" })}
              >
                <Group position="apart">
                  <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets10.lottiefiles.com/packages/lf20_tqeabr9n.json"
                    style={{ width: 40, height: 40 }}
                  ></lottie-player>
                  <div className="flex flex-col flex-auto">
                    <Text
                      component="span"
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                      // size="xl"
                      weight={700}
                    >
                      Voice
                    </Text>
                    <Text size="xs" color="dimmed">
                      Hang out together with voice, video, and screen sharing
                    </Text>
                  </div>
                  {/* <div>
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
              </div> */}
                </Group>
              </UnstyledButton>
            </>
          )}
          <TextInput
            placeholder="Name"
            label="Name"
            required
            onChange={(e) => {
              setPayload({
                ...payload,
                name: e.target.value,
              });
            }}
          />
        </Group>
        <Group position="right" spacing="xs" className="mt-3">
          <Button style={{ backgroundColor: "red" }} radius="md">
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#18f59f" }}
            radius="md"
            onClick={() => {
              createWorkspaceChannel({
                ...payload,
                type: type === "channel" ? payload.type : "CATEGORY",
                severId: server.id,
              });
            }}
          >
            Create {type[0].toUpperCase() + type.slice(1)}
          </Button>
        </Group>
      </div>
    </Modal>
  );
}
