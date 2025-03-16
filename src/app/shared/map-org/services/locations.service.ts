import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Location } from "../interfaces/locations.interface";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly apiUrl: string = 'http://localhost:3000/v1/locations';
  private autocomplete: any;

  // Señal para almacenar los datos de ubicación
  locationData = signal<any>(null);

  // private locationSource = new BehaviorSubject<any>(null);  // Usamos BehaviorSubject para compartir el estado
  // currentLocation = this.locationSource.asObservable();  // Hacemos observable la ubicación actual


  constructor(
    private http: HttpClient,
  ) { console.log('inicializando signal', this.locationData()) }

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
      category: value.category, // enviar id 633e3cf17393d8d6eeefc15c
      url_icon: value.url_icon,
      is_public: true,
      city_code: value.city_code, // enviar id 634f4abfbfbdf714ae0509cc
      geo_point: {
        type: 'Point',
        // coordinates: `${value.geo_point_lat}, ${value.geo_point_lng}`,
        coordinates: [value.geo_point_lat, value.geo_point]
      },
    });
  }


    // Método para actualizar los datos
    setLocationData(data: any) {
      this.locationData.set(data);

    }

    // Método para obtener los datos
    getLocationData() {
      return this.locationData();
    }


    // updateLocation(location: any) {
    //   this.locationSource.next(location);  // Actualiza la ubicación
    // }

}
