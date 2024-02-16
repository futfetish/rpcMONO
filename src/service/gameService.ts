import { GameDto, GameDtoI } from "@/dtos/gameDto";
import { userI } from "./userService";
import { DB } from "@/db";

export interface GameI {
  users: userI[];
  id: number;
  winnerId?: number;
  ratingChange?: number;
}

interface GameServiceI {
  create: (firstUserId: number, secondUserId: number) => Promise<GameDtoI>;
}

class GameService implements GameServiceI {
  async create(firstUserId: number, secondUserId: number) {
    const game = (await DB.game.create({
      data: {
        users: { connect: [{ id: firstUserId }, { id: secondUserId }] },
      },
      include: {
        users: true,
      },
    })) as GameI;

    const gameDto = new GameDto(game);

    return gameDto;
  }
}
