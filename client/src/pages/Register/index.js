import React, { useState } from "react";
import AuthForm from "../../components/AuthForm";
import { useTranslation } from "react-i18next";
import { At, Lock, Key, Copy } from "tabler-icons-react";
import {
  TextInput,
  Select,
  PasswordInput,
  Text,
  Button,
  ActionIcon,
  Tooltip,
  Autocomplete,
  Group,
  Checkbox,
  Divider,
  Drawer,
  NumberInput,
  Progress,
  Popover,
  Box,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useClipboard } from "@mantine/hooks";
import { CheckIcon, Cross1Icon } from "@modulz/radix-icons";
import Fab from "@mui/material/Fab";
import Facebook from "../../assets/logos/facebook.svg";
import Google from "../../assets/logos/google.svg";
import { NavLink } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-30%",
    scale: 0.8,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: "100%",
    scale: 1.2,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const pageStyle = {
  position: "absolute",
};

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function PasswordRequirement({ meets, label }) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <CheckIcon /> : <Cross1Icon />} <Box ml={10}>{label}</Box>
    </Text>
  );
}

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function Login() {
  const { t } = useTranslation();
  const clipboard = useClipboard({ timeout: 500 });
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [v, setV] = useState("");
  const [value, setValue] = useState("");
  const [opened, setOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(v)}
    />
  ));
  const strength = getStrength(v);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const data =
    value.trim().length > 0 && !value.includes("@")
      ? ["gmail.com", "outlook.com", "yahoo.com"].map(
          (provider) => `${value}@${provider}`
        )
      : [];
  return (
    <div
      className="w-full h-full flex justify-center items-center relative"
      style={{
        background:
          "url(https://img.itch.zone/aW1nLzQzMjIzOTEuZ2lm/original/3igDW2.gif) no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <AuthForm>
        <motion.div
          style={pageStyle}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <h1 className="text-2xl  font-bold">{t("register")}</h1>
          <div className="my-3 text-sm">
            Tham gia hàng triệu máy chủ công cộng miễn phí lớn nhất
          </div>
          <Divider />
          <div
            className="flex justify-center my-2"
            style={{ fontSize: "1rem", fontWeight: 600, color: "#61708b" }}
          >
            Tiếp tục với
          </div>
          <Group position="center">
            <Tooltip label={t("login_with_facebook")} radius="md">
              <ActionIcon size="xl" radius="md" variant="default">
                <img src={Facebook} alt="Facebook" />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={t("login_with_google")} radius="md">
              <ActionIcon size="xl" radius="md" variant="default">
                <img src={Google} alt="Google" />
              </ActionIcon>
            </Tooltip>
          </Group>
          <div
            className="flex justify-center mt-2"
            style={{ fontSize: "1rem", fontWeight: 600, color: "#61708b" }}
          >
            Or
          </div>
          <TextInput
            placeholder={t("username")}
            label={t("username")}
            required
          />
          <Autocomplete
            value={value}
            onChange={setValue}
            label={t("email")}
            placeholder={t("email")}
            required
            icon={<At size={16} />}
            data={data}
          />
          <Group grow>
            <PasswordInput
              placeholder={t("password")}
              label={t("password")}
              icon={<Lock size={16} />}
              required
            />
            <PasswordInput
              placeholder={t("confirm_password")}
              label={t("confirm_password")}
              icon={<Lock size={16} />}
              required
            />
          </Group>
          <Group className="my-3">
            <Checkbox
              size="xs"
              color="yellow"
              label="Tôi đồng ý với điều khoản và điều kiện"
            />
          </Group>
          <Group position="center" grow className="my-6">
            <Button
              color="yellow"
              radius="md"
              size="md"
              compact
              style={{ backgroundColor: "#fab005" }}
            >
              {t("register")}
            </Button>
          </Group>
          <Group position="center" className="mt-6 text-xs">
            <div>
              Bạn là người mới?{" "}
              <NavLink
                to="/login"
                style={{color: "#1c7ed6"}}
              >
                Create an account
              </NavLink>
            </div>
          </Group>
        </motion.div>
      </AuthForm>
      <Fab
        size="medium"
        aria-label="Password generator"
        style={{ backgroundColor: "#fab005" }}
        sx={{
          position: "absolute",
          bottom: 20,
          right: 24,
        }}
        onClick={() => setOpened(true)}
      >
        <Key size={24} color="white" />
      </Fab>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        title={
          <Text style={{ fontSize: "var(--font-size-xxxlarge)" }} weight={600}>
            Password Generator
          </Text>
        }
        padding="xl"
        shadow="xs"
        size="lg"
        noOverlay
      >
        <Progress color={color} value={strength} size={8} radius="xs" />
        <Popover
          opened={popoverOpened}
          position="bottom"
          placement="start"
          withArrow
          styles={{ popover: { width: "100%" } }}
          noFocusTrap
          className="w-full my-3"
          transition="pop-top-left"
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
          target={
            <TextInput
              icon={<Lock size={16} />}
              value={v}
              onChange={(event) => setV(event.target.value)}
              rightSection={
                <ActionIcon
                  color={clipboard.copied ? "teal" : "gray"}
                  onClick={() => clipboard.copy("Hello, world!")}
                >
                  {clipboard.copied ? <CheckIcon /> : <Copy size={16} />}
                </ActionIcon>
              }
            />
          }
        >
          <Progress
            color={color}
            value={strength}
            size={5}
            style={{ marginBottom: 10 }}
          />
          <PasswordRequirement
            label="Includes at least 6 characters"
            meets={v.length > 5}
          />
          {checks}
        </Popover>
        <Group position="apart">
          <div>Password strength</div>
          <NumberInput size="xs" className="w-20" />
        </Group>
        <Group position="apart">
          <div>Include Uppercase letters</div>
          <Checkbox size="xs" />
        </Group>
        <Group position="apart">
          <div>Include Lowercase letters</div>
          <Checkbox size="xs" />
        </Group>
        <Group position="apart">
          <div>Include Number</div>
          <Checkbox size="xs" />
        </Group>
        <Group position="apart">
          <div>Include Symbols</div>
          <Checkbox size="xs" />
        </Group>
        <Group grow className="mt-3">
          <Button
            color="yellow"
            radius="md"
            style={{ backgroundColor: "#fab005" }}
          >
            Generate
          </Button>
        </Group>
      </Drawer>
    </div>
  );
}
