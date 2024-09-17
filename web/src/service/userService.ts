import { DB } from "@/db";
import { UserDtoI } from "@/dtos/userDto";

export interface userI {
  id: number;
  name: string;
  password: string;
  rating : number
}

interface UserServiceI {
  create: (name: string, password: string) => Promise<userI>;
  getTop100: () => Promise<UserDtoI[]>
}

class UserService implements UserServiceI {
  async create(name: string, password: string) {
    const user = await DB.user.create({
      data: { name, password },
    });
    return user;
  }

  async getTop100(){
    const top100Users = await DB.user.findMany({
      take: 100,
      orderBy: {
        rating: 'desc',
      },
      select : {
        name : true,
        rating : true,
        id : true,
      }
    });
    return top100Users
  }
}

export const UserServiceClient = new UserService();
