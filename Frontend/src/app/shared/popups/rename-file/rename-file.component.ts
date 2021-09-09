import { Component, OnInit } from '@angular/core';

import { File } from 'src/app/models/file.model';
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
  public errorMessage: {
    fileName?: string,
    password?: string
  };

  public saving: boolean;
  public shared: boolean;

  constructor(
    private _itemService: ItemService,
    private _popupService: PopupService,
    private _userService: UserService,
  ) {
    this.getUser();
    this.fileName = '';
    this.errorMessage = {};

    this.saving = false;
    this.shared = false;
  }

  ngOnInit(): void {
    this._itemService.currentItemStatus.subscribe(
      currentItem => {
        this.item = currentItem;
        this.fileName = this.item ? this.item.name : '';
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

  public async renameFile(): Promise<void> { }
}
