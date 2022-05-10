import { IllustrationNoAccess } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { TextInput } from "@mantine/core";

import React from "react";
import { Search } from "tabler-icons-react";

function BlockedHeader({ blockedFriends }) {
  const pendingCount = blockedFriends?.length ?? 0;
  return (
    <div className="flex justify-start items-center w-full mt-2">
      <h6 className="my-2 text-discord-topIcons text-xs font-semibold">
        BLOCKED FRIENDS — {pendingCount}
      </h6>
    </div>
  );
}

export default function Blocked() {
  return (
    <div>
      <TextInput
        icon={<Search size={18} />}
        size="md"
        placeholder="Search"
        // onChange={handleSearch}
      />
      <BlockedHeader />
      <Empty
        image={<IllustrationNoAccess style={{ width: 200, height: 200 }} />}
        title="Everyone went to sleep"
        description="😴😴😴"
      ></Empty>
    </div>
  );
}
