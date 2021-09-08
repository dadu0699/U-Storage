import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-message',
  templateUrl: './empty-message.component.html',
  styleUrls: ['./empty-message.component.scss']
})
export class EmptyMessageComponent implements OnInit {
  @Input() message: string;
  @Input() icon: string;

  constructor() {
    this.message = '';
    this.icon = 'eye-off';
  }

  ngOnInit(): void { }
}
