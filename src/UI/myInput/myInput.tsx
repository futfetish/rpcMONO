import { FC } from "react";
import Styles from './myInput.module.scss'
import classNames from "classnames";

interface props {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  placeholder? : string
  
}

export const MyInput: FC<props & Record<string , any>> = ({ value = "", onChange , error = '' , placeholder = '' , ...props}) => {
  return (
    <div className={Styles.box}>
      <input
      {...props}
      placeholder={placeholder}
      className= {classNames(Styles.myInput , (error!=='' ? Styles.onError : '' ))} 
        value={value}
        onChange={(e) => {
          if (onChange) {
            onChange(e.currentTarget.value);
          }
        }}
      />
        <p className={Styles.error}>{error}</p>
    </div>
  );
};
