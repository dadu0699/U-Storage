import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthButtonComponent } from './auth-button/auth-button.component';



@NgModule({
  declarations: [
    AuthButtonComponent
  ],
  exports: [
    AuthButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ]
})
export class ComponentsModule { }
