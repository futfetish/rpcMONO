import { DB } from "@/db";
import { AuthStore } from "@/store/authStore";
import { GetServerSideProps } from "next";

async function getGame(id: number) {
  const game = await DB.game.findUnique({
    where: { id },
    select: {
      id: true,
      users: {
        select: {
          userId: true,
        },
      },
    },
  });
  return game;
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

  return {
    props: {
      game: res,
    },
  };
};

export default function GamePage({
  game,
}: {
  game: NonNullable<Awaited<ReturnType<typeof getGame>>>;
}) {
  return <>{game.id}</>;
}
