import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void { }

  public logOut(): void {
    localStorage.clear();

    // this._popupService.closeAll();
    // this._itemService.updateCurrentItem(undefined);

    this._router.navigate(['/auth']);
  }
}
