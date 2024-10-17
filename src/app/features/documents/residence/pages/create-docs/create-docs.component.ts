import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-create-docs',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormComponent],
  templateUrl: './create-docs.component.html',
  styleUrl: './create-docs.component.css'
})
export default class CreateDocsComponent {

  constructor() {
    console.log('inicializando CreateDocsComponent');
   }
  // Your code here




}
