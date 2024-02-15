import { UserTopList } from "@/features/userTopList/userTopList";
import { FC } from "react";
import Styles from "@/styles/userTop.module.scss";

const Users: FC = () => {
  return (
    <div className={Styles.box}>
      <div className={Styles.content}>
        <div className={Styles.top}>
             <h1>Лучшие игроки</h1>
        </div>
       
        <div className={Styles.label}>
          <div>рейтинг</div>
        </div>

        <UserTopList />
      </div>
    </div>
  );
};

export default Users;
