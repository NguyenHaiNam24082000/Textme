import React, { useEffect, useRef, useState } from "react";
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
  NumberInput,
  Progress,
  Popover,
  Box,
  Loader,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useClipboard } from "@mantine/hooks";
import { CheckIcon, Cross1Icon } from "@modulz/radix-icons";
import Fab from "@mui/material/Fab";
import Facebook from "../../assets/images/logos/facebook.svg";
import Google from "../../assets/images/logos/google.svg";
import { NavLink } from "react-router-dom";
import { useForm } from "@mantine/hooks";
import { LoadingOverlay } from "@mantine/core";
import { register } from "../../apis/auth";
import {
  passwordRequirements,
  usernameRequirements,
  emailRequirements,
} from "../../validations/accountValidation";
import { useNavigate } from "react-router";
import HCaptcha from "@hcaptcha/react-hcaptcha";

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

const Requirement = ({ meets, label }) => {
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
};

const getStrength = (value, requirements, length) => {
  let multiplier = value.length >= length ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(value)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};
const InputWrapper = ({
  children,
  value,
  openedPopover,
  onFocusCapture,
  onBlurCapture,
  requirements,
  minLength,
  maxLength,
}) => {
  const strength = getStrength(value, requirements, minLength);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  const checks = requirements.map((requirement, index) => (
    <Requirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));
  return (
    <Popover
      opened={openedPopover}
      position="bottom"
      placement="start"
      withArrow
      styles={{ popover: { width: "100%" } }}
      className="w-full"
      trapFocus={false}
      transition="pop-top-left"
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
      target={children}
    >
      <Progress
        color={color}
        value={strength}
        size={5}
        style={{ marginBottom: 10 }}
      />
      {minLength >= 0 && (
        <Requirement
          label={`Includes at least ${minLength} characters`}
          meets={value.length >= minLength}
        />
      )}
      {maxLength >= 0 && (
        <Requirement
          label={`Includes at most ${maxLength} characters`}
          meets={value.length <= maxLength}
        />
      )}
      {checks}
    </Popover>
  );
};

