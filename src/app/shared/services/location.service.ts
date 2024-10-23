import {ElementRef, inject, Injectable, NgZone} from "@angular/core";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {Location, PlaceAddress} from "../../core/models/PlaceAddress";
import {extractPlaceAddress} from "./google-places.service";

@Injectable({
  providedIn: 'root'
})
export class LocationService{
  private ngZone = inject(NgZone);

  getCurrentLocation(): Observable<Location> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location: Location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            observer.next(location);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not available in this browser.');
      }
    });
  }

  getCurrentPlaceAddress(): Observable<PlaceAddress | null> {
    return this.getCurrentLocation().pipe(
      switchMap(location => {
        return this.getPlaceByLocation(location);
      }),
      catchError(error => {
        console.error('Error:', error);
        return of(null);
      })
    );
  }

  private getPlaceByLocation(location: Location): Observable<PlaceAddress> {
    return new Observable(observer => {
      const geocoder = new google.maps.Geocoder();
      const latlng = {
        lat: location.latitude,
        lng: location.longitude
      };
      geocoder.geocode({ location: latlng }).then((response) => {
        if (response.results && response.results.length) {
          const place = response.results[0];
          observer.next(extractPlaceAddress(place));
          observer.complete();
        } else {
          observer.error(new Error('No place found for the provided location.'));
        }
      });
    });
  }
}
