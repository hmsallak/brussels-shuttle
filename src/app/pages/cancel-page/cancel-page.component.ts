import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-cancel-page',
  standalone: true,
  imports: [
    LottieComponent,
    RouterLink,
    TranslateModule
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
