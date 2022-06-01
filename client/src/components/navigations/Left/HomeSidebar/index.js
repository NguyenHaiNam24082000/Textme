import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Badge,
  Code,
  createStyles,
  Group,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
// import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "tabler-icons-react";
import { PendingRequests } from "../../../../reactQuery/friend";
import SidebarBase from "../../SidebarBase";
import DMList from "./DMList";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    marginBottom: 8,
  },

  collectionLink: {
    display: "block",
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export default function HomeSidebar({ channels }) {
  const { classes } = useStyles();
  const spotlight = useSpotlight();
  const { data: pendingRequestsData } = PendingRequests();
  const { t } = useTranslation();
  const location = useLocation();
  const links = [
    {
      icon: <FontAwesomeIcon icon="fa-solid fa-house" />,
      label: t("Home"),
      notifications: 0,
      to: "/channel/@me",
    },
    {
      icon: <FontAwesomeIcon icon="fa-solid fa-user-group" />,
      label: t("Friends"),
      notifications: pendingRequestsData?.length,
      to: "/friends",
    },
    {
      icon: <FontAwesomeIcon icon="fa-solid fa-ticket" />,
      label: t("Invites"),
      notifications: 0,
      to: "/invites",
    },
    // { icon: User, label: "Contacts" },
  ];

  return (
    <SidebarBase>
      <div>
        <div className="flex w-full h-12 flex-shrink-0 px-2 cursor-pointer">
          <div
            className="flex w-full h-full items-center justify-center px-2"
            style={{ borderBottom: "2px solid #e5e7eb" }}
          >
            <TextInput
              placeholder="Search"
              size="xs"
              icon={<Search size={12} />}
              rightSectionWidth={70}
              rightSection={
                <Code className={classes.searchCode}>Ctrl + K</Code>
              }
              styles={{ rightSection: { pointerEvents: "none" } }}
              className="pointer-events-none cursor-pointer"
              onClick={spotlight.openSpotlight}
            />
          </div>
        </div>
        <div className="flex flex-col flex-auto">
          <div className="flex flex-col px-2 mt-2">
            {links &&
              links.map((link) => (
                <Link
                  to={link.to}
                  key={link.label}
                  className="no-underline text-black"
                >
                  <div
                    className={`flex items-center h-8 px-2 text-base cursor-pointer gap-2 hover:bg-gray-200 ${
                      location.pathname === link.to && "bg-gray-200"
                    }`}
                    style={{ marginBottom: 2, borderRadius: 6 }}
                  >
                    <div className="flex items-center justify-center w-5 contrast-50">
                      {link.icon}
                    </div>
                    <div className="flex flex-auto">{link.label}</div>
                    {link.notifications > 0 && (
                      <Badge
                        size="sm"
                        variant="filled"
                        color="red"
                        className={classes.mainLinkBadge}
                      >
                        {link.notifications}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
          </div>
          <Group className={classes.collectionsHeader} position="apart">
            <Text weight={500} color="dimmed">
              {t("Direct Messages")}
            </Text>
            <Group spacing={8}>
              <Tooltip label="List options" withArrow position="right">
                <ActionIcon variant="hover">
                  <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Create collection" withArrow position="right">
                <ActionIcon variant="hover">
                  <FontAwesomeIcon icon="fa-solid fa-plus" />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
          <DMList channels={channels} />
        </div>
      </div>
    </SidebarBase>
  );
}

//   export function NavbarSearch() {
//     const { classes } = useStyles();

//     const mainLinks = links.map((link) => (
//       <UnstyledButton key={link.label} className={classes.mainLink}>
//         <div className={classes.mainLinkInner}>
//           <link.icon size={20} className={classes.mainLinkIcon} />
//           <span>{link.label}</span>
//         </div>
//         {link.notifications && (
//           <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
//             {link.notifications}
//           </Badge>
//         )}
//       </UnstyledButton>
//     ));

//     const collectionLinks = collections.map((collection) => (
//       <a
//         href="/"
//         onClick={(event) => event.preventDefault()}
//         key={collection.label}
//         className={classes.collectionLink}
//       >
//         <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span> {collection.label}
//       </a>
//     ));

//     return (
//       <Navbar height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>
//         <Navbar.Section className={classes.section}>
//           <UserButton
//             image="https://i.imgur.com/fGxgcDF.png"
//             name="Bob Rulebreaker"
//             email="Product owner"
//             icon={<Selector size={14} />}
//           />
//         </Navbar.Section>

//         <TextInput
//           placeholder="Search"
//           size="xs"
//           icon={<Search size={12} />}
//           rightSectionWidth={70}
//           rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
//           styles={{ rightSection: { pointerEvents: 'none' } }}
//           mb="sm"
//         />

//         <Navbar.Section className={classes.section}>
//           <div className={classes.mainLinks}>{mainLinks}</div>
//         </Navbar.Section>

//         <Navbar.Section className={classes.section}>
//           <Group className={classes.collectionsHeader} position="apart">
//             <Text size="xs" weight={500} color="dimmed">
//               Collections
//             </Text>
//             <Tooltip label="Create collection" withArrow position="right">
//               <ActionIcon variant="default" size={18}>
//                 <Plus size={12} />
//               </ActionIcon>
//             </Tooltip>
//           </Group>
//           <div className={classes.collections}>{collectionLinks}</div>
//         </Navbar.Section>
//       </Navbar>
//     );
//   }
