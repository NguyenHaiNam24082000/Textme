import {useEffect} from "react";
import { useQueryClient } from "react-query";
import getSocket from "./index";
import { GetMe } from "../../store/userSlice";
import {ME_SOCKET}  from "../../configs/socketRoute";
import {
    OPEN_ROOMS,
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
            console.log("aaaaa",socket)
            if(socket)
            {
                socket.emit(ME_SOCKET.ONLINE, {userId:me?.user?._id});
                socket.on("roomOpened", () => {
                    cache.invalidateQueries(OPEN_ROOMS);
                });
                socket.on("friendRequest", () => {
                    cache.invalidateQueries(PENDING_REQUESTS_KEY);
                });
                socket.on("friendAcceptRequest", () => {
                    cache.invalidateQueries(OUT_GOING_REQUESTS_KEY)
                    cache.invalidateQueries(ALL_FRIENDS_KEY)
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