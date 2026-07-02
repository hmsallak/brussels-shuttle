import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  standalone: true,
  styleUrl: './testimonial.component.css',
  imports: [
    TranslateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialComponent {}