export default function Register() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const [values, setValues] = useState();
  const [openedPopover, setOpenedPopover] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [serverError, setServerError] = useState(null);
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      locale: "en-US",
      times: 0,
    },

    validationRules: {
      email: (value) =>
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
          value
        ),
      password: (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value
        ),
      username: (value) => /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,32}$/.test(value),
      confirmPassword: (value, values) =>
        value === values.password || value === "",
    },
    // errorMessages: {
    //   username: "Username is invalid",
    //   email: "Email is invalid",
    //   password: "Password is invalid",
    //   confirmPassword: "Passwords don't match. Try again",
    // },
  });

  useEffect(async () => {
    const payload = JSON.stringify({
      username: values.username,
      email: values.email,
      password: values.password,
    });
    const { data } = await register(payload);
    console.log(data);
    setTimeout(() => {
      setLoading(false);
      if (data.error?.email || data.error?.username) {
        setServerError(data.error);
      } else {
        history("/login");
      }
    }, 1500);
  }, [token]);

  console.log(form);

  const handleSubmit = (values) => {
    setLoading(true);
    setValues(values);
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
              {token === null ? (
                <HCaptcha
                  sitekey="794b8617-4db1-4406-9ef0-dfdd04ae462b"
                  onVerify={setToken}
                  onLoad={onLoad}
                  ref={captchaRef}
                />
              ) : (
                <Loader size="xl" />
              )}
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
          <h1 className="text-2xl  font-bold">{t("Register")}</h1>
          <div className="my-3 text-sm">
            Tham gia hàng triệu máy chủ công cộng miễn phí lớn nhất
          </div>
          <Divider />
          <form
            className="flex flex-col"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <InputWrapper
              value={form.values.username}
              openedPopover={openedPopover.username}
              onFocusCapture={() =>
                setOpenedPopover({ ...openedPopover, username: true })
              }
              onBlurCapture={() =>
                setOpenedPopover({ ...openedPopover, username: false })
              }
              requirements={usernameRequirements}
              minLength={3}
              maxLength={32}
            >
              <TextInput
                placeholder={t("Username")}
                value={form.values.username}
                onBlur={() => form.validateField("username")}
                label={
                  <div
                    className={`flex ${
                      serverError?.username || form.errors.username
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {t("Username")}
                    <pre className="text-red-500 mx-1">*</pre>
                    {serverError?.username ||
                      (form.errors.username && "- Username is invalid")}
                  </div>
                }
                {...form.getInputProps("username")}
                // required
                classNames={{ error: "text-xs" }}
              />
            </InputWrapper>
            <InputWrapper
              value={form.values.email}
              openedPopover={openedPopover.email}
              onFocusCapture={() =>
                setOpenedPopover({ ...openedPopover, email: true })
              }
              onBlurCapture={() =>
                setOpenedPopover({ ...openedPopover, email: false })
              }
              requirements={emailRequirements}
              minLength={-1}
              maxLength={-1}
            >
              <TextInput
                value={form.values.email}
                label={
                  <div
                    className={`flex ${
                      serverError?.email || form.errors.email
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {t("Email")}
                    <pre className="text-red-500 mx-1">*</pre>
                    {serverError?.email ||
                      (form.errors.email && "- Email is invalid")}
                  </div>
                }
                placeholder={t("Email")}
                {...form.getInputProps("email")}
                onBlur={() => form.validateField("email")}
                // required
                classNames={{ error: "text-xs" }}
                icon={<At size={16} />}
              />
            </InputWrapper>
            <InputWrapper
              value={form.values.password}
              openedPopover={openedPopover.password}
              onFocusCapture={() =>
                setOpenedPopover({ ...openedPopover, password: true })
              }
              onBlurCapture={() =>
                setOpenedPopover({ ...openedPopover, password: false })
              }
              requirements={passwordRequirements}
              minLength={8}
              maxLength={32}
            >
              <PasswordInput
                placeholder={t("Password")}
                label={
                  <div
                    className={`flex ${
                      form.errors.password ? "text-red-500" : ""
                    }`}
                  >
                    {t("Password")}
                    <pre className="text-red-500 mx-1">*</pre>
                    {form.errors.password && "- Password is invalid"}
                  </div>
                }
                {...form.getInputProps("password")}
                onBlur={() => form.validateField("password")}
                classNames={{ error: "text-xs" }}
                icon={<Lock size={16} />}
                // required
              />
            </InputWrapper>
            <PasswordInput
              placeholder={t("Confirm Password")}
              label={
                <div
                  className={`flex ${
                    form.errors.confirmPassword ? "text-red-500" : ""
                  }`}
                >
                  {t("Confirm Password")}
                  <pre className="text-red-500 mx-1">*</pre>
                  {form.errors.confirmPassword && (
                    <>- Passwords don't match. Try again</>
                  )}
                </div>
              }
              {...form.getInputProps("confirmPassword")}
              icon={<Lock size={16} />}
              onBlur={() => form.validateField("confirmPassword")}
              // required
              classNames={{ error: "text-xs" }}
            />
            <Group className="my-3">
              <Checkbox
                size="xs"
                color="yellow"
                label="Tôi đồng ý với điều khoản và điều kiện"
              />
            </Group>
            <Group position="center" grow className="my-4">
              <Button
                color="yellow"
                radius="md"
                size="md"
                type="submit"
                compact
                style={{ backgroundColor: "#fab005" }}
              >
                {t("Register")}
              </Button>
            </Group>
          </form>
          <Group position="center" className="mt-4 text-xs">
            <div>
              Bạn đã có tài khoản?{" "}
              <NavLink to="/login" style={{ color: "#1c7ed6" }}>
                Login
              </NavLink>
            </div>
          </Group>
        </motion.div>
      </AuthForm>
    </div>
  );
}
