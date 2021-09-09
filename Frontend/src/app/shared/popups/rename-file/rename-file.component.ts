import { Component, OnInit } from '@angular/core';

import { File } from 'src/app/models/file.model';
import { FileService } from 'src/app/services/file.service';
import { ItemService } from 'src/app/services/item.service';
import { PopupService } from 'src/app/services/popup.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rename-file',
  templateUrl: './rename-file.component.html',
  styleUrls: ['./rename-file.component.scss']
})
export class RenameFileComponent implements OnInit {
  public user!: User;
  public item: File | undefined;

  public fileName: string;
  public password: string;
  public errorMessage: {
    fileName?: string,
    password?: string
  };

  public saving: boolean;
  public shared: boolean;

  constructor(
    private _fileService: FileService,
    private _itemService: ItemService,
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
    this._itemService.currentItemStatus.subscribe(
      currentItem => {
        this.item = currentItem;
        this.fileName = this.item ? this.item.name : '';
        this.shared = this.item ? this.item.shared : false;
      }
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
      this._popupService.updateRenameFileStatus();
    }
  }

  public async renameFile(): Promise<void> {
    if (this.item && this.fileName && !this.saving) {
      this.saving = true;
      this.errorMessage = {};

      try {
        const data = {
          nickname: this.user.nickname,
          password: this.password,
          name: this.fileName,
          shared: this.shared,
          fileID: this.item.fileID,
        };

        await this._fileService.updateFile(data);

        this._popupService.updateRenameFileStatus();
        this._fileService.reloadFiles();

        this.item.name = this.fileName;
        this.item.shared = this.shared;
        this._fileService.updateCurrentItem(undefined);
        this.fileName = '';

      } catch (error) {
        const err: any = error;

        if (err['error']) {
          const code = err['error']['code'];
          const response = err['error']['data'];

          if (code === 404) {
            this.errorMessage.password = response;
          } else if (code === 500) {
            if (response['sqlMessage'].includes('Duplicate')) {
              this.errorMessage.fileName = 'The file already exists';
            }
          }
        }

      } finally {
        this.saving = false;

      }
    }
  }
}
