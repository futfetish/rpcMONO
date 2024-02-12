import { $api, API_URL } from "@/axios/api";
import { AuthServerClient } from "@/axios/server/authServer";
import { UserDtoI } from "@/dtos/userDto";
import { userI } from "@/entites/user/userController";
import { authResponseI } from "@/service/authService";
import axios from "axios";
import { create } from "zustand";

interface AuthStoreI {
  user: UserDtoI | null;
  isLoading : boolean;
  login: (name: string, password: string) => void;
  register: (name: string, password: string) => void;
  logout: () => void;
  chechAuth: () => void
}

export const AuthStore = create<AuthStoreI>((set, get) => ({
  user: null,
  isLoading : false,
  login: async (name, password) => {
    const response = await AuthServerClient.login(name, password);
    localStorage.setItem("accessToken", response.data.accessToken);
    set({ user: response.data.user });
  },
  register: async (name, password) => {
    const response = await AuthServerClient.register(name, password);
    localStorage.setItem("accessToken", response.data.accessToken);
    set({ user: response.data.user });
  },
  logout: async () => {
    await AuthServerClient.logout();
    set({ user: null });
  },
  chechAuth : async () => {
    set({isLoading : true})
    try {
      const userData = await axios.get<authResponseI>(`${API_URL}/refreshToken` , {withCredentials : true}) 
      set({user : userData.data.user})
    } catch (e) {
      //пользователь не авторизован
    } finally {
      set({isLoading : false})
    }
   
  }
}));
