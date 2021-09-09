import { Component, OnInit } from '@angular/core';

import { File } from 'src/app/models/file.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {
  public fileInfoVisible: boolean;
  public fileInfoDetail: File | undefined;

  public data: File[];

  public isLoading: boolean;

  constructor(
    private _itemService: ItemService,
  ) {
    this.fileInfoVisible = true;

    this.data = [];

    this.isLoading = true;
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = false;

    this._itemService.currentItemStatus.subscribe(
      currentFile => this.fileInfoDetail = currentFile
    );

    this._itemService.currentVisibleStatus.subscribe(
      fileInfoVisible => this.fileInfoVisible = fileInfoVisible
    );
  }

  public deselect(): void {
    this._itemService.updateCurrentItem(undefined);
  }

  public isSearching(): boolean {
    return false;
  }

  public isEmpty(): boolean {
    return this.data.length == 0;
  }
}
