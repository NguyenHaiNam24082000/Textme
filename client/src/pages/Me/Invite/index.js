import { BackgroundImage, Center, Text, Box, Avatar } from "@mantine/core";

export default function Invite() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <BackgroundImage
        sx={{
          height: "100%",
          width: "100%",
        }}
        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
      >
        <Center
          p="md"
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            className="w-[512px] h-[512px]"
            sx={{
              background: "rgba( 255, 255, 255, 0.25 )",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: "blur( 4px )",
              WebkitBackdropFilter: "blur( 4px )",
              borderRadius: "10px",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              width: "",
            }}
          >
            <Avatar
              radius="xl"
              size="lg"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            />
          </Box>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
