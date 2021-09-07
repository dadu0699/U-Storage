import { Component, Input, OnInit } from '@angular/core';

import { faSyncAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {
  @Input() text: string;
  @Input() loading: boolean;
  @Input() icon!: IconDefinition;

  public faSyncAlt: IconDefinition;

  constructor() {
    this.text = '';
    this.loading = false;

    this.faSyncAlt = faSyncAlt;
  }

  ngOnInit(): void { }
}
