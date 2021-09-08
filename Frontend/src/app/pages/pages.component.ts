import { Component, HostListener, OnInit } from '@angular/core';

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

  constructor() {
    this.onResize();
    this.hiddenVignette = true;
  }

  ngOnInit(): void { }

  @HostListener('window:resize', ['$event'])
  public onResize(_event?: any) {
    const screenWidth: number = window.innerWidth;

    if (screenWidth > 960) { }
  }
}
