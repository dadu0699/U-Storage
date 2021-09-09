import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComponentsModule } from '../components/components.module';

import { ConfirmDeletionComponent } from './popups/confirm-deletion/confirm-deletion.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { RenameFileComponent } from './popups/rename-file/rename-file.component';
import { UploadFileComponent } from './popups/upload-file/upload-file.component';


@NgModule({
  declarations: [
    ConfirmDeletionComponent,
    MenuBarComponent,
    RenameFileComponent,
    UploadFileComponent,
  ],
  exports: [
    ConfirmDeletionComponent,
    MenuBarComponent,
    RenameFileComponent,
    UploadFileComponent,
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
