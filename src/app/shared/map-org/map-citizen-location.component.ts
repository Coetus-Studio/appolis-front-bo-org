import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import LocationFormComponent from "./components/location-form/location-form.component";

@Component({
  selector: 'citizen-map-form',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, LocationFormComponent, ReactiveFormsModule],
  template: '',
})

export default class CitizenMapFormComponent implements OnInit {

  constructor(
  ) {}




  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }


  testQA() {
    console.log('citizen-map-form component loaded');
  }
}
