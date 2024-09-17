import { DB } from "@/db";
import { Err } from "@/entites/error/error";
import { GameServiceClient } from "@/service/gameService";
import { TokenServiceClient } from "@/service/tokenService";
import { socket } from "@/socket";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";

const bodySchema = z.object({
  id: z.number(),
});

interface response {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<response | Err | ZodError>
) {
  if (req.method === "POST") {
    try {
      const { id } = bodySchema.parse(req.body);
      await GameServiceClient.close(id)
      res.status(200).json({});
    } catch (e) {
      res.status(401).json(e as ZodError | Err);
    }
  }
}
