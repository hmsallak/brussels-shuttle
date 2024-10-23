import {Component, HostListener, input} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationComponent} from "../navigation/navigation.component";
import {FooterComponent} from "../footer/footer.component";
import {NgClass} from "@angular/common";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons/faWhatsapp";
import {WhatsappButtonComponent} from "../whatsapp-button/whatsapp-button.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    FooterComponent,
    NgClass,
    FaIconComponent,
    WhatsappButtonComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  absoluteHeader= input(false)

  protected readonly faUser = faUser;
  protected readonly faWhatsapp = faWhatsapp;


}
