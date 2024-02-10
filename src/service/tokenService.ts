import { DB } from "@/db";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenServiceI {
  generateTokens: (payload: object) => {
    accessToken: string;
    refreshToken: string;
  };
  saveToken: (userId: number, token: string) => void;
  remove: (token: string) => void;
  validateAccessToken: (token: string) => JwtPayload | string | null;
  validateRefreshToken: (token: string) => JwtPayload | string | null;
}

class TokenService implements TokenServiceI {
  generateTokens(payload: object) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: number, token: string) {
    const tokenModel = await DB.refreshToken.findUnique({ where: { userId } });
    if (tokenModel) {
      DB.refreshToken.update({ where: { userId }, data: { token } });
    } else {
      DB.refreshToken.create({ data: { userId, token } });
    }
    return;3
  }

  async remove(token: string) {
    await DB.refreshToken.delete({ where: { token } });
    return;
  }

  validateAccessToken(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
      return data;
    } catch {
        return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      return data;
    } catch  {
      return null;
    }
  }
}

export const TokenServiceClient = new TokenService();
