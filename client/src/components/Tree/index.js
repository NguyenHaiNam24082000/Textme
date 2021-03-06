import "./index.css";
import { useEffect, useState } from "react";
// import { Tree } from "@douyinfe/semi-ui";
import { ActionIcon } from "@mantine/core";
import { IconPlus, IconHash, IconSetting } from "@douyinfe/semi-icons";
import { Highlight } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
// import ModalCreateChannel from "../Modals/ModalCreateChannel";
import ModalChannelSettings from "../Modals/ModalChannelSettings";
// import { useHover } from "@mantine/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { voiceConnected } from "../../store/uiSlice";

function updateTreeData(list, key, children) {
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }

    return node;
  });
}

export default function TreeComponent({ server, setOpenedModalCreateChannel }) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [openedModalChannelSettings, setOpenedModalChannelSettings] =
    useState(false);
  const { channel: channelId } = useParams();
  const [searchKey, setSearchKey] = useState("");
  const [treeData, setTreeData] = useState([]);
  const [value, setValue] = useState(channelId);
  const [channel, setChannel] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (server?.channels) {
      setTreeData([
        ...server.channels
          .sort((a, b) => a.position.localeCompare(b.position))
          .reduce((acc, item) => {
            // if parentId is 0, add to acc.
            if (!item.position.includes("-")) {
              return [
                ...acc,
                {
                  label: item.channel.name,
                  value: item.channel.id,
                  channel: item.channel,
                  key: item.position,
                },
              ];
            }

            // else find the parent.
            const parentIndex = acc.findIndex(
              (parent) => item.position.split("-")[0] === parent.position
            );
            const parent = acc[parentIndex];
            const children = parent?.children ?? [];

            // update the array item at index.
            return Object.assign([], acc, {
              [parentIndex]: {
                ...parent,
                children: [
                  ...children,
                  {
                    label: item.channel.name,
                    value: item.channel.id,
                    channel: item.channel,
                    key: item.position,
                  },
                ], // add the item as a child.
              },
            });
          }, []),
      ]);
      // setTreeData([
      //   {
      //     label: "Channels",
      //     value: "Channels",
      //     key: "0",
      //     channel: null,
      //     button: (
      //       <ActionIcon
      //         size="sm"
      //         variant="transparent"
      //         onClick={(e) => {
      //           e.stopPropagation();
      //           setOpenedModalCreateChannel(true);
      //         }}
      //       >
      //         <IconPlus />
      //       </ActionIcon>
      //     ),
      //     children: [
      //       ...server.channels?.map((channel) => ({
      //         label: channel.channel.name,
      //         value: channel.channel._id,
      //         key: `0-${channel.position}`,
      //         channel: channel,
      //         icon:
      //           channel.channel.type === "TEXT" ? (
      //             <IconHash />
      //           ) : (
      //             <FontAwesomeIcon icon="fa-solid fa-volume-high" />
      //           ),
      //         click: () => {
      //           if (channel.channel.type === "VOICE") {
      //             setTreeData((v) =>
      //               updateTreeData(v, `0-${channel.position}`, [
      //                 {
      //                   label: "Channels",
      //                   value: "Channels",
      //                   key: `0-${channel.position}-1`,
      //                 },
      //               ])
      //             );
      //             dispatch(voiceConnected(true));
      //           }
      //           history(`/channel/${server._id}/${channel.channel._id}`);
      //         },
      //         button: (
      //           <ActionIcon
      //             size="sm"
      //             variant="transparent"
      //             onClick={(e) => {
      //               e.stopPropagation();
      //               setChannel(channel.channel);
      //               setOpenedModalChannelSettings(true);
      //             }}
      //           >
      //             <IconSetting />
      //           </ActionIcon>
      //         ),
      //       })),
      //     ],
      //   },
      // ]);
    }
  }, [server]);
  const renderLabel = ({ className, onExpand, onClick, data, expandIcon }) => {
    const { label, icon, button, click, value, channel } = data;
    const isActive = value === channelId;
    const isLeaf = !(data.children && data.children.length);
    return (
      <li
        className={`${className} ${isLeaf ? "group" : ""}`}
        role="treeitem"
        onClick={
          isLeaf
            ? () => {
                typeof click === "function" && click();
                typeof onClick === "function" && onClick();
              }
            : () => {
                if (channel.channel.type === "VOICE") {
                  history(`/channel/${server._id}/${channel.channel._id}`);
                }
                onExpand();
              }
        }
        style={{
          "--semi-tree-option-selected": isActive ? "#e1e1e1" : "",
          background: isActive ? "#e1e1e1" : "",
        }}
      >
        {isLeaf ? null : expandIcon}
        {icon}
        <Highlight highlight={searchKey}>{label}</Highlight>
        <div className={`${isLeaf ? "invisible group-hover:visible" : ""}`}>
          {button}
        </div>
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
    <>
      <div className="flex flex-col flex-shrink-0 flex-auto w-64 p-2">
        {/* <Tree
          treeData={treeData}
          // defaultValue="Shanghai"
          // value={searchKey}
          expandAll
          value={value || channelId}
          onChange={(value) => {
            setValue(value);
          }}
          filterTreeNode
          searchPlaceholder={t("Search")}
          onSearch={(input) => setSearchKey(input)}
          showFilteredOnly={true}
          renderFullLabel={renderLabel}
          draggable
          onDrop={onDrop}
        />*/}
        {server?.channels &&
          server.channels
            .sort((a, b) => a.position.localeCompare(b.position))
            .map((channel) => (
              <div
                key={channel.channel.id}
                className={`flex items-center h-8 px-2 text-base cursor-pointer gap-2 hover:bg-gray-200 
          `}
                style={{ marginBottom: 2, borderRadius: 4 }}
                onClick={() => {
                  // setActive(it.value);
                  if (channel.channel.type === "VOICE") {
                    //             setTreeData((v) =>
                    //               updateTreeData(v, `0-${channel.position}`, [
                    //                 {
                    //                   label: "Channels",
                    //                   value: "Channels",
                    //                   key: `0-${channel.position}-1`,
                    //                 },
                    //               ])
                    //             );
                    dispatch(voiceConnected(true));
                  }
                  history(`/channel/${server._id}/${channel.channel._id}`);
                }}
              >
                <div className="flex items-center justify-center w-5 contrast-50">
                  {channel.channel.type === "TEXT" ? (
                    <IconHash />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-volume-high" />
                  )}
                </div>
                <div className="text-sm font-semibold">
                  {channel.channel.name}
                </div>
                {/* <ActionIcon
                  size="sm"
                  variant="transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    setChannel(channel.channel);
                    setOpenedModalChannelSettings(true);
                  }}
                >
                  <IconSetting />
                </ActionIcon> */}
              </div>
            ))}
      </div>
      <ModalChannelSettings
        opened={openedModalChannelSettings}
        onClose={() => {
          setOpenedModalChannelSettings(false);
        }}
        channel={channel}
      />
    </>
  );
}
