import {AfterViewInit, Component, effect, inject, input, Input, signal, WritableSignal} from '@angular/core';
import {
  GoogleMap,
  MapDirectionsRenderer,
  MapDirectionsResponse,
  MapDirectionsService
} from "@angular/google-maps";
import {map} from "rxjs";
import {Location} from "../../../core/models/place-address";
import TravelMode = google.maps.TravelMode;
@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [
    GoogleMap,
    MapDirectionsRenderer
  ],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.css'
})
export class GoogleMapComponent {
  directionsService = inject(MapDirectionsService)

  private _directionResult: WritableSignal<google.maps.DirectionsResult | undefined> = signal(undefined);
  origin = input<Location>();
  destination = input<Location>();

  @Input() center: google.maps.LatLngLiteral = {lat: 50.8503, lng: 4.3517};

  constructor() {
  }

  directionEffect = effect(() => {
    if (this.origin() && this.destination()) {
      const start = {lat: this.origin()!.latitude, lng: this.origin()!.longitude}
      const end = {lat: this.destination()!.latitude, lng: this.destination()!.longitude}
      this.computeDirection(start, end);
    } else{
      this._directionResult.set(undefined);
    }
    }, { allowSignalWrites: true });

  get directionResult(): WritableSignal<google.maps.DirectionsResult | undefined> {
    return this._directionResult;
  }

  private computeDirection(originAddress: google.maps.LatLngLiteral, destinationAddress: google.maps.LatLngLiteral) {
    const request: google.maps.DirectionsRequest = {
      destination:destinationAddress,
      origin: originAddress,
      travelMode: 'DRIVING' as TravelMode
    };
    this.directionsService.route(request).pipe(
      map((result: MapDirectionsResponse) => {
        this._directionResult.set(result.result);
      })
    ).subscribe();
  }
}
