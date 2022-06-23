import { Upload } from "@douyinfe/semi-ui";
import {
  // Avatar,
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
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { OPEN_SERVER } from "../../../configs/queryKeys";

const titleTypeRoom = {
  private: `Anyone will be able to find but only people invited will be join this room. You can change this at any time from room settings.`,
  public: `Anyone will be able to find and join this room. You can change this at any time from room settings.`,
  secret: `Only people invited will be able to find and join this room. You can change this at any time from room settings.`,
};

export default function ModalCreateWorkspace({ opened, onClose }) {
  const [typeWorkspace, setTypeWorkspace] = useState("public");
  const [activeMenu, setActiveMenu] = useState("main");
  // const [open, setOpen] = useState(false);
  const cache = useQueryClient();
  const history = useNavigate();
  const [payload, setPayload] = useState({});
  useEffect(() => {
    setActiveMenu("main");
  }, [opened]);

  const createServer = async () => {
    const { data } = await createWorkspace({
      ...payload,
      type: typeWorkspace.toUpperCase(),
    });
    if (data) {
      cache.invalidateQueries(OPEN_SERVER);
      history(`/channel/${data._id}/${data.channels[0].channel}`);
      onClose();
    }
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
        <CSSTransition
          in={activeMenu === "main"}
          timeout={250}
          classNames="menu-primary"
          unmountOnExit
        >
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
                    Create My Own
                  </Text>
                  <Text size="xs" color="dimmed">
                    Let's create our own world
                  </Text>
                </div>
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </div>
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
                    Already have an invite?
                  </Text>
                  <Text size="xs" color="dimmed">
                    Join a server now
                  </Text>
                </div>
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </div>
              </Group>
            </UnstyledButton>
          </Group>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "create"}
          timeout={250}
          classNames="menu-secondary"
          unmountOnExit
        >
          <div>
            <Group position="center">
              <Upload>
                <UploadImage />
              </Upload>
            </Group>
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
            <TextInput
              placeholder="Topic (optional)"
              label="Topic (optional)"
              onChange={(e) => {
                setPayload({
                  ...payload,
                  description: e.target.value,
                });
              }}
            />
            <Group grow className="my-4">
              <Card
                padding="sm"
                radius="md"
                component="button"
                withBorder
                onClick={() => setTypeWorkspace("public")}
                className={`flex flex-col items-center justify-center cursor-pointer ${
                  typeWorkspace === "public" && "bg-yellow-400 text-white"
                }`}
              >
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src="https://assets10.lottiefiles.com/private_files/lf30_polnr9xa.json"
                  style={{ width: 100, height: 80 }}
                ></lottie-player>

                <Text weight={500} size="md" className="text-inherit">
                  Public
                </Text>
              </Card>
              <Card
                padding="sm"
                radius="md"
                component="button"
                withBorder
                onClick={() => setTypeWorkspace("private")}
                className={`flex flex-col items-center justify-center cursor-pointer ${
                  typeWorkspace === "private" && "bg-yellow-400 text-white"
                }`}
              >
                <lottie-player
                  autoplay
                  loop
                  mode="bounce"
                  src="https://assets4.lottiefiles.com/packages/lf20_cwunhx4v.json"
                  style={{ width: 65, height: 80 }}
                  direction={75}
                ></lottie-player>

                <Text weight={500} size="md" className="text-inherit">
                  Private
                </Text>
              </Card>
              <Card
                padding="sm"
                radius="md"
                component="button"
                withBorder
                onClick={() => setTypeWorkspace("secret")}
                className={`flex flex-col items-center justify-center cursor-pointer ${
                  typeWorkspace === "secret" && "bg-yellow-400 text-white"
                }`}
              >
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src="https://assets8.lottiefiles.com/packages/lf20_1xqh10xd.json"
                  style={{ width: 100, height: 80 }}
                ></lottie-player>

                <Text weight={500} size="md" className="text-inherit">
                  Secret
                </Text>
              </Card>
            </Group>
            <Text size="xs">
              <Text color="red" className="inline mr-1">
                *
              </Text>
              {titleTypeRoom[typeWorkspace]}
            </Text>
            {/* <Text
              weight={500}
              size="sm"
              color="yellow"
              className="cursor-pointer hover:underline"
              onClick={() => setOpen((o) => !o)}
            >
              Hide advanced
            </Text>
            <Collapse in={open}>
              <Text size="sm">
                Block anyone not part of matrix.org from ever joining this room.
                You might enable this if the room will only be used for
                collaborating with internal teams on your homeserver. This
                cannot be changed later.
              </Text>
            </Collapse> */}
            <Group position="apart" spacing="xs" className="mt-3">
              <Button
                style={{ backgroundColor: "transparent", color: "black" }}
                radius="md"
                onClick={() => setActiveMenu("main")}
              >
                Cancel
              </Button>
              <Button
                // style={{ backgroundColor: "#18f59f" }}
                radius="xs"
                onClick={createServer}
              >
                Create Workspace
              </Button>
            </Group>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "invite"}
          timeout={250}
          classNames="menu-secondary"
          unmountOnExit
        >
          <div className="gap-4 flex flex-col">
            <TextInput placeholder="Invite Link" label="Invite Link" required />
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
                  src="https://assets2.lottiefiles.com/packages/lf20_auj2uu9q.json"
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
                    Don't have an invite?
                  </Text>
                  <Text size="xs" color="dimmed">
                    Check out the public server
                  </Text>
                </div>
                <div>
                  <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </div>
              </Group>
            </UnstyledButton>
            <Group position="right" spacing="xs" className="mt-3">
              <Button
                style={{ backgroundColor: "red" }}
                radius="md"
                onClick={() => setActiveMenu("main")}
              >
                Cancel
              </Button>
              <Button style={{ backgroundColor: "#18f59f" }} radius="md">
                Join Workspace
              </Button>
            </Group>
          </div>
        </CSSTransition>
      </div>
    </Modal>
  );
}
