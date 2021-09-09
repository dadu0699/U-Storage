import { Component, HostListener, OnInit } from '@angular/core';

import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
    `
      .hidden-router {
        flex: 1 1 auto;
        display: flex;
        overflow: hidden;
      }
    `
  ]
})
export class PagesComponent implements OnInit {
  public hiddenVignette: boolean;

  constructor(private _popupService: PopupService) {
    this.onResize();
    this.hiddenVignette = true;
  }

  ngOnInit(): void {
    this._popupService.vignetteStatus.subscribe(
      vignette => this.hiddenVignette = vignette);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(_event?: any) {
    const screenWidth: number = window.innerWidth;

    if (screenWidth > 960) {
      this._popupService.updateMobileNavigationStatus(true);
    }
  }
}
