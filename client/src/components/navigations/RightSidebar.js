import { IconChevronLeft, IconClose } from "@douyinfe/semi-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Button,
  Input,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  activeComplementSelector,
  setActiveComplement,
} from "../../store/uiSlice";
import Info from "./Right/Info";
import PinnedList from "./Right/PinnedList";
import SelectFriends from "./Right/SelectFriends";
import Search from "./Right/Search";

export default function RightSidebar({ channel = null, messages = [] }) {
  const activeMenu = useSelector(activeComplementSelector);
  const dispatch = useDispatch();
  const [searchMember, setSearchMember] = useState("");
  const alreadyFriends = channel
    ? channel.members.map((member) => member.id)
    : [];
  return (
    <aside
      className="flex w-96 h-full flex-shrink-0 overflow-hidden relative"
      style={{
        backgroundColor: "#f3f4f6",
        borderLeft: "2px solid #e5e7eb",
      }}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={250}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className="flex flex-col w-full h-full">
          <Info messages={messages} channel={channel} />
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "storages"}
        timeout={250}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex w-full h-10 items-center justify-between p-2 flex-shrink-0">
            <ActionIcon onClick={() => dispatch(setActiveComplement("main"))}>
              <IconChevronLeft />
            </ActionIcon>
            <ActionIcon>
              <IconClose />
            </ActionIcon>
          </div>
          <div className="flex px-4 w-full h-full">
            <div className="w-full h-auto">
              <SegmentedControl
                fullWidth
                //               value={value}
                // onChange={setValue}
                data={[
                  { label: "Images/Videos", value: "media" },
                  { label: "Files", value: "files" },
                  { label: "Links", value: "links" },
                ]}
              />
            </div>
            {/* <Tabs defaultActiveKey={`${tabKey}`}>
                <TabPane
                  tab="Images/Videos"
                  itemKey="1"
                  className="overflow-hidden"
                >
                  <div className="flex flex-col w-full h-full bg-red-500">
                    <DateRangePicker
                      amountOfMonths={3}
                      placeholder="Time"
                      className="py-2 my-1"
                    />
                    <div className="flex w-full h-full">
                      <ImageGrid />
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Files" itemKey="2">
                  <DateRangePicker amountOfMonths={3} placeholder="Time" />
                </TabPane>
                <TabPane tab="Links" itemKey="3">
                  <DateRangePicker amountOfMonths={3} placeholder="Time" />
                </TabPane>
              </Tabs> */}
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "members"}
        timeout={250}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex w-full h-10 p-2 flex-shrink-0">
            <div className="flex w-full items-center justify-between">
              <ActionIcon onClick={() => dispatch(setActiveComplement("main"))}>
                <IconChevronLeft />
              </ActionIcon>
              <Text weight={500}>Members</Text>
              <ActionIcon>
                <IconClose />
              </ActionIcon>
            </div>
          </div>
          <div className="flex flex-col px-4 w-full h-full">
            <div className="flex w-full h-12 py-2 my-1">
              <Input
                placeholder="Your email"
                className="w-full"
                value={searchMember}
                // onChange={onSearchChangeMembers}
              />
              <Button
              // onClick={() => {
              //   const mems = users.filter((user) =>
              //     user.name.toLowerCase().includes(searchMember.toLowerCase())
              //   );
              //   setMembers(mems);
              // }}
              >
                Search
              </Button>
            </div>
            <AnimateSharedLayout>
              <motion.div
                layout
                className="flex flex-col w-full h-full flex-1 overflow-y-auto basis-0"
              >
                <AnimatePresence>
                  {/* {members.map((user, index) => {
                    return (
                      <motion.div
                        key={user.id}
                        layout
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={spring}
                        className="flex w-full h-12 py-1 px-2 items-center hover:bg-slate-200 rounded-lg cursor-pointer"
                      >
                        <Avatar
                          className="mr-3"
                          radius="xl"
                          src={`https://cdn.discordapp.com/avatars/802606776314626078/6ceaaf5d73a74731ef9a669a595de977.webp?size=40`}
                        />
                        <Highlight
                          highlight={searchMember}
                          className="text-sm font-semibold"
                          children={user.name}
                        />
                      </motion.div>
                    );
                  })} */}
                </AnimatePresence>
              </motion.div>
            </AnimateSharedLayout>

            <div className="flex w-full h-12 mt-1">
              <Button
                className="w-full bg-yellow-400"
                onClick={() => {
                  dispatch(setActiveComplement("members"));
                }}
              >
                Add Members
              </Button>
            </div>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "search"}
        timeout={250}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="flex flex-col w-full h-full">
          <Search channel={channel} />
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "selectFriends"}
        timeout={250}
        classNames="menu-secondary"
        unmountOnExit
      >
        <SelectFriends alreadyFriends={alreadyFriends} channel={channel} />
      </CSSTransition>
      {channel && (
        <CSSTransition
          in={activeMenu === "pinnedList"}
          timeout={250}
          classNames="menu-secondary"
          unmountOnExit
        >
          <PinnedList channel={channel} />
        </CSSTransition>
      )}
    </aside>
  );
}
