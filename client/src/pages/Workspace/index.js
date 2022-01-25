import React, { useState } from "react";
import {
  FullScreenDropzone,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";

export default function Workspace() {
  return (
    <div className="flex w-full h-full">
      <div className="w-2/4 h-full">aaaa</div>
      <div className="w-2/4 h-full bg-black">
      </div>
      <FullScreenDropzone accept={IMAGE_MIME_TYPE}>
          {() => {
            return <div>jeejej</div>;
          }}
        </FullScreenDropzone>
    </div>
  );
}
