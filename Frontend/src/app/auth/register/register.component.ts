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
    photo?: string,
    password?: string
  };

  public icon: IconDefinition;
  public loading: boolean;
  public visible: boolean;

  public user: User;
  public photo!: File;
  public photoSelected!: string | ArrayBuffer | null;
  public imagePreview: string;

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
    this.visible = true;

    this.user = new User();
    this.imagePreview = 'https://johannesippen.com/img/blog/humans-not-users/header.jpg';
  }

  ngOnInit(): void { }

  public onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.photo = <File>event.target.files[0];

      // Image Preview and base64
      const reader = new FileReader();
      reader.readAsDataURL(this.photo);
      reader.onload = () => {
        this.photoSelected = reader.result;

        if (typeof reader.result === 'string') {
          this.user.photo.base64 = reader.result.split('?')[0].split('base64,').pop() || '';
        }
      };
    }
  }

  public async signup(): Promise<void> {
    if (!this.photoSelected) {
      // this.errorMessage.photo = 'You need a profile photo';
      this.errorMessage.photo = 'Your photo is being processed';
      return;
    }

    this.errorMessage = {};
    this.loading = true;

    try {
      const mimetype = this.photo.name.split('?')[0].split('.').pop();
      if (mimetype === undefined || !this.user.photo.imageTypes().includes(mimetype)) {
        this.errorMessage.photo = 'Unsupported file type';
        this.loading = false;
        return;
      }

      this.user.photo.mimetype = mimetype;
      this.user.photo.assignType();

      const response = await this._userService.signUp(this.user);
      if (response['code'] === 200) {
        this.user = <User>response['data'];
        localStorage.setItem('user', JSON.stringify(this.user));
        this._router.navigate(['/drive']);
      }

    } catch (error) {
      const err: any = error;

      if (err['error']) {
        const code = err['error']['code'];
        const response = err['error']['data'];

        if (code === 400) {
          this.errorMessage.password = response;

        } else if (code === 500) {
          if (response['sqlMessage'].includes('nickname')) {
            this.errorMessage.nickname = 'Someone already has that nickname';
          }

          if (response['sqlMessage'].includes('email')) {
            this.errorMessage.email = 'Someone already has that email';
          }
        }

        this.visible = !this.visible;
      }
    }

    this.loading = false;
  }
}
