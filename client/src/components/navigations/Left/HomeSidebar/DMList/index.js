import React, { useEffect, useState } from "react";
import { useMatch } from "react-router";
import DMItem from "./DMItem";
import { useSelector } from "react-redux";
import { Group } from "@mantine/core";
import EmptyListPlaceholder from "../../../../UI/EmptyListPlaceholder";
import { getAllDMChannels } from "../../../../../apis/channel";

const ShowOpenDMChannel = ({ user, channels }) => {
  const match = useMatch("/channel/@me/:channelId");
  return channels.map((channel, index) => (
    <DMItem key={channel.id} user={user} channel={channel} match={match}/>
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
  const { user } = useSelector((state) => state.user);
  const [channels, setChannels] = useState();
  useEffect(async () => {
    const res = await getAllDMChannels();
    setChannels(res.data);
    console.log(res.data, "channel");
  }, []);
  console.log(channels, "channels");
  return (
    <>
      {channels && channels?.length ? (
        <Group className="flex flex-col">
          <ShowOpenDMChannel user={user} channels={channels} />
        </Group>
      ) : (
        <EmptyDmList />
      )}
    </>
  );
}
