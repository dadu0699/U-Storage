import { Component, Input, OnInit } from '@angular/core';

import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-popup-header',
  templateUrl: './popup-header.component.html',
  styleUrls: ['./popup-header.component.scss']
})
export class PopupHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;

  constructor(
    private _popupService: PopupService,
  ) {
    this.title = '';
    this.icon = '';
  }

  ngOnInit(): void { }

  public close(): void {
    this._popupService.closeAll();
  }
}
