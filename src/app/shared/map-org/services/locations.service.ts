import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Location } from "../interfaces/locations.interface";
import { BehaviorSubject, Observable } from 'rxjs';
import { CitizenMap } from "../interfaces/citizen-map.interface";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly apiUrl: string = 'http://localhost:3000/v1';

  // Señal para almacenar los datos de ubicación
  locationData = signal<any>(null);

  constructor(
    private http: HttpClient,
  ) {}

  getAutocomplete() {
  }

  getAllLocations() {
    // console.log('Locations 1: ', center);
    return this.http.get<Location[]>(`${this.apiUrl}/locations`, {
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
    return this.http.post(`${this.apiUrl}/citizen-points`, {
      name: citizenMap.name,
      location: citizenMap.location,
      icon_url: citizenMap.icon_url
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

}
