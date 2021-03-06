import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss']
})
export class EmptyPageComponent implements OnInit {
  @Input() isLoading: boolean;
  @Input() isEmpty: boolean;

  constructor() {
    this.isLoading = false;
    this.isEmpty = false;
  }

  ngOnInit(): void { }
}
