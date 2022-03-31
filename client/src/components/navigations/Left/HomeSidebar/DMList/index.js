import React, { useEffect, useState } from "react";
import { useMatch } from "react-router";
import DMItem from "./DMItem";
import { useSelector } from "react-redux";
import { Group } from "@mantine/core";
import EmptyListPlaceholder from "../../../../UI/EmptyListPlaceholder";
import { getAllDMChannels } from "../../../../../apis/channel";
import { GetOpenChannels } from "../../../../../reactQuery/channel";

const ShowOpenDMChannel = ({ user, channels }) => {
  const match = useMatch("/channel/@me/:channelId");
  return channels
    .sort(function (a, b) {
      const date1 = new Date(a.updatedAt);
      const date2 = new Date(b.updatedAt);

      return date2 - date1;
    })
    .map((channel, index) => (
      <DMItem key={channel.id} user={user} channel={channel} match={match} />
    ));
};

const EmptyDmList = () => {
  return (
    <div className="p-3">
      <EmptyListPlaceholder className="text-slate-200 fill-current" />
    </div>
  );
};

export default function DMList() {
  const { isLoading, data: channelList } = GetOpenChannels();
  const { user } = useSelector((state) => state.user);
  const [channels, setChannels] = useState();
  useEffect(async () => {
    setChannels(channelList);
  }, [channelList]);
  console.log(channels, "channels");
  return (
    <>
      {!isLoading && channelList && channelList?.length ? (
        <Group spacing={4} className="flex flex-col">
          <ShowOpenDMChannel user={user} channels={channelList} />
        </Group>
      ) : (
        <EmptyDmList />
      )}
    </>
  );
}
