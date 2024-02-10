import { $api } from "@/axios/api";
import { AuthServerClient } from "@/axios/server/authServer";
import { UserDtoI } from "@/dtos/userDto";
import { userI } from "@/entites/user/userController";
import { authResponseI } from "@/service/authService";
import { create } from "zustand";

interface AuthStoreI {
  name: string;
  password: string;
  login: () => void;
  user: UserDtoI | null;
}

const AuthStore = create<AuthStoreI>((set, get) => ({
  name: "",
  password: "",
  user: null,
  login: async () => {
    const response = await AuthServerClient.login(get().name, get().password);
    localStorage.setItem("accessToken", response.data.accessToken);
    set({user : response.data.user})
  },
}));
