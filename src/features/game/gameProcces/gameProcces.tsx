import {
  ScissorsBox,
  ScissorsButton,
  PaperButton,
  RockButton,
  RockBox,
  PaperBox,
} from "@/components/game/gameButtons/gameButtons";
import { GameDto } from "@/dtos/gameDto";
import { FC, useEffect, useState } from "react";
import Styles from "./gameProcces.module.scss";
import { socket } from "@/socket";
import { AuthStore } from "@/store/authStore";

type moveT = "rock" | "scissors" | "paper" | null;

export const GameProcess: FC<{ game: GameDto }> = ({ game }) => {
  const user = AuthStore((state) => state.user);
  const isLoading = AuthStore((state) => state.isLoading);

  const [enemyMove, setEnemyMove] = useState<moveT>(null);
  const [move, setMove] = useState<moveT>(null);

  useEffect(() => {
    function onGameResult(data: { id: number; move: NonNullable<moveT> }[]) {
      if (user){
         setEnemyMove( data.find((u) => u.id !== user.id)!.move)
      }
      }
    if (user !== null) {
      socket.connect();
      socket.emit("joinRoom", "game" + game.id);
      socket.on('gameResult' , onGameResult)
      return () => {
        socket.emit("leaveRoom", "game" + game.id);
        socket.off('gameResult' , onGameResult)
        socket.disconnect();
      };
    }
  }, [user , game]);



  if (isLoading) {
    return <div>loading</div>;
  }
  if (!user) {
    return <div>aauth er</div>;
  }
  const setMoveF = (move: moveT) => {
    socket.emit("gameMove", { userId: user.id, gameId: game.id, move });
    setMove(move);
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.box}>
        <div>
          <p style={{ textAlign: "center" }}>name</p>
          <div className={Styles.moves}>
            <RockBox active={enemyMove == "rock"} />
            <ScissorsBox active={enemyMove == "scissors"} />
            <PaperBox active={enemyMove == "paper"} />
          </div>
        </div>

        <div>
          <div>{game.id}</div>
        </div>
        <div>
          <div className={Styles.moves}>
            <ScissorsButton
              active={move == "scissors"}
              onClick={() => setMoveF("scissors")}
            />
            <RockButton
              active={move == "rock"}
              onClick={() => setMoveF("rock")}
            />
            <PaperButton
              active={move == "paper"}
              onClick={() => setMoveF("paper")}
            />
          </div>
          <p style={{ textAlign: "center" }}>name</p>
        </div>
      </div>
    </div>
  );
};
