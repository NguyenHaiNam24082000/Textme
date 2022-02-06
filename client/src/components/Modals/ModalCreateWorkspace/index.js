import { Upload } from "@douyinfe/semi-ui";
import { Button, Card, Collapse, Group, Text, TextInput } from "@mantine/core";
import React,{ useState} from "react";
import Modal from "../../Modal";
import UploadImage from "../../UI/UploadImage";

const titleTypeRoom = {
  private: `Anyone will be able to find but only people invited will be join this room. You can change this at any time from room settings.`,
  public: `Anyone will be able to find and join this room. You can change this at any time from room settings.`,
  secret: `Only people invited will be able to find and join this room. You can change this at any time from room settings.`,
};

export default function ModalCreateWorkspace({ opened, onClose }) {
  const [typeWorkspace, setTypeWorkspace] = useState("public");
  const [open, setOpen] = useState(false);
  return (
    <Modal
      size="md"
      opened={opened}
      onClose={onClose}
      title={`Create a ${typeWorkspace} room`}
      zIndex="100"
      // classNames={{ inner: "" }}
    >
      <Group position="center">
        <Upload>
          <UploadImage />
        </Upload>
      </Group>
      <TextInput
        placeholder="Name"
        label="Name"
        required
      />
      <TextInput placeholder="Topic (optional)" label="Topic (optional)" />
      <Group grow className="my-6">
        <Card
          padding="sm"
          radius="md"
          component="button"
          withBorder
          onClick={() => setTypeWorkspace("public")}
          className={`flex flex-col items-center justify-center ${
            typeWorkspace === "public" && "bg-yellow-400 text-white"
          }`}
        >
          {/* <Image
        src={PublicIcon}
        height={80}
        width={80}
        alt="public workspace"
      /> */}
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
          className={`flex flex-col items-center justify-center ${
            typeWorkspace === "private" && "bg-yellow-400 text-white"
          }`}
        >
          {/* <Image
        src={PrivateIcon}
        height={80}
        width={80}
        alt="private workspace"
      /> */}
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
          className={`flex flex-col items-center justify-center ${
            typeWorkspace === "secret" && "bg-yellow-400 text-white"
          }`}
        >
          {/* <Image
        src={PrivateIcon}
        height={80}
        width={80}
        alt="private workspace"
      /> */}
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
      <Text
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
          Block anyone not part of matrix.org from ever joining this room. You
          might enable this if the room will only be used for collaborating with
          internal teams on your homeserver. This cannot be changed later.
        </Text>
      </Collapse>
      <Group position="right" spacing="xs" className="mt-3">
        <Button style={{ backgroundColor: "red" }} radius="md">
          Cancel
        </Button>
        <Button style={{ backgroundColor: "#18f59f" }} radius="md">
          Create Workspace
        </Button>
      </Group>
    </Modal>
  );
}
