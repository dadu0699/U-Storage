import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private vignette: BehaviorSubject<boolean>;
  public vignetteStatus: Observable<boolean>;

  private uploadFile: BehaviorSubject<boolean>;
  public uploadFileStatus: Observable<boolean>;

  private mobileNavigation: BehaviorSubject<boolean>;
  public mobileNavigationStatus: Observable<boolean>;

  private renameFile: BehaviorSubject<boolean>;
  public renameFileStatus: Observable<boolean>;

  private confirmDeletion: BehaviorSubject<boolean>;
  public confirmDeletionStatus: Observable<boolean>;

  constructor() {
    this.vignette = new BehaviorSubject<boolean>(true);
    this.vignetteStatus = this.vignette.asObservable();

    this.uploadFile = new BehaviorSubject<boolean>(false);
    this.uploadFileStatus = this.uploadFile.asObservable();

    this.mobileNavigation = new BehaviorSubject<boolean>(false);
    this.mobileNavigationStatus = this.mobileNavigation.asObservable();

    this.renameFile = new BehaviorSubject<boolean>(false);
    this.renameFileStatus = this.renameFile.asObservable();

    this.confirmDeletion = new BehaviorSubject<boolean>(false);
    this.confirmDeletionStatus = this.confirmDeletion.asObservable();
  }

  public closeAll(): void {
    this.vignette.next(true);
    this.uploadFile.next(false);
    this.mobileNavigation.next(false);
    this.renameFile.next(false);
    this.confirmDeletion.next(false);
  }

  public updateUploadFileStatus(): void {
    this.vignette.next(!this.vignette.value);
    this.uploadFile.next(!this.uploadFile.value);
  }

  public updateMobileNavigationStatus(status?: boolean): void {
    if (status) {
      this.mobileNavigation.next(status);
    } else {
      this.mobileNavigation.next(!this.mobileNavigation.value);
    }
  }

  public updateRenameFileStatus(): void {
    this.vignette.next(!this.vignette.value);
    this.renameFile.next(!this.renameFile.value);
  }

  public updateConfirmDeletionStatus(): void {
    this.vignette.next(!this.vignette.value);
    this.confirmDeletion.next(!this.confirmDeletion.value);
  }
}
