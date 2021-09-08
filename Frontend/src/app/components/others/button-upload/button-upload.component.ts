import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-upload',
  templateUrl: './button-upload.component.html',
  styleUrls: ['./button-upload.component.scss']
})
export class ButtonUploadComponent implements OnInit {
  @Input() classes: string[];
  public file!: File;

  constructor() {
    this.classes = [];
  }

  ngOnInit(): void { }

  public onChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
    }
  }
}
