import { useEffect } from "react";
import { useQueryClient } from "react-query";
import getSocket from "./index";
import { GetMe } from "../../store/userSlice";
import { ME_SOCKET } from "../../configs/socketRoute";
import {
  OPEN_CHANNEL,
  PENDING_REQUESTS_KEY,
  OUT_GOING_REQUESTS_KEY,
  ALL_FRIENDS_KEY,
  USERS_ONLINE,
} from "../../configs/queryKeys";
import { useNavigate } from "react-router";
const usersOnline = {};

export const useMeSocket = () => {
  const me = GetMe();
  const cache = useQueryClient();
  const history = useNavigate();
  useEffect(() => {
    console.log("hello");
    let socket = null;
    const accessToken = me?.tokens?.access?.token;
    if (accessToken) {
      socket = getSocket(accessToken);
      console.log(socket, "hello");
      socket.connect();
      if (socket) {
        socket.emit(ME_SOCKET.ONLINE, { userId: me?.user?.id });
        socket.emit("userConnected", me?.user);
        socket.on("updateUserStatus", (data) => {
          cache.invalidateQueries(USERS_ONLINE);
          Object.keys(usersOnline).forEach((key) => delete usersOnline[key]);
          Object.assign(usersOnline, data);
        });
        socket.on("roomOpened", () => {
          cache.invalidateQueries(OPEN_CHANNEL);
        });
        socket.on("friendRequest", () => {
          cache.invalidateQueries(PENDING_REQUESTS_KEY);
        });
        socket.on("friendAcceptRequest", () => {
          cache.invalidateQueries(OUT_GOING_REQUESTS_KEY);
          cache.invalidateQueries(ALL_FRIENDS_KEY);
        });
        socket.on("cancelFriendRequest", () => {
          cache.invalidateQueries(ALL_FRIENDS_KEY);
          cache.invalidateQueries(PENDING_REQUESTS_KEY);
          cache.invalidateQueries(OUT_GOING_REQUESTS_KEY);
        });
      } else {
        localStorage.removeItem("user");
        history("/login");
      }
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [me?.user._id, cache, me?.tokens?.access?.token, me?.user, history]);
};

export default usersOnline;
