import React from "react";
import {
  BackgroundImage,
  Center,
  Text,
  Box,
  Stack,
  TextInput,
  Group,
  Badge,
} from "@mantine/core";
import { getDiscoverServers } from "../../../apis/workspace";

export default function Discover() {
  const { data } = getDiscoverServers();
  return (
    <Box sx={{ height: 400, width: "100%" }} p={16}>
      <BackgroundImage
        sx={{
          height: "100%",
          width: "100%",
        }}
        src="https://images.hdqwalls.com/wallpapers/genshin-impact-game-2021-ig.jpg"
        radius={"md"}
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
      {JSON.stringify(data)}
    </Box>
  );
}
