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
} from "@mantine/core";
import { getDiscoverServers } from "../../../apis/workspace";

export default function Discover() {
  const [discoverServers, setDiscoverServers] = useState([]);
  useEffect(() => {
    const fetchDiscoverServers = async () => {
      const { data } = await getDiscoverServers();
      setDiscoverServers(data);
    };
    fetchDiscoverServers();
  }, []);

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
          src="https://images.hdqwalls.com/wallpapers/genshin-impact-game-2021-ig.jpg"
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
              <TextInput placeholder="Search workspaces" variant="filled" />
              <Group spacing="xs" grow>
                <Text color="white">Related tags:</Text>
                <Badge radius="sm" variant="outline">
                  #Badge
                </Badge>
              </Group>
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
          {discoverServers.map((server) => (
            <Box
              key={server.id}
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
                    src="https://images.hdqwalls.com/wallpapers/genshin-impact-game-2021-ig.jpg"
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="relative">
                  <div className="flex absolute w-full justify-center">
                    <div
                      className="-mt-12 w-16 h-16 object-cover rounded-full flex z-10 justify-center items-center -mt-20 object-cover rounded-full"
                      style={{
                        width: 100,
                        height: 100,
                        border: "6px solid #fff",
                      }}
                    >
                      <Avatar
                        size="100%"
                        sx={{
                          backgroundColor: "#7289DA",
                          color: "#fff",
                          fontSize: 32,
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
                        {server.members.length + 1} members
                      </div>
                      <div className="flex text-xs items-center">
                        <span>low active</span>
                      </div>
                    </div>
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
