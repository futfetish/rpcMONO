import { UserDtoI } from "@/dtos/userDto";
import { FC } from "react";
import Styles from "./userItem.module.scss";
import classNames from "classnames";
interface props {
  user: UserDtoI;
  index: number;
}

export const UserItem: FC<props> = ({ user, index }) => {
  return (
    <a href={"/users/" + user.id} className={Styles.box}>
      <p
        className={classNames(
          Styles.rank,
          index <= 1 ? Styles.top1 : index <= 10 ? Styles.top10 : ''
        )}
      >
        {index}
      </p>
      <strong className={Styles.name}> {user.name} </strong>
      <p className={Styles.rating}>{user.rating}</p>
    </a>
  );
};
