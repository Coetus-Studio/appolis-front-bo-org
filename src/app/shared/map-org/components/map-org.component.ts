import { BranchMapMarker } from './../interface/map-org.interface';
import { CommonModule } from '@angular/common';
import { Component, effect, signal, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';
import { BranchService } from '../map-org.service';


@Component({
  selector: 'app-map-org',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  providers: [
    // MapOrgService
  ],
  templateUrl: './map-org.component.html',
  styleUrl: './map-org.component.css'
})

export class BranchesMapComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  branches = signal<BranchMapMarker[]>([]);
  center: google.maps.LatLngLiteral = { lat: 46.8182, lng: 8.2275 }; // Center of Switzerland
  zoom = 8;
  markers: BranchMapMarker[] = [];
  selectedBranch = signal<BranchMapMarker | null>(null);

  constructor(private branchService: BranchService) {
    effect(
      () => {
        // Assign markers to data
        this.markers = this.getMarkers();
      },
      { allowSignalWrites: true }
    );
  }

  getMarkers() {
    return this.branches()
      .map((branch) => {
        const marker: BranchMapMarker = {
          label: '',
          position: { lat: branch.lat, lng: branch.lng },
          title: branch.name,
          options: { animation: google.maps.Animation.DROP },
          branch: branch,
        };
        return marker;
      })
      .filter(
        (marker) => !isNaN(marker.position.lat) && !isNaN(marker.position.lng)
      );
  }

  openInfoWindow(branch: Branch, marker: MapMarker): void {
    this.selectedBranch.set(branch);
    if (this.infoWindow) {
      this.infoWindow.open(marker);
    }
  }
}
