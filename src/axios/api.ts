import axios from "axios";
import { config } from "process";

export const API_URL = "http://localhost:3000/api";

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const req = error.config;
    if (error.response) {
      if (
        error.response.status == 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        req._isRetry = true;
        try {
          const res = await axios.get(`${API_URL}/refresh`, {
            withCredentials: true,
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          return $api.request(req);
        } catch  {
            //пользователь не авторизован
        }
      } else {
        return error
      }
    }
  }
);
