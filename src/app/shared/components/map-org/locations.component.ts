import { Component, inject, signal } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { Location } from '../../interfaces/locations.interface';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [ CommonModule, GoogleMap ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export default class LocationsComponent {

  // forma nativa de agregar atributos privados
  readonly #locationsService = inject(LocationsService);

  center = signal<google.maps.LatLngLiteral>({ lat: 4.6484784, lng: -74.272619 });
  zoom = signal(4);



  // constructor (
  //   private locationsService: LocationsService
  // ) {}

  // observable del service, le pasamos el signal center
  locations$ = this.#locationsService.getAllLocations(this.center());
  $locations = toSignal(this.locations$, {
    initialValue: [],
  });

}
