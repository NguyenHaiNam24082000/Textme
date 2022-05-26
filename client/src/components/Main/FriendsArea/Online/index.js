import { IllustrationConstruction } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { GetAllUsersOnline } from "../../../../reactQuery/user";

export default function Online() {
  const { data: users } = GetAllUsersOnline();
  return (
    <div>
      <TextInput
        icon={<Search size={18} />}
        size="md"
        placeholder="Search"
        // onChange={handleSearch}
      />
      {users && Object.keys(users).length > 0 && (
        <div className="flex flex-col">
          {Object.keys(users).map((key) => (
            <div className="flex flex-col" key={key}>
              {key}
            </div>
          ))}
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
