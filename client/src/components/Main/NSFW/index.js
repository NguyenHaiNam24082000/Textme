import React from "react";
import "@lottiefiles/lottie-player";
import { Button, Group, Text } from "@mantine/core";

export default function NSFW({ setIsContinue, setIsGoBack }) {
  return (
    <div className="bg-white flex flex-col flex-auto min-w-0 min-h-0 justify-center items-center gap-8">
      <lottie-player
        autoplay
        loop
        src="https://assets7.lottiefiles.com/packages/lf20_jvki4wd1.json"
        style={{ height: "auto", width: "200px" }}
      />
      <Text size="xl" weight="bold">
        NSFW
      </Text>
      <Text size="md" color="dimmed">
        This channel is marked as NSFW.
      </Text>
      <Text size="md" weight="bold">
        I confirm that I am at least 18 years old.
      </Text>
      <Group spacing="sm">
        <Button
          variant="outline"
          color="dark"
          onClick={() => setIsGoBack(true)}
        >
          Go back
        </Button>
        <Button color="green" onClick={() => setIsContinue(true)}>
          Enter Channel
        </Button>
      </Group>
    </div>
  );
}
