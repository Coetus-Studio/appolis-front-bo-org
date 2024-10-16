import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup , FormControl , Validators } from  '@angular/forms' ;



@Component({
  selector: 'form-create-docs-residence',
  standalone: true,
  imports: [RouterOutlet, CommonModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {




  residenceForm = new FormGroup({
    name: new FormControl('', Validators.required),
    // lastName: new FormControl('', Validators.required),
    // address: new FormControl('', [Validators.required, Validators.pattern('^[0-9a-fA-F]{40}$')]),
    // phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    // email: new FormControl('', [Validators.required, Validators.email]),
    // documentType: new FormControl('', Validators.required),
    // documentNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
  });

  onSubmit ( ) {
    console . log ( this.residenceForm.value );
  }



  // sendWeb3(): void {
  //   // Send Web3 transaction here
  //   console.log('Web3 transaction sent');
  // }


}
