import { AfterViewInit, Component, ViewChild } from '@angular/core';
import MapOrgComponent from '../../components/map-org/map-org.component';
import ListCitizenPointsComponent from '../list-citizen-points/list-citizen-points.component';
// import MapOrgComponent from '../components/map-org/map-org.component';
// import ListLocationsComponent from "../pages/list-citizen-points/list-citizen-points.component";

@Component({
  selector: 'app-home-locations',
  standalone: true,
  imports: [ListCitizenPointsComponent, MapOrgComponent],
  templateUrl: './home-citizen-points.component.html',
  // styleUrl: '.././components/home-locations/home-locations.component.css'
})
export default class HomeCitizenPointsComponent implements AfterViewInit {

    // Usamos ViewChild para obtener la referencia al componente hijo MapOrgComponent
  @ViewChild('mapComponent') mapComponent!: MapOrgComponent;

  constructor() {}

  // aqui accedemos a mapcomponet
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
    console.log('onEventClicked 4: ' + JSON.stringify(eventCoordinates))

    if (this.mapComponent) {
      this.mapComponent.centerMap(eventCoordinates.lat, eventCoordinates.lng);
    } else {
      console.error('Map component not found');
    }
  }

}
