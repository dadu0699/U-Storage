import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthButtonComponent } from './others/auth-button/auth-button.component';
import { ButtonBaseComponent } from './others/button-base/button-base.component';
import { ButtonUploadComponent } from './others/button-upload/button-upload.component';
import { DesktopToolbarComponent } from './files/desktop-toolbar/desktop-toolbar.component';
import { EmptyMessageComponent } from './files/empty-message/empty-message.component';
import { EmptyPageComponent } from './files/empty-page/empty-page.component';
import { FileBrowserComponent } from './files/file-browser/file-browser.component';
import { FileInfoPanelComponent } from './files/file-info-panel/file-info-panel.component';
import { FileItemGridComponent } from './files/file-item-grid/file-item-grid.component';
import { FilePreviewComponent } from './files/file-preview/file-preview.component';
import { ListInfoItemComponent } from './files/list-info-item/list-info-item.component';
import { PopupActionsComponent } from './popups/popup-actions/popup-actions.component';
import { PopupContentComponent } from './popups/popup-content/popup-content.component';
import { PopupHeaderComponent } from './popups/popup-header/popup-header.component';
import { PopupWrapperComponent } from './popups/popup-wrapper/popup-wrapper.component';
import { SearchBarComponent } from './files/search-bar/search-bar.component';
import { SpinnerComponent } from './others/spinner/spinner.component';
import { SwitchInputComponent } from './forms/switch-input/switch-input.component';
import { ToolbarButtonComponent } from './files/toolbar-button/toolbar-button.component';
import { ToolbarButtonUploadComponent } from './files/toolbar-button-upload/toolbar-button-upload.component';
import { UserAvatarComponent } from './others/user-avatar/user-avatar.component';
import { VignetteComponent } from './others/vignette/vignette.component';


@NgModule({
  declarations: [
    AuthButtonComponent,
    ButtonBaseComponent,
    ButtonUploadComponent,
    DesktopToolbarComponent,
    EmptyMessageComponent,
    EmptyPageComponent,
    FileBrowserComponent,
    FileInfoPanelComponent,
    FileItemGridComponent,
    FilePreviewComponent,
    ListInfoItemComponent,
    PopupActionsComponent,
    PopupContentComponent,
    PopupHeaderComponent,
    PopupWrapperComponent,
    SearchBarComponent,
    SpinnerComponent,
    SwitchInputComponent,
    ToolbarButtonComponent,
    ToolbarButtonUploadComponent,
    UserAvatarComponent,
    VignetteComponent,
  ],
  exports: [
    AuthButtonComponent,
    ButtonBaseComponent,
    DesktopToolbarComponent,
    FileBrowserComponent,
    PopupActionsComponent,
    PopupContentComponent,
    PopupHeaderComponent,
    PopupWrapperComponent,
    SpinnerComponent,
    SwitchInputComponent,
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
