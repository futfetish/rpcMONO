import { UserDtoI } from "@/dtos/userDto";
import { $api } from "../api";

interface UserServerI{
    getTop100 : () => Promise<UserDtoI[]>
}

class UserServer implements UserServerI{
    async getTop100() {
        const data = await $api.get('/users/top')
        return data.data.users
    }
}

export const UserServerClient =  new UserServer()