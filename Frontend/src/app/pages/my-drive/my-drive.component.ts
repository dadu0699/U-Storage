import { Component, OnInit } from '@angular/core';

import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-my-drive',
  templateUrl: './my-drive.component.html',
  styleUrls: ['./my-drive.component.scss']
})
export class MyDriveComponent implements OnInit {
  public isLoading: boolean;

  public renameFile: boolean;
  public uploadFile: boolean;
  public confirmDeletion: boolean;

  constructor(private _popupService: PopupService) {
    this.isLoading = true;

    this.renameFile = false;
    this.uploadFile = false;
    this.confirmDeletion = false;
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = false;

    this._popupService.renameFileStatus.subscribe(
      renameFile => this.renameFile = renameFile);

    this._popupService.uploadFileStatus.subscribe(
      uploadFile => this.uploadFile = uploadFile);

    this._popupService.confirmDeletionStatus.subscribe(
      confirmDeletion => this.confirmDeletion = confirmDeletion);
  }
}
