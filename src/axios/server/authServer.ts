import { UserDtoI } from "@/dtos/userDto";
import { AxiosResponse } from "axios";
import { $api } from "../api";
import { authResponseI } from "@/service/authService";



interface authServerI {
  login: (
    name: string,
    password: string
  ) => Promise<
    AxiosResponse<authResponseI>
  >;
}

class AuthServer implements authServerI {
  async login(name: string, password: string) {
    return $api.post<authResponseI>("/login", { name, password });
  }
}
export const AuthServerClient = new AuthServer()
