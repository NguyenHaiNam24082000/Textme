import React, { useState, useEffect } from "react";
import AvatarGenerator from "../../components/AvatarGenerator";
import { Group, Text, Button, Checkbox, TextInput } from "@mantine/core";
import InlineEdit from "@atlaskit/inline-edit";

export default function AccountDetail() {
  const [editValue, setEditValue] = useState("NguyenHaiNam");
  const [handleGenerateAvatar, setHandleGenerateAvatar] = useState(false);
  const [colors, setColors] = useState([]);
  useEffect(async () => {
    setColors(
      await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then(
        (response) => response.json()
      )
    );
  }, []);
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="inline-flex flex-col items-center w-auto">
        <Text className="text-2xl my-4" weight={700}>
          Your account is nearly ready
        </Text>
        <Text className="text-sm my-3 text-slate-400">
          Check your details before creating an account on Textme
        </Text>
        {colors && (
          <AvatarGenerator
            value={editValue}
            handleGenerateAvatar={handleGenerateAvatar}
            colors={colors}
          />
        )}
        <Group
          direction="column"
          spacing={0}
          className="rounded-lg w-full mt-3"
          style={{ border: "1px solid #e1e1e1" }}
        >
          <Group grow className="w-full px-3">
            <Text className="text-sm my-4" weight={700}>
              Information from GitLab
            </Text>
          </Group>
          <Group
            grow
            className="w-full px-3 mb-3 items-center"
            style={{ borderTop: "1px solid #e1e1e1" }}
            position="apart"
          >
            <InlineEdit
              defaultValue={editValue}
              label="Display name"
              onConfirm={(value) => setEditValue(value)}
              placeholder="Click to enter text"
              editView={({ errorMessage, ...fieldProps }) => (
                <TextInput
                  value={editValue}
                  className="w-full"
                  size="xs"
                  onChange={(event) => setEditValue(event.currentTarget.value)}
                />
              )}
              readView={() => (
                <div>{editValue || "Click to enter a value"}</div>
              )}
              onConfirm={(value) => setEditValue(value)}
            />
            <Checkbox
              label="Use"
              size="xs"
              checked
              disabled
              classNames={{ root: "flex-row-reverse", label: "mr-3" }}
            />
          </Group>
        </Group>
        <Button
          radius="md"
          className="mt-4 w-full bg-yellow-400"
          onClick={() =>
            setHandleGenerateAvatar((v) => {
              return !v;
            })
          }
        >
          Generate avatar
        </Button>
        <Button radius="md" className="mt-4 w-full bg-yellow-400">
          Continue
        </Button>
      </div>
    </div>
  );
}
