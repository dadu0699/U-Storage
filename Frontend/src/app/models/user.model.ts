export class User {
  public uniqueID!: number;
  public nickname: string;
  public mail: string;
  public password!: string;
  public photo: string;

  constructor() {
    this.nickname = '';
    this.mail = '';
    this.photo = '';
  }
}
