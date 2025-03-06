import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Location } from "../interfaces/locations.interface";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly apiUrl: string = 'http://localhost:3000/v1/locations';

  constructor(
    private http: HttpClient,
  ) { }

  // getAllLocations( center: { lat: number; lng: number }) {
  //   const radius = 5000; // in meters
  //   const url = `${this.apiUrl}?lat=${center.lat}&lng=${center.lng}&radius=${radius}`;
  //   return this.http.get<any[]>(url); // replace 'any[]' with the actual type of the response data

  // }



  getAllLocations(center: { lat: number; lng: number }) {

    console.log('Locations: ', center);

    return this.http.get<Location[]>(this.apiUrl, {
      params: {
        origin: `${center.lat}, ${center.lng}`,
        size: 10,
      }
    })

  }

  createLocation() {
    // TODO: implement creating a new location
    console.log('Creating a new location...');
    return this.http.post<Location>(this.apiUrl, {
      address: 'New Location',
      description: 'A new location description',
      category: 'New Location Category',
      url_icon: 'https://example.com/location-icon.png',
      is_public: true,
      city_code: 'new-location-city-code',
      geo_point: {
        lat: 0,
        lng: 0,
      },
    });
  }

}
