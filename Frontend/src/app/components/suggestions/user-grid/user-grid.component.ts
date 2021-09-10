import { Component, Input, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {
  private isSingleClick: boolean;

  @Input() user!: User;

  constructor(
    private _userService: UserService,
  ) {
    this.isSingleClick = true;
  }

  ngOnInit(): void { }

  public getSRC(): string {
    return `${environment.bucket}/${this.user.photo.thumbnail}`;
  }

  public getFiles(): string {
    if (this.user.files === 1) {
      return '1 file';
    }
    return `${this.user.files} files`
  }

  public clickedItem(): void {
    this.isSingleClick = true;

    setTimeout(() => {
      if (this.isSingleClick) {
      }
    }, 225)
  }

  public async addFriend(): Promise<void> {
    this.isSingleClick = false;

    try {
      await this._userService.createFriendShip(this.user.userID);
      this._userService.reloadSuggestions();

    } catch (error) {
      console.log(error);
    }
  }
}
