import { Component, OnInit } from '@angular/core';

import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-toolbar-button-upload',
  templateUrl: './toolbar-button-upload.component.html',
  styleUrls: ['./toolbar-button-upload.component.scss']
})
export class ToolbarButtonUploadComponent implements OnInit {
  public file!: File;

  constructor(
    private _popupService: PopupService,
  ) { }

  ngOnInit(): void { }

  public onChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      this._popupService.updateUploadFileStatus();
    }
  }
}
