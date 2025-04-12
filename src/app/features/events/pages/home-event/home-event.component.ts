import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import MapOrgComponent from '../../../../shared/map-org/components/map-org/map-org.component';
import ListLocationsComponent from "../../../../shared/map-org/pages/list-citizen-points/list-citizen-points.component";
import ListEventsComponent from "../list-event/list-events.component";
import ListOrganizationComponent from '../../../organizations/pages/list-organization/list-organization.component';


@Component({
  selector: 'home-event',
  standalone: true,
  imports: [MapOrgComponent, ListEventsComponent],
  templateUrl: './home-event.component.html',
  styleUrl: './home-event.component.css'
})


export default class HomeEventComponent implements AfterViewInit {

  @ViewChild('mapComponent') mapComponent!: MapOrgComponent;
  @ViewChild('searchBox', { static: false }) searchBox!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.mapComponent) {
      console.log('componente disponible')
      // this.mapComponent.centerMap(40.7121, -74.0060); // modificar a valor dinamico
    } else {
      console.error('Map component not found');
    }
  }

  onEventClicked(eventCoordinates: { lng: number; lat: number }): void {
    // Usamos la referencia mapComponent para llamar al método centerMap del MapOrgComponent
    console.log('onEventClicked 2: ' + JSON.stringify(eventCoordinates))

    if (this.mapComponent) {
      this.mapComponent.centerMap(eventCoordinates.lat, eventCoordinates.lng);
    } else {
      console.error('Map component not found');
    }
  }

  // TODO modificar any
  moveMap(event: google.maps.MapMouseEvent): void {
    console.log('Método para mover el map' + event)

    const latlng = event;

    if (latlng) {
      // const lat = latlng.lat();
      // const lng = latlng.lng();
      // console.log('lat: ', lat, ', lng: ', lng);

      if (this.mapComponent) {
        // llamamos a la funcion getAddressFromcoords
        // this.mapComponent.getAddressFromCoords(lat, lng);
      }

      // this.mapComponent.moveMap(event);
    } else {
      console.error('latlng is null');
    }
  }




}
