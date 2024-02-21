import { UserServerClient } from "@/axios/server/userServer";
import { UserItem } from "@/components/user/userItem/userItem";
import { UserDtoI } from "@/dtos/userDto";
import { UserServiceClient } from "@/service/userService";
import { FC, useEffect, useState } from "react";
import Styles from "./userTopList.module.scss";
import { useQuery } from "react-query";

const fetchUsers = async () => {
  const users = await UserServerClient.getTop100();
  return users;
};

export const UserTopList: FC = () => {
  // const [users, setUsers] = useState<UserDtoI[]>([]);
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<UserDtoI[]>("users", fetchUsers , {keepPreviousData: true});

  if (isLoading) {
    return <div>loading....</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  if (!users) {
    return <div>нет игроков</div>;
  }

  return (
    <div className={Styles.box}>
      <div className={Styles.label}>
        <div>рейтинг</div>
      </div>
      {users.map((user, index) => (
        <UserItem key={user.id} user={user} index={index + 1} />
      ))}
    </div>
  );
};
