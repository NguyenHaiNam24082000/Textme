import React, { useRef, useEffect, useState, forwardRef } from "react";
import QRCodeStyling from "qr-code-styling";
import logo from "../../logo.svg";
import { Group, Avatar, Text, Select, Image } from "@mantine/core";
import lang from "../../configs/lang";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import removeTones from "../../configs/removeTones";

const SelectItem = forwardRef(({ flag, name, label, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={flag} />

      <div>
        <Text>{label}</Text>
        <Text size="xs" color="dimmed">
          {name}
        </Text>
      </div>
    </Group>
  </div>
));

const qrCode = new QRCodeStyling({
  width: 225,
  height: 225,
  image: logo,
  dotsOptions: {
    color: "#ffffff",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 2,
  },
  backgroundOptions: {
    color: "transparent",
  },
});

export default function AuthForm({children}) {
  const [url, setUrl] = useState("https://qr-code-styling.com");
  const [value, setValue] = useState("United States");
  const ref = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);

  useEffect(() => {
    i18next.changeLanguage(lang.filter((l) => l.label === value)[0].code);
  }, [value, setValue]);

  return (
    <div
      className="flex bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200 relative"
      style={{ borderRadius: "var(--radius-medium)", width: 768, height: 565 }}
    >
      <div className="w-2/6 h-full text-white flex justify-between flex-col items-center p-6">
        <h1 className="text-2xl  font-bold">Textme</h1>
        <div ref={ref} />
        <Select
          label="Language:"
          placeholder="Pick one"
          itemComponent={SelectItem}
          classNames={{ label: "text-white" }}
          data={lang}
          searchable
          maxDropdownHeight={400}
          nothingFound={t("not_found")}
          value={value}
          onChange={setValue}
          icon={
            value && (
              <Image
                width={24}
                height={24}
                radius="sm"
                src={lang.filter((l) => l.label === value)[0].flag}
              />
            )
          }
          filter={(value, item) =>
            item.label
              .toLowerCase()
              .trim()
              .includes(value.toLowerCase().trim()) ||
            item.code
              .toLowerCase()
              .trim()
              .includes(value.toLowerCase().trim()) ||
              removeTones(item.name.toLowerCase().trim()).includes(removeTones(value.toLowerCase().trim()))
          }
        />
      </div>
      <div
        className="w-4/6 h-full bg-white px-16 py-6"
        style={{
          borderTopRightRadius: "inherit",
          borderBottomRightRadius: "inherit",
        }}
      >
        {children}
      </div>
    </div>
  );
}
