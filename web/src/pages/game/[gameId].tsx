import { DB } from "@/db";
import { GameDto } from "@/dtos/gameDto";
import { GameProcess } from "@/features/game/gameProcces/gameProcces";
import { AuthStore } from "@/store/authStore";
import { GetServerSideProps } from "next";
import SuperJSON from "superjson";

async function getGame(id: number) {
  const game = await DB.game.findUnique({
    where: { id },
    select: {
      id: true,
      status : true,
      users: {
        select: {
          userId: true,
        },
      },
      date : true 
    },
  });
  const data = SuperJSON.serialize(game).json;
  return data as typeof game;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const gameId = ctx.params?.gameId;

  if (!gameId) {
    return {
      notFound: true,
    };
  }

  const res = await getGame(parseInt(gameId as string));

  if (!res) {
    return {
      notFound: true,
    };
  }

  const gameGto = new GameDto(res)

  return {
    props: {
      game: res,
    },
  };
};

export default function GamePage({
  game,
}: {
  game: GameDto;
}) {
  return <GameProcess game={game} />;
}
