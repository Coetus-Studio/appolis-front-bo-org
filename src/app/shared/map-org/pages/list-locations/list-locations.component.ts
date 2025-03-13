import { Component, OnInit, signal } from '@angular/core';
import MapOrgComponent from "../../components/map-org/map-org.component";
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../interfaces/locations.interface';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list-locations',
  standalone: true,
  imports: [MapOrgComponent, CommonModule, RouterOutlet],
  templateUrl: './list-locations.component.html',
  styleUrl: './list-locations.component.css'
})
export default class ListLocationsComponent implements OnInit {

  center = signal<google.maps.LatLngLiteral>({ lat: -33.45694, lng: -70.64827 });
  $locations = signal<Location[]>([]);
  filteredLocations = signal<Location[]>([]);

  // Opciones del mapa
  options: google.maps.MapOptions = {
    mapId: 'YOUR_MAP_ID', // Reemplaza con tu Map ID
    disableDefaultUI: true, // Desactiva controles por defecto (opcional)
    fullscreenControl: true,
  };

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    const centerValue = this.center();
    console.log('Center value:', centerValue);
    this.locationsService.getAllLocations(centerValue).subscribe({
      next: (fetchedLocations) => {
        console.log('locations:', fetchedLocations);
        this.$locations.set(fetchedLocations);
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
    const filtered = this.$locations().filter(location =>
      location.address.toLowerCase().includes(query)
    );
    this.filteredLocations.set(filtered);
  }

  // Seleccionar locación y centrar el mapa
  selectLocation(location: Location) {
    this.center.set({
      lat: location.geo_point.coordinates[0],
      lng: location.geo_point.coordinates[1],
    });
  }
}
