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
  Indicator,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { changePassword } from "../../../../../apis/auth";
// import { GetMe } from "../../../../../store/userSlice";
import Modal from "../../../Modal";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { Me } from "../../../../../reactQuery/user";
import { updateProfile } from "../../../../../apis/account";
import { useQueryClient } from "react-query";
import { ACCOUNT_KEY } from "../../../../../configs/queryKeys";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../../store/userSlice";

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

function UserEditForm({ initialValues, onSubmit, onCancel, type }) {
  const isMobile = useMediaQuery("(max-width: 755px");

  const form = useForm({
    initialValues,
    validationRules: {
      name: (value) => value.trim().length > 3,
      phone: (value) => value.trim().length === 10,
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      {type === "name" && (
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
      )}
      {type === "phone" && (
        <TextInput
          required
          type="number"
          label="Phone"
          placeholder="Phone"
          style={{ minWidth: isMobile ? 220 : 300 }}
          value={form.values.phone}
          onChange={(event) =>
            form.setFieldValue("phone", event.currentTarget.value)
          }
          error={form.errors.phone}
          variant="default"
        />
      )}
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

export default function Account({ me }) {
  const dispatch = useDispatch();
  const cache = useQueryClient();
  const [values, setValues] = useState(me);
  const { classes } = useStyles();
  const [openedPopoverPhoneNumber, setOpenedPopoverPhoneNumber] =
    useState(false);
  const [openedPopoverName, setOpenedPopoverName] = useState(false);
  const [type, setType] = useState("name");
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
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await Me(user.user);
  //     setValues(data);
  //   }
  //   fetchData();
  // }, []);
  // console.log("user", values);
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
  console.log(openedPopoverPhoneNumber, "phone onpen");
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold mb-3">{t("My Account")}</h3>
        <div className="flex flex-col w-full h-auto bg-gray-200 rounded-lg overflow-hidden">
          <BackgroundImage
            sx={{
              background: `#${Math.floor(me.accent_color).toString(16)}`,
            }}
            src={me.banner}
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
                    <Indicator
                      sx={{
                        indicator: {
                          zIndex: "5",
                        },
                      }}
                      inline
                      size={28}
                      offset={20}
                      position="bottom-end"
                      color={me?.status?.online ? "green" : "gray"}
                      withBorder
                    >
                      <Avatar
                        src={me.avatar_url}
                        radius={"50%"}
                        size={128}
                        styles={{
                          border: "8px solid #fff",
                          placeholder: {
                            color: "#fff",
                            backgroundColor: `#${Math.floor(
                              me.accent_color
                            ).toString(16)}`,
                          },
                        }}
                      >
                        {me.username[0]}
                      </Avatar>
                    </Indicator>
                  </div>
                }
              >
                <Menu.Item>Change Avatar</Menu.Item>
                <Menu.Item>Remove Avatar</Menu.Item>
              </Menu>
              <Group
                grow
                direction="column"
                className="flex-auto justify-center mt-12"
              >
                <div className="flex items-end w-full">
                  <span className="text-2xl font-bold">
                    {/* @{user && pending && pendingUsername(user, pending)} */}
                    @{me?.username}
                  </span>
                  <span className="text-slate-300 text-2xl font-medium">
                    #{me?.discriminator}
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
                  <Button
                    disabled={
                      values.phone === me.phone && values.name === me.name
                    }
                    leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                    onClick={async () => {
                      const { data } = await updateProfile(me.id, {
                        ...(values.phone !== me.phone && {
                          phone: values.phone,
                        }),
                        ...(values.name !== me.name && { name: values.name }),
                      });
                      console.log(data, "update");
                      if (data) {
                        cache.invalidateQueries(ACCOUNT_KEY);
                        dispatch(updateUser(data));
                      }
                    }}
                  >
                    {t("Edit User Profile")}
                  </Button>
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
                  <div className="flex">{me?.username}</div>
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
                    {me.email && showEmail
                      ? me.email
                      : me.email && me.email.replace(/[^@.]/g, "*")}
                    <Text
                      variant="link"
                      className="ml-1 cursor-pointer"
                      onClick={() => setShowEmail((v) => !v)}
                    >
                      {showEmail ? t("Hide") : t("Show")}
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
                  <div className="flex">{values?.name || me.username}</div>
                </div>
              </div>
              <Popover
                opened={openedPopoverName}
                onClose={() => setOpenedPopoverName(false)}
                position="bottom"
                placement="end"
                withCloseButton
                title="Edit user"
                transition="pop-top-right"
                zIndex={1000}
                withinPortal={false}
                target={
                  <div className="flex">
                    <Button
                      leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                      variant="white"
                      onClick={() => {
                        setType("name");
                        setOpenedPopoverName(!openedPopoverName);
                      }}
                    >
                      {t("Edit")}
                    </Button>
                  </div>
                }
              >
                <div className="flex">
                  <UserEditForm
                    initialValues={values}
                    onCancel={() => setOpenedPopoverName(false)}
                    onSubmit={(data) => {
                      setValues(data);
                      setOpenedPopoverName(false);
                    }}
                    type={type}
                  />
                </div>
              </Popover>
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
                    {values.phone
                      ? showPhone
                        ? values.phone
                        : values.phone.replace(/./g, "*")
                      : "Ban chua cap nhat"}
                    {values.phone && (
                      <Text
                        variant="link"
                        className="ml-1 cursor-pointer"
                        onClick={() => setShowPhone((v) => !v)}
                      >
                        {showPhone ? t("Hide") : t("Show")}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
              <Popover
                opened={openedPopoverPhoneNumber}
                onClose={() => setOpenedPopoverPhoneNumber(false)}
                position="bottom"
                placement="end"
                withCloseButton
                title="Edit user"
                transition="pop-top-right"
                zIndex={1000}
                withinPortal={false}
                target={
                  <div className="flex">
                    <Button
                      leftIcon={<FontAwesomeIcon icon="fa-solid fa-pen" />}
                      variant="white"
                      onClick={() => {
                        setType("phone");
                        setOpenedPopoverPhoneNumber(!openedPopoverPhoneNumber);
                      }}
                    >
                      {t("Edit")}
                    </Button>
                  </div>
                }
              >
                <div className="flex">
                  <UserEditForm
                    initialValues={values}
                    onCancel={() => setOpenedPopoverPhoneNumber(false)}
                    onSubmit={(data) => {
                      setValues(data);
                      setOpenedPopoverPhoneNumber(false);
                    }}
                    type={type}
                  />
                </div>
              </Popover>
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
                  <div className="flex">******</div>
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
