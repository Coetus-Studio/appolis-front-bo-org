import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Location } from '../../interfaces/locations.interface';
import { CommonModule } from '@angular/common';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export default class LocationsComponent {

  // forma nativa de agregar atributos privados
  readonly #locationsService = inject(LocationsService);

  // constructor (
  //   private locationsService: LocationsService
  // ) {}

  // observable del service
  locations$ = this.#locationsService.getAllLocations({ lat: 0, lng: 0 });
  $locations = toSignal(this.locations$, {
    initialValue: [],
  });

}
