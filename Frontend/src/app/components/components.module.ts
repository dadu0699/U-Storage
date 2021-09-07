import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthButtonComponent } from './others/auth-button/auth-button.component';
import { UserAvatarComponent } from './others/user-avatar/user-avatar.component';



@NgModule({
  declarations: [
    AuthButtonComponent,
    UserAvatarComponent
  ],
  exports: [
    AuthButtonComponent,
    UserAvatarComponent
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
