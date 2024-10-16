import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './documents.component.html',
  // styleUrl: './form.component.css'
})
export class DocumentsComponent {

}
