import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import ListRequirementsComponent from '../list-requirements/list-requirements.component';
import MapOrgComponent from '../../../../shared/map-org/components/map-org/map-org.component';

@Component({
  selector: 'app-home-requirements',
  standalone: true,
  imports: [ ListRequirementsComponent, MapOrgComponent ],
  templateUrl: './home-requirements.component.html',
  styleUrl: './home-requirements.component.css'
})
export default class HomeRequirementsComponent {

  @ViewChild('mapComponent') mapComponent!: MapOrgComponent;

  onRequirementClicked(requirementsCoordinates: { lng: number; lat: number }): void {
    // Usamos la referencia mapComponent para llamar al método centerMap del MapOrgComponent
    console.log('onEventClicked 2: ' + JSON.stringify(requirementsCoordinates))

    if (this.mapComponent) {
      this.mapComponent.centerMap(requirementsCoordinates.lat, requirementsCoordinates.lng);
    } else {
      console.error('Map component not found');
    }
  }

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
