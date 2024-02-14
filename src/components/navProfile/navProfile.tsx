import { MyA } from "@/UI/myA/myA";
import Styles from "./navProfile.module.scss";
import { AuthStore } from "@/store/authStore";

import { FC } from "react";

export const NavProfile: FC = () => {
  return <div className={Styles.box}>
    <MyA style={{fontSize : '20px' }}  > profile name </MyA>
  </div> 
  // const user = AuthStore((state) => state.user);
  // console.log(user);
  // const isLoading = AuthStore((state) => state.isLoading);
  // const logout = AuthStore((state) => state.logout)
  // if (isLoading) {
  //   return <div>lading</div>;
  // }
  // if (!user) {
  //   return (
  //     <div className={Styles.box}>
  //       <MyA href={"/login"}>Войти</MyA>
  //       <MyA href={"/registration"}>Регистрация</MyA>
  //     </div>
  //   );
  // }
  // return (
  //   <div className={Styles.box}>
  //     <MyA style={{fontSize : '20px'}} href={`/users/${user.id}`}>{user.name} </MyA>
  //     <MyA style={{fontSize : '20px'}} >Выйти</MyA>
  //   </div>
  // );
};
