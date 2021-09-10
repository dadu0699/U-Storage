import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { MyDriveComponent } from './my-drive/my-drive.component';
import { PagesComponent } from './pages.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';
import { SuggestedUsersComponent } from './suggested-users/suggested-users.component';


@NgModule({
  declarations: [
    MyDriveComponent,
    PagesComponent,
    SharedWithMeComponent,
    SuggestedUsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    HttpClientModule,
    PagesRoutingModule,
    ComponentsModule,
    SharedModule
  ]
})
export class PagesModule { }
