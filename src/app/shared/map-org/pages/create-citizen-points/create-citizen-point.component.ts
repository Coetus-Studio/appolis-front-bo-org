import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Location } from '../../interfaces/locations.interface';
import { LocationsService } from '../../services/locations.service';
// import { LocationFormComponent } from "../../components/location-form/location-form.component";
import { RouterOutlet } from '@angular/router';
import { ModalAddressComponent } from '../../components/modal-address/modal-address.component';
import CitizenMapFormComponent from '../../components/citizen-point-form/citizen-point-form.component';

@Component({
  selector: 'create-citizen-point',
  standalone: true,
  imports: [ReactiveFormsModule, CitizenMapFormComponent],
  templateUrl: './create-citizen-point.component.html',
  styleUrl: './create-citizen-point.component.css'
})
export default class CreateCitizenPointComponent implements OnInit {

  constructor(
  ) {}

  ngOnInit(): void {}


}
