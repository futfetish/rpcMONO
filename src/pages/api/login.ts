import { DB } from "@/db";
import { Err } from "@/entites/error/error";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { UserDto, UserDtoI } from "@/dtos/userDto";
import { TokenServiceClient } from "@/service/tokenService";
import { AuthServiceClient } from "@/service/authService";


interface response {
    user: UserDtoI;
    accessToken: string;
    refreshToken: string;
  }

const bodySchema = z.object({
  name: z.string(),
  password: z.string(),
});3

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<response | Err>
) {
  if (req.method === "POST") {
    try {
      const { name, password } = bodySchema.parse(req.body);
      const userData = await AuthServiceClient.login(name , password)

      res.setHeader(
        "Set-Cookie",
        `refreshToken=${userData.refreshToken}; HttpOnly; Max-Age=${
          60 * 60 * 24 * 30
        }`
      );

      res.status(200).json(userData)
    } catch (e) {
      if (e instanceof ZodError) {
        res
          .status(400)
          .json(new Err(e.errors[0].path[0] as string, e.errors[0].message));
      } else {
        if (e instanceof ZodError) {
          res
            .status(400)
            .json(new Err(e.errors[0].path[0] as string, e.errors[0].message));
        } else {
          res.status(400).json(e as Err);
        }
      }
    }
  }
}
