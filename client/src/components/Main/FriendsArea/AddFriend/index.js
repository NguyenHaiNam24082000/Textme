import { IllustrationFailure } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { Search } from "tabler-icons-react";
import { getUsers } from "../../../../apis/account";
import AddFriendItem from "./AddFriendItem";

const isNumeric = (value) => {
  return /^\d+$/.test(value);
};

export default function AddFriend() {
  const [search, setSearch] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const handleSendFriendRequest = async (e) => {
    e.preventDefault();
    const [name, discriminator] = search.split("#");
    if (discriminator !== undefined) {
      if (discriminator.length !== 5) {
        setAlertMessage("Please enter user Id correctly");
        return;
      }
      if (!isNumeric(discriminator)) {
        setAlertMessage("User Id must be a number");
        return;
      }
    }
    const { data } = await getUsers(search);
    if (data) {
      setListUsers(data.results);
    } else {
      setListUsers([]);
    }
    console.log(data, "getUsers");
  };
  return (
    <div>
      <TextInput
        icon={<Search size={18} />}
        size="md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        rightSection={
          <Button variant="filled" size="xs" onClick={handleSendFriendRequest}>
            Send friend request
          </Button>
        }
        placeholder="Enter a username#0000"
        rightSectionWidth={150}
      />
      {listUsers.length > 0 &&
        listUsers.map((user) => <AddFriendItem user={user} />)}
      <Empty
        image={<IllustrationFailure style={{ width: 200, height: 200 }} />}
        title="Let's find a teammate"
        description="😴😴😴"
      ></Empty>
    </div>
  );
}
