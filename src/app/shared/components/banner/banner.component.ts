import {Component, input, Input} from '@angular/core';
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  @Input() title: string = '';
  isError = input<boolean>(false);
  protected readonly faCircleExclamation = faCircleExclamation;
}
