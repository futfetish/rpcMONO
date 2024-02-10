import { DB } from "@/db";
import { UserDto, UserDtoI } from "@/dtos/userDto";
import { Err } from "@/entites/error/error";
import { UserControlerClient, userI } from "@/entites/user/userController";
import bcrypt from "bcrypt";
import { TokenServiceClient } from "./tokenService";

interface AuthServiceI {
  register: (
    name: string,
    password: string
  ) => Promise<{
    user: UserDtoI;
    accessToken: string;
    refreshToken: string;
  }>;

  login: (
    name: string,
    password: string
  ) => Promise<{
    user: UserDtoI;
    accessToken: string;
    refreshToken: string;
  }>;

  logout: (token: string) => void;

  refreshToken: (
    refreshToken: string
  ) => Promise<{ user: UserDtoI; accessToken: string; refreshToken: string }>;
}

class AuthService implements AuthServiceI {
  async register(name: string, password: string) {
    const candidate = await DB.user.findUnique({
      where: {
        name: name,
      },
    });
    if (candidate) {
      throw new Err("name", "пользователь существует");
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await UserControlerClient.create(
      (name = name),
      (password = hashPassword)
    );

    const userDto = new UserDto(user);
    const tokens = TokenServiceClient.generateTokens(userDto);
    await TokenServiceClient.saveToken(user.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }

  async login(name: string, password: string) {
    const user = await DB.user.findUnique({ where: { name } });
    if (!user) {
      throw new Err("name", "неправельный логин");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Err("password", "неправельный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = await TokenServiceClient.generateTokens(userDto);

    await TokenServiceClient.saveToken(user.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async logout(token: string) {
    await TokenServiceClient.remove(token);
    return;
  }

  async refreshToken(refreshToken: string) {
    const data = TokenServiceClient.validateRefreshToken(refreshToken) as
      | UserDtoI
      | undefined;
    const tokenModel = await DB.refreshToken.findUnique({
      where: { token: refreshToken },
    });
    if (!data || !tokenModel) {
      throw Err.authError();
    }
    const user = await DB.user.findUnique({ where: { id: data.id } });
    if (!user) {
      throw Err.authError();
    }
    const userDto = new UserDto(user);
    const tokens = await TokenServiceClient.generateTokens(userDto);
    await TokenServiceClient.saveToken(user.id , tokens.refreshToken)
    return { ...tokens, user: userDto };
  }
}

export const AuthServiceClient = new AuthService();
