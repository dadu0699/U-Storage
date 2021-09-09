import { Component, OnInit } from '@angular/core';

import { File } from 'src/app/models/file.model';
import { ItemService } from 'src/app/services/item.service';
import { PopupService } from 'src/app/services/popup.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss']
})
export class ConfirmDeletionComponent implements OnInit {
  public user!: User;
  public item: File | undefined;

  public errorMessage: string;
  public saving: boolean;

  constructor(
    private _itemService: ItemService,
    private _popupService: PopupService,
    private _userService: UserService,
  ) {
    this.getUser();

    this.errorMessage = '';
    this.saving = false;
  }

  ngOnInit(): void {
    this._itemService.currentItemStatus.subscribe(
      currentItem => {
        this.item = currentItem;
      }
    );
  }

  private getUser(): void {
    const user: User | undefined = this._userService.getUser();
    if (user !== undefined) this.user = user;
  }

  public closePopup(): void {
    if (!this.saving) {
      this._popupService.updateConfirmDeletionStatus();
    }
  }

  public async confirm(): Promise<void> { }
}
