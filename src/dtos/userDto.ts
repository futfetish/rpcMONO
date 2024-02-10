import { userI } from "@/entites/user/userController";

export interface UserDtoI {
    name : string,
    id : number,
}

export class UserDto implements UserDtoI {
    name : string;
    id : number;
    constructor(user : userI) {
        this.id = user.id
        this.name = user.name
    }
}