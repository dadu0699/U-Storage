import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemService } from 'src/app/services/item.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _popupService: PopupService,
    private _itemService: ItemService,
  ) { }

  ngOnInit(): void { }

  public logOut(): void {
    localStorage.clear();

    this._popupService.closeAll();
    this._itemService.updateCurrentItem(undefined);

    this._router.navigate(['/auth']);
  }
}
