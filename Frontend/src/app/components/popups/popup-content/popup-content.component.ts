import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.scss']
})
export class PopupContentComponent implements OnInit {
  @Input() classes: string[];

  constructor() {
    this.classes = [];
  }

  ngOnInit(): void { }
}
