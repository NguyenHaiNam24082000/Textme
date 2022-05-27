import { IllustrationConstruction } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { GetAllUsersOnline } from "../../../../reactQuery/user";
import { useSelector } from "react-redux";
import FriendItem from "../FriendItem";

export default function Online() {
  const { user } = useSelector((state) => state.user);
  const { data: friends } = GetAllUsersOnline();
  return (
    <div>
      <TextInput
        icon={<Search size={18} />}
        size="md"
        placeholder="Search"
        // onChange={handleSearch}
      />
      {friends && Object.keys(friends).length > 0 && (
        <div className="flex flex-col">
          {Object.values(friends).map((friend) => {
            if (friend.id !== user.id) {
              return (
                <FriendItem key={friend?.id} friend={friend} user={user} />
              );
            }
            return null;
          })}
        </div>
      )}
      <Empty
        image={<IllustrationConstruction style={{ width: 200, height: 200 }} />}
        title="Everyone went to sleep"
        description="😴😴😴"
      ></Empty>
    </div>
  );
}
