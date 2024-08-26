import {Component, inject, Input, signal, WritableSignal} from '@angular/core';
import {
  GoogleMap, MapAdvancedMarker,
  MapDirectionsRenderer,
  MapDirectionsResponse,
  MapDirectionsService,
  MapMarker
} from "@angular/google-maps";
import {map, switchMap} from "rxjs";
import {PlaceAddress} from "../../../core/models/PlaceAddress";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [
    GoogleMap,
    MapDirectionsRenderer,
    JsonPipe,
    MapMarker
  ],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.css'
})
export class GoogleMapComponent {

  directionsService = inject(MapDirectionsService)
  private _startAddress: google.maps.LatLngLiteral | undefined;
  private _endAddress: google.maps.LatLngLiteral | undefined;
  private _directionResult: WritableSignal<google.maps.DirectionsResult | undefined> = signal(undefined);

  constructor() {
  }

  @Input() center: google.maps.LatLngLiteral = {lat: 50.8503, lng: 4.3517};

  @Input()
  set startAddress(value: PlaceAddress | undefined) {
    this._startAddress = value ? {lat: value.location.latitude, lng: value.location.longitude} : undefined;
    this.setDirectionResult()
  }

  @Input()
  set endAddress(value: PlaceAddress | undefined) {
      this._endAddress = value ? {lat: value.location.latitude, lng: value.location.longitude} : undefined;
      this.setDirectionResult()
  }

  get directionResult(): WritableSignal<google.maps.DirectionsResult | undefined> {
    return this._directionResult;
  }

  private setDirectionResult() {
    if (this._startAddress && this._endAddress) {
      this.computeDirection(this._startAddress, this._endAddress);
    } else{
      this._directionResult.set(undefined);
    }
  }

  private computeDirection(originAddress: google.maps.LatLngLiteral, destinationAddress: google.maps.LatLngLiteral) {
    const request: google.maps.DirectionsRequest = {
      destination:destinationAddress,
      origin: originAddress,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request).pipe(
      map((result: MapDirectionsResponse) => {
        this._directionResult.set(result.result);
      })
    ).subscribe();
  }
}
