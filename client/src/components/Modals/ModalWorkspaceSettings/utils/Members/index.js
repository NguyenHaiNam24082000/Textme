import React from "react";
import { TextInput } from "@mantine/core";
// import { AllFriends } from "../../../../reactQuery/friend";
import { Search } from "tabler-icons-react";
import MemberItem from "../MemberItem";

function PendingHeader({ allMembers }) {
  const pendingCount = allMembers?.length ?? 0;
  return (
    <div className="flex justify-start items-center w-full mt-2">
      <h6 className="my-2 text-discord-topIcons text-xs font-semibold">
        ALL MEMBERS — {pendingCount}
      </h6>
    </div>
  );
}

export default function Members({ server }) {
  const members = [server.owner, ...server.members];
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col w-full h-full">
        <h3 className="text-xl font-semibold mb-3">Members</h3>
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
          <PendingHeader allMembers={members} />
          {members &&
            members.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))}
        </div>
      </div>
    </div>
  );
}
