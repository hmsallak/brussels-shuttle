import {Component, computed, input} from '@angular/core';
import {PlaceAddress} from "../../../core/models/place-address";

@Component({
  selector: 'app-place-address-link',
  standalone: true,
  imports: [],
  templateUrl: './place-address-link.component.html',
  styleUrl: './place-address-link.component.css'
})
export class PlaceAddressLinkComponent {

  placeAddress = input.required<PlaceAddress>();

  googleMapsUrl = computed(() => {
    const address = this.placeAddress();
    return `https://www.google.com/maps?q=${address.location.latitude},${address.location.longitude}`;
  });

}
