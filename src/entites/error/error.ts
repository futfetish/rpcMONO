export class Err extends Error {
  type: string;
  constructor(type: string, message: string) {
    super(message);
    this.type = type;
  }
  static authError(){
    return new Err('auth' , 'вы не авторизованы')
  }
}
