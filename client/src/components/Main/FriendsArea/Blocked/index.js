import { IllustrationNoAccess } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { TextInput } from "@mantine/core";

import React from "react";
import { Search } from "tabler-icons-react";

export default function Blocked() {
  return (
    <div>
      <TextInput
        icon={<Search size={18} />}
        size="md"
        placeholder="Search"
        // onChange={handleSearch}
      />
      <Empty
        image={<IllustrationNoAccess style={{ width: 200, height: 200 }} />}
        title="Everyone went to sleep"
        description="😴😴😴"
      ></Empty>
    </div>
  );
}
