import { IconFilter } from "@douyinfe/semi-icons";
import {
  ActionIcon,
  Button,
  TextInput,
  Select,
  Popover,
  Box,
  Divider,
  Text,
  Stack,
  Avatar,
} from "@mantine/core";
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from "react-beautiful-dnd";
import { useEffect, useRef, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndTable } from "../../../../DnDTable";
import Checkbox from "../../../../Checkbox";

const ROOT_NODE_ID = "root";

const COLUMNS = [
  "View Channels",
  "Manage Channels",
  "Manage Roles",
  "View Audit Log",
  "Manage Server",
  "Create Invite",
  "Change Nickname",
  "Manage Nicknames",
  "Kick Members",
  "Ban Members",
  "Moderate Members",
  "Send Messages",
  "Send Message in Thread",
  "Create Public Thread",
  "Create Private Thread",
  "Embed Links",
  "Attach Files",
  "Add Reactions",
  "Mention @everyone, @here and All Roles",
  "Manage Messages",
  "Manage Threads",
  "Read Message History",
];

const STATUS = ["Active", "Inactive"];

const FilterConjunction = "and" | "or";

function createNodeTree({ conjunction, column, value }) {
  return {
    id: uuidv4(),
    conjunction:
      conjunction === "" || conjunction === "where" ? "where" : conjunction,
    column: column,
    value: value,
  };
}

function AddFilterButton({ onClick }) {
  return (
    <div
      className={`
        inline-flex items-center cursor-pointer
      `}
      onClick={onClick}
    >
      {/* <FontAwesomeIcon icon={faPlus} size="xs" /> */}
      <span className="ml-2">Add condition</span>
    </div>
  );
}

function ConjunctionSelect({
  value,
  onChange,
  onMouseEnter,
  onMouseLeave,
  className,
  index,
}) {
  if (index === 1) {
    return (
      <Select
        data={[
          { value: "and", label: "and" },
          { value: "or", label: "or" },
        ]}
      />
    );
  }

  return (
    <div
      className={`flex items-center mr-2
        ${index === 0 && "justify-center"}
        ${className}`}
      style={{ height: 30 }}
    >
      {index === 0 ? "Where" : value}
    </div>
  );
}

const roles = [
  {
    id: 1,
    label: "Manage Channel",
    value: "MANAGE_CHANNEL",
    description: "Allows members to edit the channel.",
  },
  {
    id: 2,
    label: "Manage Server",
    value: "MANAGE_SERVER",
    description: "Allows members to edit the server.",
  },
  {
    id: 3,
    label: "Manage Roles",
    value: "MANAGE_ROLES",
    description: "Allows members to edit roles.",
  },
  {
    id: 4,
    label: "Invite Members",
    value: "INVITE_MEMBERS",
    description: "Allows members to invite new members.",
  },
];

