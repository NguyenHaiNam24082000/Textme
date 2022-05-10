import React, { useEffect, useState } from "react";
import { UnstyledButton, Group, Image, Text, Select } from "@mantine/core";
import langs from "../../../../../configs/langs";
import Sound from "./Sound";
import Checkbox from "../../../../Checkbox";
import i18next from "i18next";

export default function Language() {
  // const [languages, setLanguages] = useState(langs);
  const [language, setLanguage] = useState(i18next.language);
  // const [langValue, setLangValue] = useState(i18next.language);
  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full gap-2 relative">
          <h3 className="text-xl font-semibold mb-3">Language</h3>
          Định dạng vùng Van ban thanh giong noi
          <Select
            label="Your favorite framework/library"
            placeholder="Pick one"
            data={[
              { value: "react", label: "React" },
              { value: "ng", label: "Angular" },
              { value: "svelte", label: "Svelte" },
              { value: "vue", label: "Vue" },
            ]}
          />
          Giong noi thanh van ban
          <Select
            label="Your favorite framework/library"
            placeholder="Pick one"
            data={[
              { value: "react", label: "React" },
              { value: "ng", label: "Angular" },
              { value: "svelte", label: "Svelte" },
              { value: "vue", label: "Vue" },
            ]}
          />
          <div className="flex flex-col w-full h-64 rounded-md gap-2 relative bg-slate-300">
            <Sound />
          </div>
          phiên dich Choose your language
          {langs &&
            langs.map((lang) => (
              <Checkbox
                isChecked={lang.code === language}
                onClick={() => {
                  setLanguage(lang.code);
                }}
                className={`${
                  lang.code === language ? "bg-gray-200" : "bg-slate-200"
                } flex w-full h-full p-2 rounded-md justify-between items-center cursor-pointer`}
              >
                <Group>
                  <Image height={28} radius="sm" src={lang.flag}>
                    {lang.label}
                  </Image>
                  <div>
                    <Text>{lang.label}</Text>
                    <Text size="xs" color="gray">
                      {lang.name}
                    </Text>
                  </div>
                </Group>
              </Checkbox>
            ))}
        </div>
      </div>
    </div>
  );
}
