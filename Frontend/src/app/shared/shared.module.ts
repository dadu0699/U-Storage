import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComponentsModule } from '../components/components.module';

import { MenuBarComponent } from './menu-bar/menu-bar.component';


@NgModule({
  declarations: [
    MenuBarComponent
  ],
  exports: [
    MenuBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ComponentsModule,
  ]
})
export class SharedModule { }
