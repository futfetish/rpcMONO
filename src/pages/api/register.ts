// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserDto, UserDtoI } from "@/dtos/userDto";
import { Err } from "@/entites/error/error";
import { AuthServiceClient } from "@/service/authService";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";

const bodySchema = z.object({
  name: z.string().min(3, "имя от 3 символов"),
  password: z.string().min(3, "пороль от 3 символов"),
});
3
interface response {
  user: UserDtoI;
  accessToken: string;
  refreshToken: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<response | Err>
) {
  if (req.method === "POST") {
    try {
      const { name, password } = bodySchema.parse(req.body);
      const userData = await AuthServiceClient.register(name, password);

      res.setHeader(
        "Set-Cookie",
        `refreshToken=${userData.refreshToken}; HttpOnly; Max-Age=${
          60 * 60 * 24 * 30
        }`
      );

      res.status(200).json(userData);
    } catch (e) {
      if (e instanceof ZodError) {
        res
          .status(400)
          .json(new Err(e.errors[0].path[0] as string, e.errors[0].message));
      }
      res.status(400).json(e as Err);
    }
  }
}
