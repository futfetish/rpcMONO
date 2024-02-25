import { ScissorsBox, ScissorsButton } from "@/components/game/gameButtons/gameButtons";
import { GameDto } from "@/dtos/gameDto";
import { FC } from "react";

export const GameProcess: FC<{ game: GameDto }> = ({ game }) => {
  return (
    <div>
      <div>{game.id}</div>
      <div>{game.status}</div>
    </div>
  );
};
