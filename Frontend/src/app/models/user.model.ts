import { File } from "./file.model";

export class User {
  public userID!: number;
  public nickname: string;
  public email: string;
  public password?: string;
  public confirmPassword?: string;
  public photo: File;

  public files!: number;

  constructor() {
    this.nickname = '';
    this.email = '';
    this.photo = new File(0, '');
  }
}
