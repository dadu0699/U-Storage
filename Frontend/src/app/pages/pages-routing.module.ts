import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { MyDriveComponent } from './my-drive/my-drive.component';
import { SuggestedUsersComponent } from './suggested-users/suggested-users.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'my-drive', component: MyDriveComponent },
      { path: 'suggested-users', component: SuggestedUsersComponent },
      { path: '', redirectTo: 'my-drive', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
