import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';



@Component({
  selector: 'form-create-docs-residence',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {

  residenceForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    console.log('FormComponent')
   }

  // inicializo el form
  ngOnInit(): void {
    this.residenceForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', [ Validators.pattern('^[0-9a-fA-F]{40}$')]],
      phoneNumber: ['', [ Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      // documentType: ['', Validators.required],
      // documentNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    })
  }

  onSubmit() {
    console.log("Formulario")
    console.log(this.residenceForm.value);
    // localStorage.setItem('residenceFormData', JSON.stringify(this.residenceForm.value));

    // this.router.navigate(['create/summary']);
  }


}
