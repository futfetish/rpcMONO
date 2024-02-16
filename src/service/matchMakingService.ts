import { UserDto, UserDtoI } from "@/dtos/userDto";

class UserLinkedList {
  data: UserDtoI;
  next: UserLinkedList | null;
  pre: UserLinkedList | null;
  constructor(
    data: UserDtoI,
    next: UserLinkedList | null = null,
    pre: UserLinkedList | null = null
  ) {
    this.data = data;
    this.next = next;
    this.pre = pre;
  }
}

interface MatchMakingServiceI {
  users: UserLinkedList | null;
  createGame: (firstUser: UserLinkedList, secondUser: UserLinkedList) => void;
  join: (user: UserDtoI) => void;
}

class MatchMakingService implements MatchMakingServiceI {
  users: UserLinkedList | null = null;
  createGame(firstUser: UserLinkedList, secondUser: UserLinkedList) {
    if (firstUser.pre instanceof UserLinkedList) {
      firstUser.pre.next = secondUser.next;
      secondUser.next = firstUser.pre;
    } else {
      secondUser.next = null;
    }
    //creating game
  }

  join(user: UserDtoI) {
    let userL
    if (this.users instanceof UserLinkedList) {
      let temp = this.users;
      if (temp.data.rating > user.rating) {
        userL = new UserLinkedList(user, this.users);
        temp.pre = userL;
        this.users = userL;
      } else {
        while (temp.next && temp.next.data.rating < user.rating) {
          temp = temp.next;
        }
        userL = new UserLinkedList(user);
        if (temp.next) {
          temp.next.pre = userL;
          temp.next = userL;
        } else {
          temp.next = userL;
        }
      }
    } else{
        userL = new UserLinkedList(user)
        this.users = userL
    }
    
    const left = userL.pre
    const right = userL.next
    let ratingRange = 300
    let candidate 

    if(left instanceof UserLinkedList){
        const leftRatingRange = Math.abs(user.rating - left.data.rating)
        if (leftRatingRange <= 300){
           candidate = 'left'
           ratingRange = leftRatingRange
        }
    }

    if(right instanceof UserLinkedList){
        if (Math.abs(user.rating - right.data.rating) < ratingRange){
           candidate = 'right' 
        }
    }

    if(candidate){
        if(candidate === 'left'){
           this.createGame(left! , userL)  
        } else{
            this.createGame( userL , right!)   
        }
    }
  }
}
