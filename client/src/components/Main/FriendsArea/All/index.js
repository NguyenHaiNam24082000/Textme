import React, { useEffect, useState } from "react";
import { IllustrationNoContent } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { Button, Center, TextInput } from "@mantine/core";
import { useSelector } from "react-redux";
// import { AllFriends } from "../../../../reactQuery/friend";
import { Search } from "tabler-icons-react";
import FriendItem from "../FriendItem";
import { useQueryClient } from "react-query";
// import { ALL_FRIENDS_KEY } from "../../../../configs/queryKeys";

function PendingHeader({ allFriends }) {
  const pendingCount = allFriends?.length ?? 0;
  return (
    <div className="flex justify-start items-center w-full mt-2">
      <h6 className="my-2 text-discord-topIcons text-xs font-semibold">
        ALL FRIENDS — {pendingCount}
      </h6>
    </div>
  );
}

const EmptyState = ({ setActiveTab }) => {
  return (
    <Center className="flex-auto">
      <Empty
        image={<IllustrationNoContent style={{ width: 200, height: 200 }} />}
        title="There's no one around here"
        description="You don't have to think"
      >
        <Center>
          <Button
            style={{ padding: "6px 24px", marginRight: 12 }}
            type="primary"
            onClick={() => setActiveTab(4)}
          >
            Add Friend
          </Button>
        </Center>
      </Empty>
    </Center>
  );
};

export default function All({ setActiveTab, friends }) {
  const { user } = useSelector((state) => state.user);
  const cache = useQueryClient();
  const [allFriends, setAllFriends] = useState(friends);

  useEffect(() => {
    setAllFriends(friends);
  }, [friends]);

  const handleSearch = (e) => {
    const search = e.target.value;
    const filteredAllFriends = allFriends.filter(
      (allFriend) =>
        allFriend?.username?.toLowerCase().includes(search.toLowerCase()) ||
        allFriend?.name?.toLowerCase().includes(search.toLowerCase()) ||
        allFriend?.discriminator?.toLowerCase().includes(search.toLowerCase())
    );
    setAllFriends(filteredAllFriends);
  };

  return allFriends?.length > 0 ? (
    <div>
      <TextInput
        icon={<Search size={18} />}
        size="md"
        placeholder="Search"
        onChange={handleSearch}
      />
      <PendingHeader allFriends={allFriends} />
      <div className="flex flex-col items-center justify-center">
        {friends &&
          friends.map((friend) => (
            <FriendItem key={friend?.id} friend={friend} user={user} />
          ))}
      </div>
    </div>
  ) : (
    <EmptyState setActiveTab={setActiveTab} />
  );
}
