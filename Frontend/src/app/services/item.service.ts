import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { File } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private item: BehaviorSubject<File | undefined>;
  public currentItemStatus: Observable<File | undefined>;

  private visible: BehaviorSubject<boolean>;
  public currentVisibleStatus: Observable<boolean>;

  private search: BehaviorSubject<string>;
  public currentSearchStatus: Observable<string>;

  constructor() {
    this.item = new BehaviorSubject<File | undefined>(undefined);
    this.currentItemStatus = this.item.asObservable();

    this.visible = new BehaviorSubject<boolean>(false);
    this.currentVisibleStatus = this.visible.asObservable();

    this.search = new BehaviorSubject<string>('');
    this.currentSearchStatus = this.search.asObservable();
  }

  public updateCurrentItem(item: File | undefined): void {
    this.item.next(item);
  }

  public updateVisibleStatus(close?: boolean): void {
    if (close !== undefined) {
      this.visible.next(close);
    } else {
      this.visible.next(!this.visible.value);
    }
  }

  public updateSearchStatus(data: string): void {
    this.search.next(data);
  }
}
