import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RequirementsService } from '../../services/requirements.service';
import { Requirements } from '../../interfaces/requirement.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'list-requirements',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './list-requirements.component.html',
  styleUrl: './list-requirements.component.css'
})
export default class ListRequirementsComponent implements OnInit{

  requirements: Requirements[] = [];

  @Output() requirementClicked = new EventEmitter<{lng: number; lat: number}>();


  constructor(
    private requirementService: RequirementsService,
  ) {

  }
  ngOnInit(): void {
    this.getAllRequirements();
  }

  async getAllRequirements() {
    console.log('get all requirements');

    this.requirementService.getAllRequirements().subscribe({
      next: (requirements) => {
        console.log('requirements' + JSON.stringify(requirements));
        this.requirements = requirements;
      },
      error: (error) => {
        console.error('Error fetching requirements', error);
      }
    })
  }

  focusOnEvent(event: any) {
    console.log('ingresando event: ' + JSON.stringify(event))
    const lat = event.location.geo_point.coordinates[1];
    const lng = event.location.geo_point.coordinates[0];

    // Emitimos las coordenadas al MapOrgComponent
    this.requirementClicked.emit({ lat, lng });
    }
}
