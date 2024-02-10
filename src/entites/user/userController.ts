import { DB } from "@/db";

export interface userI {
  id: number;
  name: string;
  password: string;
}

interface UserControlerI {
  create: (name: string, password: string) => Promise<userI>;
}

class UserController implements UserControlerI {
  async create(name: string, password: string) {
    const user = await DB.user.create({
      data: { name, password },
    });
    return user;
  }
}

export const UserControlerClient = new UserController();
