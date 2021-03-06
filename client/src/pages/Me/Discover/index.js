import React, { useEffect, useState } from "react";
import {
  BackgroundImage,
  Center,
  Text,
  Box,
  Stack,
  TextInput,
  Group,
  Badge,
  Avatar,
  SimpleGrid,
  ScrollArea,
  Button,
} from "@mantine/core";
import {
  getDiscoverServers,
  sendJoinServerRequest,
  cancelJoinServerRequest,
} from "../../../apis/workspace";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "react-query";
import { OPEN_SERVER } from "../../../configs/queryKeys";

// "PENDING",
// "INVITED",
// "JOINED",
// "BLOCKED",
// "LEFT",
// "BANNED",
// "KICKED",

const GetDiscoverServers = () => {
  return useQuery("DiscoverServers", async () => {
    const { data } = await getDiscoverServers();
    return data;
  });
};

export default function Discover() {
  // const [discoverServers, setDiscoverServers] = useState([]);
  const history = useNavigate();
  const cache = useQueryClient();
  const { data: discoverServers } = GetDiscoverServers();
  // useEffect(() => {
  //   const fetchDiscoverServers = async () => {
  //     const { data } = await GetDiscoverServers();
  //     // const serverIds = servers.map((item)=>item.id);
  //     // const s= data.map((server) => {
  //     //   let joined=false;
  //     //   if(serverIds.includes(server.id))
  //     //   {
  //     //     joined=true;
  //     //   }
  //     //   return {
  //     //     ...server,
  //     //     joined,
  //     //   };
  //     // })
  //     setDiscoverServers(data);
  //   };
  //   fetchDiscoverServers();
  // }, []);

  const sendRequestJoinWorkspace = async (serverId) => {
    const { data } = await sendJoinServerRequest({ serverId });
    if (data) {
      cache.invalidateQueries("DiscoverServers");
      cache.invalidateQueries(OPEN_SERVER);
    }
  };

  const cancelRequestJoinWorkspace = async (serverId) => {
    const { data } = await cancelJoinServerRequest({ serverId });
    if (data) {
      cache.invalidateQueries("DiscoverServers");
      // cache.invalidateQueries(OPEN_SERVER);
    }
  };

  return (
    <ScrollArea
      sx={{
        width: "100%",
      }}
      p={16}
    >
      <Box sx={{ height: 400, width: "100%" }} mb={16}>
        <BackgroundImage
          sx={{
            height: "100%",
            width: "100%",
          }}
          src="https://discord.com/assets/1a23068e966efce6fb32ca9fecc65eed.svg"
          radius={"md"}
          mb={24}
        >
          <Center
            sx={{
              height: "100%",
              width: "100%",
            }}
            p="md"
          >
            <Stack spacing="sm" align="center">
              <Text size="xl" color="white" weight={700}>
                Find your community on Textme
              </Text>
              <Text size={14} color="white">
                From one community to another, there's a place for everyone.
              </Text>
              <TextInput
                placeholder="Search workspaces"
                variant="filled"
                sx={{
                  width: "500px",
                }}
              />
              {/* <Group
                spacing="xs"
                grow
                sx={{
                  width: "300px",
                }}
              >
                <Text color="white">Related tags:</Text>
                <Badge radius="sm" variant="outline">
                  #Badge
                </Badge>
              </Group> */}
            </Stack>
          </Center>
        </BackgroundImage>
        {/* {JSON.stringify(data)} */}
      </Box>
      <Stack>
        <Text size="xl" weight={700}>
          Popular Workspace
        </Text>
        <SimpleGrid
          cols={4}
          sx={{
            width: "100%",
          }}
        >
          {discoverServers &&
            discoverServers.map((server) => (
              <Box
                key={server._id}
                sx={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <div
                  // style={{
                  //   width: 300,
                  // }}
                  className="w-full card-main rounded-lg inline-flex h-80 flex-col select-none font-normal pointer overflow-hidden"
                >
                  <div className="h-32 overflow-hidden">
                    <BackgroundImage
                      // src="https://images.hdqwalls.com/wallpapers/genshin-impact-game-2021-ig.jpg"
                      sx={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "#7289DA",
                      }}
                    />
                  </div>
                  <div className="relative">
                    <div className="flex absolute w-full justify-center">
                      <div
                        className="w-16 h-16 flex z-10 justify-center items-center -mt-20 object-cover rounded-full"
                        style={{
                          width: 100,
                          height: 100,
                          border: "6px solid #fff",
                        }}
                      >
                        <Avatar
                          size="100%"
                          styles={{
                            placeholder: {
                              backgroundColor: "#7289DA",
                              color: "#fff",
                              fontSize: 32,
                            },
                          }}
                          className="rounded-full"
                          src="https://cdn.discordapp.com/avatars/94490510688792576/a_84032ca2190d12afb662bb4a381a4199"
                        >
                          {server.name[0].toUpperCase()}
                        </Avatar>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div
                      className="h-full flex flex-col bg-slate-200 gap-2"
                      style={{ padding: "24px 16px 16px" }}
                    >
                      <div className="flex items-center justify-center text-lg font-semibold">
                        {server.name}
                      </div>
                      <div className="overflow-hidden text-xs">
                        {server.description}
                      </div>
                      <div className="flex justify-between mt-auto">
                        <div className="text-xs flex item-center">
                          {/* {server.members.length + 1} members */}
                          {server.totalMembers} members
                        </div>
                        <div className="flex text-xs items-center">
                          <span>low active</span>
                        </div>
                      </div>
                      <Group grow>
                        {server?.meStatus === "JOINED" ? (
                          <Button
                            onClick={() => {
                              // history(
                              //   `/channel/${server.id}/${server.channels[0].channel}`
                              // );
                            }}
                          >
                            Access
                          </Button>
                        ) : server?.meStatus === "INVITED" ? (
                          <Button>Accept</Button>
                        ) : server?.meStatus === "PENDING" ? (
                          <Button
                            onClick={() =>
                              cancelRequestJoinWorkspace(server._id)
                            }
                          >
                            Cancel
                          </Button>
                        ) : server?.meStatus === "NOT_MEMBER" &&
                          server.type === "PUBLIC" ? (
                          <Button
                            onClick={() => sendRequestJoinWorkspace(server._id)}
                          >
                            Join
                          </Button>
                        ) : (
                          <Button
                            onClick={() => sendRequestJoinWorkspace(server._id)}
                          >
                            Request
                          </Button>
                        )}
                      </Group>
                    </div>
                  </div>
                </div>
              </Box>
            ))}
        </SimpleGrid>
      </Stack>
    </ScrollArea>
  );
}
