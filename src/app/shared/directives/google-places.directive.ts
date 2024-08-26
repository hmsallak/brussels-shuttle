import {Directive, ElementRef, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {PlaceAddress} from "../../core/models/PlaceAddress";

@Directive({
  selector: '[appGooglePlaces]',
  standalone: true
})
export class GooglePlacesDirective implements OnInit {
  @Output() placeChanged = new EventEmitter<PlaceAddress>();
  private autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.el.nativeElement, {
      componentRestrictions: { country: ['BE', 'FR', 'NL', 'LU', 'DE'] }
    });
    this.autocomplete.addListener('place_changed', () => this.handlePlaceChanged());
  }


  private handlePlaceChanged(): void {
    this.ngZone.run(() => {
      const place = this.autocomplete?.getPlace();
      if (place) {
        const result = this.extractPlaceAddress(place);
        this.placeChanged.emit(result);
      }
    });
  }

  private extractPlaceAddress(place: google.maps.places.PlaceResult): PlaceAddress {
    const addressComponents = place.address_components || [];
    const latitude = place.geometry?.location?.lat() || 0;
    const longitude = place.geometry?.location?.lng() || 0;
    return {
      name: place.name || "",
      placeReference: place.place_id || "" ,
      street:  addressComponents.find(ac => ac.types.includes('route'))?.long_name || "",
      locality: addressComponents.find(ac => ac.types.includes('locality'))?.long_name || "",
      postalCode: addressComponents.find(ac => ac.types.includes('postal_code'))?.long_name || "",
      province: addressComponents.find(ac => ac.types.includes('administrative_area_level_1'))?.long_name || "",
      country: addressComponents.find(ac => ac.types.includes('country'))?.long_name || "",
      location: { latitude, longitude },
    };
  }
}
