import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Subscription} from "rxjs";
import {Notification} from "../../../core/models/notification";
import {fadeInAnimation, fadeOutAnimation} from "angular-animations";
import {NgClass} from "@angular/common";
import {NotificationEnum} from "../../../core/models/enum/notification.enum";
import {TranslateModule} from "@ngx-translate/core";
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgClass,
    TranslateModule,
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  animations: [
    fadeInAnimation(),
    fadeOutAnimation()
  ]
})
export class NotificationComponent implements OnInit, OnDestroy{
  private notificationService = inject(NotificationService);

  notification: Notification | null = null;
  private subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.notificationService.notification$.subscribe(
      (notification) => {
        this.notification = notification;

        // Auto-hide the notification after 3 seconds
        setTimeout(() => {
          this.notification = null;
        }, 3000);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected readonly NotificationEnum = NotificationEnum;
}
