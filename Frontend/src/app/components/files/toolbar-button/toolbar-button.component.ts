import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-button',
  templateUrl: './toolbar-button.component.html',
  styleUrls: ['./toolbar-button.component.scss']
})
export class ToolbarButtonComponent implements OnInit {
  @Input() action: string;
  @Input() source: string;
  @Input() isInactive: boolean;
  @Input() isActive: boolean;

  constructor() {
    this.source = '';
    this.action = '';
    this.isInactive = false;
    this.isActive = false;
  }

  ngOnInit(): void { }
}
