import React, { useEffect, useState } from "react";
import { IllustrationNoAccess } from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import { useSelector } from "react-redux";
import { ActionIcon, Group, Text, TextInput } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  OutGoingRequests,
  PendingRequests,
} from "../../../../reactQuery/friend";
import { Search } from "tabler-icons-react";
import PendingItem from "./PendingItem";

function PendingHeader({ pendingRequestsData, outGoingRequests }) {
  const pendingCount =
    (pendingRequestsData?.length ?? 0) + (outGoingRequests?.length ?? 0);
  return (
    <div className="flex justify-start items-center w-full mt-2">
      <h6 className="my-2 text-discord-topIcons text-xs font-semibold">
        PENDING — {pendingCount}
      </h6>
    </div>
  );
}

export default function Pending() {
  const { user } = useSelector((state) => state.user);
  const [pendingProfile, setPendingProfile] = useState(null);
  const { data: pendingRequests } = PendingRequests();
  const { data: outGoingRequests } = OutGoingRequests();
  const [pendingList, setPendingList] = useState(pendingRequests);
  const [outGoingList, setOutGoingList] = useState(outGoingRequests);

  useEffect(() => {
    setPendingList(pendingRequests);
  }, [pendingRequests]);

  useEffect(() => {
    setOutGoingList(outGoingRequests);
  }, [outGoingRequests]);


  const handleSearch = (e) => {
    const search = e.target.value;
    const filteredPendingList = pendingRequests.filter(
      (pending) =>
        pending?.sender?.username
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        pending?.sender?.name?.toLowerCase().includes(search.toLowerCase()) ||
        pending?.sender?.email?.toLowerCase().includes(search.toLowerCase()) ||
        pending?.sender?.discriminator
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
    const filteredOutGoingList = outGoingRequests.filter(
      (outGoing) =>
        outGoing?.receiver?.username
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        outGoing?.receiver?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        outGoing?.receiver?.discriminator
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
    setPendingList(filteredPendingList);
    setOutGoingList(filteredOutGoingList);
  };

  return (
    <div>
      <TextInput
        icon={<Search size={18} />}
        radius="md"
        size="md"
        placeholder="Search questions"
        onChange={handleSearch}
      />
      <PendingHeader
        outGoingRequests={outGoingList}
        pendingRequestsData={pendingList}
      />
      <div className="flex flex-col items-center justify-center">
        {pendingList &&
          pendingList.map((item) => (
            <PendingItem key={item.id} user={user} pending={item} />
          ))}
        {outGoingRequests &&
          outGoingRequests.map((item) => (
            <PendingItem key={item.id} user={user} pending={item} />
          ))}
      </div>
    </div>
  );
}
