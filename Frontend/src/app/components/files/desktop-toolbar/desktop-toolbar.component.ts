import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { File } from 'src/app/models/file.model';
import { ItemService } from 'src/app/services/item.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-desktop-toolbar',
  templateUrl: './desktop-toolbar.component.html',
  styleUrls: ['./desktop-toolbar.component.scss']
})
export class DesktopToolbarComponent implements OnInit {
  public item: File | undefined;

  @Input('name') routeName: string;
  @Input() placeholderSearch: string;

  public isActiveInfo: boolean;

  constructor(
    private _router: Router,
    private _popupService: PopupService,
    private _itemService: ItemService,
  ) {
    this.routeName = '';
    this.placeholderSearch = 'Search ...';

    this.isActiveInfo = false;
  }

  async ngOnInit(): Promise<void> {
    this._itemService.currentItemStatus.subscribe(
      currentItem => this.item = currentItem
    );

    this._itemService.currentVisibleStatus.subscribe(
      visibleStatus => this.isActiveInfo = visibleStatus
    );
  }

  public navigate(): void {
    this._router.navigate(['/files']);
  }

  public renameFile(): void {
    if (this.item) {
      this._popupService.updateRenameFileStatus();
    }
  }

  public confirmDeletion(): void {
    if (this.item) {
      this._popupService.updateConfirmDeletionStatus();
    }
  }

  public infoVisible(): void {
    this._itemService.updateVisibleStatus();
  }
}
