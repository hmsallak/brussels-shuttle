import {Component, computed, input} from '@angular/core';
import {PlaceAddress} from "../../../core/models/PlaceAddress";

@Component({
  selector: 'app-place-address-link',
  standalone: true,
  imports: [],
  templateUrl: './place-address-link.component.html',
  styleUrl: './place-address-link.component.css'
})
export class PlaceAddressLinkComponent {

  placeAddress = input.required<PlaceAddress>();

  placeAddressString = computed(() => {
    if (this.placeAddress().name == this.placeAddress().locality) {
      return this.placeAddress().name + ', ' + this.placeAddress().country;
    }
    if (!this.placeAddress().postalCode) {
      return this.placeAddress().name + ', ' + this.placeAddress().locality + ' ' + this.placeAddress().country;
    }
    return this.placeAddress().name + ', ' + this.placeAddress().postalCode + ', ' + this.placeAddress().locality + ' ' + this.placeAddress().country;
  });

  googleMapsUrl = computed(() => {
    const address = this.placeAddress();
    return `https://www.google.com/maps?q=${address.latitude},${address.longitude}`;
  });

}
