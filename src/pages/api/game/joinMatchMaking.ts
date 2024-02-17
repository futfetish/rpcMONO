import { Err } from "@/entites/error/error";
import { TokenServiceClient } from "@/service/tokenService";
import { socket } from "@/socket";
import { NextApiRequest, NextApiResponse } from "next";

interface response {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<response | Err>
) {
  if (req.method === "GET") {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw Err.authError();
      }

      const userData = TokenServiceClient.validateAccessToken(token);

      if (!userData) {
        throw Err.authError();
      }


      socket.connect();
      
      socket.on("connect", () => {
        console.log("Socket connected");
        socket.emit("joinMatchMaking", userData);
        socket.disconnect();
      });

      res.status(200).json({});
    } catch (e) {
      res.status(401).json(e as Err);
    }
  }
}
