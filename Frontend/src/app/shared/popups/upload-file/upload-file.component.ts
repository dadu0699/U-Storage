import { Component, OnInit } from '@angular/core';

import { PopupService } from 'src/app/services/popup.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  public user!: User;
  public fileName: string;
  public errorMessage: {
    fileName?: string,
    password?: string
  };

  public saving: boolean;
  public shared: boolean;

  constructor(
    private _userService: UserService,
    private _popupService: PopupService,
  ) {
    this.getUser();
    this.fileName = '';
    this.errorMessage = {};

    this.saving = false;
    this.shared = false;
  }

  ngOnInit(): void { }

  private getUser(): void {
    const user: User | undefined = this._userService.getUser();
    if (user !== undefined) this.user = user;
  }

  public toShared(): void {
    this.shared = !this.shared;
  }

  public closePopup(): void {
    if (!this.saving) {
      this.fileName = '';
      this.errorMessage = {};
      this._popupService.updateUploadFileStatus();
    }
  }

  public async uploadFile(): Promise<void> { }
}
