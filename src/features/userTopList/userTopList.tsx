import { UserServerClient } from "@/axios/server/userServer";
import { UserItem } from "@/components/userItem/userItem";
import { UserDtoI } from "@/dtos/userDto";
import { UserServiceClient } from "@/service/userService";
import { FC, useEffect, useState } from "react";
import Styles from "./userTopList.module.scss";

export const UserTopList: FC = () => {
  const [users, setUsers] = useState<UserDtoI[]>([]);

  const fetchUsers = async () => {
    const users = await UserServerClient.getTop100();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      {users.map((user, index) => (
        <UserItem key={user.id} user={user} index={index + 1} />
      ))}
    </div>
  );
};
