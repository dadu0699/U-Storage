import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder: string;
  public data: string;

  constructor() {
    this.placeholder = 'Search ...';
    this.data = '';
  }

  ngOnInit(): void { }

  public isQuery() {
    return this.data !== '';
  }

  public resetQuery() {
    this.data = '';
  }
}
