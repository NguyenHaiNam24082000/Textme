import { AspectRatio, ColorSwatch, Image, Paper, Text, ThemeIcon } from "@mantine/core";
import React from "react";

export default function index() {
  return (
    <Paper
      withBorder
      radius="md"
      sx={(theme) => ({
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform 150ms ease, box-shadow 100ms ease",
        padding: "12px 18px 12px 24px",
        width: 512,
        borderLeftWidth: 0,

        "&:hover": {
          boxShadow: theme.shadows.md,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 6,
          backgroundImage: theme.fn.linearGradient(180, "red", "#fff"),
        },
      })}
    >
      <div className="gap-2 flex items-center">
        <Image
          width={16}
          height={16}
          src="https://jan.revolt.chat/proxy?url=https%3A%2F%2Fwww.youtube.com%2Fs%2Fdesktop%2F13ae94d8%2Fimg%2Ffavicon_144x144.png"
        />
        <Text size="sm" color="dimmed">
          YouTube
        </Text>
      </div>
      <Text size="xs" weight={500} variant="link">
        #Theming documentation
      </Text>
      <Text size="lg" weight={500} variant="link">
        {/* {title} */}
        Theming documentation
      </Text>
      <Text size="xs" weight={500} className="mb-1">
        Theming documentation
      </Text>
      {/* <Text size="sm" mt="sm" color="dimmed">
        {/* {description} */}
      {/* Extend default theme with any amount of additional colors, replace
        shadows, radius, spacing, fonts and many other properties to match your
        design requirements. Mantine theme is just an object, you can subscribe
        to it in any part of application via context and use it to build your
        own components.
      </Text> */}
      <AspectRatio ratio={16 / 9} className="rounded-md w-full bg-black">
        <iframe
          loading="lazy"
          className="w-full h-auto"
          style={{ borderRadius: "inherit" }}
          src="https://www.youtube.com/embed/9EDZixuODrw"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </AspectRatio>
    </Paper>
  );
}
