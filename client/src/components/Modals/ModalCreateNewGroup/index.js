import { Avatar, Button, Group, Text, TextInput } from "@mantine/core";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../Modal";
import { createGroupChannel } from "../../../apis/channel";
import { OPEN_CHANNEL } from "../../../configs/queryKeys";
import { useQueryClient } from "react-query";

export default function ModalCreateNewGroup({
  opened,
  onClose,
  channels,
  members,
}) {
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(null);
  const cache = useQueryClient();

  const createGroup = async () => {
    try {
      const { data: channel } = await createGroupChannel({
        name,
        members,
      });
      if (channel) {
        cache.invalidateQueries(OPEN_CHANNEL);
        history(`/channel/@me/${channel._id}`);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      // const result = apiErrorHandler(err);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      size="md"
      opened={opened}
      onClose={onClose}
      title="Confirm New Group"
      zIndex="300"
      // classNames={{ inner: "" }}
      // className="relative"
    >
      <div className="flex flex-col gap-2">
        <div>
          You already have a group with these people! Are you sure you want to
          create a new one?
        </div>
        <TextInput
          placeholder="Group's name"
          label="Group's name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <div className="uppercase font-semibold">Existing Groups</div>
        <div className="flex flex-col gap-1">
          {channels &&
            channels.map((channel) => (
              <div
                onClick={() => {
                  history(`/channel/@me/${channel._id}`);
                }}
                className="flex p-2 rounded hover:bg-slate-200 gap-2 items-center cursor-pointer"
              >
                <Avatar radius="xl" size="sm">
                  aa
                </Avatar>
                <Text weight={500}>
                  {channel.name === null
                    ? channel.members
                        .map((member) => member.username)
                        .join(", ")
                    : channel.name}
                </Text>
                <Text color="dimmed" size="xs" className="mt-1">
                  {moment(channel.createdAt).fromNow()}
                </Text>
              </div>
            ))}
        </div>
        <Group position="right" spacing="xs" className="mt-3">
          <Button
            style={{ backgroundColor: "red" }}
            radius="md"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            color="#18f59f"
            radius="md"
            onClick={createGroup}
            loading={isLoading}
          >
            Create New Group
          </Button>
        </Group>
      </div>
    </Modal>
  );
}
