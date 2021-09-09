import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';

import { File as MFile } from '../models/file.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public url: string;
  private user!: User;

  private file: BehaviorSubject<File | undefined>;
  public currentFileStatus: Observable<File | undefined>;

  public filesEmitter: EventEmitter<any>;
  public filesSubs!: Subscription | undefined;

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService,
  ) {
    this.url = `${environment.url}/file`;

    this.file = new BehaviorSubject<File | undefined>(undefined);
    this.currentFileStatus = this.file.asObservable();

    this.filesEmitter = new EventEmitter();
  }

  public updateCurrentItem(file: File | undefined): void {
    this.file.next(file);
  }

  public reloadFiles(): void {
    this.filesEmitter.emit();
  }

  private getUser(): void {
    const user: User | undefined = this._userService.getUser();
    if (user !== undefined) {
      this.user = user;
    };
  }

  public async getFiles(): Promise<any> {
    this.getUser();

    const params = new HttpParams()
      .set('userID', this.user.userID);

    return await this._httpClient.get(this.url, { params })
      .toPromise();
  }

  public async uploadFile(nickname: string, password: string,
    file: MFile): Promise<any> {

    const json = JSON.stringify({ nickname, password, file });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(this.url, json, { headers })
      .toPromise();
  }
}
