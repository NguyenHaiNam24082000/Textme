import { io } from "socket.io-client";

let socketIo = null;

export default function getSocket(token) {
  if (token) {
    if (socketIo) {
      return socketIo;
    } else {
      socketIo = io("http://localhost:5000", {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${token}`,
            },
          },
        },
      });
      socketIo.on("connect", () => {
      });
      return socketIo;
    }
  }
  return null;
}
