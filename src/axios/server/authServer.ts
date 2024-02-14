import { UserDtoI } from "@/dtos/userDto";
import { AxiosResponse } from "axios";
import { $api } from "../api";
import { authResponseI } from "@/service/authService";
import { Err } from "@/entites/error/error";

interface authServerI {
  login: (
    name: string,
    password: string
  ) => Promise<AxiosResponse<authResponseI | Err>>;

  logout: () => void;

  register: (
    name: string,
    password: string
  ) => Promise<AxiosResponse<authResponseI | Err>>;
}

class AuthServer implements authServerI {
  async login(name: string, password: string) {
    return $api.post<authResponseI>("/login", { name, password });
  }

  async logout() {
    return $api.get<void>("/logout");
  }

  async register(name : string , password : string){
    return $api.post<authResponseI>("/register", { name, password });
  }
}
export const AuthServerClient = new AuthServer();
