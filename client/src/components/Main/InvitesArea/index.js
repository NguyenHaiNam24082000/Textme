import { TextInput } from "@mantine/core";
import React from "react";
import { Search } from "tabler-icons-react";
import { GetAllInvitesServers } from "../../../reactQuery/user";
import InviteItem from "./InviteItem";

function PendingHeader({ allInvites }) {
  const pendingCount = allInvites?.length ?? 0;
  return (
    <div className="flex justify-start items-center w-full mt-2">
      <h6 className="my-2 text-discord-topIcons text-xs font-semibold">
        ALL INVITES — {pendingCount}
      </h6>
    </div>
  );
}

export default function InvitesArea() {
  const { data: allInvites } = GetAllInvitesServers();
  return (
    <main className="flex min-w-0 min-h-0 relative flex-col flex-auto px-2 py-3">
      <TextInput
        icon={<Search size={18} />}
        size="md"
        placeholder="Search"
        // onChange={handleSearch}
      />
      <PendingHeader allInvites={allInvites} />
      {allInvites &&
        allInvites.map((invite) => (
          <InviteItem key={invite.id} invite={invite} />
        ))}
    </main>
  );
}
