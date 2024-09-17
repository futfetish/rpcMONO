import { FC, ReactNode, useEffect } from "react";
import Styles from "./layout.module.scss";
import { Nav } from "../nav/nav";

interface props {
  children: ReactNode;
}

export const Layout: FC<props> = ({ children }) => {

  return (
    <div className={Styles.box}>
      <Nav />
      <div className={Styles.content}>{children}</div>
    </div>
  );
};
