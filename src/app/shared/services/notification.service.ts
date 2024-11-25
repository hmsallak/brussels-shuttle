import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Notification} from "../../core/models/notification";
import {NotificationEnum} from "../../core/models/enum/notification.enum";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
    this.showNotification(message, NotificationEnum.SUCCESS);
  }

  showError(message: string) {
    this.showNotification(message, NotificationEnum.ERROR);
  }

  showInfo(message: string) {
    this.showNotification(message, NotificationEnum.INFO);
  }

  showWarning(message: string) {
    this.showNotification(message, NotificationEnum.WARNING);
  }

  private showNotification(message: string, type: NotificationEnum) {
    this.notificationSubject.next({ message, type });
  }
}
