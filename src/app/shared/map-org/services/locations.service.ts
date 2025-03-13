import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Location } from "../interfaces/locations.interface";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly apiUrl: string = 'http://localhost:3000/v1/locations';
  private autocomplete: any;

  constructor(
    private http: HttpClient,
  ) { }

  initAutocomplete(inputElement: HTMLInputElement) {
    console.log('Initializing autocomplete for:', inputElement);
    const options = {
      types: ['address'],
    };
    this.autocomplete = new google.maps.places.Autocomplete(inputElement, options);
  }

  // Asegúrate de que el objeto google esté disponible
  get googleMaps(): any {
    return typeof google !== 'undefined' ? google : null;
  }

  // getAddressSuggestions(query: string): Observable<any[]> {
  //   return new Observable<any[]>((observer) => {
  //     if (!this.googleMaps) {
  //       observer.error('Google Maps API no está cargada.');
  //       return;
  //     }

  //     console.log('pasando');
  //     const service = new this.googleMaps.places.AutocompleteService();
  //     console.log('pasando2');

  //     service.getPlacePredictions({ input: query }, (predictions: any[] | undefined, status: any) => {
  //       if (status === this.googleMaps.places.PlacesServiceStatus.OK && predictions) {
  //         observer.next(predictions);
  //       } else {
  //         observer.next([]);
  //       }
  //     });
  //   });
  // }

  getAutocomplete() {
    return this.autocomplete;
  }

  getAllLocations(center: { lat: number; lng: number }) {
    console.log('Locations 1: ', center);
    return this.http.get<Location[]>(this.apiUrl, {
      params: {
        origin: `${center.lat}, ${center.lng}`,
        size: 10,
      }
    });
  }

  createLocation(value: any): Observable<Location> {

    console.log('Creating a new location...');
    return this.http.post<Location>(this.apiUrl, {
      address: value.address,
      description: value.description,
      category: value.category,
      url_icon: value.url_icon,
      is_public: true,
      city_code: value.city_code,
      geo_point: {
        lat: 0,
        lng: 0,
      },
    });
  }
}
