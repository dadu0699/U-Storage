import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-info-item',
  templateUrl: './list-info-item.component.html',
  styleUrls: ['./list-info-item.component.scss']
})
export class ListInfoItemComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;

  constructor() {
    this.title = '';
    this.content = '';
  }

  ngOnInit(): void { }
}
