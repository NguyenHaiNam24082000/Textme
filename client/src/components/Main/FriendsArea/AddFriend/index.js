import { IllustrationFailure } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { Button, TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";

export default function AddFriend() {
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
      <Empty
        image={<IllustrationFailure style={{ width: 200, height: 200 }} />}
        title="Let's find a teammate"
        description="😴😴😴"
      ></Empty>
    </div>
  );
}
