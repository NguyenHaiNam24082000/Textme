import { IllustrationConstruction } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { TextInput } from "@mantine/core";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Search } from "tabler-icons-react";
import { AllFriends } from "../../../../reactQuery/friend";
import { GetAllUsersOnline } from "../../../../reactQuery/user";
import FriendItem from "../FriendItem";

export default function Online({ friends }) {
  const { user } = useSelector((state) => state.user);
  const { data: usersOnline } = GetAllUsersOnline();
  let friendsIds = friends && friends.map((friend) => friend.id);
  return (
    <div>
      <TextInput
        icon={<Search size={18} />}
        size="md"
        placeholder="Search"
        // onChange={handleSearch}
      />
      <div className="flex flex-col">
        {/* {usersOnline &&
        Object.keys(usersOnline).filter((friend) => {
          return friend.user.id === user.id;
        }).length > 0 ? (
          Object.values(usersOnline)
            .filter((friend) => {
              return friend.user.id === user.id;
            })
            .map((friend) => (
              <FriendItem
                key={friend.user.id}
                friend={friend.user}
                user={user}
              />
            ))
        ) : ( */}
        <Empty
          image={
            <IllustrationConstruction style={{ width: 200, height: 200 }} />
          }
          title="Everyone went to sleep"
          description="😴😴😴"
        ></Empty>
        {/* )} */}
      </div>
    </div>
  );
}
