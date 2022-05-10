import { Group } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router";
import EmptyListPlaceholder from "../../../../UI/EmptyListPlaceholder";
import DMItem from "./DMItem";

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

export default function DMList({ channels }) {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {channels && channels?.length ? (
        // {/* {!isLoading && channelList && channelList?.length ? ( */}
        <Group spacing={4} className="flex flex-col overflow-y-auto">
          <ShowOpenDMChannel user={user} channels={channels} />
        </Group>
      ) : (
        <EmptyDmList />
      )}
    </>
  );
}
