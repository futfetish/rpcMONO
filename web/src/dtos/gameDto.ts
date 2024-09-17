import { GameI } from "@/service/gameService";
import { userI } from "@/service/userService";

export interface GameDtoI {
    id : number,
    usersIds : number[]
    status : GameI['status']
    winnerId? : number
    ratingChange? : number
}

export class GameDto implements GameDtoI {
    id : number;
    ratingChange? : number;
    winnerId?: number;
    usersIds: number[];
    status: GameI['status']
    constructor(game : GameI) {
        this.id = game.id
        this.ratingChange = game.ratingChange
        this.winnerId = game.winnerId
        this.usersIds = game.users.map((user) => user.userId)
        this.status = game.status
    }
}