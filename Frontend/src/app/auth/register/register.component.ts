import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public errorMessage: {
    nickname?: string,
    email?: string,
    birthday?: string,
    password?: string
  };

  public icon: IconDefinition;
  public loading: boolean;

  public user: User;
  public confirmPassword: string;

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
    this.confirmPassword = '';
  }

  ngOnInit(): void { }

  public async signup(): Promise<void> {
    this.errorMessage = {};
    this.loading = true;

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage.password = 'The password confirmation does not match';
      this.loading = false;
      return;
    }

    try {


    } catch (error) {
      console.log(error);

    }

    this.loading = false;
  }
}
