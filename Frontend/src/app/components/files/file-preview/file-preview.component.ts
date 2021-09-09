import { Component, Input, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { File } from 'src/app/models/file.model';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit {
  @Input('detail') item!: File;

  constructor() { }

  ngOnInit(): void { }

  public canBePreview() {
    return this.item
      && ['image', 'audio', 'video'].includes(this.item.type);
  }

  public getSRC(): string {
    return `${environment.bucket}/${this.item.thumbnail}`;
  }
}
