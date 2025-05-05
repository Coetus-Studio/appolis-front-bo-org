import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { CitizenMap } from "../interfaces/citizen-map.interface";
import { AuthService } from "../../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly apiUrl: string = 'http://localhost:3000/v1';

  // Señal para almacenar los datos de ubicación
  locationData = signal<any>(null);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAutocomplete() {
  }

  getAllLocations(orgId: string): Observable<CitizenMap[]> {
    // console.log('Locations 1: ', center);

    return this.authService.getToken().pipe(
      filter(token => !!token),
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<CitizenMap[]>(`${this.apiUrl}/citizen-points`, {
          headers,
          params: {
            orgId
          }
        })
      })
    )
  }


  // crear citizen map
  createCitizenMap(citizenMap: CitizenMap): Observable<any> {
    console.log('Creando mapa para la ubicación:', citizenMap.location.geo_point);

    const lng = citizenMap.location.geo_point.coordinates[1];
    const lat = citizenMap.location.geo_point.coordinates[0];

    return this.authService.getToken().pipe(
      filter(token => !!token),
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        const body = {
          name: citizenMap.name,
          location: citizenMap.location,
          icon_url: citizenMap.icon_url,
          responsible_organization: citizenMap.responsible_organization
        }

        return this.http.post<CitizenMap>(`${this.apiUrl}/citizen-points`, body, { headers });
      })
    )
  }


  // Método para actualizar los datos
  setLocationData(data: any) {
    this.locationData.set(data);

  }

  // Método para obtener los datos
  getLocationData() {
    return this.locationData();
  }

  getCitizenPointById(citizenPointId: string): Observable<CitizenMap> {

    return this.authService.getToken().pipe(
      filter(token => !!token),
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` })
        return this.http.get<CitizenMap>(`${this.apiUrl}/citizen-points/${citizenPointId}`, {
          headers,

        })
      })
    )
  }
}
