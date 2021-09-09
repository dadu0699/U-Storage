import { Component, Input, OnInit } from '@angular/core';

import { faFile, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment';

import { File } from 'src/app/models/file.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-file-item-grid',
  templateUrl: './file-item-grid.component.html',
  styleUrls: ['./file-item-grid.component.scss']
})
export class FileItemGridComponent implements OnInit {
  private isSingleClick: boolean;
  public isClicked: boolean;

  public faFile: IconDefinition;

  @Input() item!: File;

  constructor(
    private _itemService: ItemService,
  ) {
    this.isSingleClick = true;
    this.isClicked = false;

    this.faFile = faFile;
  }

  ngOnInit(): void {
    this._itemService.currentItemStatus.subscribe(
      currentItem => {
        if (currentItem) {
          if (currentItem.type === this.item.type
            && currentItem.fileID === this.item.fileID) {
            this.isClicked = true;
          }
        } else {
          this.isClicked = false;
        }
      });
  }

  public clickedItem(): void {
    this.isSingleClick = true;
    this._itemService.updateCurrentItem(undefined);

    setTimeout(() => {
      if (this.isSingleClick) {
        this._itemService.updateCurrentItem(this.item);
      }
    }, 225)
  }

  public goToItem(): void {
    this.isSingleClick = false;
    window.open(`${environment.bucket}/${this.item.thumbnail}`);
  }

  public getSRC(): string {
    return `${environment.bucket}/${this.item.thumbnail}`;
  }
}
