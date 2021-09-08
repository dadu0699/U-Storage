import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { MyDriveComponent } from './my-drive/my-drive.component';


@NgModule({
  declarations: [
    PagesComponent,
    MyDriveComponent
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
