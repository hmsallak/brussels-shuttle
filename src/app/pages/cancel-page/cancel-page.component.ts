import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {OrderConfirmComponent} from "../success-page/order-confirm/order-confirm.component";

@Component({
  selector: 'app-cancel-page',
  standalone: true,
    imports: [
        AsyncPipe,
        LottieComponent,
        OrderConfirmComponent
    ],
  templateUrl: './cancel-page.component.html',
  styleUrl: './cancel-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CancelPageComponent {
  options: AnimationOptions = {
    path: '/assets/animation/cancel.json',
  };
}
