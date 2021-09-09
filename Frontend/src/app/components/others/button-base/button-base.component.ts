import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-base',
  templateUrl: './button-base.component.html',
  styleUrls: ['./button-base.component.scss']
})
export class ButtonBaseComponent implements OnInit {
  @Input() classes: string[];
  @Input() loading: boolean;

  constructor() {
    this.classes = [];
    this.loading = false;
  }

  ngOnInit(): void { }
}
