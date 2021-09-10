import { Component, OnInit } from '@angular/core';

import { File } from 'src/app/models/file.model';
import { FileService } from 'src/app/services/file.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-shared-browser',
  templateUrl: './shared-browser.component.html',
  styleUrls: ['./shared-browser.component.scss']
})
export class SharedBrowserComponent implements OnInit {
  public fileInfoVisible: boolean;
  public fileInfoDetail: File | undefined;

  public data: File[];

  public isLoading: boolean;

  constructor(
    private _itemService: ItemService,
    private _fileService: FileService,
  ) {
    this.fileInfoVisible = false;

    this.data = [];

    this.isLoading = true;
  }

  async ngOnInit(): Promise<void> {
    await this.getFiles();

    this._itemService.currentItemStatus.subscribe(
      currentFile => this.fileInfoDetail = currentFile
    );

    this._itemService.currentVisibleStatus.subscribe(
      fileInfoVisible => this.fileInfoVisible = fileInfoVisible
    );

    if (this._fileService.filesSubs === undefined) {
      this._fileService.filesSubs = this._fileService.
        filesEmitter.subscribe(async () => await this.getFiles());

      this._fileService.filesSubs = undefined;
    }
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

  public getDriveName(): string {
    const parentName: any = this.fileInfoDetail;
    return `${parentName['nickname']}´s storage`;
  }

  public async getFiles(): Promise<void> {
    this.isLoading = true;
    try {
      const response = await this._fileService.getSharedFiles();
      if (response['code'] === 200) {
        this.data = response['data'];
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
