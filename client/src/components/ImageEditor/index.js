import React from "react";
import { Group } from "@mantine/core";

export default function ImageEditor() {
  return (
    <div className="flex flex-col w-full h-full bg-red-200">
      <div className="flex h-24 w-full">
        <div className="w-24 h-full">1</div>
        <div className="flex-auto w-full">2</div>
      </div>
      <div className="flex w-full flex-auto">
        <Group position="center" direction="column" spacing="sm" className="w-24 h-full">
          <div className="w-20 h-20 rounded-lg border-2 flex justify-center items-center">Crop</div>
          <div className="w-20 h-20 rounded-lg border-2 flex justify-center items-center">Fineture</div>
          <div className="w-20 h-20 rounded-lg border-2 flex justify-center items-center">Filter</div>
          <div className="w-20 h-20 rounded-lg border-2 flex justify-center items-center">Annotate</div>
          <div className="w-20 h-20 rounded-lg border-2 flex justify-center items-center">Sticker</div>
          <div className="w-20 h-20 rounded-lg border-2 flex justify-center items-center">Redact</div>
          <div className="w-20 h-20 rounded-lg border-2 flex justify-center items-center">Frame</div>
        </Group>
        <div className="flex-auto w-full">2</div>
      </div>
    </div>
  );
}
