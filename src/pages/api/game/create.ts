import { DB } from "@/db";
import { Err } from "@/entites/error/error";
import { GameServiceClient } from "@/service/gameService";
import { TokenServiceClient } from "@/service/tokenService";
import { socket } from "@/socket";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const bodySchema = z.object({
  ids: z.array(z.number()),
});

interface response {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<response | Err>
) {
  if (req.method === "POST") {
    try {
      const { ids } = bodySchema.parse(req.body);
      const game = await GameServiceClient.create(ids[0] , ids[1])
      res.status(200).json({ id: game.id });
    } catch (e) {
      res.status(401).json(e as Err);
    }
  }
}
