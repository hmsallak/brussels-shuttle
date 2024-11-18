import {Component, input, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass} from "@angular/common";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-banner',
  standalone: true,
    imports: [
        FaIconComponent,
        NgClass,
        TranslateModule
    ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  @Input() title: string = '';
  isMandatory = input<boolean>(false);
  isError = input<boolean>(false);
  protected readonly faCircleExclamation = faCircleExclamation;
}
