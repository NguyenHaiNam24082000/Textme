import { Upload } from "@douyinfe/semi-ui";
import {
  Avatar,
  Button,
  Card,
  Collapse,
  Group,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import UploadImage from "../../UI/UploadImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import { createWorkspace } from "../../../apis/workspace";

const titleTypeRoom = {
  private: `Anyone will be able to find but only people invited will be join this room. You can change this at any time from room settings.`,
  public: `Anyone will be able to find and join this room. You can change this at any time from room settings.`,
  secret: `Only people invited will be able to find and join this room. You can change this at any time from room settings.`,
};

export default function ModalCreateChannel({ opened, onClose }) {
  const [typeWorkspace, setTypeWorkspace] = useState("public");
  const [activeMenu, setActiveMenu] = useState("main");
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({});
  useEffect(() => {
    setActiveMenu("main");
  }, [opened]);

  const createServer = async () => {
    const { data } = await createWorkspace({ ...payload, typeWorkspace });
    console.log(data);
  };

  return (
    <Modal
      size="md"
      opened={opened}
      onClose={onClose}
      title={`Create a ${typeWorkspace} room`}
      zIndex="100"
      // classNames={{ inner: "" }}
      // className="relative"
    >
      <div className="relative overflow-x-hidden">
        <Group direction="column" grow>
          <UnstyledButton
            style={{ border: "1px solid #06060714" }}
            className="px-4 py-2 rounded-md w-full hover:bg-[#06060714]"
            onClick={() => setActiveMenu("create")}
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
            onClick={() => setActiveMenu("invite")}
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
          <Button
            style={{ backgroundColor: "red" }}
            radius="md"
            onClick={() => setActiveMenu("main")}
          >
            Cancel
          </Button>
          <Button style={{ backgroundColor: "#18f59f" }} radius="md">
            Create Channel
          </Button>
        </Group>
      </div>
    </Modal>
  );
}
