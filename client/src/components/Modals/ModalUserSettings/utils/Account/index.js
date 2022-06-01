import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // ActionIcon,
  Avatar,
  BackgroundImage,
  Button,
  // Divider,
  Group,
  Text,
  // ColorSwatch,
  TextInput,
  Menu,
  createStyles,
  Anchor,
  Popover,
} from "@mantine/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { changePassword } from "../../../../../apis/auth";
// import { GetMe } from "../../../../../store/userSlice";
import Modal from "../../../Modal";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  button: {
    borderRadius: 0,

    "&:not(:first-of-type)": {
      borderLeftWidth: 0,
    },

    "&:first-of-type": {
      borderTopLeftRadius: theme.radius.sm,
      borderBottomLeftRadius: theme.radius.sm,
    },

    "&:last-of-type": {
      borderTopRightRadius: theme.radius.sm,
      borderBottomRightRadius: theme.radius.sm,
    },
  },
}));

function UserEditForm({ initialValues, onSubmit, onCancel }) {
  const isMobile = useMediaQuery("(max-width: 755px");

  const form = useForm({
    initialValues,
    validationRules: {
      name: (value) => value.trim().length > 2,
      email: (value) => value.trim().length > 2,
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        required
        label="Name"
        placeholder="Name"
        style={{ minWidth: isMobile ? 220 : 300 }}
        value={form.values.name}
        onChange={(event) =>
          form.setFieldValue("name", event.currentTarget.value)
        }
        error={form.errors.name}
        variant="default"
      />

      <TextInput
        required
        label="Email"
        placeholder="Email"
        style={{ minWidth: isMobile ? 220 : 300, marginTop: 15 }}
        value={form.values.email}
        onChange={(event) =>
          form.setFieldValue("email", event.currentTarget.value)
        }
        error={form.errors.email}
        variant="default"
      />

      <Group position="apart" style={{ marginTop: 15 }}>
        <Anchor component="button" color="gray" size="sm" onClick={onCancel}>
          Cancel
        </Anchor>
        <Button type="submit" size="sm">
          Save
        </Button>
      </Group>
    </form>
  );
}

export default function Account({ user }) {
  const [values, setValues] = useState({
    name: "Bob Handsome",
    email: "bob@handsome.inc",
  });
  const { classes } = useStyles();
  const me = {
    user: {
      banner: "",
      email: "",
      accent_color: 123456,
      discriminator: 123,
      avatar: "",
    },
  };
  const [opened, setOpened] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [openedModalChangePassword, setOpenedModalChangePassword] =
    useState(false);
  const { t } = useTranslation();
  const [serverError, setServerError] = useState(null);
  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },

    validationRules: {
      oldPassword: (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value
        ),
      newPassword: (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value
        ),
    },
  });
  const handleSubmit = async (values) => {
    const { data } = await changePassword({
      ...values,
    });
    console.log(data);
    if (data.error) {
      setServerError(data.error.password);
    } else {
      setServerError(null);
      setOpenedModalChangePassword(false);
    }
  };
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold mb-3">{t("My Account")}</h3>
        <div className="flex flex-col w-full h-auto bg-gray-200 rounded-lg overflow-hidden">
          <BackgroundImage
            sx={{
              background: `#${Math.floor(me.user?.accent_color).toString(16)}`,
            }}
            // src={me.user?.banner}
            radius="xs"
            className="h-40"
          />
          <Group grow spacing={0}>
            <Button variant="default" className={classes.button}>
              Change Banner
            </Button>
            <Button variant="default" className={classes.button}>
              Remove Banner
            </Button>
          </Group>
          <div className="relative">
            <div className="flex w-full gap-3 p-5 justify-between items-center absolute -top-[84px]">
              <Menu
                placement="center"
                trigger="hover"
                delay={500}
                control={
                  <div className="flex items-center relative">
                    <Avatar
                      size={128}
                      radius="50%"
                      style={{ border: "8px solid #fff" }}
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                    />
                    <div
                      className="rounded-full w-8 h-8 justify-center items-center flex absolute bottom-3 right-3"
                      style={{ border: "8px solid #fff" }}
                    >
                      😀
                    </div>
                  </div>
                }
              >
                <Menu.Item>Change Avatar</Menu.Item>
                <Menu.Item>Remove Avatar</Menu.Item>
              </Menu>
              <Group
                grow
                direction="column"
                className="flex-auto h-32 justify-center"
              >
                <div className="flex items-end w-full">
                  <span className="text-white text-2xl font-bold">
                    {/* @{user && pending && pendingUsername(user, pending)} */}
                    {/* @{me.user?.username} */}
                  </span>
                  <span className="text-slate-300 text-2xl font-medium">
                    {/* #{me.user?.discriminator} */}
                  </span>
                </div>
                {/* <div className="flex w-full text-black text-sm font-medium items-center">
                  <div className="desc">
                    {<span className="desc">
                      💜When you're screaming💜 💜When you're screaming💜 💜When
                      you're screaming💜 💜When you're screaming💜 💜When you're
                      screaming💜💜When you're screaming💜 💜When you're
                      screaming💜
                    </span>
                  </div>
                </div> */}
              </Group>
              <div className="flex flex-col justify-end h-32 py-5">
                <div className="flex items-center gap-2">
                  <Popover
                    opened={opened}
                    onClose={() => setOpened(false)}
                    position="bottom"
                    placement="end"
                    withCloseButton
                    title="Edit user"
                    transition="pop-top-right"
                    target={
                      <Button
                        disabled
                        leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                      >
                        {t("Edit User Profile")}
                      </Button>
                    }
                  >
                    <UserEditForm
                      initialValues={values}
                      onCancel={() => setOpened(false)}
                      onSubmit={(data) => {
                        setValues(data);
                        setOpened(false);
                      }}
                    />
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col mx-4 mb-4 mt-20 bg-white flex-auto p-4 gap-6"
            style={{ borderRadius: "inherit" }}
          >
            <div className="flex w-full h-full justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-user"
                  className="text-3xl contrast-0"
                />
                <div className="flex flex-col">
                  <div className="flex uppercase text-xs font-bold mb-1">
                    {t("Username")}
                  </div>
                  <div className="flex">{/* {me.user?.username} */}</div>
                </div>
              </div>
              {/* <div className="flex">
                <Button
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                  variant="white"
                >
                  {t("Edit")}
                </Button>
              </div> */}
            </div>
            <div className="flex w-full h-full justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-at"
                  className="text-3xl contrast-0"
                />
                <div className="flex flex-col">
                  <div className="flex uppercase text-xs font-bold mb-1">
                    {t("Email")}
                  </div>
                  <div className="flex items-center">
                    {/* {showEmail
                      ? me.user?.email
                      : me.user?.email.replace(/[^@.]/g, "*")} */}
                    <Text
                      variant="link"
                      className="ml-1 cursor-pointer"
                      onClick={() => setShowEmail((v) => !v)}
                    >
                      {/* {showEmail ? t("Hide") : t("Show")} */}
                    </Text>
                  </div>
                </div>
              </div>
              {/* <div className="flex">
                <Button
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                  variant="white"
                >
                  {t("Edit")}
                </Button>
              </div> */}
            </div>
            <div className="flex w-full h-full justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-user"
                  className="text-3xl contrast-0"
                />
                <div className="flex flex-col">
                  <div className="flex uppercase text-xs font-bold mb-1">
                    {t("Name")}
                  </div>
                  <div className="flex">{/* {me.user?.username} */}</div>
                </div>
              </div>
              <div className="flex">
                <Button
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                  variant="white"
                >
                  {t("Edit")}
                </Button>
              </div>
            </div>
            <div className="flex w-full h-full justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-phone"
                  className="text-3xl contrast-0"
                />
                <div className="flex flex-col">
                  <div className="flex uppercase text-xs font-bold mb-1">
                    {t("Phone Number")}
                  </div>
                  <div className="flex items-center">
                    {/* {showPhone
                      ? me.user?.phone
                      : me.user?.phone.replace(/./g, "*")} */}
                    <Text
                      variant="link"
                      className="ml-1 cursor-pointer"
                      onClick={() => setShowPhone((v) => !v)}
                    >
                      {/* {showPhone ? t("Hide") : t("Show")} */}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex">
                <Button
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                  variant="white"
                >
                  {t("Edit")}
                </Button>
              </div>
            </div>
            <div className="flex w-full h-full justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-key"
                  className="text-3xl contrast-0"
                />
                <div className="flex flex-col">
                  <div className="flex uppercase text-xs font-bold mb-1">
                    {t("Password")}
                  </div>
                  <div className="flex">{me.user?.password}</div>
                </div>
              </div>
              <div className="flex">
                <Button
                  leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                  variant="white"
                  onClick={() => setOpenedModalChangePassword(true)}
                >
                  {t("Edit")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Divider className="my-6" />
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold mb-3">Avatar</h3>
        <Group>
          <Button>Change Avatar</Button>
          <Button variant="subtle">Remove Avatar</Button>
        </Group>
      </div>
      <Divider className="my-6" />
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold mb-3">Profile Banner</h3>
        <Group>
          <ColorSwatch color="#000" />
        </Group>
      </div> */}
      <Modal
        title={"Change Password"}
        zIndex={9999}
        opened={openedModalChangePassword}
        onClose={() => {
          setOpenedModalChangePassword(false);
        }}
      >
        <form
          className="flex flex-col gap-2"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            label={"Old Password"}
            placeholder={"Old Password"}
            error={serverError}
            {...form.getInputProps("oldPassword")}
          />
          <TextInput
            label={"New Password"}
            placeholder={"New Password"}
            error={serverError}
            {...form.getInputProps("newPassword")}
          />
          {/* <TextInput
            label={"Confirm New Password"}
            placeholder={"Confirm New Password"}
            {...form.getInputProps('oldPassword')}
          /> */}
          <Group position="apart">
            <Button
              onClick={() => {
                setOpenedModalChangePassword(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </Group>
        </form>
      </Modal>
      <Modal
        title={"Change Password"}
        zIndex={9999}
        opened={openedModalChangePassword}
        onClose={() => {
          setOpenedModalChangePassword(false);
        }}
      >
        <form
          className="flex flex-col gap-2"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            label={"Old Password"}
            placeholder={"Old Password"}
            error={serverError}
            {...form.getInputProps("oldPassword")}
          />
          <TextInput
            label={"New Password"}
            placeholder={"New Password"}
            error={serverError}
            {...form.getInputProps("newPassword")}
          />
          {/* <TextInput
            label={"Confirm New Password"}
            placeholder={"Confirm New Password"}
            {...form.getInputProps('oldPassword')}
          /> */}
          <Group position="apart">
            <Button
              onClick={() => {
                setOpenedModalChangePassword(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}
