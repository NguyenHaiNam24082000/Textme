import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tabs, TextInput } from "@mantine/core";
import React from "react";
import { Search } from "tabler-icons-react";

export default function FriendsMain() {
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
        </Tabs.Tab>
        <Tabs.Tab
          icon={<FontAwesomeIcon icon="fa-solid fa-users" />}
          label="All"
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
        </Tabs.Tab>
        <Tabs.Tab
          icon={<FontAwesomeIcon icon="fa-solid fa-user-clock" />}
          label="Pending"
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
        </Tabs.Tab>
        <Tabs.Tab
          icon={<FontAwesomeIcon icon="fa-solid fa-user-xmark" />}
          label="Blocked"
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
        </Tabs.Tab>
        <Tabs.Tab
          icon={<FontAwesomeIcon icon="fa-solid fa-user-plus" />}
          label="Add Friend"
          className="bg-green-700 text-white hover:bg-green-700 hover:text-white focus:bg-inherit focus:text-green-700"
        >
          <TextInput
            icon={<Search size={18} />}
            size="md"
            rightSection={
              <Button variant="filled" size="xs">
                Send friend request
              </Button>
            }
            placeholder="Enter a username#0000"
            rightSectionWidth={150}
          />
        </Tabs.Tab>
      </Tabs>
    </main>
  );
}
