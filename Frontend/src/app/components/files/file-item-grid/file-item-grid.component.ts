import { Component, Input, OnInit } from '@angular/core';

import { faFile, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment';

import { File } from 'src/app/models/file.model';

@Component({
  selector: 'app-file-item-grid',
  templateUrl: './file-item-grid.component.html',
  styleUrls: ['./file-item-grid.component.scss']
})
export class FileItemGridComponent implements OnInit {
  private isSingleClick: boolean;
  public isClicked: boolean;

  public faFile: IconDefinition;

  @Input() item!: File;

  constructor() {
    this.isSingleClick = true;
    this.isClicked = false;

    this.faFile = faFile;
  }

  ngOnInit(): void { }

  public clickedItem(): void {
    this.isSingleClick = true;

    setTimeout(() => {
      if (this.isSingleClick) {
      }
    }, 225)
  }

  public goToItem(): void {
    this.isSingleClick = false;
  }

  public getSRC(): string {
    // return `${environment.bucket}/${this.item.thumbnail}`;
    return `${this.item.thumbnail}`;
  }
}
