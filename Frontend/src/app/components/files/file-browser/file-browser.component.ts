import { Component, OnInit } from '@angular/core';

import { File } from 'src/app/models/file.model';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {
  public fileInfoVisible: boolean;
  public fileInfoDetail: File | undefined;

  public data: File[];

  public isLoading: boolean;

  constructor() {
    this.fileInfoVisible = true;

    this.data = [];
    this.pushData();

    this.isLoading = true;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  public deselect(): void { }

  public isSearching(): boolean {
    return false;
  }

  public isEmpty(): boolean {
    return this.data.length == 0;
  }

  public pushData() {
    let file;
    for (let index = 0; index < 10; index++) {
      file = new File(index, `name-${index}`)
      file.type = 'image';
      file.mimetype = 'jpg';
      file.filesize = `${Math.random() * (25 - 1)}MB`;
      file.thumbnail =
        `https://picsum.photos/id/${Math.floor(Math.random() * (200 - 10)) + 10}/1920/1080`;
      if (index % 2 == 0) {
        file.shared = true;
      }
      this.data.push(file)
    }

    for (let index = 0; index < 10; index++) {
      file = new File(index * 10, `name-${index * 10}`)
      file.type = 'file';
      file.mimetype = 'pdf';
      file.filesize = `${Math.random() * (25 - 1)}MB`;
      if (index % 2 == 0) {
        file.shared = true;
      }
      this.data.push(file)
    }

    if (this.data.length > 0) {
      this.fileInfoDetail = this.data[0];
    }
  }
}
