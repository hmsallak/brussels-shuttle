import {Directive, ElementRef, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {PlaceAddress} from "../../core/models/place-address";
import {extractPlaceAddress} from "../services/google-places.service";

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
        this.placeChanged.emit(extractPlaceAddress(place));
      }
    });
  }

}
