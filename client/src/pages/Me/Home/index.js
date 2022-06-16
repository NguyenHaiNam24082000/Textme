import { BackgroundImage, Box, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import { MainBase } from "../../../components/Main";
import HomeNavbar from "../../../components/navigations/top/HomeNavbar";
import homeBg from "../../../assets/home-background.webp";

const listItems = [
  {
    title: "Multiple Profiles",
    description:
      "Be who you want and use a different avatar, banner and bio in each of your servers.",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "More Backgrounds",
    description: "Customise video calls with your own video backgrounds.",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "More Backgrounds",
    description: "Customise video calls with your own video backgrounds.",
    image: "https://picsum.photos/200/300",
  },
  {
    title: "Style Your Profile",
    description:
      "Express yourself with an animated avatar, profile banner and custom tag.",
    image: "https://picsum.photos/200/300",
  },
];

export default function Home() {
  return (
    <MainBase>
      <HomeNavbar />
      <div
        className="flex justify-center flex-auto min-w-0 min-h-0 relative overflow-y-scroll "
        style={{ padding: "40px 40px 80px" }}
      >
        <div className="flex flex-col p-2">
          <Box sx={{ height: 460, marginBottom: 20, width: "100%" }} mx="auto">
            <BackgroundImage
              // className="rounded-xl"
              radius="md"
              style={{ height: 460 }}
              src={homeBg}
            ></BackgroundImage>
          </Box>
          <SimpleGrid cols={3}>
            {listItems &&
              listItems.map((item, index) => (
                <Paper
                  key={index}
                  shadow="sm"
                  radius="md"
                  p="lg"
                  className="min-h-[233px] text-center"
                  withBorder
                >
                  <Text
                    component="span"
                    align="center"
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                    size="xl"
                    weight={700}
                  >
                    {item.title}
                  </Text>
                  <Text size="xs" color="dimmed">
                    {item.description}
                  </Text>
                </Paper>
              ))}
          </SimpleGrid>
        </div>
        {/* <Container size="sm" className="flex flex-col justify-center items-center">
          <Title align="center" className={classes.title}>
            Frequently Asked Questions
          </Title>

          <Accordion
            iconPosition="right"
            initialItem={0}
            classNames={{
              item: classes.item,
              itemOpened: classes.itemOpened,
              control: classes.control,
              icon: classes.icon,
              contentInner: classes.content,
            }}
            icon={
              <ThemeIcon radius="xl" className={classes.gradient} size={32}>
                <Plus size={18} />
              </ThemeIcon>
            }
          >
            <Accordion.Item label="How can I reset my password?">
              {placeholder}
              <Button className={cx(classes.gradient, classes.button)}>
                Reset password
              </Button>
            </Accordion.Item>
            <Accordion.Item label="Can I create more that one account?">
              {placeholder}
            </Accordion.Item>
            <Accordion.Item label="Do you store credit card information securely?">
              {placeholder}
            </Accordion.Item>
            <Accordion.Item label="What payment systems to you work with?">
              {placeholder}
            </Accordion.Item>
            <Accordion.Item label="How can I subscribe to monthly newsletter?">
              {placeholder}
              <Button className={cx(classes.gradient, classes.button)}>
                Subscribe to newsletter
              </Button>
            </Accordion.Item>
          </Accordion>
        </Container>*/}
      </div>
    </MainBase>
  );
}
