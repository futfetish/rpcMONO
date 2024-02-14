export class Err extends Error {
  type: string;
  _message: string;
  constructor(type: string, message: string) {
    super(message);
    this.type = type;
    this._message = message;
  }
  static authError(){
    return new Err('auth' , 'вы не авторизованы')
  }
}
