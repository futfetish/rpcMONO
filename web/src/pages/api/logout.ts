import { DB } from "@/db";
import { Err } from "@/entites/error/error";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { UserDto } from "@/dtos/userDto";
import { TokenServiceClient } from "@/service/tokenService";
import { AuthServiceClient } from "@/service/authService";

interface response {}

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
      await AuthServiceClient.logout(refreshToken);
      res.status(200).json({});
    } catch (e) {
      res.status(401).json(e as Err);
    }
  }
}
