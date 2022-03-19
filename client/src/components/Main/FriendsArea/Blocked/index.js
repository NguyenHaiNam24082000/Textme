import { IllustrationNoAccess } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";

import React from "react";

export default function Blocked() {
  return (
    <Empty
      image={<IllustrationNoAccess style={{ width: 200, height: 200 }} />}
      title="Everyone went to sleep"
      description="😴😴😴"
    ></Empty>
  );
}
