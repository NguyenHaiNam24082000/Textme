import { IllustrationFailure } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { Search } from "tabler-icons-react";
import AddFriendItem from "./AddFriendItem";

const isNumeric = (value) => {
  return /^\d+$/.test(value);
};

export default function AddFriend() {
  const [search, setSearch] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  // const handleSendFriendRequest = async (e) => {
  //   e.preventDefault();
  //   const [name,discriminator] = search.split("#");
  //   if(discriminator.length !== 5)
  //   {
  //     setAlertMessage("Please enter user Id correctly");
  //     return;
  //   }
  //   if (!isNumeric(discriminator)) {
  //     setAlertMessage("User Id must be a number");
  //     return;
  //   }
  //   const { data } = await sendFriendRequest({
  //     variables: {
  //       username: search,
  //     },
  //   });
  //   console.log(data);
  // };
  return (
    <div>
      <TextInput
        icon={<Search size={18} />}
        size="md"
        rightSection={
          <Button variant="filled" size="xs">
            Send friend request
          </Button>
        }
        placeholder="Enter a username#0000"
        rightSectionWidth={150}
      />
      <AddFriendItem />
      <Empty
        image={<IllustrationFailure style={{ width: 200, height: 200 }} />}
        title="Let's find a teammate"
        description="😴😴😴"
      ></Empty>
    </div>
  );
}
