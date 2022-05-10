import React from "react";
import { BackgroundImage, Center, Text, Box, Stack, TextInput, Group, Badge } from "@mantine/core";

export default function Discover() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <BackgroundImage
        sx={{
          height: "100%",
          width: "100%",
        }}
        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
        radius={0}
      >
        <Center
          sx={{
            height: "100%",
            width: "100%",
          }}
          p="md"
        >
          <Stack spacing="sm">
            <Text size={30} weight={500}>
              Discover Workspaces
            </Text>
            <Text size={14}>
              From one community to another, there's a place for everyone.
            </Text>
            <TextInput
              placeholder="Search workspaces"
              variant="filled"
            />
            <Group spacing="xs">
              <span>Related tags:</span>
              <Badge radius="sm" variant="outline">#Badge</Badge>
            </Group>
          </Stack>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
