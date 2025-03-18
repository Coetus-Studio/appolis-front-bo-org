import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Location } from '../../interfaces/locations.interface';
import { LocationsService } from '../../services/locations.service';
// import { LocationFormComponent } from "../../components/location-form/location-form.component";
import { RouterOutlet } from '@angular/router';
import CitizenMapFormComponent from '../../components/citizen-map-form/citizen-map-form.component';

@Component({
  selector: 'create-locations',
  standalone: true,
  imports: [ReactiveFormsModule, CitizenMapFormComponent],
  templateUrl: './create-locations.component.html',
  styleUrl: './create-locations.component.css'
})
export default class CreateLocationsComponent implements OnInit {

  constructor(
    private locationService: LocationsService,
  ) {}

  ngOnInit(): void {}


}
