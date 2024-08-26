export interface PlaceAddress {
  id?: number;
  name: string;
  street: string;
  locality: string;
  postalCode: string;
  province: string;
  country: string;
  placeReference: string;
  location: Location;
}
export interface Location {
  latitude: number;
  longitude: number;
}
