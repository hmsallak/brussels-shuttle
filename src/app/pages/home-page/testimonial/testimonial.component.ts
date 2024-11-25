import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
export class TestimonialComponent implements OnInit {
  slides: any;
  slideSayisi: any;
  loop: any;

  goNext() {
    this.loop++;
    for (let index = 0; index < this.slides.length; index++) {
      const element: any = this.slides[index];
      element.style.transform = "translateX(" + 100 * (index - (this.loop % this.slideSayisi)) + "%)";
    }
  }

  goPrev() {
    this.loop--;
    for (let index = 0; index < this.slides.length; index++) {
      const element: any = this.slides[index];
      element.style.transform = "translateX(" + 100 * (index - (this.loop % this.slideSayisi)) + "%)";
    }
  }

  ngOnInit(): void {
    this.slides = document.querySelectorAll(".slide-ana>div");
    this.slideSayisi = this.slides.length;

    for (let index = 0; index < this.slides.length; index++) {
      const element: any = this.slides[index];
      element.style.transform = "translateX(" + 100 * index + "%)";
    }
    this.loop = 0 + 1000 * this.slideSayisi;
  }
}
