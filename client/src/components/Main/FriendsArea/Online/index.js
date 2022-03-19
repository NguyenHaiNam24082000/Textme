import { IllustrationConstruction } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";

export default function Online() {
  return (
    <Empty
      image={<IllustrationConstruction style={{ width: 200, height: 200 }} />}
      title="Everyone went to sleep"
      description="😴😴😴"
    >
    </Empty>
  );
}
