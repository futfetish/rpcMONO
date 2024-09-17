import { userI } from "@/service/userService";

export interface UserDtoI {
    name : string,
    id : number,
    rating : number
}

export class UserDto implements UserDtoI {
    name : string;
    id : number;
    rating : number;
    constructor(user : userI) {
        this.id = user.id
        this.name = user.name
        this.rating = user.rating
    }
}