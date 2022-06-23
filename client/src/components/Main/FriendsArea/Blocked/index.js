import { IllustrationNoAccess } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { TextInput } from "@mantine/core";
import { useSelector } from "react-redux";
import React from "react";
import { Search } from "tabler-icons-react";
import { BlockedFriends } from "../../../../reactQuery/friend";
import BlockedFriendItem from "./BlockedFriendItem";

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
  const { user } = useSelector((state) => state.user);
  const { data: blockedFriends } = BlockedFriends();
  // const [allFriends, setAllFriends] = useState(friends);

  return (
    <div>
      <TextInput
        icon={<Search size={18} />}
        size="md"
        placeholder="Search"
        // onChange={handleSearch}
      />
      <BlockedHeader blockedFriends={blockedFriends} />
      <div className="flex flex-col items-center justify-center">
        {blockedFriends &&
          blockedFriends.map((friend) => (
            <BlockedFriendItem key={friend?.id} friend={friend} user={user} />
          ))}
      </div>
      {!blockedFriends && (
        <Empty
          image={<IllustrationNoAccess style={{ width: 200, height: 200 }} />}
          title="Everyone went to sleep"
          description="😴😴😴"
        ></Empty>
      )}
    </div>
  );
}
