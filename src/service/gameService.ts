import { GameDto, GameDtoI } from "@/dtos/gameDto";
import { userI } from "./userService";
import { DB } from "@/db";
import { number } from "zod";

interface userGameI {
  userId: number;
  gameId?: number;
}

type gameStatus = 'inProcess' | 'ended'

export interface GameI {
  users: userGameI[];
  id: number;
  date: Date;
  status: gameStatus
  winnerId?: number;
  ratingChange?: number;
}

interface GameServiceI {
  create: (firstUserId: number, secondUserId: number) => Promise<GameDtoI>;
}

class GameService implements GameServiceI {
  async create(firstUserId: number, secondUserId: number) {
    const game = (await DB.game.create({})) as GameI;
    await DB.userGame.create({
      data: { userId: firstUserId, gameId: game.id },
    });
    await DB.userGame.create({
      data: { userId: secondUserId, gameId: game.id },
    });

    const gameDto = new GameDto({
      ...game,
      users: [{ userId: firstUserId }, { userId: secondUserId }],
    } as GameI);

    return gameDto;
  }
}

export const GameServiceClient = new GameService()
