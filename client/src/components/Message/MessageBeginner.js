import { Avatar, Box, Stack, Text } from "@mantine/core";
import React from "react";
import { GetMe } from "../../store/userSlice";

function MessageBeginner({ channel }) {
  const me = GetMe();
  return (
    <Stack p={16} spacing={0}>
      {channel.type !== "TEXT" && (
        <>
          <Box>
            <div className="h-32 w-32 relative">
              {channel.type === "GROUP" ? (
                <>
                  <Avatar
                    src={channel.owner.avatar_url}
                    radius="50%"
                    size={85}
                    style={{
                      height: "calc(100% * (2/3))",
                      border: "2px solid #fff",
                    }}
                    className="absolute left-0 bottom-0 z-[1]"
                    styles={{
                      placeholder: {
                        color: "#fff",
                        backgroundColor: `#${Math.floor(
                          channel.owner.accent_color
                        ).toString(16)}`,
                      },
                    }}
                  >
                    {channel.owner.username[0]}
                  </Avatar>
                  <Avatar
                    src={channel.members[0].avatar_url}
                    radius="50%"
                    size={85}
                    style={{ height: "calc(100% * (2/3))" }}
                    className="absolute right-0 top-0 z-0"
                    styles={{
                      placeholder: {
                        color: "#fff",
                        backgroundColor: `#${Math.floor(
                          channel.members[0].accent_color
                        ).toString(16)}`,
                      },
                    }}
                  >
                    {channel.members[0].username[0]}
                  </Avatar>
                </>
              ) : (
                <>
                  <Avatar
                    src={
                      channel.members[0]._id !== me.user._id
                        ? channel.members[0].avatar_url
                        : channel.members[1].avatar_url
                    }
                    radius="50%"
                    size={128}
                    styles={{
                      placeholder: {
                        color: "#fff",
                        backgroundColor: `#${
                          channel.members[0]._id !== me.user._id
                            ? Math.floor(
                                channel.members[0].accent_color
                              ).toString(16)
                            : Math.floor(
                                channel.members[1].accent_color
                              ).toString(16)
                        }`,
                      },
                    }}
                  >
                    {channel.members[0]._id !== me.user._id
                      ? channel.members[0].username[0]
                      : channel.members[1].username[0]}
                  </Avatar>
                </>
              )}
            </div>
          </Box>
          <Box>
            <Text
              sx={{
                fontSize: "42px",
              }}
              weight={700}
            >
              <Text
                size={15}
                weight={500}
                className="overflow-ellipsis truncate"
              >
                {channel.type === "GROUP"
                  ? channel.name === null
                    ? channel.members
                        .map((member) => member.username)
                        .join(", ")
                    : channel.name
                  : channel.members[0]._id !== me.user._id
                  ? channel.members[0].username
                  : channel.members[1].username}
              </Text>
            </Text>
          </Box>
          <Box>
            <Text color="dimmed">
              Welcome to the beginning of the {channel.type} channel.
            </Text>
          </Box>
        </>
      )}
    </Stack>
  );
}

export default MessageBeginner;
