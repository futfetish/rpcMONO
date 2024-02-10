import { DB } from "@/db";
import { Err } from "@/entites/error/error";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";
import { UserDto, UserDtoI } from "@/dtos/userDto";
import { AuthServiceClient } from "@/service/authService";


interface response {
    user: UserDtoI;
    accessToken: string;
    refreshToken: string;
  }

const bodySchema = z.object({
  name: z.string(),
  password: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<response | Err>
) {
  if (req.method === "GET") {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
          throw Err.authError();
        }
        const data = await AuthServiceClient.refreshToken(refreshToken);
        res.status(200).json(data);
      } catch (e) {
        res.status(401).json(e as Err);
      }
  }
}
