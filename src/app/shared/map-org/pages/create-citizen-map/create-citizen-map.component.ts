import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Location } from '../../interfaces/locations.interface';
import { LocationsService } from '../../services/locations.service';
// import { LocationFormComponent } from "../../components/location-form/location-form.component";
import { RouterOutlet } from '@angular/router';
import { ModalAddressComponent } from '../../components/modal-address/modal-address.component';
import CitizenMapFormComponent from '../../components/citizen-map-form/citizen-map-form.component';

@Component({
  selector: 'create-citizen-map',
  standalone: true,
  imports: [ReactiveFormsModule, CitizenMapFormComponent],
  templateUrl: './create-citizen-map.component.html',
  styleUrl: './create-citizen-map.component.css'
})
export default class CreateCitizenMapComponent implements OnInit {

  constructor(
    private locationService: LocationsService,
  ) {}

  ngOnInit(): void {}


}
