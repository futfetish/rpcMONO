import { NavList } from "@/components/nav/navList/navList";
import { NavProfile } from "@/components/nav/navProfile/navProfile";
import { FC } from "react";
import Styles from "./nav.module.scss";

export const Nav: FC = () => {
  return (
    <div className={Styles.box}>
      <NavList />
      <NavProfile />
    </div>
  );
};
