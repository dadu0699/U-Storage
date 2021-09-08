import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthButtonComponent } from './others/auth-button/auth-button.component';
import { DesktopToolbarComponent } from './files/desktop-toolbar/desktop-toolbar.component';
import { SearchBarComponent } from './files/search-bar/search-bar.component';
import { SpinnerComponent } from './others/spinner/spinner.component';
import { ToolbarButtonComponent } from './files/toolbar-button/toolbar-button.component';
import { ToolbarButtonUploadComponent } from './files/toolbar-button-upload/toolbar-button-upload.component';
import { UserAvatarComponent } from './others/user-avatar/user-avatar.component';
import { VignetteComponent } from './others/vignette/vignette.component';


@NgModule({
  declarations: [
    AuthButtonComponent,
    DesktopToolbarComponent,
    SearchBarComponent,
    SpinnerComponent,
    ToolbarButtonComponent,
    ToolbarButtonUploadComponent,
    UserAvatarComponent,
    VignetteComponent,
  ],
  exports: [
    AuthButtonComponent,
    DesktopToolbarComponent,
    SpinnerComponent,
    UserAvatarComponent,
    VignetteComponent,
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
