import { FC, ReactNode } from "react";
import Styles from "./navButton.module.scss";
import classNames from "classnames";

interface props {
  children: ReactNode;
  href?: string;
  subButtons?: { name: string; href: string }[];
}

export const NavButton: FC<props & Record<string , any>> = ({
  children,
  href = "#",
  subButtons = [],
  ...props
}) => {
  return (
    <div className={Styles.box}>
      <a className={classNames(Styles.navButton)} {...props} href={href}>
        {children}
      </a>
      <div className={Styles.modal}>
        {subButtons.map((but) => (
          <a key={but.name} href={but.href}  className={classNames(Styles.navButton , Styles.navSubButton)}> {but.name}</a>
        ))}
      </div>
    </div>
  );
};
