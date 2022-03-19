import { Avatar } from "@douyinfe/semi-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Button,
  Group,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { Search } from "tabler-icons-react";
import { OutGoingRequests, PendingRequests } from "../../../reactQuery/friend";
import ModalUserProfile from "../../Modals/ModalUserProfile";
import AddFriend from "./AddFriend";
import All from "./All";
import Blocked from "./Blocked";
import Online from "./Online";
import Pending from "./Pending";

export default function FriendsMain() {
  // const [data,setData]= useState(PendingRequests());
  const { data } = PendingRequests();
  const { dataOutGoing } = OutGoingRequests();
  console.log(data, dataOutGoing);
  return (
    <main className="flex min-w-0 min-h-0 relative flex-col flex-auto">
      <Tabs
        variant="pills"
        tabPadding="md"
        className="px-2"
        classNames={{ tabsList: "py-3" }}
        styles={{ tabsList: { borderBottom: "2px solid #e1e1e1" } }}
      >
        <Tabs.Tab
          icon={<FontAwesomeIcon icon="fa-solid fa-earth-asia" />}
          label="Online"
        >
          <TextInput
            icon={<Search size={18} />}
            radius="xl"
            size="md"
            // rightSection={
            //   <ActionIcon
            //     size={32}
            //     radius="xl"
            //     color={theme.primaryColor}
            //     variant="filled"
            //   >
            //     {theme.dir === "ltr" ? (
            //       <ArrowRight size={18} />
            //     ) : (
            //       <ArrowLeft size={18} />
            //     )}
            //   </ActionIcon>
            // }
            placeholder="Search questions"
            rightSectionWidth={42}
          />
          <Online />
        </Tabs.Tab>
        <Tabs.Tab
          icon={<FontAwesomeIcon icon="fa-solid fa-users" />}
          label="All"
        >
          {/* <TextInput
            icon={<Search size={18} />}
            radius="xl"
            size="md"
            // rightSection={
            //   <ActionIcon
            //     size={32}
            //     radius="xl"
            //     color={theme.primaryColor}
            //     variant="filled"
            //   >
            //     {theme.dir === "ltr" ? (
            //       <ArrowRight size={18} />
            //     ) : (
            //       <ArrowLeft size={18} />
            //     )}
            //   </ActionIcon>
            // }
            placeholder="Search questions"
            rightSectionWidth={42}
          /> */}
          <All />
        </Tabs.Tab>
        <Tabs.Tab
          icon={<FontAwesomeIcon icon="fa-solid fa-user-clock" />}
          label="Pending"
        >
          <Pending />
        </Tabs.Tab>
        <Tabs.Tab
          icon={<FontAwesomeIcon icon="fa-solid fa-user-xmark" />}
          label="Blocked"
        >
          <Blocked />
          <TextInput
            icon={<Search size={18} />}
            radius="xl"
            size="md"
            // rightSection={
            //   <ActionIcon
            //     size={32}
            //     radius="xl"
            //     color={theme.primaryColor}
            //     variant="filled"
            //   >
            //     {theme.dir === "ltr" ? (
            //       <ArrowRight size={18} />
            //     ) : (
            //       <ArrowLeft size={18} />
            //     )}
            //   </ActionIcon>
            // }
            placeholder="Search questions"
            rightSectionWidth={42}
          />
        </Tabs.Tab>
        <Tabs.Tab
          icon={<FontAwesomeIcon icon="fa-solid fa-user-plus" />}
          label="Add Friend"
          className="bg-green-700 text-white hover:bg-green-700 hover:text-white focus:bg-inherit focus:text-green-700 active:text-green-700"
        >
          <AddFriend />
        </Tabs.Tab>
      </Tabs>
      <ModalUserProfile opened={true} onClose={false}>

      </ModalUserProfile>
    </main>
  );
}
