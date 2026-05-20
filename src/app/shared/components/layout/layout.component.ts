import {Component, input} from '@angular/core';
import {NavigationComponent} from "../navigation/navigation.component";
import {FooterComponent} from "../footer/footer.component";
import {NgClass} from "@angular/common";
import {WhatsappButtonComponent} from "../whatsapp-button/whatsapp-button.component";
import {CookieBannerComponent} from "../cookie-banner/cookie-banner.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NavigationComponent,
    FooterComponent,
    NgClass,
    WhatsappButtonComponent,
    CookieBannerComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  absoluteHeader= input(false)
}