export default function Roles({ server }) {
  const [tree, setTree] = useState([]);
  const [columns, setColumns] = useState([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const treeColumns = [...tree.map((node) => node.column)];
    const newColumns = COLUMNS.filter((val) => !treeColumns.includes(val));
    setColumns([...newColumns.map((val) => ({ value: val, label: val }))]);
  }, [tree]);

  const onAddClick = useCallback(() => {
    let newTree;
    newTree = createNodeTree({
      conjunction: tree.length > 0 ? "and" : "where",
      column: columns[0],
      value: "active",
    });
    setTree((v) => [...v, newTree]);
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col w-full h-full">
        <h3 className="text-xl font-semibold mb-3">Vai trò</h3>
        <h6 className="text-xs font-medium">
          Sử dụng vai trò để quản lý các thành viên máy chủ và tùy chỉnh quyền
          của họ.
        </h6>
        <div className="flex w-full justify-between items-center py-4 pr-6 pl-4 cursor-pointer bg-slate-300 rounded-md">
          <div className="flex">
            <div className="flex items-center"></div>
            <div className="flex flex-col">
              <div className="font-bold mb-1">Quyền mặc định</div>
              <div className="text-xs">
                Allow members to message the server and view the channel.
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          {/* <TextInput className="w-full" /> */}
          {/* <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom"
            placement="end"
            withCloseButton
            title="Edit user"
            transition="pop-top-right"
            target={
              <ActionIcon onClick={() => setOpened((o) => !o)}>
                <IconFilter />
              </ActionIcon>
            }
          >
            <div className="rounded-sm">
              {tree.map((node, index) => {
                return (
                  <div key={node.id} className="mb-2 flex h-8">
                    <div className="mr-2 w-14 h-full flex justify-center items-center">
                      {node.conjunction}
                    </div>
                    <div className="flex h-full rounded-md">
                      <Select
                        placeholder="Pick one"
                        data={columns}
                        value={node.column}
                        size="xs"
                      />
                      <div className="flex w-8 h-full justify-center items-center">
                        is
                      </div>
                      <Select
                        placeholder="Pick one"
                        data={columns}
                        value={node.column}
                        size="xs"
                      />
                    </div>
                  </div>
                );
              })}
              <AddFilterButton onClick={onAddClick} />
            </div>
          </Popover> */}
        </div>
        <Box
          sx={{
            gap: 24,
            display: "flex",
            padding: 8,
          }}
        >
          <Box
            sx={{
              width: 120,
              flexShrink: 0,
              gap: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              py={10}
            >
              <Text size="lg" weight={600}>
                Members
              </Text>
            </Box>
            <Divider />
            <Stack spacing={4}>
              {server.members &&
                server.members.map((member) => (
                  <Box
                    className={`hover:bg-slate-200 flex w-full h-11 p-1 rounded justify-between items-center cursor-pointer`}
                  >
                    <Avatar
                      src={member.avatar_url}
                      radius="xl"
                      size="lg"
                      styles={{
                        placeholder: {
                          color: "#fff",
                          backgroundColor: `#${Math.floor(
                            member.accent_color
                          ).toString(16)}`,
                        },
                      }}
                    >
                      {member.username[0].toUpperCase()}
                    </Avatar>
                    <div className="flex items-center">
                      <Text size="lg" weight={500}>
                        {member.username}
                      </Text>
                      <Text
                        color="dimmed"
                        size="sm"
                        className="group-hover:opacity-100 opacity-0"
                      >{`#${member.discriminator}`}</Text>
                    </div>
                  </Box>
                ))}
            </Stack>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              py={8}
            >
              <Text size="lg" weight={600}>
                Edit
              </Text>
              <Button>Edit</Button>
            </Box>
            <Divider />
            <Stack spacing={4}>
              <Text size="lg" weight={600}>
                Edit Roles
              </Text>
              {roles &&
                roles.map((role) => (
                  <Checkbox
                    key={role.id}
                    // isChecked={value.includes(friendObject(me, user).id)}
                    onClick={() => {}}
                    className={`hover:bg-slate-200 flex w-full h-11 p-1 rounded justify-between items-center cursor-pointer`}
                  >
                    <div className="select-none">
                      <Text weight={600}>{role.label}</Text>
                      <Text size="xs" color="dimmed">
                        {role.description}
                      </Text>
                    </div>
                  </Checkbox>
                ))}
            </Stack>
          </Box>
        </Box>
        {/* <DndTable
          data={[
            {
              position: 6,
              mass: 12.011,
              symbol: "C",
              name: "Carbon",
            },
            {
              position: 7,
              mass: 14.007,
              symbol: "N",
              name: "Nitrogen",
            },
            {
              position: 39,
              mass: 88.906,
              symbol: "Y",
              name: "Yttrium",
            },
            {
              position: 56,
              mass: 137.33,
              symbol: "Ba",
              name: "Barium",
            },
            {
              position: 58,
              mass: 140.12,
              symbol: "Ce",
              name: "Cerium",
            },
          ]}
        /> */}
      </div>
    </div>
  );
}
