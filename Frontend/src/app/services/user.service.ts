import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL: string;
  private friendshipURL: string;
  private user!: User;

  public usersEmitter: EventEmitter<any>;
  public usersSubs!: Subscription | undefined;

  constructor(private _httpClient: HttpClient) {
    this.userURL = `${environment.url}/user`;
    this.friendshipURL = `${environment.url}/friendship`;

    this.usersEmitter = new EventEmitter();
  }

  public async signIn(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(`${this.userURL}/sign-in`, json, { headers })
      .toPromise();
  }

  public async signUp(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(`${this.userURL}/sign-up`, json, { headers })
      .toPromise();
  }

  public getUser(): User | undefined {
    const user: string | null = localStorage.getItem('user');
    if (user !== null) return <User>JSON.parse(user);
    return undefined;
  }

  private currentUser(): void {
    const user: User | undefined = this.getUser();
    if (user !== undefined) {
      this.user = user;
    };
  }

  public async profile(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(`${this.userURL}/profile`, json, { headers })
      .toPromise();
  }

  public reloadSuggestions(): void {
    this.usersEmitter.emit();
  }

  public async getUserSuggestions(): Promise<any> {
    this.currentUser();
    const params = new HttpParams().set('userID', this.user.userID);

    return await this._httpClient.get(`${this.friendshipURL}/suggestion`, { params })
      .toPromise();
  }

  public async createFriendShip(friendID: number): Promise<any> {
    this.currentUser();
    const json = JSON.stringify({ userID: this.user.userID, friendID });
    console.log(json);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(this.friendshipURL, json, { headers })
      .toPromise();
  }
}
