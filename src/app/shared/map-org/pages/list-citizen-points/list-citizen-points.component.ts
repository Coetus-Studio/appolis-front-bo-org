import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import MapOrgComponent from "../../components/map-org/map-org.component";
import { LocationsService } from '../../services/locations.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CitizenMap } from '../../interfaces/citizen-map.interface';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'list-citizen-points',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-citizen-points.component.html',
  styleUrl: './list-citizen-points.component.css'
})
export default class ListCitizenPointsComponent implements OnInit {

  @Output() eventClicked = new EventEmitter<{ lat: number; lng: number }>();
  registeredOrgId: string | null | undefined = '';


  // filteredLocations = signal<Location[]>([]);
  citizenPoint: CitizenMap[] = [];

  constructor(
    private locationsService: LocationsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.authService.organizationId$.subscribe((orgId) => {
      this.registeredOrgId = orgId;

      if (this.registeredOrgId) {
        this.getAllLocations();
      }

    });
    this.authService.getOrgId();
  }

  getAllLocations() {

    const orgId = this.registeredOrgId;

    if (orgId !== null && orgId !== undefined) {
      this.locationsService.getAllLocations(orgId).subscribe({
        next: (fetchedLocations) => {
          console.log('locations:', fetchedLocations);
          this.citizenPoint = fetchedLocations
        },
        error: (error) => {
          console.error('Error fetching locations:', error);
        }
      });
    }
  }

  // Filtrar locaciones por texto
  filterLocations(event: Event) {
    /*     const input = event.target as HTMLInputElement; // Especifica que el target es un HTMLInputElement
        const query = input.value.toLowerCase(); // Ahora puedes acceder a "value" sin errores
        const filtered = this.filteredLocations().filter(location =>
          location.gm_formatted_address.toLowerCase().includes(query)
        );
        this.filteredLocations.set(filtered); */
  }

  focusOnEvent(citizenPoint: CitizenMap) {
    // extraemos las coordenadas del evento
    console.log('ingresando: ' + JSON.stringify(citizenPoint))

    const lat = citizenPoint.location.geo_point.coordinates[1];
    const lng = citizenPoint.location.geo_point.coordinates[0];

    // Emitimos las coordenadas al MapOrgComponent
    this.eventClicked.emit({ lat, lng });
  }
}
