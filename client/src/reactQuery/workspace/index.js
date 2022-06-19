import { useQuery } from "react-query";
import {
  getAllBlockedMembers,
  getAllInviteMembers,
  getAllPendingMembers,
  getAllWorkspaces,
} from "../../apis/workspace";
import { OPEN_SERVER } from "../../configs/queryKeys";

export const GetAllWorkspaces = () => {
  return useQuery(OPEN_SERVER, async () => {
    let data = [];
    try {
      let workspaces = await getAllWorkspaces().then((res) => res.data);
      data = [...workspaces];
    } catch (error) {
      console.log(error);
    }
    return data;
  });
};

export const GetAllInviteMembers = (payload) => {
  return useQuery("ALL_INVITE_MEMBERS", async () => {
    let data = [];
    try {
      let workspaces = await getAllInviteMembers(payload).then(
        (res) => res.data
      );
      data = [...workspaces];
    } catch (error) {
      console.log(error);
    }
    return data;
  });
};

export const GetAllPendingMembers = () => {
  return useQuery("ALL_PENDING_MEMBERS", async () => {
    let data = [];
    try {
      let workspaces = await getAllPendingMembers().then((res) => res.data);
      data = [...workspaces];
    } catch (error) {
      console.log(error);
    }
    return data;
  });
};

export const GetAllBlockedMembers = () => {
  return useQuery("ALL_BLOCKED_MEMBERS", async () => {
    let data = [];
    try {
      let workspaces = await getAllBlockedMembers().then((res) => res.data);
      data = [...workspaces];
    } catch (error) {
      console.log(error);
    }
    return data;
  });
};
