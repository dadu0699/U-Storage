import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() placeholder: string;
  public data: string;

  constructor(private _itemService: ItemService) {
    this.placeholder = 'Search ...';
    this.data = '';
  }

  ngOnInit(): void {
    this._itemService.updateSearchStatus('');
  }

  ngOnDestroy(): void {
    this._itemService.updateSearchStatus('');
  }

  dataChange(value: string): void {
    this.data = value;
    this._itemService.updateSearchStatus(this.data);
  }

  public isQuery() {
    return this.data !== '';
  }

  public resetQuery() {
    this.data = '';
    this._itemService.updateSearchStatus(this.data);
  }
}
