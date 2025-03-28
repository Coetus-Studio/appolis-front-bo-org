import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Location } from "../interfaces/locations.interface";
import { BehaviorSubject, Observable } from 'rxjs';
import { CitizenMap } from "../interfaces/citizen-map.interface";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  // getAddressSuggestions(addressValue: any) {
  //   throw new Error('Method not implemented.');
  // }

  private readonly apiUrl: string = 'http://localhost:3000/v1/locations';
  private autocomplete: any;

  // Señal para almacenar los datos de ubicación
  locationData = signal<any>(null);

  // private locationSource = new BehaviorSubject<any>(null);  // Usamos BehaviorSubject para compartir el estado
  // currentLocation = this.locationSource.asObservable();  // Hacemos observable la ubicación actual


  constructor(
    private http: HttpClient,
  ) {
    // console.log('inicializando signal', this.locationData())
  }

  // initAutocomplete(inputElement: HTMLInputElement) {
  //   console.log('Initializing autocomplete for:', inputElement);
  //   const options = {
  //     types: ['gm_formatted_address'],
  //   };
  //   this.autocomplete = new google.maps.places.Autocomplete(inputElement, options);
  // }

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
      gm_formatted_address: value.address,
      description: value.description,
      is_public: true,
        geo_point: {
          type: 'Point',
          coordinates: [value.geo_point_lat, value.geo_point_lng]
      }

    });
  }

  // crear citizen map
  createCitizenMap(citizenMap: CitizenMap): Observable<any> {
    console.log('Creando mapa para la ubicación:', citizenMap);
    return this.http.post(`${this.apiUrl}/create-citizen-map`, {
      name: citizenMap.name,
      location: citizenMap.location
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
