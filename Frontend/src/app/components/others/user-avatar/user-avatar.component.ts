import { Component, Input, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  public user: User;
  public profilePicture: string;
  @Input() classes: string[];

  constructor(private _userService: UserService) {
    this.user = new User();
    this.classes = [];

    this.profilePicture = `${environment.bucket}/`;
    this.getUser();
  }

  ngOnInit(): void { }

  private async getUser(): Promise<void> {
    const user: User | undefined = this._userService.getUser();
    if (user !== undefined) this.user = user;
    this.profilePicture += this.user.photo.thumbnail;
  }
}
