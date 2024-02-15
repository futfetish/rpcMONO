import { DB } from "@/db";
import { Err } from "@/entites/error/error";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { UserDto, UserDtoI } from "@/dtos/userDto";
import { TokenServiceClient } from "@/service/tokenService";
import { AuthServiceClient } from "@/service/authService";
import { UserServiceClient } from "@/service/userService";

interface response {
    users : UserDtoI[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<response | Err>
) {
  if (req.method === "GET") {
    try {
        const users = await UserServiceClient.getTop100()
      res.status(200).json({users});
    } catch (e) {
      res.status(401).json(e as Err);
    }
  }
}
