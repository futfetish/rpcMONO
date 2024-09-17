import axios from "axios";
import { moveCursor } from "readline";
import { Server, Socket } from "socket.io";

const API_URL = "http://localhost:3000/api";

interface UserDtoI {
  name: string;
  id: number;
  rating: number;
}


type moveI  =  "rock" | "scissors" | "paper" | null


interface GameI{
  id : number;
  users : { id : number ,move : moveI }[];

}

interface MatchMakingServiceI {
  users: UserDtoI[];
  games: GameI[]
  createGame: (firstUserId: number, secondUserId: number) => void;
  join: (user: UserDtoI) => void;
  leave: (userId: number) => void;
  move : (userId : number , gameId : number , move : moveI) => void
}

export class MatchMakingService implements MatchMakingServiceI {
  socket: Server;
  users: UserDtoI[] = [];
  games: GameI[] = []

  constructor(socket: Server) {
    this.socket = socket;
  }
  async createGame(firstUserId: number, secondUserId: number) {
    this.users = this.users.filter((u) => u.id !== firstUserId && u.id !== secondUserId);
    //creating game
    console.log("creating game");
    const data = await axios.post<{ id: number }>(`${API_URL}/game/create`, {
      ids: [firstUserId, secondUserId],
    });
    this.games.push({id : data.data.id, users : [ {id : firstUserId , move : null} , {id : secondUserId , move : null} ]})
    this.socket
      .to("user" + firstUserId)
      .emit("matchFind", { id: data.data.id });
    this.socket
      .to("user" + secondUserId)
      .emit("matchFind", { id: data.data.id });
  }

  join(user: UserDtoI) {

    this.users = this.users.filter((u) => u.id !== user.id);

    let l = 0;
    let r = this.users.length - 1;

    while (l <= r) {
      let mid = Math.floor((l + r) / 2);
      if (this.users[mid].rating <= user.rating) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    this.users.splice(l, 0, user);
    
    console.log(this.users.map((u) => ({id : u.id , rating: u.rating})))

    const left = this.users[l - 1];
    const right = this.users[l + 1];
    let ratingRange = 300;
    let candidate;

    if (left) {
      const leftRatingRange = Math.abs(user.rating - left.rating);
      if (leftRatingRange <= ratingRange) {
        candidate = "left";
        ratingRange = leftRatingRange;
      }
    }

    if (right) {
      if (Math.abs(user.rating - right.rating) <= ratingRange) {
        candidate = "right";
      }
    }

    if (candidate) {
      if (candidate === "left") {
        this.createGame(left!.id, user.id);
      } else {
        this.createGame(user.id, right!.id);
      }
    }
    // this.createGame(user.id , 13)
  }

  leave(userId: number) {
    this.users = this.users.filter((u) => u.id !== userId);
    console.log(this.users.map((u) => ({id : u.id , rating: u.rating})))
  }

  async move(userId : number, gameId : number , move : moveI){
    const game = this.games.find((g) => g.id == gameId)
    if(!game) return
    let user = game.users.find((u) => u.id = userId)
    if(!user) return
    user.move = move
    console.log(this.games)
    if (game.users[0].move !== null && game.users[1].move !== null){
      console.log('results')
      this.socket.to('game'+gameId).emit( 'gameResult' ,game.users.map((u) => ({id : u.id , move : u.move})))
      this.games = this.games.filter((g) => g.id !== gameId)
      await axios.post(`${API_URL}/game/close` , {id : gameId})
    }
  }
}
