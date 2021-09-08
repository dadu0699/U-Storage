import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop-toolbar',
  templateUrl: './desktop-toolbar.component.html',
  styleUrls: ['./desktop-toolbar.component.scss']
})
export class DesktopToolbarComponent implements OnInit {
  @Input('name') routeName: string;
  @Input() placeholderSearch: string;

  public isActiveInfo: boolean;

  constructor(
    private _router: Router,
  ) {
    this.routeName = '';
    this.placeholderSearch = 'Search ...';

    this.isActiveInfo = false;
  }

  ngOnInit(): void { }

  public navigate(): void {
    this._router.navigate(['/files']);
  }

  public infoVisible(): void {
    this.isActiveInfo = !this.isActiveInfo;
  }
}
