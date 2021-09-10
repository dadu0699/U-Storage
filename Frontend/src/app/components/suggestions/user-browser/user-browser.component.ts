import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-browser',
  templateUrl: './user-browser.component.html',
  styleUrls: ['./user-browser.component.scss']
})
export class UserBrowserComponent implements OnInit {
  public data: User[];
  public isLoading: boolean;

  constructor(
    private _userService: UserService,
  ) {
    this.data = [];
    this.isLoading = true;
  }

  async ngOnInit(): Promise<void> {
    await this.getUsers();

    if (this._userService.usersSubs === undefined) {
      this._userService.usersSubs = this._userService.
        usersEmitter.subscribe(async () => await this.getUsers());

      this._userService.usersSubs = undefined;
    }
  }

  public isSearching(): boolean {
    return false;
  }

  public isEmpty(): boolean {
    return this.data.length == 0;
  }

  public async getUsers(): Promise<void> {
    this.isLoading = true;
    try {
      const response = await this._userService.getUserSuggestions();
      if (response['code'] === 200) {
        this.data = [];

        response['data'].forEach((element: any) => {
          this.data.push(<User>{
            userID: element['userID'],
            nickname: element['nickname'],
            files: element['files'],
            photo: {
              thumbnail: element['photo']
            },
          });
        });
      }

    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
