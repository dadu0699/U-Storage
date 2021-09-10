import { Component, OnDestroy, OnInit } from '@angular/core';

import { FileService } from 'src/app/services/file.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.scss']
})
export class SharedWithMeComponent implements OnInit, OnDestroy {
  public isLoading: boolean;

  constructor(
    private _fileService: FileService,
    private _itemService: ItemService,
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this._itemService.updateCurrentItem(undefined);
    this._itemService.updateVisibleStatus(false);
    this._fileService.updateCurrentItem(undefined);
  }
}
