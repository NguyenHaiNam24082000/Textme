import "./index.css";
import { useState } from "react";
import { Tree } from "@douyinfe/semi-ui";
import { ActionIcon } from "@mantine/core";
import { IconPlus, IconHash } from "@douyinfe/semi-icons";
import { Highlight } from "@mantine/core";

export default function TreeComponent() {
  const buttons = (
    <ActionIcon size="sm">
      <IconPlus />
    </ActionIcon>
  );
  const initialData = [
    {
      label: "Asia",
      value: "Asia",
      key: "0",
      button: buttons,
      children: [
        {
          label: "China",
          value: "China",
          key: "0-0",
          icon: <IconHash />,
          button: buttons,
        },
        {
          label: "Japan",
          value: "Japan",
          key: "0-1",
          icon: <IconHash />,
          button: buttons,
        },
      ],
    },
    {
      label: "North America",
      value: "North America",
      key: "1",
      button: buttons,
      children: [
        {
          label: "United States",
          value: "United States",
          key: "1-0",
          icon: <IconHash />,
          button: buttons,
        },
        {
          label: "Canada",
          value: "Canada",
          key: "1-1",
          icon: <IconHash />,
          button: buttons,
        },
      ],
    },
  ];
  const [searchKey, setSearchKey] = useState("");
  const [treeData, setTreeData] = useState(initialData);
  const renderLabel = ({ className, onExpand, onClick, data, expandIcon }) => {
    const { label, icon, button } = data;
    const isLeaf = !(data.children && data.children.length);
    return (
      <li
        className={className}
        role="treeitem"
        onClick={isLeaf ? onClick : onExpand}
      >
        {isLeaf ? null : expandIcon}
        {icon}
        <Highlight highlight={searchKey}>{label}</Highlight>
        {button}
      </li>
    );
  };

  const onDrop = (info) => {
    const { dropToGap, node, dragNode } = info;
    const dropKey = node.key;
    const dragKey = dragNode.key;
    const dropPos = node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const data = [...treeData];
    const loop = (data, key, callback) => {
      data.forEach((item, ind, arr) => {
        if (item.key === key) return callback(item, ind, arr);
        if (item.children) return loop(item.children, key, callback);
      });
    };

    let dragObj;
    loop(data, dragKey, (item, ind, arr) => {
      arr.splice(ind, 1);
      dragObj = item;
    });

    if (!dropToGap) {
      // inset into the dropPosition
      loop(data, dropKey, (item, ind, arr) => {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    } else if (dropPosition === 1 && node.children && node.expanded) {
      // has children && expanded and drop into the node bottom gap
      // could insert anywhere. Here we insert to the top.
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let dropNodeInd;
      let dropNodePosArr;
      loop(data, dropKey, (item, ind, arr) => {
        dropNodePosArr = arr;
        dropNodeInd = ind;
      });
      if (dropPosition === -1) {
        // insert to top
        dropNodePosArr.splice(dropNodeInd, 0, dragObj);
      } else {
        // insert to bottom
        dropNodePosArr.splice(dropNodeInd + 1, 0, dragObj);
      }
    }
    setTreeData(data);
  };

  return (
    <div className="flex flex-col flex-shrink-0 flex-auto w-64">
      <Tree
        treeData={treeData}
        defaultValue="Shanghai"
        filterTreeNode
        searchPlaceholder="hahah"
        onSearch={(input) => setSearchKey(input)}
        showFilteredOnly={true}
        renderFullLabel={renderLabel}
        draggable
        onDrop={onDrop}
      />
    </div>
  );
}
