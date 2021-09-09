import { Component, OnInit } from '@angular/core';

import { FileService } from 'src/app/services/file.service';
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
    private _fileService: FileService,
  ) { }

  ngOnInit(): void { }

  public onChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];


      this._fileService.updateCurrentItem(this.file);
      this._popupService.updateUploadFileStatus();
    }
  }
}
