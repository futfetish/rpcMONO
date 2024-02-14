import { FC, ReactNode } from "react";
import Styles from "./myButton.module.scss";
import classNames from "classnames";

interface props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const MyButton: FC<props> = ({
    children,
    onClick,
    disabled = false,
  ...props
}) => {
  return (
    <div>
        <button className={ classNames(Styles.myButton)} {...props} disabled={disabled} onClick={() => {
            if(onClick){
                onClick()
            }
        }}>
            {children}
        </button>
    </div>
  );
};
