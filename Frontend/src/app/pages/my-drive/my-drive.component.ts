import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-drive',
  templateUrl: './my-drive.component.html',
  styleUrls: ['./my-drive.component.scss']
})
export class MyDriveComponent implements OnInit {
  public isLoading: boolean;

  constructor() {
    this.isLoading = true;
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = false;
  }
}
