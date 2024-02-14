import { NavList } from "@/components/navList/navList";
import { NavProfile } from "@/components/navProfile/navProfile";
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
