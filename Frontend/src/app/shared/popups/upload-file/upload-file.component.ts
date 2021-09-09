import { Component, OnInit } from '@angular/core';

import { delay } from 'src/app/utils/shared-functions';
import { File as MFile } from 'src/app/models/file.model';
import { FileService } from 'src/app/services/file.service';
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
  public file: File | undefined;
  public fileName: string;
  public password: string
  public errorMessage: {
    file?: string,
    fileName?: string,
    password?: string
  };

  public saving: boolean;
  public shared: boolean;

  constructor(
    private _fileService: FileService,
    private _popupService: PopupService,
    private _userService: UserService,
  ) {
    this.getUser();
    this.fileName = '';
    this.password = '';
    this.errorMessage = {};

    this.saving = false;
    this.shared = false;
  }

  ngOnInit(): void {
    this._fileService.currentFileStatus.subscribe(
      currentItem => this.file = currentItem
    );
  }

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

  public async uploadFile(): Promise<void> {
    if (!this.file) {
      this.errorMessage.file = 'The file is being processed';
      return;
    }

    const mimetype = this.file.name.split('?')[0].split('.').pop();
    if (mimetype === undefined) {
      this.errorMessage.fileName = 'Unsupported file type';
      return;
    }

    if (this.fileName && !this.saving) {
      this.saving = true;
      this.errorMessage = {};

      try {
        const file: MFile = new MFile(0, this.fileName);

        file.mimetype = mimetype;
        file.assignType();
        file.assignSize(this.file.size);
        file.shared = this.shared;

        this.getBase64(file);
        await delay(750);

        await this._fileService.uploadFile(this.user.nickname,
          this.password, file);

        this._popupService.updateUploadFileStatus();
        this._fileService.reloadFiles();
        this.fileName = '';

      } catch (error) {
        const err: any = error;

        if (err['error']) {
          const code = err['error']['code'];
          const response = err['error']['data'];

          if (code === 500 && response['errno'] === 1063) {
            this.errorMessage.fileName = 'The file already exists';
          }
        }

      } finally {
        this.saving = false;

      }
    }
  }

  private async getBase64(file: MFile): Promise<void> {
    const reader = new FileReader();

    if (this.file) {
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          file.base64 = reader.result.split('?')[0].split('base64,').pop() || '';
        }
      };
    }
  }
}
