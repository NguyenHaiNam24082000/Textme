import { useEffect } from "react";
import { useQueryClient } from "react-query";
import getSocket from "./index";
import { GetMe } from "../../store/userSlice";
import { CHANNEL_MESSAGES_KEY } from "../../configs/queryKeys";
import { CHANNEL_SOCKET } from "../../configs/socketRoute";

export default function useMessageSocket(channelId, key) {
  const me = GetMe();
  const cache = useQueryClient();
  useEffect(() => {
    let socket;
    if (me?.tokens?.access?.token) {
      socket = getSocket(me.tokens.access.token);
      if (socket) {
        if (channelId)
          socket.emit(CHANNEL_SOCKET.JOIN_CHANNEL, {
            channelId,
            userId: me?.user?.id,
          });
        socket.on(CHANNEL_SOCKET.CHANNEL_NEW_MESSAGE, (newMessage) => {
          cache.setQueryData(CHANNEL_MESSAGES_KEY(channelId), (d) => {
            if (d?.pages[0]?.results[0]?.id !== newMessage.id)
              d?.pages[0]?.results.unshift(newMessage);
            return d;
          });
        });
        socket.on(CHANNEL_SOCKET.CHANNEL_EDIT_MESSAGE, (editMessage) => {
          cache.setQueryData(CHANNEL_MESSAGES_KEY(channelId), (d) => {
            let index = -1;
            let editId = -1;
            let alreadyFound = false;
            d?.pages.forEach((p, i) => {
              const foundIndex = p.results.findIndex(
                (m) => m.id === editMessage.id
              );
              if (foundIndex !== -1 && alreadyFound === false) {
                index = i;
                editId = foundIndex;
                alreadyFound = true;
              }
            });
            if (index !== -1 && editId !== -1) {
              d.pages[index].results[editId] = editMessage;
            }
            return d;
          });
        });

        socket.on(CHANNEL_SOCKET.CHANNEL_DELETE_MESSAGE, (deleteMessage) => {
          cache.setQueryData(
            CHANNEL_MESSAGES_KEY(deleteMessage.channelId),
            (d) => {
              let index = -1;
              d?.pages?.forEach((p, i) => {
                if (
                  p.results?.findIndex(
                    (m) => m.id === deleteMessage.messageId
                  ) !== -1
                ) {
                  index = i;
                }
              });
              if (index !== -1) {
                d.pages[index].results = d?.pages[index].results.filter(
                  (m) => m.id !== deleteMessage.messageId
                );
              }
              return d;
            }
          );
        });
      }
    }
    return () => {
      if (socket) {
        socket.emit(CHANNEL_SOCKET.LEAVE_CHANNEL, {
          channelId,
          userId: me?.user?.id,
        });
      }
    };
  }, [me?.tokens?.access?.token, me?.user?.id, channelId, cache, key]);
}
