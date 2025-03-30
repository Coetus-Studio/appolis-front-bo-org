import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import MapOrgComponent from '../../../../shared/map-org/components/map-org/map-org.component';
import ListLocationsComponent from "../../../../shared/map-org/pages/list-locations/list-locations.component";
import ListEventsComponent from "../list-event/list-events.component";

@Component({
  selector: 'app-home-event',
  standalone: true,
  imports: [MapOrgComponent, ListEventsComponent],
  templateUrl: './home-event.component.html',
  styleUrl: './home-event.component.css'
})
export default class HomeEventComponent implements AfterViewInit {

  @ViewChild('mapComponent') mapComponent!: MapOrgComponent;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.mapComponent) {
      console.log('componente disponible')
      // this.mapComponent.centerMap(40.7121, -74.0060); // modificar a valor dinamico
    } else {
      console.error('Map component not found');
    }
  }

  onEventClicked(eventCoordinates: { lat: number; lng: number }): void {
    // Usamos la referencia mapComponent para llamar al método centerMap del MapOrgComponent
    console.log('onEventClicked 2: ' + JSON.stringify(eventCoordinates))

    if (this.mapComponent) {
      this.mapComponent.centerMap(eventCoordinates.lat, eventCoordinates.lng);
    } else {
      console.error('Map component not found');
    }
  }

}
