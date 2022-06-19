import React from "react";
import { TextInput } from "@mantine/core";
// import { AllFriends } from "../../../../reactQuery/friend";
import { Search } from "tabler-icons-react";
import { getAllBlockedMembers } from "../../../../../apis/workspace";
import { GetAllBlockedMembers } from "../../../../../reactQuery/workspace";
import MemberItem from "../MemberItem";

function PendingHeader({ allBlocked }) {
  const pendingCount = allBlocked?.length ?? 0;
  return (
    <div className="flex justify-start items-center w-full mt-2">
      <h6 className="my-2 text-discord-topIcons text-xs font-semibold">
        BLOCKED MEMBERS — {pendingCount}
      </h6>
    </div>
  );
}

export default function Blocked({ server }) {
  const { data } = GetAllBlockedMembers({ serverId: server.id });
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col w-full h-full">
        <h3 className="text-xl font-semibold mb-3">Blocked</h3>
        <div className="flex flex-col justify-center items-center relative w-full overflow-hidden">
          <TextInput
            icon={<Search size={18} />}
            size="md"
            placeholder="Search"
            sx={{
              width: "100%",
            }}
            // onChange={handleSearch}
          />
          <PendingHeader allBlocked={data} />
          {data &&
            data.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))}
        </div>
      </div>
    </div>
  );
}
