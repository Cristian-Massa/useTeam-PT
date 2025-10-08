import { io, Socket } from "socket.io-client";

const BASE_URL = "http://localhost:8080";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(BASE_URL, {
      autoConnect: false, //
      withCredentials: true,
      transports: ["websocket"],
    });
  }
  return socket;
};

export const connectSocket = (socket: Socket) => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = (socket: Socket) => {
  if (socket.connected) socket.disconnect();
};
