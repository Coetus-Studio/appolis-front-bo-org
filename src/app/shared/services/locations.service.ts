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

}
