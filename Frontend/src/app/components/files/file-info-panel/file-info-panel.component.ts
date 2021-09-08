import { Component, Input, OnInit } from '@angular/core';

import { File } from 'src/app/models/file.model';

@Component({
  selector: 'app-file-info-panel',
  templateUrl: './file-info-panel.component.html',
  styleUrls: ['./file-info-panel.component.scss']
})
export class FileInfoPanelComponent implements OnInit {
  @Input('detail') item!: File;
  @Input() parentName: string;

  constructor() {
    this.parentName = '';
  }

  ngOnInit(): void { }
}
