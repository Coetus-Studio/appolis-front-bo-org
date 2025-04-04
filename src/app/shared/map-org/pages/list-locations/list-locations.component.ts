import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import MapOrgComponent from "../../components/map-org/map-org.component";
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../interfaces/locations.interface';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'list-locations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-locations.component.html',
  styleUrl: './list-locations.component.css'
})
export default class ListLocationsComponent implements OnInit {

  @Output() eventClicked = new EventEmitter<{lat: number; lng: number}>();

  filteredLocations = signal<Location[]>([]);

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationsService.getAllLocations().subscribe({
      next: (fetchedLocations) => {
        console.log('locations:', fetchedLocations);
        this.filteredLocations.set(fetchedLocations);
      },
      error: (error) => {
        console.error('Error fetching locations:', error);
      }
    });
  }

  // Filtrar locaciones por texto
  filterLocations(event: Event) {
    const input = event.target as HTMLInputElement; // Especifica que el target es un HTMLInputElement
    const query = input.value.toLowerCase(); // Ahora puedes acceder a "value" sin errores
    const filtered = this.filteredLocations().filter(location =>
      location.gm_formatted_address.toLowerCase().includes(query)
    );
    this.filteredLocations.set(filtered);
  }

  focusOnEvent(event: any) {
    // extraemos las coordenadas del evento
    console.log('ingresando: ' + JSON.stringify(event))
    const lat = event.geo_point.coordinates[1];
    const lng = event.geo_point.coordinates[0];

    // Emitimos las coordenadas al MapOrgComponent
    this.eventClicked.emit({ lat, lng });
  }
}
