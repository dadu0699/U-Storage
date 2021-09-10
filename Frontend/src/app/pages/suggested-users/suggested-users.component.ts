import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggested-users',
  templateUrl: './suggested-users.component.html',
  styleUrls: ['./suggested-users.component.scss']
})
export class SuggestedUsersComponent implements OnInit {
  public isLoading: boolean;

  constructor() {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }
}
