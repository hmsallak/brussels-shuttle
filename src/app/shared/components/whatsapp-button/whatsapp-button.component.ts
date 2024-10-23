import {Component, HostListener} from '@angular/core';
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons/faWhatsapp";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.css'
})
export class WhatsappButtonComponent {
  showButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton =  window.scrollY > 300;
  }

  protected readonly faWhatsapp = faWhatsapp;
}
