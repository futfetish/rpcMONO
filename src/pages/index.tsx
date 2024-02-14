import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { AuthStore } from "@/store/authStore";
import { MyA } from "@/UI/myA/myA";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = AuthStore((state) => state.user);
  const isLoading = AuthStore((state) => state.isLoading)
  const logout = AuthStore((state) => state.logout)
  if (isLoading){
    return <div>loading...</div>
  }
  return (
    <div>
      {user ? (
        <div>
          <p> вы авторизованы : {user.name} </p>
          <MyA  onClick={() => logout()}>logout</MyA>
        </div>
      ) : (
        <div>вы не авторизованы</div>
      )}
    </div>
  );
}
