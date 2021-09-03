import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public errorMessage: {
    nickname?: string,
    password?: string
  };

  public icon: IconDefinition;
  public loading: boolean;

  public user: User;

  constructor(
    private _router: Router,
    private _userService: UserService,
  ) {
    if (this._userService.getUser() !== undefined) {
      this._router.navigate(['/']);
    }

    this.errorMessage = {};
    this.icon = faChevronRight;
    this.loading = false;

    this.user = new User();
  }

  ngOnInit(): void { }

  public async signin(): Promise<void> {
    this.errorMessage = {};
    this.loading = true;

    try {

    } catch (error) {
      console.log(error);

    }

    this.loading = false;
  }
}
