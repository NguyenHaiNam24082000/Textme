import { Empty } from "@douyinfe/semi-ui";
import { IllustrationConstruction } from "@douyinfe/semi-illustrations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Avatar,
  BackgroundImage,
  Button,
  Group,
  Tabs,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import Modal from "../Modal";
import "./index.css";
import { cancelPendingRequestApi } from "../../../apis/friend";
import {
  OUT_GOING_REQUESTS_KEY,
  PENDING_REQUESTS_KEY,
} from "../../../configs/queryKeys";
import {
  isIncoming,
  pendingDiscriminator,
  pendingUsername,
} from "../../../commons/friendObject";
import { useQueryClient } from "react-query";

export default function ModalUserProfile({ opened, onClose, user, pending }) {
  const cache = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const cancelPending = async () => {
    setIsLoading(true);
    try {
      await cancelPendingRequestApi(pending.id);
      if (isIncoming(user, pending)) {
        cache.invalidateQueries(PENDING_REQUESTS_KEY);
      } else {
        cache.invalidateQueries(OUT_GOING_REQUESTS_KEY);
      }
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={null}
      hideCloseButton={false}
      opened={opened}
      onClose={onClose}
      zIndex={500}
      padding={0}
      classNames={{ modal: "overflow-hidden", body: "overflow-hidden" }}
    >
      <BackgroundImage
        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
        radius="xs"
        className="h-40"
      />
      <div className="relative">
        <div className="flex w-full gap-3 p-5 justify-between items-center absolute -top-[84px]">
          <div className="flex items-center relative">
            <Avatar
              size={128}
              radius="50%"
              style={{ border: "8px solid #fff" }}
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            />
            <div
              className="rounded-full w-8 h-8 justify-center items-center flex absolute bottom-3 right-3"
              style={{ border: "8px solid #fff" }}
            >
              😀
            </div>
          </div>
          <Group
            grow
            direction="column"
            className="flex-auto h-32 items-start py-3"
          >
            <div className="flex items-end w-full">
              <span className="text-white text-2xl font-bold">
                @{user && pending && pendingUsername(user, pending)}
              </span>
              <span className="text-slate-300 text-2xl font-medium">
                #{user && pending && pendingDiscriminator(user, pending)}
              </span>
            </div>
            <div className="flex w-full text-black text-sm font-medium items-center">
              <div className="desc">
                <span className="desc">
                  💜When you're screaming💜 💜When you're screaming💜 💜When
                  you're screaming💜 💜When you're screaming💜 💜When you're
                  screaming💜💜When you're screaming💜 💜When you're screaming💜
                </span>
              </div>
            </div>
          </Group>
          <div className="flex flex-col justify-end h-32 py-5">
            <div className="flex items-center gap-2">
              {user && pending && isIncoming(user, pending) ? (
                <Button
                  className="bg-green-600"
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-user-plus" />}
                >
                  Send Friend Request
                </Button>
              ) : (
                <Button
                  onClick={cancelPending}
                  className="bg-red-600"
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-user-minus" />}
                >
                  {user && pending && isIncoming(user, pending)
                    ? "Cancel Friend Request"
                    : "Unfriend"}
                </Button>
              )}

              <ActionIcon size="lg">
                <FontAwesomeIcon
                  icon="fa-solid fa-ellipsis-vertical"
                  className="text-xl"
                />
              </ActionIcon>
            </div>
          </div>
        </div>
      </div>
      <div className="h-72 relative flex-col flex-1 mt-16">
        <Tabs
          grow
          className="card-buttons"
          classNames={{ body: "p-5 overflow-y-auto" }}
        >
          <Tabs.Tab label="Profile">
            <Empty
              image={
                <IllustrationConstruction style={{ width: 150, height: 150 }} />
              }
              description={"under construction"}
            />
          </Tabs.Tab>
          <Tabs.Tab label="Mutual Friends">
            <Empty
              image={
                <IllustrationConstruction style={{ width: 150, height: 150 }} />
              }
              description={"under construction"}
            />
          </Tabs.Tab>
          <Tabs.Tab label="Mutual Groups">
            <Empty
              image={
                <IllustrationConstruction style={{ width: 150, height: 150 }} />
              }
              description={"under construction"}
            />
          </Tabs.Tab>
          <Tabs.Tab label="Mutual Servers">
            <Empty
              image={
                <IllustrationConstruction style={{ width: 150, height: 150 }} />
              }
              description={"under construction"}
            />
          </Tabs.Tab>
        </Tabs>
      </div>
      {/* <Tabs type="line">
          <TabPane tab="Document" itemKey="1">
            Document
          </TabPane>
          <TabPane tab="Quick Start" itemKey="2">
            Quick Start
          </TabPane>
          <TabPane tab="Help" itemKey="3">
            Help
          </TabPane>
        </Tabs> */}
    </Modal>
  );
}
