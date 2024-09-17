import { FC, ReactNode } from "react";
import Styles from "./myA.module.scss";
import classNames from "classnames";

interface props {
  children: ReactNode;
  href?: string;
  subButtons?: { name: string; href: string }[];
}

export const MyA: FC<props & Record<string , any>> = ({
  children,
  href = "#",
  subButtons = [],
  ...props
}) => {
  return (
    <a className={classNames(Styles.myA)} {...props} href={href}>
      {children}
    </a>
  );
};
