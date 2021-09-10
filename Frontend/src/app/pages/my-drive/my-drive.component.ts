import { Component, OnDestroy, OnInit } from '@angular/core';

import { FileService } from 'src/app/services/file.service';
import { ItemService } from 'src/app/services/item.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-my-drive',
  templateUrl: './my-drive.component.html',
  styleUrls: ['./my-drive.component.scss']
})
export class MyDriveComponent implements OnInit, OnDestroy {
  public isLoading: boolean;

  public renameFile: boolean;
  public uploadFile: boolean;
  public confirmDeletion: boolean;

  constructor(
    private _fileService: FileService,
    private _itemService: ItemService,
    private _popupService: PopupService,
  ) {
    this.isLoading = true;

    this.renameFile = false;
    this.uploadFile = false;
    this.confirmDeletion = false;
  }

  ngOnInit(): void {
    this.isLoading = false;

    this._popupService.renameFileStatus.subscribe(
      renameFile => this.renameFile = renameFile);

    this._popupService.uploadFileStatus.subscribe(
      uploadFile => this.uploadFile = uploadFile);

    this._popupService.confirmDeletionStatus.subscribe(
      confirmDeletion => this.confirmDeletion = confirmDeletion);
  }

  ngOnDestroy(): void {
    this._popupService.closeAll();
    this._itemService.updateCurrentItem(undefined);
    this._itemService.updateVisibleStatus(false);
    this._fileService.updateCurrentItem(undefined);
  }
}
