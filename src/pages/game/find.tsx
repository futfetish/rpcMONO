import { GameServerClient } from "@/axios/server/gameServer";
import { socket } from "@/socket";
import { AuthStore } from "@/store/authStore";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const GameFind: FC = () => {
  const user = AuthStore((state) => state.user);
  const isLoading = AuthStore((state) => state.isLoading);
  const router = useRouter();
  useEffect(() => {
    function onMatchFind(data: { id: number }) {
      router.push("/game/" + data.id);
    }

    function beforeUnloadF(userId: number) {
      return () => {
        socket.emit("leaveMatchMaking", {id : userId});
      };
    }

    if (user) {
      socket.connect();
      const beforeUnload = beforeUnloadF(user.id);
      window.addEventListener("beforeunload", beforeUnload);
       const roomName = "user" + user.id;
       
      socket.on("connect", () => {
        
        GameServerClient.joinMatchMaking();
       
        socket.emit("joinRoom", roomName, console.log);
        socket.on("matchFind", onMatchFind);

        
      });

      return () => {
        window.removeEventListener("beforeunload", beforeUnload);
        socket.emit("leaveRoom", roomName);

        socket.off("matchFind", onMatchFind);
        socket.disconnect();
      };
    }
  }, [user, router]);

  if (!isLoading && !user) {
    return <div>вы не авторизованыййцый</div>;
  }
  return <div>find match</div>;
};

export default GameFind;
