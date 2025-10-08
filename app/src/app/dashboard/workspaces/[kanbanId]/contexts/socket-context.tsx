"use client";
import { useGetMe } from "@/app/dashboard/hooks/queries/use-get-me";
import { NotInsideHookException } from "@/core/exceptions/not-inside-hook-exception";
import { connectSocket, disconnectSocket, initSocket } from "@/core/lib/socket";
import { useParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
interface SocketContextProps {
  socket: Socket | null;
  handleRoom: (roomName: string | null) => void;
  room: string | null;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socket] = useState<Socket>(() => initSocket());
  const [room, setRoom] = useState<string | null>(null);

  const handleRoom = (roomName: string | null) => {
    setRoom(roomName);
  };

  useEffect(() => {
    if (socket) {
      connectSocket(socket);
    }

    return () => disconnectSocket(socket);
  });
  return (
    <SocketContext.Provider value={{ socket, room, handleRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new NotInsideHookException(
      "useSocket must be used inside SocketProvider"
    );
  }
  return context;
};
