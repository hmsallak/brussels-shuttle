import {NotificationEnum} from "./enum/notification.enum";

export interface Notification {
  message: string;
  type: NotificationEnum;
}
