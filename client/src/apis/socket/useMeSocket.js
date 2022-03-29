import {useEffect} from "react";
import { useQueryClient } from "react-query";
import getSocket from "./index";
import { GetMe } from "../../store/userSlice";
import {ME_SOCKET}  from "../../configs/socketRoute";
import {
    OPEN_CHANNEL,
    PENDING_REQUESTS_KEY,
    OUT_GOING_REQUESTS_KEY,
    ALL_FRIENDS_KEY,
} from "../../configs/queryKeys";

export const useMeSocket = () => {
    const me = GetMe();
    const cache = useQueryClient();
    useEffect(() => {
        let socket =null;
        const accessToken=me?.tokens?.access?.token
        if(accessToken)
        {
            socket = getSocket(accessToken);
            socket.connect();
            if(socket)
            {
                socket.emit(ME_SOCKET.ONLINE, {userId:me?.user?.id});
                socket.on("roomOpened", () => {
                    cache.invalidateQueries(OPEN_CHANNEL);
                });
                socket.on("friendRequest", () => {
                    cache.invalidateQueries(PENDING_REQUESTS_KEY);
                });
                socket.on("friendAcceptRequest", () => {
                    cache.invalidateQueries(OUT_GOING_REQUESTS_KEY)
                    cache.invalidateQueries(ALL_FRIENDS_KEY)
                });
                socket.on("cancelFriendRequest", () => {
                    cache.invalidateQueries(ALL_FRIENDS_KEY);
                    cache.invalidateQueries(PENDING_REQUESTS_KEY);
                    cache.invalidateQueries(OUT_GOING_REQUESTS_KEY);
                });
            }
        }
        return () => {
            if(socket)
            {
                socket.disconnect();
            }
        }
    }, [me?.token?.access?.token, me?.user?._id, cache]);
};