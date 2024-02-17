import { GameServerClient } from "@/axios/server/gameServer";
import { socket } from "@/socket";
import { AuthStore } from "@/store/authStore";
import { FC, useEffect } from "react";

const GameFind: FC = () => {
  const user = AuthStore((state) => state.user);
  const isLoading = AuthStore((state) => state.isLoading);

  useEffect(() => {
    if (user) {
      socket.connect();
      GameServerClient.joinMatchMaking();
      const roomName = 'user' + user.id
      socket.emit('joinRoom' , roomName)
      return () => {
        socket.emit('leaveMatchMaking' , user.id)
        socket.emit('leaveRoom' , roomName)
        socket.disconnect();
      };
    }
  }, [user]);

  if (!isLoading && !user) {
    return <div>вы не авторизованыййцый</div>;
  }
  return <div>find match</div>;
};

export default GameFind;
