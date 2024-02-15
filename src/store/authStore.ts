import { $api, API_URL } from "@/axios/api";
import { AuthServerClient } from "@/axios/server/authServer";
import { UserDtoI } from "@/dtos/userDto";
import { Err } from "@/entites/error/error";
import { userI } from "@/service/userService";
import { authResponseI } from "@/service/authService";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface AuthStoreI {
  user: UserDtoI | null;
  isLoading: boolean;
  error: null | Err;
  login: (name: string, password: string) => Promise<void | Err>;
  register: (name: string, password: string) => Promise<void | Err>;
  logout: () => void;
  checkAuth: () => void;
}

export const AuthStore = create<AuthStoreI>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (name, password) => {
    const response = await AuthServerClient.login(name, password);
    if (response instanceof AxiosError) {
      set({error : response.response?.data})
    } else {
      localStorage.setItem("accessToken", response.data.accessToken);
      set({ user: response.data.user , error : null });
    }
  },
  register: async (name, password) => {
    const response = await AuthServerClient.register(name, password);
    if (response instanceof AxiosError) {
      set({error : response.response?.data})
    } else {
      localStorage.setItem("accessToken", response.data.accessToken);
      set({ user: response.data.user , error : null });
    }
  },
  logout: async () => {
    await AuthServerClient.logout();
    set({ user: null });
  },
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const userData = await axios.get<authResponseI>(
        `${API_URL}/refreshToken`,
        { withCredentials: true }
      );
      set({ user: userData.data.user });
    } catch (e) {
      //пользователь не авторизован
    } finally {
      set({ isLoading: false });
    }
  },
}));
