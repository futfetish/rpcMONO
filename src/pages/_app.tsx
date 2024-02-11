import { AuthStore } from "@/store/authStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect} from "react";

export default function App({ Component, pageProps }: AppProps) {
  const checkAuth = AuthStore((store) => store.chechAuth)
  useEffect(() => {
    if(localStorage.getItem('accessToken')){
      checkAuth()
    }
  } , [])
  return <Component {...pageProps} />;
}
