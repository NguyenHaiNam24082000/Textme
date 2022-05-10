import React, { useEffect, useRef, useState } from "react";
import AuthForm from "../../components/AuthForm";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
  LoadingOverlay,
  Loader,
} from "@mantine/core";
import { useClipboard, useForm } from "@mantine/hooks";
import { CheckIcon, Cross1Icon } from "@modulz/radix-icons";
import Fab from "@mui/material/Fab";
import Facebook from "../../assets/images/logos/facebook.svg";
import Google from "../../assets/images/logos/google.svg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { login } from "../../apis/auth";
import { loginSuccess } from "../../store/userSlice";

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

export default function Login() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState("email");
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const [values, setValues] = useState();
  const [serverError, setServerError] = useState(null);
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      rememberMe: false,
    },
    // validationRules: {
    //   username: (value) => {
    //     if (!value) return "Username is required";
    //   },
    //   email: (value) => {
    //     if (value === "") return "Email is required";
    //     else
    //       return (
    //         /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
    //           value
    //         ) && "Email is invalid"
    //       );
    //   },
    //   password: (value) => {
    //     if (!value) return "Password is required";
    //   },
    // },
  });

  // useEffect(async () => {
  //   const payload = JSON.stringify({
  //     // username: values.username,
  //     email: values.email,
  //     password: values.password,
  //   });
  //   const { data } = await login(payload);
  //   console.log(data)
  //   // const actionResult = await dispatch(getMe());
  //   setTimeout(() => {
  //     setLoading(false);
  //     if (data.error?.email || data.error?.username) {
  //       setServerError(data.error);
  //     } else {
  //       dispatch(loginSuccess(data));
  //       history("/app");
  //     }
  //   }, 1500);
  // }, [token]);
  const handleSubmit = async (values) => {
    setLoading(true);
    setValues(values);
    //test
    const payload = JSON.stringify({
      // username: values.username,
      email: values.email,
      password: values.password,
    });
    const { data } = await login(payload);
    console.log(data)
    // const actionResult = await dispatch(getMe());
    setTimeout(() => {
      setLoading(false);
      if (data.error?.email || data.error?.username) {
        setServerError(data.error);
      } else {
        dispatch(loginSuccess(data));
        history("/channel/@me");
      }
    }, 1500);
  };
  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current.execute();
  };

  return (
    <div
      className="w-full h-full flex justify-center items-center relative"
      style={{
        background:
          "url(https://app.revolt.chat/assets/background.a19b5c96.jpg) no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <AuthForm>
        <LoadingOverlay
          visible={loading}
          loader={
            <>
              {/* {token === null ? (
                <HCaptcha
                  sitekey="682fed61-9e30-4880-b49d-0ff6d2be2bc5"
                  onVerify={setToken}
                  onLoad={onLoad}
                  ref={captchaRef}
                />
              ) : ( */}
                <Loader size="xl" />
              {/* )} */}
            </>
          }
        />
        <motion.div
          style={pageStyle}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <h1 className="text-2xl  font-bold">{t("login")}</h1>
          <div className="my-3 text-sm">
            Tham gia hàng triệu máy chủ công cộng miễn phí lớn nhất
          </div>
          {serverError && (<div>{serverError}</div>)}
          <Divider />
          <Group position="apart" className="my-3">
            <span>{t("login_with")}</span>
            <Select
              value={type}
              onChange={setType}
              defaultValue="email"
              data={[
                { value: "email", label: t("email") },
                { value: "username", label: t("username") },
              ]}
            />
          </Group>
          <form
            className="flex flex-col"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            {type && type === "username" ? (
              <TextInput
                placeholder={t("username")}
                label={t("username")}
                {...form.getInputProps("username")}
                onBlur={() => form.validateField("username")}
                required
              />
            ) : (
              <TextInput
                label={t("email")}
                placeholder={t("email")}
                {...form.getInputProps("email")}
                onBlur={() => form.validateField("email")}
                required
                icon={<At size={16} />}
              />
            )}
            <PasswordInput
              placeholder={t("password")}
              label={t("password")}
              {...form.getInputProps("password")}
              onBlur={() => form.validateField("password")}
              icon={<Lock size={16} />}
              required
            />
            <Group position="apart" className="my-3">
              <Checkbox size="xs" color="yellow" label="Remember me" />
              <Text
                variant="link"
                component="a"
                href="https://mantine.dev"
                size="xs"
              >
                {t("forgot_password")}
              </Text>
            </Group>
            <Group position="center" grow className="my-6">
              <Button
                color="yellow"
                radius="md"
                size="md"
                compact
                type="submit"
                style={{ backgroundColor: "#fab005" }}
              >
                {t("login")}
              </Button>
            </Group>
          </form>
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
          <Group position="center" className="mt-6 text-xs">
            <div>
              Bạn là người mới?{" "}
              <NavLink to="/register" style={{ color: "#1c7ed6" }}>
                Create an account
              </NavLink>
            </div>
          </Group>
        </motion.div>
      </AuthForm>
    </div>
  );
}
