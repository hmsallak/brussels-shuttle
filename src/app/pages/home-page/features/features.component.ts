import { Component } from '@angular/core';
import {faNotdef} from "@fortawesome/free-solid-svg-icons/faNotdef";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faMapLocationDot, faPhoneVolume, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import {faTaxi} from "@fortawesome/free-solid-svg-icons/faTaxi";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {

  protected readonly faNotdef = faNotdef;
  protected readonly faPhoneVolume = faPhoneVolume;
  protected readonly faPlaneDeparture = faPlaneDeparture;
  protected readonly faTaxi = faTaxi;
  protected readonly faMapLocationDot = faMapLocationDot;
}
