import {PlaceAddress} from "../../core/models/place-address";
import {postcss} from "tailwindcss";

export function extractPlaceAddress(place: google.maps.places.PlaceResult): PlaceAddress {
  const addressComponents = place.address_components || [];
  const latitude = place.geometry?.location?.lat() || 0;
  const longitude = place.geometry?.location?.lng() || 0;

  const street = addressComponents.find(ac => ac.types.includes('route'))?.long_name || "";
  const number = addressComponents.find(ac => ac.types.includes('street_number'))?.long_name || "";
  const postalCode = addressComponents.find(ac => ac.types.includes('postal_code'))?.long_name || "";
  const locality = addressComponents.find(ac => ac.types.includes('locality'))?.long_name || "";
  const province = addressComponents.find(ac => ac.types.includes('administrative_area_level_1'))?.long_name || "";
  const country = addressComponents.find(ac => ac.types.includes('country'))?.long_name || "";
  return {
    placeReference: place.place_id || "" ,
    street:  street + " " + number,
    locality: locality,
    postalCode: postalCode,
    province: province,
    country: country,
    location: { latitude, longitude },
    name: place.name ? `${place.name}, ${country}` :  `${street} ${number}, ${locality} ${postalCode}, ${country}`,
  };
}
